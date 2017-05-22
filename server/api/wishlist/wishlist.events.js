/**
 * Wishlist model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _wishlist = require('./wishlist.model');

var _wishlist2 = _interopRequireDefault(_wishlist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WishlistEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
WishlistEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _wishlist2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    WishlistEvents.emit(event + ':' + doc._id, doc);
    WishlistEvents.emit(event, doc);
  };
}

exports.default = WishlistEvents;
//# sourceMappingURL=wishlist.events.js.map
