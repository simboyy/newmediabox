'use strict';

var app = require('../..');
import request from 'supertest';

var newBrandTV;

describe('BrandTV API:', function() {

  describe('GET /api/brandstv', function() {
    var brandstv;

    beforeEach(function(done) {
      request(app)
        .get('/api/brandstv')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          brandstv = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(brandstv).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/brandstv', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/brandstv')
        .send({
          name: 'New Brand',
          info: 'This is the brand new brand!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newBrandTV = res.body;
          done();
        });
    });

    it('should respond with the newly created BrandTV', function() {
      expect(newBrandTV.name).to.equal('New BrandTV');
      expect(newBrandTV.info).to.equal('This is the brand new brand!!!');
    });

  });

  describe('GET /api/brandstv/:id', function() {
    var brand;

    beforeEach(function(done) {
      request(app)
        .get('/api/brandstv/' + newBrandTV._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          brand = res.body;
          done();
        });
    });

    afterEach(function() {
      brand = {};
    });

    it('should respond with the requested brand', function() {
      expect(brand.name).to.equal('New BrandTV');
      expect(brand.info).to.equal('This is the brand new brand!!!');
    });

  });

  describe('PUT /api/brandstv/:id', function() {
    var updatedBrandTV;

    beforeEach(function(done) {
      request(app)
        .put('/api/brandstv/' + newBrandTV._id)
        .send({
          name: 'Updated BrandTV',
          info: 'This is the updated brand!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedBrandTV = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBrandTV = {};
    });

    it('should respond with the updated brand', function() {
      expect(updatedBrandTV.name).to.equal('Updated BrandTV');
      expect(updatedBrandTV.info).to.equal('This is the updated BrandTV!!!');
    });

  });

  describe('DELETE /api/brandstv/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/brandstv/' + newBrandTV._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when brand does not exist', function(done) {
      request(app)
        .delete('/api/brandstv/' + newBrandTV._id)
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
