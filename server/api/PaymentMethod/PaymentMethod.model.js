'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PaymentMethodSchema = new _mongoose2.default.Schema({
  name: String,
  email: String,
  options: Object,
  active: { type: Boolean, default: true }
});

exports.default = _mongoose2.default.model('PaymentMethod', PaymentMethodSchema);
//# sourceMappingURL=PaymentMethod.model.js.map
