'use strict';

import {Router} from 'express';
import * as controller from './media.controller';
import * as auth from '../../auth/auth.service';

var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();
var router = new Router();

router.use(multiparty({ uploadDir: './client/uploads' }));


router.get('/my', auth.isAuthenticated() , controller.myMedia);
router.get('/pub', auth.isAuthenticated() , controller.pubMedia);
router.post('/', auth.isAuthenticated(), multipartyMiddleware, controller.create);
router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.put('/my/:id', auth.isAuthenticated(), controller.mediaUpdate);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;
