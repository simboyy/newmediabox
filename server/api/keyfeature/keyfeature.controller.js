/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/keyfeatures              ->  index
 * POST    /api/keyfeatures              ->  create
 * GET     /api/keyfeatures/:id          ->  show
 * PUT     /api/keyfeatures/:id          ->  update
 * DELETE  /api/keyfeatures/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.group = group;
exports.index = index;
exports.show = show;
exports.create = create;
exports.update = update;
exports.destroy = destroy;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _keyfeature = require('./keyfeature.model');

var _keyfeature2 = _interopRequireDefault(_keyfeature);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
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

// Get all features group
function group(req, res) {
  var async = require("async");
  var fe = [];
  _keyfeature2.default.find().distinct('key', function (err, feature) {
    var f = {};
    async.each(feature, function (k, callback) {
      var x = {};
      x.key = k;
      x.v = [];
      _keyfeature2.default.find({ key: k, active: true }).distinct('val').exec(function (err, v) {
        x.v = v;
        fe.push(x);
        callback();
      });
    },
    // 3rd param is the function to call when everything's done
    function (err) {
      if (err) {
        return res.status(404).send('Not Found');
      } else {
        return res.status(200).json(fe);
      }
    });
  });
};

// Gets a list of Features
function index(req, res) {
  return _keyfeature2.default.find().exec().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single Feature from the DB
function show(req, res) {
  return _keyfeature2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Feature in the DB
function create(req, res) {
  return _keyfeature2.default.create(req.body).then(respondWithResult(res, 201)).catch(handleError(res));
}

// Updates an existing Feature in the DB
function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _keyfeature2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(saveUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Feature from the DB
function destroy(req, res) {
  return _keyfeature2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}
//# sourceMappingURL=keyfeature.controller.js.map
