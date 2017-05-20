'use strict';

describe('Service: lodash', function () {

  // load the service's module
  beforeEach(module('mediaboxApp'));

  // instantiate service
  var lodash;
  beforeEach(inject(function (_lodash_) {
    lodash = _lodash_;
  }));

  it('should do something', function () {
    expect(!!lodash).toBe(true);
  });

});
