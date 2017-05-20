'use strict';
(function() {

function ProductsMainController(Modal, $stateParams) {
  var options = {api:'product'};
  var cols = [{field: 'sku', heading:'SKU'}, {field: 'name', heading: 'Name'}, {field: 'description', heading: 'Description', dataType: 'textarea'}];
  this.create = function(){
    Modal.show(cols,options);
  }
}

angular.module('mediaboxApp')
  .controller('ProductsMainController', ProductsMainController);

})();
