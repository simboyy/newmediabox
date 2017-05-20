/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/categories              ->  index
 * POST    /api/categories              ->  create
 * GET     /api/categories/:id          ->  show
 * PUT     /api/categories/:id          ->  update
 * DELETE  /api/categories/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Category from './category.model';


function respondWithSubcats(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      var a = [];
      var async = require("async");
      async.each(entity, function(h, callback){
        a.push(h);
        callback();
      },function(err){
        res.status(statusCode).json(a);
      })
    }
  };
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
    var updated = _.extend(entity, updates);
    return updated.save()
      .then(updated => {
        return entity;
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

// Get list of headings
export function headings(req, res) {
  Category.find().exec()
  .then(respondWithSubcats(res))
  .catch(handleError(res));
}

// Get all categories with corresponding sub_categories
export function oldTree(req, res) {
  var async = require("async");
  var p = [];
  Category.find({parent:null, active:true}).select({name:1,category:1,parent:1,child:1,slug:1}).exec(function(err,parents){
  // Using async library which will enable us to wait until data received from database
  async.each(parents, function(a, callback){
      a = a.toObject();
      Category.find({_id: {$in: a}}).select({name:1,category:1,parent:1,slug:1}).exec(function(err,c){
        a.sub_categories = c;
        p.push(a);
        callback();
      });
    },
    // 3rd param is the function to call when everything's done
    function(err){
      if( err ) { return res.status(404).send('Not Found'); } else { return res.status(200).json(p); }
    }
  );
});

}

// Gets a list of Categories
export function index(req, res) {
  return Category.find({parent: null}).
  populate({path: 'child', populate: ({ path: 'child',populate: ({ path: 'child', populate: ({ path: 'child', populate: ({ path: 'child', populate: ({ path: 'child',populate: ({ path: 'child',populate: ({ path: 'child',populate: ({ path: 'child' }) }) }) }) }) }) }) })
  }).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of Categories
export function blind(req, res) {
  return Category.
  find({child: null}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Get only those categories which has a product ** Not working
export function loaded(req, res) {
  return Category.find({parent: null}).
  populate({path: 'child', populate: ({ path: 'child',populate: ({ path: 'child', populate: ({ path: 'child', populate: ({ path: 'child', populate: ({ path: 'child',populate: ({ path: 'child',populate: ({ path: 'child',populate: ({ path: 'child' }) }) }) }) }) }) }) })
  }).sort('-name').exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of Categories
export function all(req, res) {
  return Category.find({ parent: { $ne: null } }).populate({path:'parent'}).sort({name:1}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function path(req, res) {
  return Category.find({_id: req.params.category}).
  populate({
    path: 'parent',
    // Get categories of categories - populate the 'categories' array for every category
    populate: [{ path: 'parent' },{ path: 'child' }]
  }).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Category from the DB
export function show(req, res) {
  return Category.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Category in the DB
export function create(req, res) {
  if(!req.body.slug && req.body.name)
    req.body.slug = req.body.name.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
  return Category.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Category in the DB
export function updateOne(req, res) {
  Category.findOneAndUpdate(
    { "_id": req.body.parent, "subcat._id": req.body._id },
    { 
        "$set": {
            "subcat.$": req.body
        }
    },
    function(err,doc) {
      if( err ) { return res.status(404).send('Not Found'); } else { return res.status(200).json(doc); }
    }
  );
}

// Updates an existing Category in the DB
export function update(req, res) {
  if(!req.body.slug && req.body.name)
    req.body.slug = req.body.name.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
    var c = [];
  _.each(req.body.child, function (i) {
    if(_.has(i, '_id')){
      c.push(i._id);
    }else if(i){
      c.push(i);
    }
  })
  req.body.child = c;
  if (req.body._id) {
    delete req.body._id;
  }
  return Category.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Category from the DB
export function destroy(req, res) {
  return Category.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
