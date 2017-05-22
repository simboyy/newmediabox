'use strict';

import mongoose from 'mongoose';

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var InventorySchema = new mongoose.Schema({
  productid:{ type: ObjectId, ref: 'Product' },
  pname:String,
  variant:Object,
  vname:String,
  year: Number,
  startDate:Date,
  endDate:Date,
  available:Number,
  active: Boolean
});

export default mongoose.model('Inventory', InventorySchema);
