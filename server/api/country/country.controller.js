/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/countries              ->  index
 * POST    /api/countries              ->  create
 * GET     /api/countries/:id          ->  show
 * PUT     /api/countries/:id          ->  update
 * DELETE  /api/countries/:id          ->  destroy
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

var _country = require('./country.model');

var _country2 = _interopRequireDefault(_country);

var _shipping = require('../shipping/shipping.model');

var _shipping2 = _interopRequireDefault(_shipping);

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

// Get list of countries for which there is atleast 1 shipping
function active(req, res) {
  var async = require("async");
  // Async is required. Because without async it does not wait while accessed outside the scope. it simply returns null
  var selectedCountry = [];
  _shipping2.default.find({ active: true }).distinct('country').exec(function (err, shipping) {
    if (err) {
      return handleError(res, err);
    }
    async.each(shipping, function (a, callback) {
      _country2.default.find({ name: a }, function (err, countries) {
        if (err) {
          return handleError(res, err);
        }
        selectedCountry.push(countries[0]);
        callback();
      });
    },
    // 3rd param is the function to call when everything's done
    function (err) {
      if (err) {
        return res.status(404).send('Not Found');
      } else {
        return res.status(200).json(selectedCountry);
      }
    });
  });
}

// Gets a list of Countrys
function index(req, res) {
  _country2.default.find(req.query).then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single Country from the DB
function show(req, res) {
  return _country2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Country in the DB
function create(req, res) {
  return _country2.default.create(req.body).then(respondWithResult(res, 201)).catch(handleError(res));
}

// Updates an existing Country in the DB
function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _country2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(saveUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Country from the DB
function destroy(req, res) {
  return _country2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}
//# sourceMappingURL=country.controller.js.map
