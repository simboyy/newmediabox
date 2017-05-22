/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/inventory              ->  index
 * POST    /api/inventory              ->  create
 * GET     /api/inventory/:id          ->  show
 * PUT     /api/inventory/:id          ->  update
 * DELETE  /api/inventory/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Inventory from './inventory.model';

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


// Get all inventory group
export function group(req, res) {
  var async = require("async");
  var fe = [];
  Inventory.find().distinct('key',function(err,inventory){
  var f = {};
    async.each(inventory, function(k, callback){
      var x = {};
      x.key = k;
      x.v = [];
        Inventory.find({key:k,active:true}).distinct('val').exec(function(err,v){
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

// Gets a list of inventory
export function index(req, res) {

   if(req.query){
    
    var q = isJson(req.query.where);
    console.log(q);
    var sort = isJson(req.query.sort);
    req.query.skip = parseInt(req.query.skip);
    req.query.limit = parseInt(req.query.limit);
    var select = isJson(req.query.select);
      
        var p = [];
        Inventory.find(q).limit(req.query.limit).skip(req.query.skip).sort(sort).select(select).exec(function (err, inventory) {
          if(err) { return handleError(res, err); }
          return res.status(200).json(inventory);
      }); 
  }else{
  return Inventory.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
  }
}

// Gets a single Inventory from the DB
export function show(req, res) {
  return Inventory.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Inventory in the DB
export function create(req, res) {
  return Inventory.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Inventory in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Inventory.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Inventory from the DB
export function destroy(req, res) {
  return Inventory.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
