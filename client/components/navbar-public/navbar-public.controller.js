'use strict';

class NavbarPublicController {
  constructor(ToggleComponent, Auth, $attrs, Settings, $scope,$rootScope, $location, Cart, Category, Brand,$q, Product, $state, $timeout,$log) {
    var vm = this;
    
    /* autocomplete */
    vm.simulateQuery      = true;
    vm.isDisabled         = false;
    vm.products           = [];
    vm.querySearch        = querySearch;
    vm.selectedItemChange = selectedItemChange;
    vm.searchTextChange   = searchTextChange;
    vm.cart = Cart.cart;
    
    // ******************************
    // Internal methods
    // ******************************
    /**
     * Search for products... use $timeout to simulate
     * remote dataservice call.
     */
    vm.categories = Category();
    vm.Settings = Settings;
    vm.cart.getBestShipper(Settings.country).$promise.then(function(data){
      vm.shipping = data[0]
      vm.totalPriceAfterShipping = vm.cartTotal + data[0].charge;
    })

    function querySearch (input) {
        var data = [];
        if (input){
            input = input.toLowerCase();
            data =  Product.query({where:{nameLower: {'$regex': input}, active:true}, limit:10, skip:0, select: {id: 1, name:1, slug: 1}});
        }
        return data;
    }
    function searchTextChange(text) {
    //   $log.info('Text changed to ' + text);
    }

    function selectedItemChange(item) {
      $state.go('single-product', {id:item._id, slug:item.slug}, {reload: false});
    }
    
    /**
     * Create filter function for a query string
     */
    
    
    vm.isLoggedIn = Auth.isLoggedIn;
    vm.openFilter = function(){
      ToggleComponent('filtermenu').open();
    };
    vm.openCart = function(){
      ToggleComponent('cart').open();
    };
    var originatorEv;
    vm.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
    
    vm.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    vm.brands = Brand.query({active:true});

    vm.isCollapsed = true;
    vm.isCollapsed1 = true;
    vm.getCurrentUser = Auth.getCurrentUser;

    vm.getQuantity = function(sku){
        for(var i = 0;i<vm.cart.items.length;i++){
            if(vm.cart.items[i].sku === sku){
              return vm.cart.items[i].quantity;
            }
        }
    };

    vm.getQuantity = function(sku){
        for(var i = 0;i<vm.cart.items.length;i++){
            if(vm.cart.items[i].sku === sku){
              return vm.cart.items[i].quantity;
            }
        }
    };
    vm.toggle = function (item, list) {
      if(angular.isUndefined(list)) list = [];
      var idx = list.indexOf(item);
      if (idx > -1) list.splice(idx, 1);
      else list.push(item);
      vm.filter();
    };

    vm.categories = Category.query();

   vm.close = function () {
       ToggleComponent('cart').close();
   }
  }
}

angular.module('mediaboxApp')
  .controller('NavbarPublicController', NavbarPublicController);
