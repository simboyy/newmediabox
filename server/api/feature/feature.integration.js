'use strict';

var app = require('../..');
import request from 'supertest';

var newFeature;

describe('Feature API:', function() {

  describe('GET /api/features', function() {
    var features;

    beforeEach(function(done) {
      request(app)
        .get('/api/features')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          features = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(features).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/features', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/features')
        .send({
          name: 'New Feature',
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

    it('should respond with the newly created feature', function() {
      expect(newFeature.name).to.equal('New Feature');
      expect(newFeature.info).to.equal('This is the brand new feature!!!');
    });

  });

  describe('GET /api/features/:id', function() {
    var feature;

    beforeEach(function(done) {
      request(app)
        .get('/api/features/' + newFeature._id)
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

  describe('PUT /api/features/:id', function() {
    var updatedFeature;

    beforeEach(function(done) {
      request(app)
        .put('/api/features/' + newFeature._id)
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

  describe('DELETE /api/features/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/features/' + newFeature._id)
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
        .delete('/api/features/' + newFeature._id)
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
