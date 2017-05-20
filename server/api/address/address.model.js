'use strict';

import mongoose from 'mongoose';
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    
var AddressSchema = new mongoose.Schema({
  email: String,
  name: String,
  address: String,
  city: String,
  state: String,
  country: Object,
  zip: Number,
  phone: String,
  active: { type: Boolean, default: true },
  uid: { type: ObjectId, ref: 'User' }
},
{
    timestamps: true
});

// AddressSchema.pre('save', function(done) {
//   this.updatedAt = Date.now();
//   done();
// });

export default mongoose.model('Address', AddressSchema);
