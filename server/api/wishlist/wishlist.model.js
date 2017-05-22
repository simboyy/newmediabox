'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema,
    ObjectId = Schema.ObjectId;

var WishlistSchema = new _mongoose2.default.Schema({
  product: { _id: ObjectId, name: String, slug: String, keyFeatures: [] },
  variant: { _id: ObjectId, size: String, weight: String, price: Number, mrp: Number, image: String },
  uid: ObjectId, name: String, email: String,
  created: { type: Date, default: Date.now }
});

exports.default = _mongoose2.default.model('Wishlist', WishlistSchema);
//# sourceMappingURL=wishlist.model.js.map
