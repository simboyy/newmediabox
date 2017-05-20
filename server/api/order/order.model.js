'use strict';

import mongoose from 'mongoose';

var OrderSchema = new mongoose.Schema({
  uid: String,
  email: String,
  phone: String,
  orderNo: String,
  campaignName: String,
  address: Object,
  payment: Object,
  amount: Object,
  exchange_rate: Number,
  items: [{ sku: String, name: String, size: String, url: String ,quantity: Number, mrp: String, price: Number, image: String, category: String,  advertiser: Object , publisher:String, publisheruid:String ,uid:String,status: Object({ name: String, val: Number})}],
  status: {type: String, default: 'Order Placed'},
  active: { type: Boolean, default: true },
  payment_method: String,
  created_at    : { type: Date },
  updated_at    : { type: Date }
});




OrderSchema.pre('save', function(next){
  var now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

export default mongoose.model('Order', OrderSchema);


 