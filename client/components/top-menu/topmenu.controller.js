'use strict';

class TopMenuController {
  constructor(ToggleComponent, Auth, $attrs, Settings,Category, LoginModal, CpModal, $state, $scope, $mdMedia) {
    var vm = this;
    vm.Auth = Auth
    vm.showDropdownMenu = false;
    vm.hasRole = Auth.hasRole;
    vm.isLoggedIn = Auth.isLoggedIn;
    vm.isAdmin = Auth.isAdmin;
    vm.$mdMedia = $mdMedia;
    vm.menu = Settings.menu;
    vm.categories = Category();
    var originatorEv;
    vm.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
    vm.showLogin = function () {
        LoginModal.show($state.current.name);
    }
    vm.showCp = function () {
        CpModal.show();
    }
  }
}

angular.module('mediaboxApp')
  .controller('TopMenuController', TopMenuController);
