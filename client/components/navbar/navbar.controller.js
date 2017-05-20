'use strict';

class NavbarController {
    constructor(ToggleComponent, Auth, Settings, Cart, Category, Brand, Product, $state, $stateParams, $mdMedia) {
        var vm = this;

        /* autocomplete */
        vm.simulateQuery = true;
        vm.querySearch = querySearch;
        vm.selectedItemChange = selectedItemChange;
        vm.searchTextChange = searchTextChange;
        vm.products = [];
        vm.cart = Cart.cart;
        vm.Settings = Settings;
        vm.$mdMedia = $mdMedia;

        ////console.log(vm.cart);
        // var productId = localStorage !== null ? localStorage.productId : null;

        if ($stateParams.search) // When searched print the search text inside search textbox 
            vm.searchText = $stateParams.name

        vm.cart.getBestShipper().$promise.then(function(data) {
            vm.shipping = data[0]
            vm.totalPriceAfterShipping = vm.cartTotal + data[0].charge;
        })

        function querySearch(input) {
            var data = [];
            if (input) {
                input = input.toLowerCase();
                data = Product.query({ where: { nameLower: { '$regex': input }, active: true }, limit: 10, skip: 0, select: { id: 1, name: 1, slug: 1, 'variants.image': 1, logo: 1 } });


            }
            return data;
        }

        function selectedItemChange(item) {
            $state.go('single-product', { id: item._id, slug: item.slug, search: true, name: item.name }, { reload: false });
        }

        function searchTextChange() {

        }
        /**
         * Create filter function for a query string
         */

        vm.isLoggedIn = Auth.isLoggedIn;
        vm.openFilter = function() {
            ToggleComponent('filtermenu').open();
        };
        vm.openCart = function() {
            ToggleComponent('cart').open();
            vm.cart.getBestShipper().$promise.then(function(data) {
                vm.shipping = data[0]
                vm.totalPriceAfterShipping = vm.cartTotal + data[0].charge;
            })
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

        vm.brands = Brand.query({ active: true });

        vm.isCollapsed = true;
        vm.isCollapsed1 = true;
        vm.getCurrentUser = Auth.getCurrentUser;

        vm.gotoDetail = function(params) {
            $state.go('single-product', { id: params.sku, slug: params.slug }, { reload: false });
        }

        vm.getQuantity = function(sku) {
            for (var i = 0; i < vm.cart.items.length; i++) {
                if (vm.cart.items[i].sku === sku) {
                    return vm.cart.items[i].quantity;
                }
            }
        };

        vm.getQuantity = function(sku) {
            for (var i = 0; i < vm.cart.items.length; i++) {
                if (vm.cart.items[i].sku === sku) {
                    return vm.cart.items[i].quantity;
                }
            }
        };
        vm.toggle = function(item, list) {
            //   //console.log(item,list);
            if (angular.isUndefined(list)) list = [];
            var idx = list.indexOf(item);
            if (idx > -1) list.splice(idx, 1);
            else list.push(item);
            vm.filter();
        };

        vm.categories = Category.loaded.query();

        //console.log(vm.categories);

        vm.close = function() {
            ToggleComponent('cart').close();
        }

    }
}

angular.module('mediaboxApp')
    .controller('NavbarController', NavbarController);
