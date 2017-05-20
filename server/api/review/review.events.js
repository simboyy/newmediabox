/**
 * Review model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _review = require('./review.model');

var _review2 = _interopRequireDefault(_review);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReviewEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
ReviewEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _review2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    ReviewEvents.emit(event + ':' + doc._id, doc);
    ReviewEvents.emit(event, doc);
  };
}

exports.default = ReviewEvents;
//# sourceMappingURL=review.events.js.map
