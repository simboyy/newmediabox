'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema,
    ObjectId = Schema.ObjectId;
var CategorySchema = new _mongoose2.default.Schema({
  name: String,
  category: Number,
  parent: { type: ObjectId, ref: 'Category' },
  child: [{ type: ObjectId, ref: 'Category' }],
  active: { type: Boolean, default: true },
  uid: String,
  img: String,
  top: Boolean,
  updated: { type: Date, default: Date.now },
  slug: String,
  products: [],
  sub_categories: [{}]
});

exports.default = _mongoose2.default.model('Category', CategorySchema);
//# sourceMappingURL=category.model.js.map
