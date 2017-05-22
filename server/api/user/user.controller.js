'use strict';

import User from './user.model';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';
import async from 'async';
import crypto from 'crypto';
import _ from 'lodash';
import * as mailer from '../sendmail/send'

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    return res.status(statusCode).json(err);
  }
}

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  }
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  }
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    return res.status(statusCode).send(err);
  };
}
/**
 * Get list of users
 * restriction: 'admin'
 */

// Reset password route
export function reset(req, res, next) {
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          return res.status(422).json({'message': 'Password reset email is invalid or has expired.'});
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        req.body.to = user.email
        user.save()
          .then(function() {
            mailer.send(config.mailOptions.resetPassword(req.body))
            return res.status(200).json({'message': 'Success! Your password has been changed.'});
          })
          .catch(validationError(res));
      });
    }
  ], function(err) {
    if (err) return next(err);
  });
}

// Forgot password route
export function forgot(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(422).json({'message': 'No account with that email address exists.'});
        }
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      // req.body.headers =  req.headers
      req.body.to = user.email
      req.body.host = req.headers.host
      req.body.token =  token
      mailer.send(config.mailOptions.forgotPassword(req.body))
      return res.status(201).json({'message': 'An e-mail has been sent to ' + user.email + ' with further instructions.'});
    }
  ], function(err) {
    if (err) return next(err);
  });
}

/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {
  return User.find({}, '-salt -password').exec()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
}

/**
 * Creates a new user
 */
export function create(req, res) {
  console.log(req.body);
  var newUser = new User(req.body);
  newUser.provider = 'local';
  if(req.body.role)
   newUser.role = 'manager';
  newUser.save()
    .then(function(user) {
    /**
     * Creates send welcome  email
     */
      if(user.role === 'user'){
       mailer.send(config.mailOptions.signUpAdvertiser(res.req.body));
    }else if(user.role ==='manager'){
       mailer.send(config.mailOptions.signUpPublisher(res.req.body));
     }else{
      mailer.send(config.mailOptions.signUpAdvertiser(res.req.body));
     }
      var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      res.json({ token });
    })
    .catch(validationError(res));
}

/**
 * Get a single user
 */
export function show(req, res, next) {
  var userId = req.params.id;

  return User.findById(userId).exec()
    .then(user => {
      if(!user) {
        return res.status(404).end();
      }
      res.json(user.profile);
    })
    .catch(err => next(err));
}

// Updates an existing Thing in the DB
export function update(req, res) {
  if (req.body._id) 
    delete req.body._id;

  return User.findById(req.params.id).exec()
    // .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res))
    
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy(req, res) {
  return User.findByIdAndRemove(req.params.id).exec()
    .then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));
}

/**
 * Change a users password
 */
export function changePassword(req, res) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  return User.findById(userId).exec()
    .then(user => {
      if(user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}

/**
 * Get my info
 */
export function me(req, res, next) {
  var userId = req.user._id;

  return User.findOne({ _id: userId }, '-salt -password').exec()
    .then(user => { // don't ever give out the password or salt
      if(!user) {
        return res.status(401).end();
      }
      res.json(user);
    })
    .catch(err => next(err));
}

/**
 * Authentication callback
 */
export function authCallback(req, res) {
  res.redirect('/');
}
