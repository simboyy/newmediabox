'use strict';

import mongoose from 'mongoose';
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    
var ProductSchema = new mongoose.Schema({
  sku:            String,
  name:           String,
  nameLower:      String,
  phone:          String,
  email:          String,
  slug:           String,
  logo:           Array,
  info:           String,
  website:        String,
  terms:          String,
  category:       { type: ObjectId, ref: 'Category' },
  status:         String,
  brand:          { type: ObjectId, ref: 'Brand' },
  description:    String,
  variants:       [{ image : String, sku: String, name : String, price : Number, size : String,model: String, maxSize : String, formart : String ,preview :Object ,stockLevel:Number,UnitsInStock:Number,UnitsOnOrder:Number,ReorderLevel:Number,slots:Array}],
  features:       Array,
  keyFeatures:    Array,
  stats:         [{key:String, val:String}],
  active:         { type: Boolean, default: true },
  uid:            String,
  created_at    : { type: Date },
  updated_at    : { type: Date, default: Date.now },
  updated:        {type: Date, default: Date.now}
}, { versionKey: false });


export default mongoose.model('Product', ProductSchema);
