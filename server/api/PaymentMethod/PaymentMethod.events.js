/**
 * PaymentMethod model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _PaymentMethod = require('./PaymentMethod.model');

var _PaymentMethod2 = _interopRequireDefault(_PaymentMethod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PaymentMethodEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
PaymentMethodEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _PaymentMethod2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    PaymentMethodEvents.emit(event + ':' + doc._id, doc);
    PaymentMethodEvents.emit(event, doc);
  };
}

exports.default = PaymentMethodEvents;
//# sourceMappingURL=PaymentMethod.events.js.map
