/**
 * Feature model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _feature = require('./feature.model');

var _feature2 = _interopRequireDefault(_feature);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FeatureEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
FeatureEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _feature2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    FeatureEvents.emit(event + ':' + doc._id, doc);
    FeatureEvents.emit(event, doc);
  };
}

exports.default = FeatureEvents;
//# sourceMappingURL=feature.events.js.map
