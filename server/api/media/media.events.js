/**
 * Media model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _media = require('./media.model');

var _media2 = _interopRequireDefault(_media);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MediaEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
MediaEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _media2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    MediaEvents.emit(event + ':' + doc._id, doc);
    MediaEvents.emit(event, doc);
  };
}

exports.default = MediaEvents;
//# sourceMappingURL=media.events.js.map
