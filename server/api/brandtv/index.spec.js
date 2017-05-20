'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var brandTVCtrlStub = {
  index: 'brandTVCtrl.index',
  show: 'brandTVCtrl.show',
  create: 'brandTVCtrl.create',
  update: 'brandTVCtrl.update',
  destroy: 'brandTVCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var brandIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './brandtv.controller': brandTVCtrlStub
});

describe('brandtv API Router:', function() {

  it('should return an express router instance', function() {
    expect(brandIndex).to.equal(routerStub);
  });

  describe('GET /api/brandstv', function() {

    it('should route to brandtv.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'brandTVCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/brandstv/:id', function() {

    it('should route to brandtv.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'brandTVCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/brandstv', function() {

    it('should route to brandtv.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'brandTVCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/brandstv/:id', function() {

    it('should route to brandtv.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'brandTVCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/brandstv/:id', function() {

    it('should route to brandtv.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'brandTVCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/brandstv/:id', function() {

    it('should route to brandtv.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'brandTVCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
