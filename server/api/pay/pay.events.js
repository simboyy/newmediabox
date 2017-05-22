/**
 * Pay model events
 */

'use strict';

import {EventEmitter} from 'events';
import Pay from './pay.model';
var PayEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PayEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Pay.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    PayEvents.emit(event + ':' + doc._id, doc);
    PayEvents.emit(event, doc);
  };
}

export default PayEvents;
