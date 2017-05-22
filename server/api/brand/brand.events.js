/**
 * Brand model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _brand = require('./brand.model');

var _brand2 = _interopRequireDefault(_brand);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BrandEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
BrandEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _brand2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    BrandEvents.emit(event + ':' + doc._id, doc);
    BrandEvents.emit(event, doc);
  };
}

exports.default = BrandEvents;
//# sourceMappingURL=brand.events.js.map
