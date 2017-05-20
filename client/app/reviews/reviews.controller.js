'use strict';

(function() {

class ReviewsController {
    constructor() {
        this.options = [
            {field: 'pid', heading: 'Product ID'},
            {field: 'pname', heading: 'Product Name'},
            {field: 'reviewer'},
            {field: 'email'},
            {field: 'message'},
            {field: 'rating', dataType: 'number'},
            {field: 'created', dataType:'date'},
            {field: 'active', dataType: 'boolean'}
        ];       
    }
}

angular.module('mediaboxApp')
  .controller('ReviewsController', ReviewsController);

})();

