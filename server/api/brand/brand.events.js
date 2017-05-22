/**
 * Brand model events
 */

'use strict';

import {EventEmitter} from 'events';
import Brand from './brand.model';
var BrandEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
BrandEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Brand.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    BrandEvents.emit(event + ':' + doc._id, doc);
    BrandEvents.emit(event, doc);
  }
}

export default BrandEvents;
