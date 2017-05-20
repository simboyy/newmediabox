'use strict';

import mongoose from 'mongoose';

var SettingSchema = new mongoose.Schema({
  minOrderValue: Number,
  shippingCharge: Number
});

export default mongoose.model('Setting', SettingSchema);
