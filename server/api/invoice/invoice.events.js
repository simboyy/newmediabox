/**
 * Invoice model events
 */

'use strict';

import {EventEmitter} from 'events';
import Invoice from './invoice.model';
var InvoiceEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
InvoiceEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Invoice.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    InvoiceEvents.emit(event + ':' + doc._id, doc);
    InvoiceEvents.emit(event, doc);
  }
}

export default InvoiceEvents;
