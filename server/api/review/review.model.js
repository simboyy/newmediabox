'use strict';

import mongoose from 'mongoose';
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    
var ReviewSchema = new mongoose.Schema({
  pid: ObjectId,
  pname: String,
  pslug: String,
  reviewer: String, // Required as we are not joining with the User table
  email: String, // Required as we are not joining with the User table
  message: String,
  rating: Number,
  active: { type: Boolean, default: true },
  created: {type: Date, default: Date.now}
});

export default mongoose.model('Review', ReviewSchema);
