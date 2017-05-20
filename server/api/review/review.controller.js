/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/reviews              ->  index
 * POST    /api/reviews              ->  create
 * GET     /api/reviews/:id          ->  show
 * PUT     /api/reviews/:id          ->  upsert
 * PATCH   /api/reviews/:id          ->  patch
 * DELETE  /api/reviews/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;
exports.my = my;
exports.show = show;
exports.create = create;
exports.update = update;
exports.destroy = destroy;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _review = require('./review.model');

var _review2 = _interopRequireDefault(_review);

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

// Gets a list of Reviews
function index(req, res) {
  var q = { email: req.user.email };
  if (req.user.role === 'admin') q = {};
  return _review2.default.find(q).exec().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a list of Reviews
function my(req, res) {
  var q = { pid: req.query.pid, active: true };
  if (req.user) q = { $or: [q, { email: req.user.email, pid: req.query.pid }] };
  return _review2.default.find(q).exec().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single Review from the DB
function show(req, res) {
  return _review2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Review in the DB
function create(req, res) {
  req.body.uid = req.user.email; // id change on every login hence email is used
  if (config.reviewSettings.moderate) // If the review required modetation (server/settings/environment/shared.js)
    req.body.active = false;
  return _review2.default.create(req.body).then(respondWithResult(res, 201)).catch(handleError(res));
}

// Updates an existing Brand in the DB
function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  req.body.uid = req.user.email; // id change on every login hence email is used

  return _review2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(saveUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Review from the DB
function destroy(req, res) {
  return _review2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}
//# sourceMappingURL=review.controller.js.map
