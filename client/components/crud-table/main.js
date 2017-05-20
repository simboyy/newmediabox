(function () {
	'use strict';

	angular
		.module('mediaboxApp')
		.config(mainRoute);
	mainRoute.$inject = ['$stateProvider'];
  function mainRoute($stateProvider, $stateParams) {
    $stateProvider
      .state('crud-table', {
        url: '/crud-table/:api',
        params: {options: null, columns: null},
        views: {
          '' : {
            templateUrl: 'components/crud-table/main.html',
            controller: 'CrudTableMainController as main'
          },
          'content@crud-table': {
            url: '/content',
            templateUrl: 'components/crud-table/list.html',
            controller: 'CrudTableListController as list'
          }
        }
      })
      .state('detail', {
        url: '/detail/:id',
        onEnter: onEnterUserListDetail, // To open right sidebar
        params: {data: null},
        parent: 'crud-table',
        views:{
          '' : {
            templateUrl: 'components/crud-table/main.html'
          },
          'detail': {
            templateUrl: 'components/crud-table/detail.html',
            controller: 'CrudTableDetailController as detail'
          }
        }
      }).state('create', {
        url: '/create',
        parent: 'crud-table',
        params: {data: null},
				views:{
          '' : {
          }
				}
      });
  }
  function resolveIdFromArray($stateParams) {
    return {'_id': $stateParams.id, 'api': $stateParams.api};
  }

	onEnterUserListDetail.$inject = ['$timeout', 'ToggleComponent'];

	function onEnterUserListDetail($timeout, ToggleComponent) {
		$timeout(showDetails, 0, false);
		function showDetails() {
			ToggleComponent('crud-table.detailView').open();
		}
	}
  })();
