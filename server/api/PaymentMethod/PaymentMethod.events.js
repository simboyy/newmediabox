/**
 * PaymentMethod model events
 */

'use strict';

import {EventEmitter} from 'events';
import PaymentMethod from './PaymentMethod.model';
var PaymentMethodEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PaymentMethodEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  PaymentMethod.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    PaymentMethodEvents.emit(event + ':' + doc._id, doc);
    PaymentMethodEvents.emit(event, doc);
  }
}

export default PaymentMethodEvents;
