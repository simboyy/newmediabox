/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/PaymentMethods              ->  index
 * POST    /api/PaymentMethods              ->  create
 * GET     /api/PaymentMethods/:id          ->  show
 * PUT     /api/PaymentMethods/:id          ->  update
 * DELETE  /api/PaymentMethods/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.active = active;
exports.index = index;
exports.show = show;
exports.create = create;
exports.update = update;
exports.destroy = destroy;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _PaymentMethod = require('./PaymentMethod.model');

var _PaymentMethod2 = _interopRequireDefault(_PaymentMethod);

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

// Get list of active PaymentMethods
function active(req, res) {
  _PaymentMethod2.default.find({ active: true }).exec(function (err, PaymentMethods) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(PaymentMethods);
  });
};

// Gets a list of PaymentMethods
function index(req, res) {
  return _PaymentMethod2.default.find().exec().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single PaymentMethod from the DB
function show(req, res) {
  return _PaymentMethod2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new PaymentMethod in the DB
function create(req, res) {
  return _PaymentMethod2.default.create(req.body).then(respondWithResult(res, 201)).catch(handleError(res));
}

// Updates an existing PaymentMethod in the DB
function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _PaymentMethod2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(saveUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a PaymentMethod from the DB
function destroy(req, res) {
  return _PaymentMethod2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}
//# sourceMappingURL=PaymentMethod.controller.js.map
