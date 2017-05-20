'use strict';

var app = require('../..');
import request from 'supertest';

var newInvoice;

describe('Invoice API:', function() {

  describe('GET /api/invoices', function() {
    var invoices;

    beforeEach(function(done) {
      request(app)
        .get('/api/invoices')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          invoices = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(invoices).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/invoices', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/invoices')
        .send({
          name: 'New Invoice',
          info: 'This is the brand new invoice!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newInvoice = res.body;
          done();
        });
    });

    it('should respond with the newly created invoice', function() {
      expect(newInvoice.name).to.equal('New Invoice');
      expect(newInvoice.info).to.equal('This is the brand new invoice!!!');
    });

  });

  describe('GET /api/invoices/:id', function() {
    var invoice;

    beforeEach(function(done) {
      request(app)
        .get('/api/invoices/' + newInvoice._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          invoice = res.body;
          done();
        });
    });

    afterEach(function() {
      invoice = {};
    });

    it('should respond with the requested invoice', function() {
      expect(invoice.name).to.equal('New Invoice');
      expect(invoice.info).to.equal('This is the brand new invoice!!!');
    });

  });

  describe('PUT /api/invoices/:id', function() {
    var updatedInvoice;

    beforeEach(function(done) {
      request(app)
        .put('/api/invoices/' + newInvoice._id)
        .send({
          name: 'Updated Invoice',
          info: 'This is the updated invoice!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedInvoice = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedInvoice = {};
    });

    it('should respond with the updated invoice', function() {
      expect(updatedInvoice.name).to.equal('Updated Invoice');
      expect(updatedInvoice.info).to.equal('This is the updated invoice!!!');
    });

  });

  describe('DELETE /api/invoices/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/invoices/' + newInvoice._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when invoice does not exist', function(done) {
      request(app)
        .delete('/api/invoices/' + newInvoice._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
