'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var PaymentMethodCtrlStub = {
  index: 'PaymentMethodCtrl.index',
  show: 'PaymentMethodCtrl.show',
  create: 'PaymentMethodCtrl.create',
  update: 'PaymentMethodCtrl.update',
  destroy: 'PaymentMethodCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var PaymentMethodIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './PaymentMethod.controller': PaymentMethodCtrlStub
});

describe('PaymentMethod API Router:', function() {

  it('should return an express router instance', function() {
    expect(PaymentMethodIndex).to.equal(routerStub);
  });

  describe('GET /api/PaymentMethods', function() {

    it('should route to PaymentMethod.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'PaymentMethodCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/PaymentMethods/:id', function() {

    it('should route to PaymentMethod.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'PaymentMethodCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/PaymentMethods', function() {

    it('should route to PaymentMethod.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'PaymentMethodCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/PaymentMethods/:id', function() {

    it('should route to PaymentMethod.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'PaymentMethodCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/PaymentMethods/:id', function() {

    it('should route to PaymentMethod.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'PaymentMethodCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/PaymentMethods/:id', function() {

    it('should route to PaymentMethod.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'PaymentMethodCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
