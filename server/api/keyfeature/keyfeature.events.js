/**
 * Feature model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _keyfeature = require('./keyfeature.model');

var _keyfeature2 = _interopRequireDefault(_keyfeature);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KeyFeatureEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
KeyFeatureEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _keyfeature2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    KeyFeatureEvents.emit(event + ':' + doc._id, doc);
    KeyFeatureEvents.emit(event, doc);
  };
}

exports.default = KeyFeatureEvents;
//# sourceMappingURL=keyfeature.events.js.map
