/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/wishlists              ->  index
 * POST    /api/wishlists              ->  create
 * GET     /api/wishlists/:id          ->  show
 * PUT     /api/wishlists/:id          ->  upsert
 * PATCH   /api/wishlists/:id          ->  patch
 * DELETE  /api/wishlists/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Wishlist from './wishlist.model';
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

// Gets a list of Wishlists
export function index(req, res) {
  return Wishlist.find({email:req.user.email}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of Wishlists
export function my(req, res) {
  var q = {'product.name': '~!!@~!~*&^%$#!@@!#asds12'} // Some randome string so that blank value will be returned
  if(req.user) {
    q = isJson(req.query.where)
    q.email = req.user.email
  }
  return Wishlist.find(q).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Wishlist from the DB
export function show(req, res) {
  return Wishlist.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Wishlist in the DB
export function createOrRemove(req, res) {
  var q = isJson(req.body)
  q.email = req.user.email
  Wishlist.find(q).then(function(r){
    if(r.length>0) {
      req.params.id = r[0]._id
      destroy(req,res)
    }else{
      create(req,res)
    }
  })
}

// Creates a new Wishlist in the DB
export function create(req, res) {
  req.body.uid = req.user._id;
  req.body.email = req.user.email;
  req.body.name = req.user.name;
  return Wishlist.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Brand in the DB
export function update(req, res) {
  if(req.body._id) { delete req.body._id; }
  req.body.uid = req.user.email; // id change on every login hence email is used

  return Wishlist.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Wishlist from the DB
export function destroy(req, res) {
  return Wishlist.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
