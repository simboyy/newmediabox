'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var featureCtrlStub = {
  index: 'featureCtrl.index',
  show: 'featureCtrl.show',
  create: 'featureCtrl.create',
  update: 'featureCtrl.update',
  destroy: 'featureCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var featureIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './feature.controller': featureCtrlStub
});

describe('Feature API Router:', function() {

  it('should return an express router instance', function() {
    expect(featureIndex).to.equal(routerStub);
  });

  describe('GET /api/features', function() {

    it('should route to feature.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'featureCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/features/:id', function() {

    it('should route to feature.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'featureCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/features', function() {

    it('should route to feature.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'featureCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/features/:id', function() {

    it('should route to feature.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'featureCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/features/:id', function() {

    it('should route to feature.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'featureCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/features/:id', function() {

    it('should route to feature.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'featureCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
