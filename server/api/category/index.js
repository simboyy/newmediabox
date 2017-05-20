'use strict';

var express = require('express');
var controller = require('./category.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/path/:category', controller.path);
router.get('/all', controller.all);
router.get('/loaded', controller.loaded);
router.get('/tree', controller.oldTree);
router.get('/blind', controller.blind);
router.get('/:id', controller.show);
router.post('/', auth.hasRole('manager'), controller.create);
router.put('/:id', auth.hasRole('manager'), controller.update);
router.patch('/:id', auth.hasRole('manager'), controller.updateOne);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;
//# sourceMappingURL=index.js.map
