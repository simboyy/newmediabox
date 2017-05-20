/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/pay              ->  index
 * POST    /api/pay              ->  create
 * GET     /api/pay/:id          ->  show
 * PUT     /api/pay/:id          ->  upsert
 * PATCH   /api/pay/:id          ->  patch
 * DELETE  /api/pay/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Order from '../order/order.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
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
