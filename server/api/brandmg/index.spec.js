'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var brandMGCtrlStub = {
  index: 'brandMGCtrl.index',
  show: 'brandMGCtrl.show',
  create: 'brandMGCtrl.create',
  update: 'brandMGCtrl.update',
  destroy: 'brandMGCtrl.destroy'
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
  './brandmg.controller': brandMGCtrlStub
});

describe('Brand API Router:', function() {

  it('should return an express router instance', function() {
    expect(brandIndex).to.equal(routerStub);
  });

  describe('GET /api/brandsmg', function() {

    it('should route to brandmg.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'brandMGCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/brandsmg/:id', function() {

    it('should route to brandmg.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'brandMGCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/brandsmg', function() {

    it('should route to brandmg.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'brandMGCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/brandsmg/:id', function() {

    it('should route to brandmg.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'brandNGCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/brandsmg/:id', function() {

    it('should route to brandmg.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'brandMGCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/brandsmg/:id', function() {

    it('should route to brandmg.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'brandMGCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
