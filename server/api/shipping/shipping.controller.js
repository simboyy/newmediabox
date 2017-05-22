/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/shippings              ->  index
 * POST    /api/shippings              ->  create
 * GET     /api/shippings/:id          ->  show
 * PUT     /api/shippings/:id          ->  update
 * DELETE  /api/shippings/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Shipping from './shipping.model';

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
function isJson(str) {
  try {
      str = JSON.parse(str);
  } catch (e) {
      str = str;
  }
  return str
}
// Get all features group
export function best(req, res) {
  if(req.query){
    var params = isJson(req.query);
    var weight = params.weight;
    var cartValue = params.cartValue;
    var q = {}
    q.active = true;
    q.country = params.country
    var minPrice = 1000000;
    var minFreeShipping = 1000000;
    var best = {};
    var free = {};
    Shipping.find(q, function (err, data) {
      if(err) handleError(res, err)
      if(data.length<=0) handleError(res, err)
      _.each(data, function(s){
          if(s.freeShipping <= cartValue){
            minPrice = 0;
            best = s;
            best.charge = 0;
            free.carrier = s.carrier
            // return res.status(200).json([best]); // Converted to array as expected by the requester
            return false;
          }

          if (isNaN(weight))
            weight = 0

          if(s.maxWeight > weight && s.minWeight <= weight){ // Wish to ship to the proposed address
            if(s.charge < minPrice){  
                minPrice = s.charge;
                best = s;
            }
            if(s.freeShipping < minFreeShipping){
              minFreeShipping = s.freeShipping
              free = s;
            }
          }
      })
      var r = {best: best, free:free}
      return res.status(200).json([r]); // Converted to array as expected by the requester
    });
  }
}

// Gets a list of Shippings
export function index(req, res) {
  return Shipping.find(req.query).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Shipping from the DB
export function show(req, res) {
  return Shipping.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Shipping in the DB
export function create(req, res) {
  return Shipping.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Shipping in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Shipping.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Shipping from the DB
export function destroy(req, res) {
  return Shipping.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
