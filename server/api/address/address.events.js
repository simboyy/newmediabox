/**
 * Address model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _address = require('./address.model');

var _address2 = _interopRequireDefault(_address);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AddressEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
AddressEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _address2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    AddressEvents.emit(event + ':' + doc._id, doc);
    AddressEvents.emit(event, doc);
  };
}

exports.default = AddressEvents;
//# sourceMappingURL=address.events.js.map
