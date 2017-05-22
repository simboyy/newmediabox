'use strict';

import mongoose from 'mongoose';

var CountrySchema = new mongoose.Schema({
  name: String,
  dial_code: String,
  code: String,
  active:{ type: Boolean, default: true }
});

export default mongoose.model('Country', CountrySchema);
