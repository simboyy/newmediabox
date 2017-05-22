/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/categories              ->  index
 * POST    /api/categories              ->  create
 * GET     /api/categories/:id          ->  show
 * PUT     /api/categories/:id          ->  update
 * DELETE  /api/categories/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.headings = headings;
exports.oldTree = oldTree;
exports.index = index;
exports.blind = blind;
exports.loaded = loaded;
exports.all = all;
exports.path = path;
exports.show = show;
exports.create = create;
exports.updateOne = updateOne;
exports.update = update;
exports.destroy = destroy;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _category = require('./category.model');

var _category2 = _interopRequireDefault(_category);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function respondWithSubcats(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      var a = [];
      var async = require("async");
      async.each(entity, function (h, callback) {
        a.push(h);
        callback();
      }, function (err) {
        res.status(statusCode).json(a);
      });
    }
  };
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
    var updated = _lodash2.default.extend(entity, updates);
    return updated.save().then(function (updated) {
      return entity;
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

// Get list of headings
function headings(req, res) {
  _category2.default.find().exec().then(respondWithSubcats(res)).catch(handleError(res));
}

// Get all categories with corresponding sub_categories
function oldTree(req, res) {
  var async = require("async");
  var p = [];
  _category2.default.find({ parent: null, active: true }).select({ name: 1, category: 1, parent: 1, child: 1, slug: 1 }).exec(function (err, parents) {
    // Using async library which will enable us to wait until data received from database
    async.each(parents, function (a, callback) {
      a = a.toObject();
      _category2.default.find({ _id: { $in: a } }).select({ name: 1, category: 1, parent: 1, slug: 1 }).exec(function (err, c) {
        a.sub_categories = c;
        p.push(a);
        callback();
      });
    },
    // 3rd param is the function to call when everything's done
    function (err) {
      if (err) {
        return res.status(404).send('Not Found');
      } else {
        return res.status(200).json(p);
      }
    });
  });
}

// Gets a list of Categories
function index(req, res) {
  return _category2.default.find({ parent: null }).populate({ path: 'child', populate: { path: 'child', populate: { path: 'child', populate: { path: 'child', populate: { path: 'child', populate: { path: 'child', populate: { path: 'child', populate: { path: 'child', populate: { path: 'child' } } } } } } } }
  }).exec().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a list of Categories
function blind(req, res) {
  return _category2.default.find({ child: null }).exec().then(respondWithResult(res)).catch(handleError(res));
}

// Get only those categories which has a product ** Not working
function loaded(req, res) {
  return _category2.default.find({ parent: null }).populate({ path: 'child', populate: { path: 'child', populate: { path: 'child', populate: { path: 'child', populate: { path: 'child', populate: { path: 'child', populate: { path: 'child', populate: { path: 'child', populate: { path: 'child' } } } } } } } }
  }).sort('-name').exec().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a list of Categories
function all(req, res) {
  return _category2.default.find({ parent: { $ne: null } }).populate({ path: 'parent' }).sort({ name: 1 }).exec().then(respondWithResult(res)).catch(handleError(res));
}

function path(req, res) {
  return _category2.default.find({ _id: req.params.category }).populate({
    path: 'parent',
    // Get categories of categories - populate the 'categories' array for every category
    populate: [{ path: 'parent' }, { path: 'child' }]
  }).exec().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single Category from the DB
function show(req, res) {
  return _category2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Category in the DB
function create(req, res) {
  if (!req.body.slug && req.body.name) req.body.slug = req.body.name.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
  return _category2.default.create(req.body).then(respondWithResult(res, 201)).catch(handleError(res));
}

// Updates an existing Category in the DB
function updateOne(req, res) {
  _category2.default.findOneAndUpdate({ "_id": req.body.parent, "subcat._id": req.body._id }, {
    "$set": {
      "subcat.$": req.body
    }
  }, function (err, doc) {
    if (err) {
      return res.status(404).send('Not Found');
    } else {
      return res.status(200).json(doc);
    }
  });
}

// Updates an existing Category in the DB
function update(req, res) {
  if (!req.body.slug && req.body.name) req.body.slug = req.body.name.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
  var c = [];
  _lodash2.default.each(req.body.child, function (i) {
    if (_lodash2.default.has(i, '_id')) {
      c.push(i._id);
    } else if (i) {
      c.push(i);
    }
  });
  req.body.child = c;
  if (req.body._id) {
    delete req.body._id;
  }
  return _category2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(saveUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Category from the DB
function destroy(req, res) {
  return _category2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}
//# sourceMappingURL=category.controller.js.map
