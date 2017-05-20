/**
 * Product model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _product = require('./product.model');

var _product2 = _interopRequireDefault(_product);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProductEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
ProductEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _product2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    ProductEvents.emit(event + ':' + doc._id, doc);
    ProductEvents.emit(event, doc);
  };
}

exports.default = ProductEvents;
//# sourceMappingURL=product.events.js.map
