/**
 * Statistic model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _statistic = require('./statistic.model');

var _statistic2 = _interopRequireDefault(_statistic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StatisticEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
StatisticEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _statistic2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    StatisticEvents.emit(event + ':' + doc._id, doc);
    StatisticEvents.emit(event, doc);
  };
}

exports.default = StatisticEvents;
//# sourceMappingURL=statistic.events.js.map
