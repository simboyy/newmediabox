/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/inventory              ->  index
 * POST    /api/inventory              ->  create
 * GET     /api/inventory/:id          ->  show
 * PUT     /api/inventory/:id          ->  update
 * DELETE  /api/inventory/:id          ->  destroy
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

var _inventory = require('./inventory.model');

var _inventory2 = _interopRequireDefault(_inventory);

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

// Get all inventory group
function group(req, res) {
  var async = require("async");
  var fe = [];
  _inventory2.default.find().distinct('key', function (err, inventory) {
    var f = {};
    async.each(inventory, function (k, callback) {
      var x = {};
      x.key = k;
      x.v = [];
      _inventory2.default.find({ key: k, active: true }).distinct('val').exec(function (err, v) {
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

// Gets a list of inventory
function index(req, res) {

  if (req.query) {

    var q = isJson(req.query.where);
    console.log(q);
    var sort = isJson(req.query.sort);
    req.query.skip = parseInt(req.query.skip);
    req.query.limit = parseInt(req.query.limit);
    var select = isJson(req.query.select);

    var p = [];
    _inventory2.default.find(q).limit(req.query.limit).skip(req.query.skip).sort(sort).select(select).exec(function (err, inventory) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(inventory);
    });
  } else {
    return _inventory2.default.find().exec().then(respondWithResult(res)).catch(handleError(res));
  }
}

// Gets a single Inventory from the DB
function show(req, res) {
  return _inventory2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Inventory in the DB
function create(req, res) {
  return _inventory2.default.create(req.body).then(respondWithResult(res, 201)).catch(handleError(res));
}

// Updates an existing Inventory in the DB
function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _inventory2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(saveUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Inventory from the DB
function destroy(req, res) {
  return _inventory2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}
//# sourceMappingURL=inventory.controller.js.map
