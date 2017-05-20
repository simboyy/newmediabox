'use strict';

var app = require('../..');
import request from 'supertest';

var newCart;

describe('Cart API:', function() {

  describe('GET /api/cart', function() {
    var carts;

    beforeEach(function(done) {
      request(app)
        .get('/api/cart')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          carts = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(carts).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/cart', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/cart')
        .send({
          name: 'New Cart',
          info: 'This is the brand new cart!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newCart = res.body;
          done();
        });
    });

    it('should respond with the newly created cart', function() {
      expect(newCart.name).to.equal('New Cart');
      expect(newCart.info).to.equal('This is the brand new cart!!!');
    });

  });

  describe('GET /api/cart/:id', function() {
    var cart;

    beforeEach(function(done) {
      request(app)
        .get('/api/cart/' + newCart._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          cart = res.body;
          done();
        });
    });

    afterEach(function() {
      cart = {};
    });

    it('should respond with the requested cart', function() {
      expect(cart.name).to.equal('New Cart');
      expect(cart.info).to.equal('This is the brand new cart!!!');
    });

  });

  describe('PUT /api/cart/:id', function() {
    var updatedCart;

    beforeEach(function(done) {
      request(app)
        .put('/api/cart/' + newCart._id)
        .send({
          name: 'Updated Cart',
          info: 'This is the updated cart!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCart = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCart = {};
    });

    it('should respond with the updated cart', function() {
      expect(updatedCart.name).to.equal('Updated Cart');
      expect(updatedCart.info).to.equal('This is the updated cart!!!');
    });

  });

  describe('DELETE /api/cart/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/cart/' + newCart._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when cart does not exist', function(done) {
      request(app)
        .delete('/api/cart/' + newCart._id)
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
