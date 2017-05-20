'use strict';
(function() {

function CrudTableMainController(Modal, $stateParams) {
  var options = $stateParams.options;
  var cols = $stateParams.columns;
  this.create = function(){
    Modal.show(cols,options);
  }
}

angular.module('mediaboxApp')
  .controller('CrudTableMainController', CrudTableMainController);

})();
