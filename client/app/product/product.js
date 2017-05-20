'use strict';

angular.module('mediaboxApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('product', {
        url: '/product',
        params: {options: null, columns: null},
        views: {
          '' : {
            templateUrl: 'app/product/main.html',
            controller: 'ProductsMainController as main'
          },
          'content@product': {
            url: '/content',
            templateUrl: 'app/product/list.html',
            controller: 'ProductsListController as list'
          }
        },
            authenticate: 'manager'
      })
      .state('product-detail', {
        url: '/product-detail/:id',
        onEnter: onEnterUserListDetail, // To open right sidebar
        params: {products: null, categories: null, brands: null,brandmgs: null,brandtvs: null,features: null ,keyfeatures: null,statistics: null},
        parent: 'product',
        views:{
          '' : {
            templateUrl: 'app/product/main.html'
          },
          'detail': {
            templateUrl: 'app/product/detail.html',
            controller: 'ProductsDetailController as detail'
          }
        },
        authenticate: 'manager'
      }).state('products-create', {
        url: '/products-create',
        parent: 'products',
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
        ToggleComponent('products.detailView').open();
      }
    }
  });
