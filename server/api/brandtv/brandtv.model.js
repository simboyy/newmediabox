'use strict';

import mongoose from 'mongoose';

var BrandTVSchema = new mongoose.Schema({
  name: String,
  slug: String,
  info: String,
  parent: String,
  image: String,
  uid: String,
  brand: Number,
  active: { type: Boolean, default: true },
  updated: {type: Date, default: Date.now}
});

export default mongoose.model('BrandTV', BrandTVSchema);
