'use strict';

angular.module('mediaboxApp')
  .controller('ContactCtrl', function ($scope) {
    $scope.options = [
      {field: 'photo', dataType: 'image'},
      {field: 'name', noEdit: true},
      {field: 'email'},
      {field: 'phone'},
      {field: 'category', dataType: 'select', options: ['Family', 'Friends', 'Acquaintances', 'Services']},
      {field: 'active', dataType: 'boolean'}
    ];
  });
