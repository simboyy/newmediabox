'use strict';

import mongoose from 'mongoose';

var MediaSchema = new mongoose.Schema({
  originalFilename: String,
  path: String,
  size: String,
  type: String,
  name: String,
  uid:  String ,
  pub: Array,
  active: Boolean,
  created_at: {type: Date, default: Date.now},
});

export default mongoose.model('Media', MediaSchema);
