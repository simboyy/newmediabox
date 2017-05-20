'use strict';

angular.module('mediaboxApp')
  .controller('FeatureCtrl', function ($scope) {
    $scope.options = [
      {field: 'key'},
      {field: 'val'},
      {field: 'active', dataType: 'boolean'}
    ];
  });
