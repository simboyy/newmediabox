/**
 * Brand model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _brandtv = require('./brandtv.model');

var _brandtv2 = _interopRequireDefault(_brandtv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BrandTVEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
BrandTVEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _brandtv2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    BrandTVEvents.emit(event + ':' + doc._id, doc);
    BrandTVEvents.emit(event, doc);
  };
}

exports.default = BrandTVEvents;
//# sourceMappingURL=brandtv.events.js.map
