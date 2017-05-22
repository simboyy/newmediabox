/**
 * Setting model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _setting = require('./setting.model');

var _setting2 = _interopRequireDefault(_setting);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SettingEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
SettingEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _setting2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    SettingEvents.emit(event + ':' + doc._id, doc);
    SettingEvents.emit(event, doc);
  };
}

exports.default = SettingEvents;
//# sourceMappingURL=setting.events.js.map
