'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MediaSchema = new _mongoose2.default.Schema({
  originalFilename: String,
  path: String,
  size: String,
  type: String,
  name: String,
  uid: String,
  pub: Array,
  active: Boolean,
  created_at: { type: Date, default: Date.now }
});

exports.default = _mongoose2.default.model('Media', MediaSchema);
//# sourceMappingURL=media.model.js.map
