/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/statistics              ->  index
 * POST    /api/statistics              ->  create
 * GET     /api/statistics/:id          ->  show
 * PUT     /api/statistics/:id          ->  update
 * DELETE  /api/statistics/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import statistic from './statistic.model';

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


// Get all statistics group
export function group(req, res) {
  var async = require("async");
  var fe = [];
  statistic.find().distinct('key',function(err,statistic){
  var f = {};
    async.each(statistic, function(k, callback){
      var x = {};
      x.key = k;
      x.v = [];
        statistic.find({key:k,active:true}).distinct('val').exec(function(err,v){
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

// Gets a list of statistics
export function index(req, res) {
  return statistic.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single statistic from the DB
export function show(req, res) {
  return statistic.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new statistic in the DB
export function create(req, res) {
  return statistic.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing statistic in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return statistic.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a statistic from the DB
export function destroy(req, res) {
  return statistic.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
