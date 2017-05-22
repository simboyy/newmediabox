'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OrderSchema = new _mongoose2.default.Schema({
  uid: String,
  email: String,
  phone: String,
  orderNo: String,
  campaignName: String,
  address: Object,
  payment: Object,
  amount: Object,
  exchange_rate: Number,
  items: [{ sku: String, name: String, size: String, url: String, quantity: Number, mrp: String, price: Number, image: String, category: String, advertiser: Object, publisher: String, publisheruid: String, uid: String, status: Object({ name: String, val: Number }) }],
  status: { type: String, default: 'Order Placed' },
  active: { type: Boolean, default: true },
  payment_method: String,
  created_at: { type: Date },
  updated_at: { type: Date }
});

OrderSchema.pre('save', function (next) {
  var now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

exports.default = _mongoose2.default.model('Order', OrderSchema);
//# sourceMappingURL=order.model.js.map
