'use strict';

var express = require('express');
var controller = require('./product.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/count', controller.count);
router.get('/productlist',auth.isAuthenticated(), controller.productList);
router.get('/productlistvalues',auth.isAuthenticated(), controller.productList2);
router.get('/productdetails', auth.isAuthenticated(),controller.productDetails);
router.get('/priceRange', controller.priceRange);
router.get('/:id', controller.show);
router.post('/', auth.hasRole('admin'), controller.create);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.patch('/:id', auth.hasRole('admin'), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;
