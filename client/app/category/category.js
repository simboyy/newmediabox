'use strict';

// angular.module('mediaboxApp')
//   .config(function ($stateProvider) {
//     $stateProvider
//       .state('category', {
//         url: '/category',
//         template: '<category></category>'
//       });
//   });



angular.module('mediaboxApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('category', {
        url: '/category',
        params: {options: null, columns: null},
        views: {
          '' : {
            templateUrl: 'app/category/main.html',
            controller: 'CategoriesMainController as main'
          },
          'content@category': {
            url: '/content',
            templateUrl: 'app/category/list.html',
            controller: 'CategoriesListController as list'
          }
        },
            authenticate: 'manager'
      })
      .state('category-detail', {
        url: '/category-detail/:id',
        onEnter: onEnterUserListDetail, // To open right sidebar
        params: {category: null, categories: null, brands: null, features: null},
        parent: 'category',
        views:{
          '' : {
            templateUrl: 'app/category/main.html'
          },
          'detail': {
            templateUrl: 'app/category/detail.html',
            controller: 'CategoriesDetailController as detail'
          }
        },
        authenticate: 'manager'
      }).state('categories-create', {
        url: '/categories-create',
        parent: 'categories',
        params: {data: null},
				views:{
          '' : {
          }
				},
        authenticate: 'manager'
      });
    function resolveIdFromArray($stateParams) {
      return {'_id': $stateParams.id, 'api': $stateParams.api};
    }

    onEnterUserListDetail.$inject = ['$timeout', 'ToggleComponent'];

    function onEnterUserListDetail($timeout, ToggleComponent) {
      $timeout(showDetails, 0, false);

      function showDetails() {
        ToggleComponent('categories.detailView').open();
      }
    }
  });
