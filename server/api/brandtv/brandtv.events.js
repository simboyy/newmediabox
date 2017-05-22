/**
 * Brand model events
 */

'use strict';

import {EventEmitter} from 'events';
import BrandTV from './brandtv.model';
var BrandTVEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
BrandTVEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  BrandTV.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    BrandTVEvents.emit(event + ':' + doc._id, doc);
    BrandTVEvents.emit(event, doc);
  }
}

export default BrandTVEvents;
