(function () {
	'use strict';

	angular
		.module('mediaboxApp')
		.controller('LeftMenuController', LeftMenuController);

	LeftMenuController.$inject = ['Auth', '$mdSidenav', '$log', '$timeout', '$scope', 'Settings', '$mdMedia'];

	function LeftMenuController(Auth, $mdSidenav, $log, $timeout, $scope, Settings, $mdMedia) {
		var vm = this;
		// $scope.$watch(function() { return $mdMedia('lg'); }, function(big) {
	  //   vm.bigScreen = big;
	  // });

		vm.logout = Auth.logout;
		vm.isLoggedIn = Auth.isLoggedIn;
		vm.currentUser = Auth.getCurrentUser();
        vm.hasRole = Auth.hasRole;
		vm.menu = Settings.menu;
       vm.toggleLeft = buildDelayedToggler('left');
		vm.toggleRight = buildToggler('right');
		vm.isOpenLeft = function(){
		  return $mdSidenav('left').isOpen();
		};
		vm.isOpenRight = function(){
		  return $mdSidenav('right').isOpen();
		};
		/**
		 * Supplies a function that will continue to operate until the
		 * time is up.
		 */
		function debounce(func, wait, context) {
		  var timer;
		  return function debounced() {
		    var context = $scope,
		        args = Array.prototype.slice.call(arguments);
		    $timeout.cancel(timer);
		    timer = $timeout(function() {
		      timer = undefined;
		      func.apply(context, args);
		    }, wait || 10);
		  };
		}
		/**
		 * Build handler to open/close a SideNav; when animation finishes
		 * report completion in console
		 */
		function buildDelayedToggler(navID) {
		  return debounce(function() {
		    $mdSidenav(navID)
		      .toggle()
		      .then(function () {
		        $log.debug('toggle ' + navID + ' is done');
		      });
		  }, 200);
		}
		function buildToggler(navID) {
		  return function() {
		    $mdSidenav(navID)
		      .toggle()
		      .then(function () {
		        $log.debug('toggle ' + navID + ' is done');
		      });
		  }
		}
	}
})();
