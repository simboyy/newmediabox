/**
 * BrandMP model events
 */

'use strict';

import {EventEmitter} from 'events';
import brandMG from './brandmg.model';
var BrandMGEvents = new EventEmitter();

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
  brandMG.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    BrandMGEvents.emit(event + ':' + doc._id, doc);
    BrandMGEvents.emit(event, doc);
  }
}

export default BrandMGEvents;
