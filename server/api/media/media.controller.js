/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/media              ->  index
 * POST    /api/media              ->  create
 * GET     /api/media/:id          ->  show
 * PUT     /api/media/:id          ->  update
 * DELETE  /api/media/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;
exports.myMedia = myMedia;
exports.pubMedia = pubMedia;
exports.show = show;
exports.create = create;
exports.update = update;
exports.mediaUpdate = mediaUpdate;
exports.destroy = destroy;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _media = require('./media.model');

var _media2 = _interopRequireDefault(_media);

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
        var fs = require('fs');
        fs.unlink('client/' + entity.path, function (err) {
          if (err) {}
        });
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

// Gets a list of Medias
function index(req, res) {
  return _media2.default.find({ 'uid': req.user.email }).exec().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a list of Medias
function myMedia(req, res) {
  return _media2.default.find({ 'uid': req.user.email }).exec().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a list of Medias
function pubMedia(req, res) {
  return _media2.default.find({ 'pub': req.user.email }).exec().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single Media from the DB
function show(req, res) {
  return _media2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Media in the DB
function create(req, res) {
  req.files.file.uid = req.user.email;
  req.files.file.path = req.files.file.path.replace("client\\", "").replace('client/', '').replace('client//', '');
  return _media2.default.create(req.files.file).then(respondWithResult(res, 201)).catch(handleError(res));
}

// Updates an existing Media in the DB
function update(req, res) {

  console.log(req.body);
  if (req.body._id) {
    delete req.body._id;
  }
  return _media2.default.update({ 'path': req.params.id }, { $push: { pub: req.body.pub } }).exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Updates an existing Media in the DB with publishers
function mediaUpdate(req, res) {
  console.log(req.body);

  if (req.body._id) {
    delete req.body._id;
  }
  return _media2.default.findOne({ 'path': req.params.id }).exec().then(handleEntityNotFound(res)).then(saveUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Media from the DB
function destroy(req, res) {
  return _media2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}
//# sourceMappingURL=media.controller.js.map
