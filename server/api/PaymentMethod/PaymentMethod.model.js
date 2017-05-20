'use strict';

import mongoose from 'mongoose';

var PaymentMethodSchema = new mongoose.Schema({
  name: String,
  email: String,
  options: Object,
  active: {type: Boolean, default:true}
});

export default mongoose.model('PaymentMethod', PaymentMethodSchema);
