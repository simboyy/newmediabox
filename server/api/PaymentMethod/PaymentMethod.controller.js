/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/PaymentMethods              ->  index
 * POST    /api/PaymentMethods              ->  create
 * GET     /api/PaymentMethods/:id          ->  show
 * PUT     /api/PaymentMethods/:id          ->  update
 * DELETE  /api/PaymentMethods/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import PaymentMethod from './PaymentMethod.model';

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
    var updated = _.merge(entity, updates);
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

// Get list of active PaymentMethods
export function active(req, res) {
  PaymentMethod.find({active:true}).exec(function (err, PaymentMethods) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(PaymentMethods);
  });
};

// Gets a list of PaymentMethods
export function index(req, res) {
  return PaymentMethod.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single PaymentMethod from the DB
export function show(req, res) {
  return PaymentMethod.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new PaymentMethod in the DB
export function create(req, res) {
  return PaymentMethod.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing PaymentMethod in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return PaymentMethod.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a PaymentMethod from the DB
export function destroy(req, res) {
  return PaymentMethod.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
