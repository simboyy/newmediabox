'use strict';

(function() {

    class CartController {
        constructor(ToggleComponent, $filter, $timeout, Media, Auth, Toast, Campaign, Settings, Cart, SweetAlert, Category, Brand, Product, Inventory, $state, $stateParams, $mdMedia, $mdDialog) {
            var vm = this;


            /* autocomplete */
            vm.simulateQuery      = true;
            vm.querySearch        = querySearch;
            vm.selectedItemChange = selectedItemChange;
            vm.searchTextChange   = searchTextChange;
            vm.products           = [];
            vm.product            = {};
            vm.product.variants   = [];
            vm.cart               = Cart.cart;
            vm.Settings           = Settings;
            vm.$mdMedia           = $mdMedia;
            vm.$filter            = $filter;
            vm.Media              = Media;
            this.Media            = Media;
            vm.Toast              = Toast;
            vm.loaded             = [];
            vm.available          = []; //store the inventory available for each item
            vm.notAvailable       = [];
            vm.notAvailableObj    = {};






            //console.log(vm.cart);
            // var productId = localStorage !== null ? localStorage.productId : null;

            if ($stateParams.search) // When searched print the search text inside search textbox 
                vm.searchText = $stateParams.name

            vm.cart.getBestShipper().$promise.then(function(data) {
                vm.shipping = data[0]
                vm.totalPriceAfterShipping = vm.cartTotal + data[0].charge;
            })

            vm.mediaLibrary = function(index) {
                $mdDialog.show({
                    template: `<md-dialog aria-label="Media Library" ng-cloak flex="95">
        <md-toolbar class="md-warn">
          <div class="md-toolbar-tools">
            <h2>Media Library</h2>
            <span flex></span>
            <md-button class="md-icon-button" ng-click="cancel()">
              <ng-md-icon icon="close" aria-label="Close dialog"></ng-md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-dialog-content>
            <div class="md-dialog-content"  class="md-whiteframe-z2">
                <md-grid-list class="media-list" md-cols-xs ="3" md-cols-sm="4" md-cols-md="5" md-cols-lg="7" md-cols-gt-lg="10" md-row-height-gt-md="1:1" md-row-height="4:3" md-gutter="12px" md-gutter-gt-sm="8px" layout="row" layout-align="center center">
                  <md-grid-tile ng-repeat="i in media" class="md-whiteframe-z2" ng-click="ok(i.path)">
                    <div class="thumbnail">
                        <img ng-src="{{i.path}}" draggable="false" alt="{{i.name}}">
                    </div>
                    <md-grid-tile-footer><h3>{{i.name}}</h3></md-grid-tile-footer>
                  </md-grid-tile>
                </md-grid-list>
          </div>
        </md-dialog-content>
        <md-dialog-actions layout="row">
          <span flex></span>
          <md-button ng-click="addNewImage()" class="md-warn md-raised">
           Add new Image
          </md-button>
        </md-dialog-actions>
      </md-dialog>
`,
                    controller: function($scope, $mdDialog, $http, socket, $state) {
                        // Start query the database for the table
                        var vm = this
                        $scope.loading = true;
                        $http.get('/api/media/').then(function(res) {
                            $scope.loading = false;
                            $scope.media = res.data;
                            socket.syncUpdates('media', $scope.data);
                        }, handleError);

                        function handleError(error) { // error handler
                            $scope.loading = false;
                            if (error.status === 403) {
                                Toast.show({
                                    type: 'error',
                                    text: 'Not authorised to make changes.'
                                });
                            } else {
                                Toast.show({
                                    type: 'error',
                                    text: error.status
                                });
                            }
                        }
                        $scope.ok = function(path) {
                            $mdDialog.hide(path);
                        }
                        $scope.hide = function() {
                            $mdDialog.hide();
                        };
                        $scope.cancel = function() {
                            $mdDialog.cancel();
                        };
                        $scope.addNewImage = function() {
                            $state.go('media');
                            //vm.save(vm.product)
                            $mdDialog.hide();
                        }
                    }

                }).then(function(answer) {
                    //console.log(answer);
                    if (index === 1000000)
                        vm.cart.items.push({ size: 'x', creative: answer })
                    else
                        vm.cart.items[index].creative = answer;
                }, function() {});
            }

            function querySearch(input, variant, index) {

                console.log(variant);


                //console.log(inpu
                vm.loaded[index] = false;

                var dateArray = input.split('-');
                var startDateTemp = new Date(dateArray[0]);
                var startDate = startDateTemp.toISOString();
                var endDateTemp = new Date(dateArray[1]);
                var endDate = endDateTemp.toISOString();

                var yyyyArray = dateArray[1].split('/');
                var data = [];



                if (input) {
                    data = Inventory.query({ where: { pname: variant.publisher, 'vname': variant.name, 'year': yyyyArray[2], 'startDate': { $lt: startDate }, 'endDate': { $gte: endDate } }, limit: 1, skip: 0, select: { 'available': 1 } }, function(res) {

                        console.log(res);

                        $timeout(function(argument) {

                            if (res[0]) {
                                if (res[0].available > 0) {
                                    vm.loaded[index]   = 'available';
                                    vm.available[index]= res[0].available;
                                    if(vm.notAvailable.indexOf(index) != -1){
                                        vm.notAvailable.remove(index);
                                    }
                                } else {
                                    vm.loaded[index]   = 'notavailable';
                                    vm.available[index]= 0;
                                    vm.notAvailable.push(index);
                                }
                            } else {
                                vm.loaded[index]    = 'notavailable';
                                vm.available[index]= 0;
                                vm.notAvailable.push(index);

                            }

                        }, 2000)

                    });
                }

                console.log(vm.notAvailable);
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


            vm.createCampaign = function(cart) {

                for (var i = 0; i < cart.items.length; i++) {
                    cart.items[i];
                    var dateArray = cart.items[i].category.split('-');
                    cart.items[i].startDate = dateArray[0];
                    cart.items[i].endDate = dateArray[1];

                }

                //console.log(cart);

                var newCampaign = {
                    campaignNo: cart.campaignNo,
                    cartName: cart.campaignName,
                    skuArray: cart.skuArray,
                    totalWeight: cart.totalWeight,
                    taxRate: cart.taxRate,
                    tax: cart.tax,
                    campaignName: cart.campaignName,
                    objective: cart.objective,
                    startDate: cart.startDate,
                    endDate: cart.endDate,
                    products: cart.products,
                    totalSpend: cart.totalSpend,
                    spendStats: cart.spendStats,
                    shipping: cart.shipping,
                    age: cart.age,
                    uid: cart.uid,
                    income: cart.income,
                    items: cart.items

                }


                //console.log(newCampaign);

                if (cart.campaignName == "") {

                    swal(
                        'Oops...',
                        'Campaign name  required!',
                        'error'
                    )

                } else {


                    var mytable = "<table class=\"table table-striped table-responsive\">" +
                        "<tr>" +
                        "<td class=\"col-sm-4\" style=\"text-align:left\">Publisher</td>" +
                        "<td class=\"col-sm-6\" style=\"text-align:left\">Ad Space</td>" +
                        //"<td class=\"col-sm-3\" style=\"text-align:left\">Dates</td>"+
                        "<td class=\"col-sm-1\" style=\"text-align:left\">Price</td>" +
                        "<td class=\"col-sm-1\" style=\"text-align:left\">Inserts</td>" +

                        "</tr></tbody>";

                    for (var i = 0; i < cart.items.length; i++) {


                        mytable += "<tr><td class=\"col-sm-4\" style=\"text-align:left\">" + cart.items[i].publisher + "</td>" +
                            "<td class=\"col-sm-6\" style=\"text-align:left\">" + cart.items[i].name + "</td>" +
                            // "<td class=\"col-sm-3\" style=\"text-align:left\">"+cart.items[i].category+"</td>"+
                            "<td class=\"col-sm-1\" style=\"text-align:left\">" + vm.Settings.currency.symbol + parseFloat(cart.items[i].price) + "</td>" +
                            "<td class=\"col-sm-1\" style=\"text-align:left\">" + cart.items[i].quantity + "</td>" +
                            "</tr>";
                    }


                    mytable += "<tr>" +
                        "<td class=\"col-sm-2\" style=\"text-align:left\">SubTotal</td>" +
                        "<td class=\"col-sm-4\" style=\"text-align:left\">" + vm.Settings.currency.symbol + parseFloat(cart.getTotalPrice()) + "</td>" +
                        "<td class=\"col-sm-4\" style=\"text-align:left\">&nbsp;</td>" +
                        "<td class=\"col-sm-1\" style=\"text-align:left\">&nbsp;</td>" +
                        "<td class=\"col-sm-1\" style=\"text-align:left\">&nbsp;</td></tr>";

                    mytable += "</tbody></table>";


                    swal({
                        title: 'Confirm to continue',
                        text: "A proposal will be send to the publisher(s)!",
                        type: 'warning',
                        html: mytable,
                        width: '600px',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, Continue!',
                        cancelButtonText: 'No, cancel!',
                        confirmButtonClass: 'btn btn-success',
                        cancelButtonClass: 'btn btn-danger',
                        buttonsStyling: false
                    }).then(function(vm) {
                        setTimeout(function(vm) {

                            swal("proposal Send!", "Your proposal has been send ,you will get response from the publisher within 7 working days!", "success");

                            var vm = this;
                            Campaign.save(newCampaign).$promise.then(function(res) {

                                var vm = this;
                                for (var i = 0; i < newCampaign.items.length; i++) {
                                    var vm = this;
                                    var item = newCampaign.items[i];

                                    //console.log(item);

                                    Media.update({ id: item.creative }, { pub: item.uid }).$promise.then(function(res) {}, function(error) {
                                        // error handler
                                        // 
                                        console.log(error);
                                        if (error.data.errors.status.message == 'not found') {
                                            Toast.show({
                                                type: 'error',
                                                text: "Creative not found"
                                            });
                                        } else if (error.data.errors) {
                                            Toast.show({
                                                type: 'error',
                                                text: error.data.errors.status.message
                                            });
                                        } else {
                                            Toast.show({
                                                type: 'success',
                                                text: error.statusText
                                            });
                                        }
                                    });

                                }



                                $state.go('campaign');

                            });

                        }, 2000);

                    }, function(dismiss) {
                        // dismiss can be 'cancel', 'overlay',
                        // 'close', and 'timer'
                        if (dismiss === 'cancel') {
                            swal("Cancelled", "Process cancelled :)", "error");
                        }
                    })




                }




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
                //   console.log(item,list);
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
        .controller('CartController', CartController);

})();
