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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;
exports.my = my;
exports.show = show;
exports.createOrRemove = createOrRemove;
exports.create = create;
exports.update = update;
exports.destroy = destroy;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _wishlist = require('./wishlist.model');

var _wishlist2 = _interopRequireDefault(_wishlist);

var _shared = require('../../config/environment/shared');

var config = _interopRequireWildcard(_shared);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isJson(str) {
  try {
    str = JSON.parse(str);
  } catch (e) {
    str = str;
  }
  return str;
}

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function saveUpdates(updates) {
  return function (entity) {
    var updated = _lodash2.default.merge(entity, updates);
    return updated.save().then(function (updated) {
      return updated;
    });
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove().then(function () {
        res.status(204).end();
      });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Wishlists
function index(req, res) {
  return _wishlist2.default.find({ email: req.user.email }).exec().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a list of Wishlists
function my(req, res) {
  var q = { 'product.name': '~!!@~!~*&^%$#!@@!#asds12' }; // Some randome string so that blank value will be returned
  if (req.user) {
    q = isJson(req.query.where);
    q.email = req.user.email;
  }
  return _wishlist2.default.find(q).exec().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single Wishlist from the DB
function show(req, res) {
  return _wishlist2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Wishlist in the DB
function createOrRemove(req, res) {
  var q = isJson(req.body);
  q.email = req.user.email;
  _wishlist2.default.find(q).then(function (r) {
    if (r.length > 0) {
      req.params.id = r[0]._id;
      destroy(req, res);
    } else {
      create(req, res);
    }
  });
}

// Creates a new Wishlist in the DB
function create(req, res) {
  req.body.uid = req.user._id;
  req.body.email = req.user.email;
  req.body.name = req.user.name;
  return _wishlist2.default.create(req.body).then(respondWithResult(res, 201)).catch(handleError(res));
}

// Updates an existing Brand in the DB
function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  req.body.uid = req.user.email; // id change on every login hence email is used

  return _wishlist2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(saveUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Wishlist from the DB
function destroy(req, res) {
  return _wishlist2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}
//# sourceMappingURL=wishlist.controller.js.map
