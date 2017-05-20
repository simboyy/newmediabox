'use strict';

var express = require('express');
var controller = require('./wishlist.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/my', auth.attachUserInfo(), controller.my);
router.get('/', auth.hasRole('user'), controller.index);
router.get('/:id', controller.show);
router.post('/', auth.hasRole('user'), controller.createOrRemove);
router.put('/:id', auth.hasRole('manager'), controller.update);
router.patch('/:id', auth.hasRole('manager'), controller.update);
router.delete('/:id', auth.hasRole('user'), controller.destroy);

module.exports = router;
//# sourceMappingURL=index.js.map
