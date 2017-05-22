/**
 * Campaign model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _campaign = require('./campaign.model');

var _campaign2 = _interopRequireDefault(_campaign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CampaignEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
CampaignEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _campaign2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    CampaignEvents.emit(event + ':' + doc._id, doc);
    CampaignEvents.emit(event, doc);
  };
}

exports.default = CampaignEvents;
//# sourceMappingURL=campaign.events.js.map
