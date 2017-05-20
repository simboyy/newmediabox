'use strict';

angular.module('mediaboxApp')
  .controller('CustomerCtrl', function ($scope) {
    $scope.options = [
      {field: 'photo', heading: 'Image', dataType: 'image'},
      {field: 'name', noSort: true, noEdit: true},
      {field: 'address', dataType: 'textarea'},
      {field: 'country', dataType: 'select', options: ['India', 'USA', 'Australlia', 'China', 'Japan']},
      {field: 'active', heading: 'Status', dataType: 'boolean'}
    ];
  });
