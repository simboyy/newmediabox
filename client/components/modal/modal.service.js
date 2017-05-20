(function () {
	'use strict';

	angular
		.module('mediaboxApp')
		.factory('Modal', Modal)
		.controller('ModalController', ModalController);

	// Modal.$inject = ['$mdDialog', '$state'];
	// ModalController.$inject = ['$mdDialog', 'Toast', '$http', 'options', 'cols', 'Settings', '$filter'];

	function Modal($mdDialog, $state) {

var obj = {};
obj.show = function(cols,options){
	$mdDialog.show({
		controller: 'ModalController as create',
		templateUrl: 'components/modal/create.html',
		clickOutsideToClose: false,
		locals: {cols: cols,options: options}
	}).then(transitionTo, transitionTo);
};

return obj;
}

function transitionTo(answer) {
	// return $state.go('detail', { location: false });
}


function ModalController($mdDialog, Toast, $http, options, cols, Settings, $filter) {
	var vm = this;
	vm.create = createUser;
	vm.close = hideDialog;
	vm.cancel = cancelDialog;
	vm.options = options;
	vm.options.columns = cols;
	vm.title = options.api;
	function createUser(form) {
		// refuse to work with invalid cols
		if (vm.item._id || (form && !form.$valid)) {
			return;
		}
		// 
		// $http.post('/api/sendmail', {
		// 	from: 'Biri.in <codenxg@gmail.com>',
	  //   to: '2lessons@gmail.com',
	  //   subject: 'Message from Biri.in',
	  //   text: vm.item.title
		// });

		$http.post('/api/'+$filter('pluralize')(options.api), vm.item)
		.then(createUserSuccess)
		.catch(createUserCatch);
		function createUserSuccess(response) {
			var item = vm.item = response.data;
			Toast.show({
	      type: 'success',
	      text: 'New '+options.api+' saved successfully.'
	    });
			vm.close();
		}

		function createUserCatch(err) {
			// if (form && err) {
			// 	form.setResponseErrors(err);
			// }

			Toast.show({
				type: 'warn',
				text: 'Error while creating new '+options.api
			});
		}
	}

	function hideDialog() {
		$mdDialog.hide();
	}

	function cancelDialog() {
		$mdDialog.cancel();
	}
}


})();
