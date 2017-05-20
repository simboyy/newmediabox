'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var featureCtrlStub = {
  index: 'keyFeatureCtrl.index',
  show: 'keyFeatureCtrl.show',
  create: 'keyFeatureCtrl.create',
  update: 'keyFeatureCtrl.update',
  destroy: 'keyFeatureCtrl.destroy'
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
  './keyfeature.controller': keyFeatureCtrlStub
});

describe('Feature API Router:', function() {

  it('should return an express router instance', function() {
    expect(featureIndex).to.equal(routerStub);
  });

  describe('GET /api/keyfeatures', function() {

    it('should route to keyfeature.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'keyFeatureCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/keyfeatures/:id', function() {

    it('should route to keyfeature.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'keyFeatureCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/keyfeatures', function() {

    it('should route to keyfeature.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'keyFeatureCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/keyfeatures/:id', function() {

    it('should route to keyfeature.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'keyFeatureCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/keyfeatures/:id', function() {

    it('should route to keyfeature.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'keyFeatureCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/keyfeatures/:id', function() {

    it('should route to keyfeature.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'keyFeatureCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
