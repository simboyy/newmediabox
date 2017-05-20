'use strict';

import mongoose from 'mongoose';

var FeatureSchema = new mongoose.Schema({
  key: String,
  val: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Feature', FeatureSchema);
