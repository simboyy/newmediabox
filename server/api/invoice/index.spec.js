'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var invoiceCtrlStub = {
  index: 'invoiceCtrl.index',
  show: 'invoiceCtrl.show',
  create: 'invoiceCtrl.create',
  update: 'invoiceCtrl.update',
  destroy: 'invoiceCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var invoiceIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './invoice.controller': invoiceCtrlStub
});

describe('Invoice API Router:', function() {

  it('should return an express router instance', function() {
    expect(invoiceIndex).to.equal(routerStub);
  });

  describe('GET /api/invoices', function() {

    it('should route to invoice.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'invoiceCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/invoices/:id', function() {

    it('should route to invoice.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'invoiceCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/invoices', function() {

    it('should route to invoice.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'invoiceCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/invoices/:id', function() {

    it('should route to invoice.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'invoiceCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/invoices/:id', function() {

    it('should route to invoice.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'invoiceCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/invoices/:id', function() {

    it('should route to invoice.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'invoiceCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
