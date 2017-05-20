'use strict';

import mongoose from 'mongoose';

var ShippingSchema = new mongoose.Schema({
  name: String,
  info: String,
  carrier: String,
  country: String,
  charge: Number,
  minWeight: Number,
  maxWeight: Number,
  freeShipping: Number,
  active: Boolean
});

export default mongoose.model('Shipping', ShippingSchema);
