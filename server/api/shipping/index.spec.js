'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var shippingCtrlStub = {
  index: 'shippingCtrl.index',
  show: 'shippingCtrl.show',
  create: 'shippingCtrl.create',
  update: 'shippingCtrl.update',
  destroy: 'shippingCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var shippingIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './shipping.controller': shippingCtrlStub
});

describe('Shipping API Router:', function() {

  it('should return an express router instance', function() {
    expect(shippingIndex).to.equal(routerStub);
  });

  describe('GET /api/shippings', function() {

    it('should route to shipping.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'shippingCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/shippings/:id', function() {

    it('should route to shipping.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'shippingCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/shippings', function() {

    it('should route to shipping.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'shippingCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/shippings/:id', function() {

    it('should route to shipping.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'shippingCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/shippings/:id', function() {

    it('should route to shipping.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'shippingCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/shippings/:id', function() {

    it('should route to shipping.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'shippingCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
