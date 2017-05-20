'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BrandMGSchema = new _mongoose2.default.Schema({
  name: String,
  slug: String,
  info: String,
  parent: String,
  image: String,
  uid: String,
  brand: Number,
  active: { type: Boolean, default: true },
  updated: { type: Date, default: Date.now }
});

exports.default = _mongoose2.default.model('BrandMG', BrandMGSchema);
//# sourceMappingURL=brandmg.model.js.map
