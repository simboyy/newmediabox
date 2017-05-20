'use strict';
(function() {

    function ProductsDetailController($http, $state, Toast, Inventory, $stateParams, ToggleComponent, Settings, $mdDialog, socket, $scope) {
        var vm = this;
        this.Inventory = Inventory;
        vm.myDate = new Date();
        vm.header = 'product';

        vm.product = {};
        vm.options = {};
        vm.product.variants = [];
        vm.product.variants.slots = [];
        vm.product.newVariant = {};
        vm.product.newVariant.slots = [];
        vm.product.features = [];
        vm.product.stats = [];
        vm.product.keyFeatures = [];
        vm.unsavedProduct = $stateParams.products;
        vm.product = angular.copy($stateParams.products);
        vm.options.categories = angular.copy($stateParams.categories);

        $scope.$watch('vm.product.category', function(newValue) {
            console.log(vm.product.category);
            if (typeof(newValue) != "string") {
                console.log(vm.product.category);

            }
        });

        if (vm.product.category == '582597286bf2000d54ac92fa' || vm.product.category == '5825972f6bf2000d54ac92fb' || vm.product.category == '582597976bf2000d54ac9304') {
            vm.options.brands = $stateParams.brandtvs;
        } else if (vm.product.category == '582597646bf2000d54ac9300' || vm.product.category == '5825976d6bf2000d54ac9301') {
            vm.options.brands = $stateParams.brandmgs;
        } else {
            vm.options.brands = angular.copy($stateParams.brands);
        }

        vm.options.brandmgs = angular.copy($stateParams.brandmgs);
        vm.options.brandtvs = angular.copy($stateParams.brandtvs);
        console.log($stateParams);

        vm.options.variants = angular.copy($stateParams.variants);
        vm.options.features = angular.copy($stateParams.features);
        vm.options.statistics = angular.copy($stateParams.statistics);
        vm.options.keyfeatures = angular.copy($stateParams.keyfeatures);




        console.log(vm.options.statistics);

        // The whole category hierarchy
        vm.loading = true;
        $http.get('/api/categories/all').then(function(res) {
            vm.loading = false;
            vm.options.categories = res.data;
        }, handleError);


        vm.changeCategory = function(cat) {

            console.log(vm.product.category);
            if (vm.product.category == '582597286bf2000d54ac92fa' || vm.product.category == '5825972f6bf2000d54ac92fb' || vm.product.category == '582597976bf2000d54ac9304') {
                vm.options.brands = $stateParams.brandtvs;
            } else if (vm.product.category == '582597646bf2000d54ac9300' || vm.product.category == '5825976d6bf2000d54ac9301') {
                vm.options.brands = $stateParams.brandmgs;
            } else {
                vm.options.brands = angular.copy($stateParams.brands);
            }

        }

        vm.save = function(product) {

            console.log(product);


            // refuse to work with invalid data
            if (!product) {
                Toast.show({
                    type: 'error',
                    text: 'No product defined.'
                });
                return;
            }
            if ('newVariant' in product) {


                // Configure dates
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1; //January is 0!
                var yyyy = today.getFullYear();

                if (dd < 10) {
                    dd = '0' + dd
                }

                if (mm < 10) {
                    mm = '0' + mm
                }
                // Create date and slots array
                var years = [{ yyyy: yyyy }, { yyyy: yyyy + 1 }, { yyyy: yyyy + 2 }, { yyyy: yyyy + 3 }, { yyyy: yyyy + 4 }];
                var months = [{ mm: 0 }, { mm: 1 }, { mm: 2 }, { mm: 3 }, { mm: 4 }, { mm: 5 }, { mm: 6 }, { mm: 7 }, { mm: 8 }, { mm: 9 }, { mm: 10 }, { mm: 11 }];

                var vm = this;
                var a = [];
                _.each(years, function(d) {
                    var k = d.yyyy;

                    var w = [];
                    _.each(months, function(m) {
                        //console.log(m);
                        //
                        if (product.newVariant.model == 'Weekly' || product.newVariant.model == 'BiWeekly') {

                            var results = vm.getWeeksInMonth(m.mm, k);

                            _.each(results, function(res) {
                                a.push({ productid: product._id, pname: product.name, vname: product.newVariant.name, year: k, startDate: new Date(k, m.mm, res.start), endDate: new Date(k, m.mm, res.end), available: product.newVariant.stockLevel, active: true });

                            })
                        } else {
                            var startDate = new Date(k, m.mm, 1);
                            var endDate = new Date(k, m.mm + 1, 0);
                            a.push({ productid: product._id, pname: product.name, vname: product.newVariant.name, year: k, startDate: startDate, endDate: endDate, available: product.newVariant.stockLevel, active: true });
                        }

                    })


                    // var week = [];
                    // _.each(months,function(m){
                    //   //console.log(m);
                    //   var results = vm.getWeeksInMonth( m.mm ,k);         

                    //   _.each(results,function(res){
                    //      week.push({startDate:new Date(k, m.mm, res.start),endDate:new Date(k, m.mm, res.end)});

                    //   })        

                    // })

                    // console.log(week);
                    var v = [];
                    _.each(w, function(r) {
                        v.push({ slot: r, available: product.newVariant.stockLevel, active: true });
                    })
                    a.push({ k: k, v: v });

                    //console.log(a);
                })



                vm.product.variants.push(product.newVariant);

                this.Inventory.save(a, function(res) {
                    console.log(res);
                });
            }

            $http.put('/api/products/' + product._id, product)
                .then(success)
                .catch(err);

            function success(res) {
                var item = vm.product = res.data;
                Toast.show({
                    type: 'success',
                    text: 'Product has been updated'
                });
            }

            function err(err) {
                console.log(err);
                if (product && err) {}

                Toast.show({
                    type: 'warn',
                    text: 'Error while updating database'
                });
            }
        };

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
                        var vm = this
                        $state.go('media');
                        vm.save(vm.product)
                        $mdDialog.hide();
                    }
                }

            }).then(function(answer) {
                if (index === 1000000)
                    vm.product.variants.push({ size: 'x', image: answer })
                else
                    vm.product.variants[index].image = answer;
            }, function() {});
        }

        function goBack() {
            ToggleComponent('products.detailView').close();
            $state.go('^', {}, { location: false });
        }
        vm.goBack = goBack;


        vm.deleteFeature = function(index, product) {
            vm.product.features.splice(index, 1);
            vm.save(product)
        };

        vm.deleteKeyFeature = function(index, product) {
            vm.product.keyFeatures.splice(index, 1);
            vm.save(product)
        };

        vm.deleteStat = function(index, product) {
            vm.product.stats.splice(index, 1);
            vm.save(product)
        };

        vm.deleteKF = function(index, product) {
            vm.product.keyFeatures.splice(index, 1);
            vm.save(product)
        };

        vm.deleteVariants = function(index, product) {
            vm.product.variants.splice(index, 1);
            vm.save(product)
        };


        vm.getWeeksInMonth = function(month, year) {
            var weeks = [],
                firstDate = new Date(year, month, 1),
                lastDate = new Date(year, month + 1, 0),
                numDays = lastDate.getDate();

            var start = 1;
            var end = 7 - firstDate.getDay();
            while (start <= numDays) {
                weeks.push({ start: start, end: end });
                start = end + 1;
                end = end + 7;
                if (end > numDays)
                    end = numDays;
            }

            //console.log(weeks);
            return weeks;
        }

        function handleError(error) { // error handler
            vm.loading = false;
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
    }

    angular.module('mediaboxApp')
        .controller('ProductsDetailController', ProductsDetailController);

})();
