'use strict';

var express = require('express');
var controller = require('./order.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/my', auth.isAuthenticated() , controller.myOrders);
router.get('/mycount', auth.isAuthenticated() , controller.myOrdersCount);
router.get('/pub', auth.isAuthenticated() , controller.pubOrders);
router.get('/pubcount', auth.isAuthenticated() , controller.pubOrdersCount);
router.get('/countycustomers', auth.isAuthenticated() , controller.pubCountryCustomers);
router.get('/customers', auth.isAuthenticated() , controller.pubCustomers);
router.get('/productsales', auth.isAuthenticated() , controller.pubProductSales);
router.get('/productsalescalendar', auth.isAuthenticated() , controller.pubProductSalesCalendar);
router.get('/productsalesreport', auth.isAuthenticated() , controller.pubProductSalesReport);
router.get('/productaveragesales', auth.isAuthenticated() , controller.pubProductAverageSales);
router.get('/productquarterlysales', auth.isAuthenticated() , controller.pubProductQuartelySales);
router.get('/orderdetails', auth.isAuthenticated() , controller.pubOrderDetails);
router.get('/orderinformation', auth.isAuthenticated() , controller.pubOrderInformation);
router.get('/orders', auth.isAuthenticated() , controller.pubOrdersReport);
router.get('/topsellingproducts', auth.isAuthenticated() , controller.pubTopSellingProducts);
router.get('/', controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;
