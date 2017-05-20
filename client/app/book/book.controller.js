'use strict';

angular.module('mediaboxApp')
  .controller('BookCtrl', function ($scope) {
    $scope.options = [
      {field: 'image', heading: 'Image', dataType: 'image'},
      {field: 'name', title: 'Title', dataType: 'text'},
      {field: 'author', dataType: 'text'},
      {field: 'category', dataType: 'select', options: ['Fiction', 'Non fiction', 'Inspirational', 'Novel', 'Science', 'Story']},
      {field: 'price', dataType: 'currency'},
      {field: 'releaseDate', dataType: 'date'},
      {field: 'isbn', heading: 'ISBN', dataType: 'text', noEdit: true},
      {field: 'active', heading: 'Availability', dataType: 'boolean'}
    ];
  });
