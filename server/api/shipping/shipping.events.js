/**
 * Shipping model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _shipping = require('./shipping.model');

var _shipping2 = _interopRequireDefault(_shipping);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ShippingEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
ShippingEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _shipping2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    ShippingEvents.emit(event + ':' + doc._id, doc);
    ShippingEvents.emit(event, doc);
  };
}

exports.default = ShippingEvents;
//# sourceMappingURL=shipping.events.js.map
