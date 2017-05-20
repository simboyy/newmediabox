'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var wishlistCtrlStub = {
  index: 'wishlistCtrl.index',
  show: 'wishlistCtrl.show',
  create: 'wishlistCtrl.create',
  upsert: 'wishlistCtrl.upsert',
  patch: 'wishlistCtrl.patch',
  destroy: 'wishlistCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var wishlistIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './wishlist.controller': wishlistCtrlStub
});

describe('Wishlist API Router:', function() {
  it('should return an express router instance', function() {
    expect(wishlistIndex).to.equal(routerStub);
  });

  describe('GET /api/wishlists', function() {
    it('should route to wishlist.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'wishlistCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/wishlists/:id', function() {
    it('should route to wishlist.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'wishlistCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/wishlists', function() {
    it('should route to wishlist.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'wishlistCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/wishlists/:id', function() {
    it('should route to wishlist.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'wishlistCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/wishlists/:id', function() {
    it('should route to wishlist.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'wishlistCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/wishlists/:id', function() {
    it('should route to wishlist.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'wishlistCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
