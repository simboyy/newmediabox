'use strict';

var app = require('../..');
import request from 'supertest';

var newCampaign;

describe('Campaign API:', function() {

  describe('GET /api/campaigns', function() {
    var campaigns;

    beforeEach(function(done) {
      request(app)
        .get('/api/campaigns')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          campaigns = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(campaigns).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/campaigns', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/campaigns')
        .send({
          name: 'New campaign',
          info: 'This is the brand new campaign!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newcampaign = res.body;
          done();
        });
    });

    it('should respond with the newly created campaign', function() {
      expect(newCampaign.name).to.equal('New Campaign');
      expect(newCampaign.info).to.equal('This is the brand new campaign!!!');
    });

  });

  describe('GET /api/campaigns/:id', function() {
    var campaign;

    beforeEach(function(done) {
      request(app)
        .get('/api/campaigns/' + newCampaign._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          campaign = res.body;
          done();
        });
    });

    afterEach(function() {
      campaign = {};
    });

    it('should respond with the requested campaign', function() {
      expect(campaign.name).to.equal('New Campaign');
      expect(campaign.info).to.equal('This is the brand new campaign!!!');
    });

  });

  describe('PUT /api/campaigns/:id', function() {
    var updatedCampaign;

    beforeEach(function(done) {
      request(app)
        .put('/api/campaigns/' + newCampaign._id)
        .send({
          name: 'Updated Campaign',
          info: 'This is the updated campaign!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCampaign = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCampaign = {};
    });

    it('should respond with the updated campaign', function() {
      expect(updatedCampaign.name).to.equal('Updated Campaign');
      expect(updatedCampaign.info).to.equal('This is the updated campaign!!!');
    });

  });

  describe('DELETE /api/campaigns/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/campaigns/' + newCampaign._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when campaign does not exist', function(done) {
      request(app)
        .delete('/api/campaigns/' + newCampaign._id)
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
