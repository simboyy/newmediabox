/**
 * Pay model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _pay = require('./pay.model');

var _pay2 = _interopRequireDefault(_pay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PayEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
PayEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _pay2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    PayEvents.emit(event + ':' + doc._id, doc);
    PayEvents.emit(event, doc);
  };
}

exports.default = PayEvents;
//# sourceMappingURL=pay.events.js.map
