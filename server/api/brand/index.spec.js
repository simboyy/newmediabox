'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var brandCtrlStub = {
  index: 'brandCtrl.index',
  show: 'brandCtrl.show',
  create: 'brandCtrl.create',
  update: 'brandCtrl.update',
  destroy: 'brandCtrl.destroy'
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
  './brand.controller': brandCtrlStub
});

describe('Brand API Router:', function() {

  it('should return an express router instance', function() {
    expect(brandIndex).to.equal(routerStub);
  });

  describe('GET /api/brands', function() {

    it('should route to brand.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'brandCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/brands/:id', function() {

    it('should route to brand.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'brandCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/brands', function() {

    it('should route to brand.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'brandCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/brands/:id', function() {

    it('should route to brand.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'brandCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/brands/:id', function() {

    it('should route to brand.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'brandCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/brands/:id', function() {

    it('should route to brand.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'brandCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
