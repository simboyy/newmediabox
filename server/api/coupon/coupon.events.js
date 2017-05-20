/**
 * Coupon model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _coupon = require('./coupon.model');

var _coupon2 = _interopRequireDefault(_coupon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CouponEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
CouponEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _coupon2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    CouponEvents.emit(event + ':' + doc._id, doc);
    CouponEvents.emit(event, doc);
  };
}

exports.default = CouponEvents;
//# sourceMappingURL=coupon.events.js.map
