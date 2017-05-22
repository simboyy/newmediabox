'use strict';

var _express = require('express');

var _media = require('./media.controller');

var controller = _interopRequireWildcard(_media);

var _auth = require('../../auth/auth.service');

var auth = _interopRequireWildcard(_auth);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();
var router = new _express.Router();

router.use(multiparty({ uploadDir: './client/uploads' }));

router.get('/my', auth.isAuthenticated(), controller.myMedia);
router.get('/pub', auth.isAuthenticated(), controller.pubMedia);
router.post('/', auth.isAuthenticated(), multipartyMiddleware, controller.create);
router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.put('/my/:id', auth.isAuthenticated(), controller.mediaUpdate);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;
//# sourceMappingURL=index.js.map
