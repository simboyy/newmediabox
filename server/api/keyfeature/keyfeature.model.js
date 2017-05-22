'use strict';

import mongoose from 'mongoose';

var KeyFeatureSchema = new mongoose.Schema({
  key: String,
  val: String,
  info: String,
  active: Boolean
});

export default mongoose.model('KeyFeature', KeyFeatureSchema);
