/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/Campaigns              ->  index
 * POST    /api/Campaigns              ->  create
 * GET     /api/Campaigns/:id          ->  show
 * PUT     /api/Campaigns/:id          ->  update
 * DELETE  /api/Campaigns/:id          ->  destroy
 */

'use strict';



import _ from 'lodash';
import Campaign from './campaign.model';
import * as config from '../../config/environment/shared'
import * as email from '../sendmail/send';
import Product from '../product/product.model';
import Order from '../order/order.model';
import Inventory from '../inventory/inventory.model';

var telerivet = require('telerivet');


function sendSMS(contact){
  
var API_KEY = 'm8DRXIAiyHEajBMZ0Kf6mAb6ZfUwtK5d';  // from https://telerivet.com/api/keys
var PROJECT_ID = 'PJ866bd4a877ff3d0e'; 

var tr = new telerivet.API(API_KEY);

var project = tr.initProjectById(PROJECT_ID); 

// send message

project.sendMessage({
    to_number: '+263773439246', 
    content: 'Hello from Mediabox!'
}, function(err, message) {
    if (err) throw err;
    //console.log(message);
});



}

function InventoryUpdate(res) {
  //console.log(res.req.body.items);
  var items = res.req.body.items;
  _.each(items,function(item){

            var startDateTemp = new Date(item.startDate);
            var startDate     =startDateTemp.toISOString();
            var endDateTemp   = new Date(item.endDate);
            var endDate       = endDateTemp.toISOString();
    
    var cdate = new Date();
    var yyyy  = cdate.getFullYear();
    var q     = { $and:[{ 'pname': item.publisher},{'vname':item.name},{'year':yyyy},{'startDate': { $lt: startDate}} , {'endDate': { $gte: endDate }}]};

    console.log(q);
     Inventory.findOneAndUpdate(q, { $inc: { "available": -1 } }, {upsert: false, setDefaultsOnInsert: true, runValidators: true}).exec()
  })
    
}



function CampaignPlaced(res, statusCode) {
  res.req.body.to = res.req.body.email;
   email.send(config.mailOptions.CampaignPlaced(res.req.body))

  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function CampaignUpdated(res, statusCode) {
  email.send(config.mailOptions.CampaignUpdated(res.req.body))

  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
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

  //console.log(updates);


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

// Get all Campaigns by a user
export function myCampaigns(req, res) {
  function isJson(str) {
  try {
      str = JSON.parse(str);
  } catch (e) {
      str = str;
  }
  return str
}
  var q = isJson(req.query.where);
  //console.log(q);

  Campaign.find(q,function (err, campaigns) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(campaigns);
  });
}


// Get all campaigns for a publisher
// List all advertising spaces

export function pubCampaignsCalendar(req, res) {
   Order.aggregate([
      {$unwind:"$items"},
      {$project: { _id:0, title: "name",start: "$items.startDate",end: "$items.endDate",allDay:false}}
    ], function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
         
        return res.status(200).json(result);
    });
}


// Get all Campaigns by a publisher
export function pubCampaigns(req, res) {
   function isJson(str) {
  try {
      str = JSON.parse(str);
  } catch (e) {
      str = str;
  }
  return str
}
  var q = isJson(req.query.where);
  //console.log(q);

  Campaign.find(q,function (err, campaigns) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(campaigns);
  });
}

// Gets a list of Campaigns
export function index(req, res) {
  return Campaign.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Campaign from the DB
export function show(req, res) {
  return Campaign.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Campaign in the DB
export function create(req, res) {
  req.body.uid = req.user.email; // id change on every user creation hence email is used
  var shortId = require('shortid');
  req.body.campaignNo = shortId.generate();

  // When Campaign.status is null, the client will replace with the Array[0] of Campaign status at Settings page
  return Campaign.create(req.body)
    .then(CampaignPlaced(res, 201))
    .then(InventoryUpdate(res))
    .catch(handleError(res));
}

// Updates an existing Campaign in the DB
export function update(req, res) {
  if(req.body._id) { delete req.body._id; }
  if(req.body.__v) { delete req.body.__v; }
  //console.log(req.body);

  if(!req.body.status){ 

    Campaign.update( 
    { _id: req.params.id , "items.name": req.body.items.name  }, 
    { $set: { "items.$.price": req.body.items.price ,  "items.$.category": req.body.items.category ,  "items.$.quantity": req.body.items.quantity } }
    ).exec()
    .then(handleEntityNotFound(res))
    .then(CampaignUpdated(res))
    .catch(handleError(res));
  }else if(req.body.status){
  return Campaign.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(CampaignUpdated(res))
    .catch(handleError(res));
}

}

// Deletes a Campaign from the DB
export function destroy(req, res) {
  return Campaign.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
