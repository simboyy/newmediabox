'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema,
    ObjectId = Schema.ObjectId;

var InventorySchema = new _mongoose2.default.Schema({
  productid: { type: ObjectId, ref: 'Product' },
  pname: String,
  variant: Object,
  vname: String,
  year: Number,
  startDate: Date,
  endDate: Date,
  available: Number,
  active: Boolean
});

exports.default = _mongoose2.default.model('Inventory', InventorySchema);
//# sourceMappingURL=inventory.model.js.map
