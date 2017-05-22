/**
 * BrandMP model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _brandmg = require('./brandmg.model');

var _brandmg2 = _interopRequireDefault(_brandmg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BrandMGEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
BrandMGEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _brandmg2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    BrandMGEvents.emit(event + ':' + doc._id, doc);
    BrandMGEvents.emit(event, doc);
  };
}

exports.default = BrandMGEvents;
//# sourceMappingURL=brandmg.events.js.map
