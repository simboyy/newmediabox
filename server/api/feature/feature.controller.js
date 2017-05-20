/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/features              ->  index
 * POST    /api/features              ->  create
 * GET     /api/features/:id          ->  show
 * PUT     /api/features/:id          ->  update
 * DELETE  /api/features/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Feature from './feature.model';

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


// Get all features group
export function group(req, res) {
  var async = require("async");
  var fe = [];
  Feature.find().distinct('key',function(err,feature){
  var f = {};
    async.each(feature, function(k, callback){
      var x = {};
      x.key = k;
      x.v = [];
        Feature.find({key:k,active:true}).distinct('val').exec(function(err,v){
          x.v = v;
          fe.push(x);
          callback();
        });
      },
      // 3rd param is the function to call when everything's done
      function(err){
        if( err ) { return res.status(404).send('Not Found'); } else { return res.status(200).json(fe); }
      }
    );
});
};

// Gets a list of Features
export function index(req, res) {
  return Feature.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Feature from the DB
export function show(req, res) {
  return Feature.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Feature in the DB
export function create(req, res) {
  return Feature.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Feature in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Feature.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Feature from the DB
export function destroy(req, res) {
  return Feature.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
