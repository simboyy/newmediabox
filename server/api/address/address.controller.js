/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/address              ->  index
 * POST    /api/address              ->  create
 * GET     /api/address/:id          ->  show
 * PUT     /api/address/:id          ->  update
 * DELETE  /api/address/:id          ->  destroy
 */

'use strict';
import _ from 'lodash';
import Address from './address.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.extend(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
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
    res.status(statusCode).send(err);
  };
}

// Gets a list of Addresss
export function index(req, res) {
  return Address.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of Addresss
export function my(req, res) {
  Address.find({uid:req.user._id}).sort('-updatedAt').exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Address from the DB
export function show(req, res) {
  return Address.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Address in the DB
export function create(req, res) {
  req.body.uid = req.user._id;
  return Address.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Address in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Address.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Address from the DB
export function destroy(req, res) {
  return Address.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
