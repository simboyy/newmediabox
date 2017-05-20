/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/countries              ->  index
 * POST    /api/countries              ->  create
 * GET     /api/countries/:id          ->  show
 * PUT     /api/countries/:id          ->  update
 * DELETE  /api/countries/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Country from './country.model';
import Shipping from '../shipping/shipping.model';

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


// Get list of countries for which there is atleast 1 shipping
export function active(req, res) {
  var async = require("async");
  // Async is required. Because without async it does not wait while accessed outside the scope. it simply returns null
    var selectedCountry = [];
  Shipping.find({active:true}).distinct('country').exec(function (err, shipping) {
    if(err) { return handleError(res, err); }
    async.each(shipping, function(a, callback){
      Country.find({name:a}, function (err, countries) {
        if(err) { return handleError(res, err); }
        selectedCountry.push(countries[0]);
        callback();
      });
    },
    // 3rd param is the function to call when everything's done
    function(err){
      if( err ) { return res.status(404).send('Not Found'); } else { return res.status(200).json(selectedCountry); }
    });
  });
}

// Gets a list of Countrys
export function index(req, res) {
  Country.find(req.query)
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Country from the DB
export function show(req, res) {
  return Country.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Country in the DB
export function create(req, res) {
  return Country.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Country in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Country.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Country from the DB
export function destroy(req, res) {
  return Country.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
