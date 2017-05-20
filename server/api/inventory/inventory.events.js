/**
 * Inventory model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _inventory = require('./inventory.model');

var _inventory2 = _interopRequireDefault(_inventory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InventoryEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
InventoryEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _inventory2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    InventoryEvents.emit(event + ':' + doc._id, doc);
    InventoryEvents.emit(event, doc);
  };
}

exports.default = InventoryEvents;
//# sourceMappingURL=inventory.events.js.map
