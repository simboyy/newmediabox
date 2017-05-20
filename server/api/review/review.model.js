'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema,
    ObjectId = Schema.ObjectId;

var ReviewSchema = new _mongoose2.default.Schema({
  pid: ObjectId,
  pname: String,
  pslug: String,
  reviewer: String, // Required as we are not joining with the User table
  email: String, // Required as we are not joining with the User table
  message: String,
  rating: Number,
  active: { type: Boolean, default: true },
  created: { type: Date, default: Date.now }
});

exports.default = _mongoose2.default.model('Review', ReviewSchema);
//# sourceMappingURL=review.model.js.map
