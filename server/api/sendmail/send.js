'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.send = send;
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
// html to text plugin 
var htmlToText = require('nodemailer-html-to-text').htmlToText;

function send(req) {
    var options = {
        auth: {
            api_key: process.env.SENDGRID_APIKEY
        }
    };

    var mailer = nodemailer.createTransport(sgTransport(options));
    mailer.sendMail(req, function (error, info) {

        var res = {};
        if (error) {
            res = { status: 408, err: error };
            console.log(error);
        } else {
            res = { status: 200, success: true };
            console.log(res);
            console.log(info);
        }
        return res;
    });
}
//# sourceMappingURL=send.js.map
