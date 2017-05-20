'use strict';

angular.module('mediaboxApp')
  .controller('KeyFeatureCtrl', function ($scope) {
    $scope.options = [
      {field: 'key'},
      {field: 'val'},
      {field: 'active', dataType: 'boolean'}
    ];
  });
