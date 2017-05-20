'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CountrySchema = new _mongoose2.default.Schema({
  name: String,
  dial_code: String,
  code: String,
  active: { type: Boolean, default: true }
});

exports.default = _mongoose2.default.model('Country', CountrySchema);
//# sourceMappingURL=country.model.js.map
