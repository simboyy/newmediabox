'use strict';

var app = require('../..');
import request from 'supertest';

var newCountry;

describe('Country API:', function() {

  describe('GET /api/countries', function() {
    var countrys;

    beforeEach(function(done) {
      request(app)
        .get('/api/countries')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          countrys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(countrys).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/countries', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/countries')
        .send({
          name: 'New Country',
          info: 'This is the brand new country!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newCountry = res.body;
          done();
        });
    });

    it('should respond with the newly created country', function() {
      expect(newCountry.name).to.equal('New Country');
      expect(newCountry.info).to.equal('This is the brand new country!!!');
    });

  });

  describe('GET /api/countries/:id', function() {
    var country;

    beforeEach(function(done) {
      request(app)
        .get('/api/countries/' + newCountry._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          country = res.body;
          done();
        });
    });

    afterEach(function() {
      country = {};
    });

    it('should respond with the requested country', function() {
      expect(country.name).to.equal('New Country');
      expect(country.info).to.equal('This is the brand new country!!!');
    });

  });

  describe('PUT /api/countries/:id', function() {
    var updatedCountry;

    beforeEach(function(done) {
      request(app)
        .put('/api/countries/' + newCountry._id)
        .send({
          name: 'Updated Country',
          info: 'This is the updated country!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCountry = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCountry = {};
    });

    it('should respond with the updated country', function() {
      expect(updatedCountry.name).to.equal('Updated Country');
      expect(updatedCountry.info).to.equal('This is the updated country!!!');
    });

  });

  describe('DELETE /api/countries/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/countries/' + newCountry._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when country does not exist', function(done) {
      request(app)
        .delete('/api/countries/' + newCountry._id)
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
