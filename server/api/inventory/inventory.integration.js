'use strict';

var app = require('../..');
import request from 'supertest';

var newInventory;

describe('Inventory API:', function() {

  describe('GET /api/inventory', function() {
    var inventory;

    beforeEach(function(done) {
      request(app)
        .get('/api/inventory')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          inventory = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(inventory).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/inventory', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/inventory')
        .send({
          name: 'New Inventory',
          info: 'This is the brand new inventory!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newInventory = res.body;
          done();
        });
    });

    it('should respond with the newly created inventory', function() {
      expect(newInventory.name).to.equal('New Inventory');
      expect(newInventory.info).to.equal('This is the brand new inventory!!!');
    });

  });

  describe('GET /api/inventory/:id', function() {
    var inventory;

    beforeEach(function(done) {
      request(app)
        .get('/api/inventory/' + newInventory._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          inventory = res.body;
          done();
        });
    });

    afterEach(function() {
      inventory = {};
    });

    it('should respond with the requested inventory', function() {
      expect(inventory.name).to.equal('New Inventory');
      expect(inventory.info).to.equal('This is the brand new inventory!!!');
    });

  });

  describe('PUT /api/inventory/:id', function() {
    var updatedInventory;

    beforeEach(function(done) {
      request(app)
        .put('/api/inventory/' + newInventory._id)
        .send({
          name: 'Updated Inventory',
          info: 'This is the updated inventory!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedInventory = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedInventory = {};
    });

    it('should respond with the updated inventory', function() {
      expect(updatedInventory.name).to.equal('Updated Inventory');
      expect(updatedInventory.info).to.equal('This is the updated Inventory!!!');
    });

  });

  describe('DELETE /api/inventory/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/inventory/' + newInventory._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when inventory does not exist', function(done) {
      request(app)
        .delete('/api/inventory/' + newInventory._id)
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
