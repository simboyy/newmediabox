/**
 * Statistic model events
 */

'use strict';

import {EventEmitter} from 'events';
import Statistic from './statistic.model';
var StatisticEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
StatisticEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Statistic.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    StatisticEvents.emit(event + ':' + doc._id, doc);
    StatisticEvents.emit(event, doc);
  }
}

export default StatisticEvents;
