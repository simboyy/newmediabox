/**
 * Socket.io configuration
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = function (socketio) {
  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"

  // We can authenticate socket.io users and access their token through socket.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  // socketio.use(require('socketio-jwt').authorize({
  //   secret: config.secrets.session,
  //   handshake: true
  // }));

  socketio.on('connection', function (socket) {
    socket.address = socket.request.connection.remoteAddress + ':' + socket.request.connection.remotePort;

    socket.connectedAt = new Date();

    socket.log = function () {
      var _console;

      for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
        data[_key] = arguments[_key];
      }

      (_console = console).log.apply(_console, ['SocketIO ' + socket.nsp.name + ' [' + socket.address + ']'].concat(data));
    };

    // Call onDisconnect.
    socket.on('disconnect', function () {
      onDisconnect(socket);
      socket.log('DISCONNECTED');
    });

    // Call onConnect.
    onConnect(socket);
    socket.log('CONNECTED');
  });
};

var _environment = require('./environment');

var _environment2 = _interopRequireDefault(_environment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// When the user disconnects.. perform this
function onDisconnect(socket) {}

// When the user connects.. perform this
function onConnect(socket) {
  // When the client emits 'info', this listens and executes
  socket.on('info', function (data) {
    socket.log((0, _stringify2.default)(data, null, 2));
  });

  // Insert sockets below
  require('../api/review/review.socket').register(socket);
  require('../api/wishlist/wishlist.socket').register(socket);
  require('../api/pay/pay.socket').register(socket);
  require('../api/shipping/shipping.socket').register(socket);
  require('../api/setting/setting.socket').register(socket);
  require('../api/product/product.socket').register(socket);
  require('../api/PaymentMethod/PaymentMethod.socket').register(socket);
  require('../api/order/order.socket').register(socket);
  require('../api/campaign/campaign.socket').register(socket);
  require('../api/media/media.socket').register(socket);
  require('../api/invoice/invoice.socket').register(socket);
  require('../api/feature/feature.socket').register(socket);
  require('../api/statistic/statistic.socket').register(socket);
  require('../api/coupon/coupon.socket').register(socket);
  require('../api/country/country.socket').register(socket);
  require('../api/category/category.socket').register(socket);
  require('../api/cart/cart.socket').register(socket);
  require('../api/brand/brand.socket').register(socket);
  require('../api/brandmg/brandmg.socket').register(socket);
  require('../api/brandtv/brandtv.socket').register(socket);
  require('../api/address/address.socket').register(socket);
  require('../api/user/user.socket').register(socket);
}
//# sourceMappingURL=socketio.js.map
