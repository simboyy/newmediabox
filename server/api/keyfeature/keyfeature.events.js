/**
 * Feature model events
 */

'use strict';

import {EventEmitter} from 'events';
import KeyFeature from './keyfeature.model';
var KeyFeatureEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
KeyFeatureEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  KeyFeature.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    KeyFeatureEvents.emit(event + ':' + doc._id, doc);
    KeyFeatureEvents.emit(event, doc);
  }
}

export default KeyFeatureEvents;
