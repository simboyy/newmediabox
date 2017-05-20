/**
 * Inventory model events
 */

'use strict';

import {EventEmitter} from 'events';
import Inventory from './inventory.model';
var InventoryEvents = new EventEmitter();

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
  Inventory.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    InventoryEvents.emit(event + ':' + doc._id, doc);
    InventoryEvents.emit(event, doc);
  }
}

export default InventoryEvents;
