'use strict';

import mongoose from 'mongoose';
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    
var WishlistSchema = new mongoose.Schema({
  product: {_id: ObjectId, name: String, slug: String, keyFeatures: []},
  variant: {_id: ObjectId, size: String, weight: String, price: Number, mrp: Number, image: String},
  uid: ObjectId, name: String, email: String,
  created: {type: Date, default: Date.now}
});

export default mongoose.model('Wishlist', WishlistSchema);
