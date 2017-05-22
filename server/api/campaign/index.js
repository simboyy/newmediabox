'use strict';

var express = require('express');
var controller = require('./campaign.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/my', auth.isAuthenticated() , controller.myCampaigns);
router.get('/pub', auth.isAuthenticated() , controller.pubCampaigns);
router.get('/pubcalendar',auth.isAuthenticated()  ,controller.pubCampaignsCalendar);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.hasRole('manager'), controller.update);
router.patch('/:id', auth.hasRole('manager'), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;
