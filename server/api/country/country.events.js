/**
 * Country model events
 */

'use strict';

import {EventEmitter} from 'events';
import Country from './country.model';
var CountryEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CountryEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Country.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    CountryEvents.emit(event + ':' + doc._id, doc);
    CountryEvents.emit(event, doc);
  }
}

export default CountryEvents;
