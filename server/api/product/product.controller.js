/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/products              ->  index
 * POST    /api/products              ->  create
 * GET     /api/products/:id          ->  show
 * PUT     /api/products/:id          ->  update
 * DELETE  /api/products/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Product from './product.model';
import Category from '../category/category.model';
        var async = require("async");

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
        return updated;
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

// Get all features group
exports.count = function(req, res) {
  if(req.query){
    var q = isJson(req.query.where);
    Product.find(q).count().exec(function (err, count) {
      if(err) { return handleError(res, err); }
      return res.status(200).json([{count:count}]);
    });
  }
};

// Get product liast
// report
export function productList(req, res) {

    Product.aggregate([
     {$match:{'uid' : req.user.email}},
     {$project: { _id:0,EmployeeID: "$name",FirstName:"$name", EmployeeName: "$name",LastName:"$name",Title:"$name",Country:"Zimbabwe",City:"Zimbabwe",Address:"$website",HomePhone:"$phone",Notes:"$info"}}
    ], function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
  
        return res.status(200).json(result);
    });
}


// Get product liast
// report
export function productList2(req, res) {

    Product.aggregate([
     {$match:{'uid' : req.user.email}},
     {$project: { _id:0,value: "$name",text:"$name"}}
    ], function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
  
        return res.status(200).json(result);
    });
}


// Get product details
// report
export function productDetails(req, res) {

    Product.aggregate([
    {$match:{'uid' : req.user.email}},
    { $unwind : "$variants" },{$project: { _id:0,ProductID: "$name",ProductName:"$name", Category: "$variants.name",UnitsInStock:"1",UnitsOnOrder:"0",ReorderLevel:"1"}}
    ], function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
  
        return res.status(200).json(result);
    });
}

exports.priceRange = function(req, res) {
    var q = isJson(req.query.where);
    Product.findOne({ }).sort('-variants.price').exec().then(function(doc,err) {
        return res.status(200).json({min:0,max:doc.variants[0].price});
    });
    // Product.aggregate(
    //     {$match: q},
    //     {$project:{"variants.price":1}},
    //     {$unwind:"$variants"},
    //     {$sort:{"variants.price":-1}},
    //     // {$limit:1},
    //     function (err,data) {
    //       // console.log('xxxxxxxxxxx',err,data);
    //       if(err) { return handleError(res, err); }
    //       if(data.length>0){
    //         if(!data[data.length-1].variants.price) data[data.length-1].variants.price = 0; // If price blank for last record
    //         return res.status(200).json({min:data[data.length-1].variants.price,max:data[0].variants.price});
    //       }else{
    //         return res.status(200).json({min:0,max:10000});
    //       }
    //     }
    // );
};

// Gets a list of Products
export function index(req, res) {
  if(req.query){
    
    var q = isJson(req.query.where);
    console.log(q);
    var sort = isJson(req.query.sort);
    req.query.skip = parseInt(req.query.skip);
    req.query.limit = parseInt(req.query.limit);
    var select = isJson(req.query.select);
      
        var p = [];
        Product.find(q).limit(req.query.limit).skip(req.query.skip).sort(sort).select(select).exec(function (err, products) {
          if(err) { return handleError(res, err); }
          return res.status(200).json(products);
      }); 
  }else{
  return Product.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
  }
}

// Gets a single Product from the DB
export function show(req, res) {
  return Product.findById(req.params.id).populate({path: 'brand'}).populate({path: 'category'}).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Product in the DB
export function create(req, res) {
  req.body.uid = req.user.email; // id change on every login hence email is used
  var now = Date.now();
  req.body.updated = now;
  req.body.updated_at = now;
  req.body.created_at = now;
  if(req.body.name)
    req.body.nameLower = req.body.name.toString().toLowerCase();
  if(!req.body.slug && req.body.name)
    req.body.slug = req.body.name.toString().toLowerCase()
                      .replace(/\s+/g, '-')        // Replace spaces with -
                      .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
                      .replace(/\-\-+/g, '-')      // Replace multiple - with single -
                      .replace(/^-+/, '')          // Trim - from start of text
                      .replace(/-+$/, '');
  return Product.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Product in the DB
export function update(req, res) {
  if(req.body._id) { delete req.body._id; }
  var now = Date.now();
  req.body.updated = now;
  req.body.updated_at = now;
  if ( !req.body.uid ) 
    req.body.uid = req.user.email;
  
  if(req.body.name)
    req.body.nameLower = req.body.name.toString().toLowerCase();
  
  // Just to enable checking if the category has any product
  Category.update( 
      {  },
      { $pull: { products : { _id : req.params.id } } },
      { multi: true },
      function removeConnectionsCB(err, obj) {
        if(req.body.category){
          // console.log(err,obj)
          Category.update(
            { _id: req.body.category }, // Find the category from category model
            { $addToSet: {'products':{'_id': req.params.id}}}, // Update the prduct id into category model
            function removeConnectionsCB(err, obj) {
              // console.log(err,obj)
            }
          )
        }
      }
  )

  return Product.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res))
}

// Deletes a Product from the DB
export function destroy(req, res) {
  return Product.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
