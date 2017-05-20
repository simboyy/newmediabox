'use strict';

var app = require('../..');
import request from 'supertest';

var newAddress;

describe('Address API:', function() {

  describe('GET /api/addres', function() {
    var addresss;

    beforeEach(function(done) {
      request(app)
        .get('/api/addres')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          addresss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(addresss).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/addres', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/addres')
        .send({
          name: 'New Address',
          info: 'This is the brand new address!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newAddress = res.body;
          done();
        });
    });

    it('should respond with the newly created address', function() {
      expect(newAddress.name).to.equal('New Address');
      expect(newAddress.info).to.equal('This is the brand new address!!!');
    });

  });

  describe('GET /api/addres/:id', function() {
    var address;

    beforeEach(function(done) {
      request(app)
        .get('/api/addres/' + newAddress._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          address = res.body;
          done();
        });
    });

    afterEach(function() {
      address = {};
    });

    it('should respond with the requested address', function() {
      expect(address.name).to.equal('New Address');
      expect(address.info).to.equal('This is the brand new address!!!');
    });

  });

  describe('PUT /api/addres/:id', function() {
    var updatedAddress;

    beforeEach(function(done) {
      request(app)
        .put('/api/addres/' + newAddress._id)
        .send({
          name: 'Updated Address',
          info: 'This is the updated address!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedAddress = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAddress = {};
    });

    it('should respond with the updated address', function() {
      expect(updatedAddress.name).to.equal('Updated Address');
      expect(updatedAddress.info).to.equal('This is the updated address!!!');
    });

  });

  describe('DELETE /api/addres/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/addres/' + newAddress._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when address does not exist', function(done) {
      request(app)
        .delete('/api/addres/' + newAddress._id)
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
