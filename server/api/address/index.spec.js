'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var addressCtrlStub = {
  index: 'addressCtrl.index',
  show: 'addressCtrl.show',
  create: 'addressCtrl.create',
  update: 'addressCtrl.update',
  destroy: 'addressCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var addressIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './address.controller': addressCtrlStub
});

describe('Address API Router:', function() {

  it('should return an express router instance', function() {
    expect(addressIndex).to.equal(routerStub);
  });

  describe('GET /api/address', function() {

    it('should route to address.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'addressCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/address/:id', function() {

    it('should route to address.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'addressCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/address', function() {

    it('should route to address.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'addressCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/address/:id', function() {

    it('should route to address.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'addressCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/address/:id', function() {

    it('should route to address.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'addressCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/address/:id', function() {

    it('should route to address.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'addressCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
