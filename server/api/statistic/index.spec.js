'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var statisticCtrlStub = {
  index: 'statisticCtrl.index',
  show: 'statisticCtrl.show',
  create: 'statisticCtrl.create',
  update: 'statisticCtrl.update',
  destroy: 'statisticCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var statisticIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './statistic.controller': statisticCtrlStub
});

describe('statistic API Router:', function() {

  it('should return an express router instance', function() {
    expect(statisticIndex).to.equal(routerStub);
  });

  describe('GET /api/statistics', function() {

    it('should route to statistic.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'statisticCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/statistics/:id', function() {

    it('should route to statistic.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'statisticCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/statistics', function() {

    it('should route to statistic.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'statisticCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/statistics/:id', function() {

    it('should route to statistic.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'statisticCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/statistics/:id', function() {

    it('should route to statistic.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'statisticCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/statistics/:id', function() {

    it('should route to statistic.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'statisticCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
