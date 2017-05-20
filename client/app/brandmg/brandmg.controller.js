'use strict';

angular.module('mediaboxApp')
  .controller('BrandMGCtrl', function ($scope) {
    $scope.options = [
      {field: 'name'},
      {field: 'brand', dataType: 'number', heading: 'ID'},
      {field: 'image', dataType:'image'},
      {field: 'active', dataType: 'boolean'}
    ];
  });
