'use strict';

import mongoose from 'mongoose';

var InvoiceSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Invoice', InvoiceSchema);
