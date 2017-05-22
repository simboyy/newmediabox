'use strict';

var app = require('../..');
import request from 'supertest';

var newFeature;

describe('KeyFeature API:', function() {

  describe('GET /api/keyfeatures', function() {
    var keyfeatures;

    beforeEach(function(done) {
      request(app)
        .get('/api/keyfeatures')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          keyfeatures = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(keyfeatures).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/keyfeatures', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/keyfeatures')
        .send({
          name: 'New KeyFeature',
          info: 'This is the brand new feature!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newFeature = res.body;
          done();
        });
    });

    it('should respond with the newly created KeyFeature', function() {
      expect(newFeature.name).to.equal('New KeyFeature');
      expect(newFeature.info).to.equal('This is the brand new KeyFeature!!!');
    });

  });

  describe('GET /api/keyfeatures/:id', function() {
    var keyfeature;

    beforeEach(function(done) {
      request(app)
        .get('/api/keyfeatures/' + newFeature._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          feature = res.body;
          done();
        });
    });

    afterEach(function() {
      feature = {};
    });

    it('should respond with the requested feature', function() {
      expect(feature.name).to.equal('New Feature');
      expect(feature.info).to.equal('This is the brand new feature!!!');
    });

  });

  describe('PUT /api/keyfeatures/:id', function() {
    var updatedFeature;

    beforeEach(function(done) {
      request(app)
        .put('/api/keyfeatures/' + newFeature._id)
        .send({
          name: 'Updated Feature',
          info: 'This is the updated feature!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedFeature = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedFeature = {};
    });

    it('should respond with the updated feature', function() {
      expect(updatedFeature.name).to.equal('Updated Feature');
      expect(updatedFeature.info).to.equal('This is the updated feature!!!');
    });

  });

  describe('DELETE /api/keyfeatures/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/keyfeatures/' + newFeature._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when feature does not exist', function(done) {
      request(app)
        .delete('/api/keyfeatures/' + newFeature._id)
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
