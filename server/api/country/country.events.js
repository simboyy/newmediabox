/**
 * Country model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _country = require('./country.model');

var _country2 = _interopRequireDefault(_country);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CountryEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
CountryEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _country2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    CountryEvents.emit(event + ':' + doc._id, doc);
    CountryEvents.emit(event, doc);
  };
}

exports.default = CountryEvents;
//# sourceMappingURL=country.events.js.map
