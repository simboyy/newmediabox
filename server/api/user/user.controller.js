'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reset = reset;
exports.forgot = forgot;
exports.index = index;
exports.create = create;
exports.show = show;
exports.update = update;
exports.destroy = destroy;
exports.changePassword = changePassword;
exports.me = me;
exports.authCallback = authCallback;

var _user = require('./user.model');

var _user2 = _interopRequireDefault(_user);

var _environment = require('../../config/environment');

var _environment2 = _interopRequireDefault(_environment);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _send = require('../sendmail/send');

var mailer = _interopRequireWildcard(_send);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function (err) {
    return res.status(statusCode).json(err);
  };
}

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function (entity) {
    var updated = _lodash2.default.merge(entity, updates);
    return updated.save().then(function (updated) {
      return updated;
    });
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    return res.status(statusCode).send(err);
  };
}
/**
 * Get list of users
 * restriction: 'admin'
 */

// Reset password route
function reset(req, res, next) {
  _async2.default.waterfall([function (done) {
    _user2.default.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
      if (!user) {
        return res.status(422).json({ 'message': 'Password reset email is invalid or has expired.' });
      }

      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      req.body.to = user.email;
      user.save().then(function () {
        mailer.send(_environment2.default.mailOptions.resetPassword(req.body));
        return res.status(200).json({ 'message': 'Success! Your password has been changed.' });
      }).catch(validationError(res));
    });
  }], function (err) {
    if (err) return next(err);
  });
}

// Forgot password route
function forgot(req, res, next) {
  _async2.default.waterfall([function (done) {
    _crypto2.default.randomBytes(20, function (err, buf) {
      var token = buf.toString('hex');
      done(err, token);
    });
  }, function (token, done) {
    _user2.default.findOne({ email: req.body.email }).then(function (user) {
      if (!user) {
        return res.status(422).json({ 'message': 'No account with that email address exists.' });
      }
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

      user.save(function (err) {
        done(err, token, user);
      });
    });
  }, function (token, user, done) {
    // req.body.headers =  req.headers
    req.body.to = user.email;
    req.body.host = req.headers.host;
    req.body.token = token;
    mailer.send(_environment2.default.mailOptions.forgotPassword(req.body));
    return res.status(201).json({ 'message': 'An e-mail has been sent to ' + user.email + ' with further instructions.' });
  }], function (err) {
    if (err) return next(err);
  });
}

/**
 * Get list of users
 * restriction: 'admin'
 */
function index(req, res) {
  return _user2.default.find({}, '-salt -password').exec().then(function (users) {
    res.status(200).json(users);
  }).catch(handleError(res));
}

/**
 * Creates a new user
 */
function create(req, res) {
  console.log(req.body);
  var newUser = new _user2.default(req.body);
  newUser.provider = 'local';
  if (req.body.role) newUser.role = 'manager';
  newUser.save().then(function (user) {
    /**
     * Creates send welcome  email
     */
    if (user.role === 'user') {
      mailer.send(_environment2.default.mailOptions.signUpAdvertiser(res.req.body));
    } else if (user.role === 'manager') {
      mailer.send(_environment2.default.mailOptions.signUpPublisher(res.req.body));
    } else {
      mailer.send(_environment2.default.mailOptions.signUpAdvertiser(res.req.body));
    }
    var token = _jsonwebtoken2.default.sign({ _id: user._id }, _environment2.default.secrets.session, {
      expiresIn: 60 * 60 * 5
    });
    res.json({ token: token });
  }).catch(validationError(res));
}

/**
 * Get a single user
 */
function show(req, res, next) {
  var userId = req.params.id;

  return _user2.default.findById(userId).exec().then(function (user) {
    if (!user) {
      return res.status(404).end();
    }
    res.json(user.profile);
  }).catch(function (err) {
    return next(err);
  });
}

// Updates an existing Thing in the DB
function update(req, res) {
  if (req.body._id) delete req.body._id;

  return _user2.default.findById(req.params.id).exec()
  // .then(handleEntityNotFound(res))
  .then(saveUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
function destroy(req, res) {
  return _user2.default.findByIdAndRemove(req.params.id).exec().then(function () {
    res.status(204).end();
  }).catch(handleError(res));
}

/**
 * Change a users password
 */
function changePassword(req, res) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  return _user2.default.findById(userId).exec().then(function (user) {
    if (user.authenticate(oldPass)) {
      user.password = newPass;
      return user.save().then(function () {
        res.status(204).end();
      }).catch(validationError(res));
    } else {
      return res.status(403).end();
    }
  });
}

/**
 * Get my info
 */
function me(req, res, next) {
  var userId = req.user._id;

  return _user2.default.findOne({ _id: userId }, '-salt -password').exec().then(function (user) {
    // don't ever give out the password or salt
    if (!user) {
      return res.status(401).end();
    }
    res.json(user);
  }).catch(function (err) {
    return next(err);
  });
}

/**
 * Authentication callback
 */
function authCallback(req, res) {
  res.redirect('/');
}
//# sourceMappingURL=user.controller.js.map
