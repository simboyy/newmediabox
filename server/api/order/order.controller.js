/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/orders              ->  index
 * POST    /api/orders              ->  create
 * GET     /api/orders/:id          ->  show
 * PUT     /api/orders/:id          ->  update
 * DELETE  /api/orders/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Order from './order.model';
import * as config from '../../config/environment/shared'
import * as email from '../sendmail/send'

function orderPlaced(res, statusCode) {
  res.req.body.to = res.req.body.email;
  res.req.body.id = 'Cash';
  email.send(config.mailOptions.orderPlaced(res.req.body))

  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function orderUpdated(res, statusCode) {
  email.send(config.mailOptions.orderUpdated(res.req.body))

  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function respondWithResult(res, statusCode) {
  console.log(res);
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
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

// Get all orders by a user
export function myOrders(req, res) {
  Order.find({email : req.user.email},function (err, orders) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(orders);
  });
}


// Get all orders by a user
// Count
export function myOrdersCount(req, res) {

   Order.find({email : req.user.email}).count().exec(function (err, count) {
      if(err) { return handleError(res, err); }
      return res.status(200).json([{count:count}]);
    });
 
}

// Get all orders for a publisher 
// Group By country and customers
export function pubCountryCustomers(req, res) {

  Order.aggregate([
    {$match:{'items.publisheruid' : req.user.email}},
       {$project: { _id:0,Date: "$created_at",Value:"$amount.total", Country: "Zimbabwe"}}
    ], function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
         
        return res.status(200).json(result);
    });

}


// Get all orders for a publisher
// Group by customers
export function pubCustomers(req, res) {
   Order.aggregate([
      {$match:{'items.publisheruid' : req.user.email}},
      {$project: { _id:0, Country: "Zimbabwe",CompanyName: "$address.recipient_name"}}
    ], function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
         
        return res.status(200).json(result);
    });
}


// Get all orders for a publisher
//Group by product
export function pubProductSales(req, res) {


     Order.aggregate([
     {$match:{'items.publisheruid' : req.user.email}},
     { $unwind : "$items" },{
     $group:
         {
           "_id": "$items.publisher",
           "Sales": { $push:  {"Date": "$created_at" , "EmployeeSales":'$items.price',"TotalSales":{$sum:'$items.price'}} }
         }
     },{$project:{
         _id:0,
         EmployeeID:"$_id",
         Sales:"$Sales"
     }}
    ], function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
         
        return res.status(200).json(result);
    });
}


// Get all orders for a publisher
//Group by product
// calendar
export function pubProductSalesCalendar(req, res) {
     Order.aggregate([
    {$match:{'items.publisheruid' : req.user.email}},
    { $unwind : "$items" },{$project: { _id:0,SaleID: "$orderNo",Title:"$items.publisher", Description: "$items.name",Start:"$created_at",StartTimeZone:null,End:"$created_at",EndTimeZone:null,RecurrenceRule:null,RecurrenceID:null,RecurrenceException:null ,EmployeeID:"$items.publisher"}}
    ], function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
         
        return res.status(200).json(result);
    });
}


// Get all orders for a publisher
//Group by product
//Report
export function pubProductSalesReport(req, res) {
     Order.aggregate([
      {$match:{'items.publisheruid' : req.user.email}},
      { $unwind : "$items" },{
     $group:
         {
           "_id": "$items.publisher",
           "Sales": { $push:  { Date:"$created_at",Quantity: "$items.quantity"} }
         }
     },{$project:{
         _id:0,
          ProductID:"$_id",
          ProductSales:"$Sales"
     }}
    ], function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
         
        return res.status(200).json(result);
    });
}


// Get all orders for a publisher
// Average sales for each product
export function pubProductAverageSales(req, res) {
   Order.aggregate([
    {$match:{'items.publisheruid' : req.user.email}},
    {$project: { _id:0, EmployeeID: { $arrayElemAt: [ "$items", 0 ] },EmployeeSales: "$amount.total",Date:"$created_at"}},{$project:{Date:"$Date",EmployeeID:"$EmployeeID.publisher",EmployeeSales:"$EmployeeSales"}}
    ], function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
         
        return res.status(200).json(result);
    });
}

// Get all orders for a publisher
// Quartely sales
export function pubProductQuartelySales(req, res) {
   Order.aggregate([
     {$match:{'items.publisheruid' : req.user.email}},
     { $unwind : "$items" },{
     $group:
         {
           "_id": "$items.publisher",
           "Sales": { $push:  { "OrderID": "$orderNo", "OrderDate": "$created_at" , "Current":"$items.price","Target":"0"} }
         }
     },{$project:{
         _id:0,
         EmployeeID:"$_id",
         Sales:"$Sales"
     }}
    ], function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
         
        return res.status(200).json(result);
    });
}


// Get all orders for a publisher
// OrderDetails
export function pubOrderDetails(req, res) {
  Order.aggregate([
    {$match:{'items.publisheruid' : req.user.email}},
    {$project: { _id:0,orderDate: "$created_at",price:"$amount.total", country: "Zimbabwe"}}
    ], function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
         
        return res.status(200).json(result);
    });
}

// Get all orders for a publisher
// Order Information
export function pubOrderInformation(req, res) {
  Order.aggregate([
    {$match:{'items.publisheruid' : req.user.email}},
    { $unwind : "$items" },{
     $group:
         {
           "_id": "$orderNo",
           "OrderDetails": { $push:  { OrderDetailID:"$items._id",OrderID: "$orderNo", "CustomerID": "$address.recipient_name" , ProductID:"$items.publisher",UnitPrice:"$items.price",Quantity:"$items.quantity",Discount:"0"} }
         }
     },{$project:{
         _id:0,
          OrderID:"$_id",
          OrderDetails:"$OrderDetails"
     }}
    ], function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
         
        return res.status(200).json(result);
    });
}

// Get all orders for a publisher
// orders report
export function pubOrdersReport(req, res) {
    Order.aggregate([
    {$match:{'items.publisheruid' : req.user.email}},
    { $unwind : "$items" },
    {$project:{
         _id:0,
          OrderID:"$orderNo",
          CustomerID:"$address.recipient_name",
          ContactName:"$items.advertiser.email",
          Freight:"",
          ShipAddress:"$address.line1",
          OrderDate:"$created_at",
          ShippedDate:"$created_at",
          ShipCountry:"Zimbabwe",
          ShipCity:"$address.city",
          ShipName:"$address.recipient_name",
          EmployeeID:"$items.publisher",
          ShipVia:"1",
          ShipPostalCode:"$items.advertiser.email"
     }}
    ], function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
         
        return res.status(200).json(result);
    });
}


// Get all orders for a publisher
// Top Selling Product
export function pubTopSellingProducts(req, res) {
    Order.aggregate([
    {$match:{'items.publisheruid' : req.user.email}},
    {$unwind : "$items" },{ $project:{
         _id:0,
         Country:"Zimbabwe",
         ProductName:"$items.publisher",
         Date:"$created_at",
         Quantity:"$items.price"
     }}
    ], function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
         
        return res.status(200).json(result);
    });
}


// Get all orders for a publisher
// Count 
export function pubOrdersCount(req, res) {

   Order.find({'items.publisheruid' : req.user.email}).count().exec(function (err, count) {
      if(err) { return handleError(res, err); }
      return res.status(200).json([{count:count}]);
    });  
}

// Get all orders for a publisher
export function pubOrders(req, res) {
  Order.find({'items.publisheruid' : req.user.email},function (err, orders) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(orders);
  });
}

// Gets a list of Orders
export function index(req, res) {
  return Order.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Order from the DB
export function show(req, res) {
  return Order.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Order in the DB
export function create(req, res) {
  req.body.uid = req.user.email; // id change on every user creation hence email is used
  var shortId = require('shortid');
  req.body.orderNo = shortId.generate();

  // When order.status is null, the client will replace with the Array[0] of order status at Settings page
  return Order.create(req.body)
    .then(orderPlaced(res, 201))
    .catch(handleError(res));
}

// Updates an existing Order in the DB
export function update(req, res) {
  
  if(req.body._id) { delete req.body._id; }
  if(req.body.__v) { delete req.body.__v; }
  return Order.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(orderUpdated(res))
    .catch(handleError(res));
}

// Deletes a Order from the DB
export function destroy(req, res) {
  return Order.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
