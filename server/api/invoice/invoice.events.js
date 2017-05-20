/**
 * Invoice model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _invoice = require('./invoice.model');

var _invoice2 = _interopRequireDefault(_invoice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InvoiceEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
InvoiceEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _invoice2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    InvoiceEvents.emit(event + ':' + doc._id, doc);
    InvoiceEvents.emit(event, doc);
  };
}

exports.default = InvoiceEvents;
//# sourceMappingURL=invoice.events.js.map
