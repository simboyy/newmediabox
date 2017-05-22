'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ShippingSchema = new _mongoose2.default.Schema({
  name: String,
  info: String,
  carrier: String,
  country: String,
  charge: Number,
  minWeight: Number,
  maxWeight: Number,
  freeShipping: Number,
  active: Boolean
});

exports.default = _mongoose2.default.model('Shipping', ShippingSchema);
//# sourceMappingURL=shipping.model.js.map
