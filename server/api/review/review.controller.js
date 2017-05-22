/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/reviews              ->  index
 * POST    /api/reviews              ->  create
 * GET     /api/reviews/:id          ->  show
 * PUT     /api/reviews/:id          ->  upsert
 * PATCH   /api/reviews/:id          ->  patch
 * DELETE  /api/reviews/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Review from './review.model';
import * as config from '../../config/environment/shared'

function isJson(str) {
  try {
      str = JSON.parse(str);
  } catch (e) {
      str = str;
  }
  return str
}

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Reviews
export function index(req, res) {
  var q = {email:req.user.email}
  if(req.user.role === 'admin') q = {} 
  return Review.find(q).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of Reviews
export function my(req, res) {
  var q = {pid: req.query.pid, active: true}
  if(req.user) q = {$or:[q,{email:req.user.email, pid: req.query.pid}]}
  return Review.find(q).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Review from the DB
export function show(req, res) {
  return Review.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Review in the DB
export function create(req, res) {
  req.body.uid = req.user.email; // id change on every login hence email is used
  if(config.reviewSettings.moderate) // If the review required modetation (server/settings/environment/shared.js)
    req.body.active = false; 
  return Review.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Brand in the DB
export function update(req, res) {
  if(req.body._id) { delete req.body._id; }
  req.body.uid = req.user.email; // id change on every login hence email is used

  return Review.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Review from the DB
export function destroy(req, res) {
  return Review.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
