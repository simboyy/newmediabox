'use strict';

angular.module('mediaboxApp')
  .controller('StatisticCtrl', function ($scope) {
    $scope.options = [
      {field: 'key'},
      {field: 'val'},
      {field: 'active', dataType: 'boolean'}
    ];
  });
