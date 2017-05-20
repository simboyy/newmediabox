/**
 * Order model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _order = require('./order.model');

var _order2 = _interopRequireDefault(_order);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OrderEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
OrderEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _order2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    OrderEvents.emit(event + ':' + doc._id, doc);
    OrderEvents.emit(event, doc);
  };
}

exports.default = OrderEvents;
//# sourceMappingURL=order.events.js.map
