'use strict';

var app = require('../..');
import request from 'supertest';

var newPaymentMethod;

describe('PaymentMethod API:', function() {

  describe('GET /api/PaymentMethods', function() {
    var PaymentMethods;

    beforeEach(function(done) {
      request(app)
        .get('/api/PaymentMethods')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          PaymentMethods = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(PaymentMethods).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/PaymentMethods', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/PaymentMethods')
        .send({
          name: 'New PaymentMethod',
          info: 'This is the brand new PaymentMethod!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newPaymentMethod = res.body;
          done();
        });
    });

    it('should respond with the newly created PaymentMethod', function() {
      expect(newPaymentMethod.name).to.equal('New PaymentMethod');
      expect(newPaymentMethod.info).to.equal('This is the brand new PaymentMethod!!!');
    });

  });

  describe('GET /api/PaymentMethods/:id', function() {
    var PaymentMethod;

    beforeEach(function(done) {
      request(app)
        .get('/api/PaymentMethods/' + newPaymentMethod._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          PaymentMethod = res.body;
          done();
        });
    });

    afterEach(function() {
      PaymentMethod = {};
    });

    it('should respond with the requested PaymentMethod', function() {
      expect(PaymentMethod.name).to.equal('New PaymentMethod');
      expect(PaymentMethod.info).to.equal('This is the brand new PaymentMethod!!!');
    });

  });

  describe('PUT /api/PaymentMethods/:id', function() {
    var updatedPaymentMethod;

    beforeEach(function(done) {
      request(app)
        .put('/api/PaymentMethods/' + newPaymentMethod._id)
        .send({
          name: 'Updated PaymentMethod',
          info: 'This is the updated PaymentMethod!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPaymentMethod = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPaymentMethod = {};
    });

    it('should respond with the updated PaymentMethod', function() {
      expect(updatedPaymentMethod.name).to.equal('Updated PaymentMethod');
      expect(updatedPaymentMethod.info).to.equal('This is the updated PaymentMethod!!!');
    });

  });

  describe('DELETE /api/PaymentMethods/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/PaymentMethods/' + newPaymentMethod._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when PaymentMethod does not exist', function(done) {
      request(app)
        .delete('/api/PaymentMethods/' + newPaymentMethod._id)
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
