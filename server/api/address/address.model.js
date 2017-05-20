'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema,
    ObjectId = Schema.ObjectId;

var AddressSchema = new _mongoose2.default.Schema({
    email: String,
    name: String,
    address: String,
    city: String,
    state: String,
    country: Object,
    zip: Number,
    phone: String,
    active: { type: Boolean, default: true },
    uid: { type: ObjectId, ref: 'User' }
}, {
    timestamps: true
});

// AddressSchema.pre('save', function(done) {
//   this.updatedAt = Date.now();
//   done();
// });

exports.default = _mongoose2.default.model('Address', AddressSchema);
//# sourceMappingURL=address.model.js.map
