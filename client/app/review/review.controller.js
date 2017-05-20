'use strict';

(function() {

class ReviewController {
    constructor() {
        this.options = [
            {field: 'pid', heading: 'Product ID'},
            {field: 'pname', heading: 'Product Name'},
            {field: 'reviewer'},
            {field: 'email'},
            {field: 'message'},
            {field: 'rating', dataType: 'number'},
            {field: 'created', dataType:'date'}
        ];       
    }
}

angular.module('mediaboxApp')
  .controller('ReviewController', ReviewController);

})();

