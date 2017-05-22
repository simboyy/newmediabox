'use strict';

var app = require('../..');
import request from 'supertest';

var newPay;

describe('Pay API:', function() {
  describe('GET /api/pay', function() {
    var pays;

    beforeEach(function(done) {
      request(app)
        .get('/api/pay')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          pays = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(pays).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/pay', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/pay')
        .send({
          name: 'New Pay',
          info: 'This is the brand new pay!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newPay = res.body;
          done();
        });
    });

    it('should respond with the newly created pay', function() {
      expect(newPay.name).to.equal('New Pay');
      expect(newPay.info).to.equal('This is the brand new pay!!!');
    });
  });

  describe('GET /api/pay/:id', function() {
    var pay;

    beforeEach(function(done) {
      request(app)
        .get(`/api/pay/${newPay._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          pay = res.body;
          done();
        });
    });

    afterEach(function() {
      pay = {};
    });

    it('should respond with the requested pay', function() {
      expect(pay.name).to.equal('New Pay');
      expect(pay.info).to.equal('This is the brand new pay!!!');
    });
  });

  describe('PUT /api/pay/:id', function() {
    var updatedPay;

    beforeEach(function(done) {
      request(app)
        .put(`/api/pay/${newPay._id}`)
        .send({
          name: 'Updated Pay',
          info: 'This is the updated pay!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedPay = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPay = {};
    });

    it('should respond with the original pay', function() {
      expect(updatedPay.name).to.equal('New Pay');
      expect(updatedPay.info).to.equal('This is the brand new pay!!!');
    });

    it('should respond with the updated pay on a subsequent GET', function(done) {
      request(app)
        .get(`/api/pay/${newPay._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let pay = res.body;

          expect(pay.name).to.equal('Updated Pay');
          expect(pay.info).to.equal('This is the updated pay!!!');

          done();
        });
    });
  });

  describe('PATCH /api/pay/:id', function() {
    var patchedPay;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/pay/${newPay._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Pay' },
          { op: 'replace', path: '/info', value: 'This is the patched pay!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedPay = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedPay = {};
    });

    it('should respond with the patched pay', function() {
      expect(patchedPay.name).to.equal('Patched Pay');
      expect(patchedPay.info).to.equal('This is the patched pay!!!');
    });
  });

  describe('DELETE /api/pay/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/pay/${newPay._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when pay does not exist', function(done) {
      request(app)
        .delete(`/api/pay/${newPay._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
