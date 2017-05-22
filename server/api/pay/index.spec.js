'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var payCtrlStub = {
  index: 'payCtrl.index',
  show: 'payCtrl.show',
  create: 'payCtrl.create',
  upsert: 'payCtrl.upsert',
  patch: 'payCtrl.patch',
  destroy: 'payCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var payIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './pay.controller': payCtrlStub
});

describe('Pay API Router:', function() {
  it('should return an express router instance', function() {
    expect(payIndex).to.equal(routerStub);
  });

  describe('GET /api/pay', function() {
    it('should route to pay.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'payCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/pay/:id', function() {
    it('should route to pay.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'payCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/pay', function() {
    it('should route to pay.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'payCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/pay/:id', function() {
    it('should route to pay.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'payCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/pay/:id', function() {
    it('should route to pay.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'payCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/pay/:id', function() {
    it('should route to pay.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'payCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
