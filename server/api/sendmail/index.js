'use strict';

var express = require('express');
var email = require('./send');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

var router = express.Router();
router.post('/', function (req, res) {
    var options = {
        auth: {
            api_key: process.env.SENDGRID_APIKEY
        }
    };

    var mailer = nodemailer.createTransport(sgTransport(options));
    mailer.sendMail(req.body, function (error, info) {
        if (error) {
            res.status('400').json({ err: error });
        } else {
            res.status('200').json({ success: true });
        }
    });
});

module.exports = router;
//# sourceMappingURL=index.js.map
