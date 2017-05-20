'use strict';

import mongoose from 'mongoose';

var PaySchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Pay', PaySchema);
