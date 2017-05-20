/**
 * Shipping model events
 */

'use strict';

import {EventEmitter} from 'events';
import Shipping from './shipping.model';
var ShippingEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ShippingEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Shipping.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ShippingEvents.emit(event + ':' + doc._id, doc);
    ShippingEvents.emit(event, doc);
  }
}

export default ShippingEvents;
