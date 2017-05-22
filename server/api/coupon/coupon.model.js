'use strict';

import mongoose from 'mongoose';

var CouponSchema = new mongoose.Schema({
  code: String,
  amount: Number,
  type: { type: String, default: 'Discount' },
  active: { type: Boolean, default: true },
  info: String,
  minimumCartValue: Number
});

export default mongoose.model('Coupon', CouponSchema);
