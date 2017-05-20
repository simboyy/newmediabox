'use strict';

(function() {

    class MainController {

        constructor($scope, $state, $stateParams, $http, $location, Cart, Product, Brand, BrandMG, BrandTV, Category, Feature, Settings, socket, $rootScope, $injector, $loading, $timeout, $mdMedia) {
                var vm = this
                    // Start query the database for products
                    // this.loading = true;
                    // if ($stateParams.productSku) { // != null
                    //     this.product = this.store.getProduct($stateParams.productSku);
                    // }
                    // this
                this.$http = $http;
                this.$timeout = $timeout;
                this.$loading = $loading;
                this.$mdMedia = $mdMedia;
                this.$location = $location;
                this.$state = $state;
                this.Product = Product;
                this.product = {};
                this.products = {};
                this.filtered = {};
                this.products.busy = false;
                this.products.end = false;
                this.products.after = 0;
                this.products.items = [];
                this.fl = {};
                this.fl.brands = [];
                this.fl.categories = [];
                this.priceSlider = {};
                this.features = Feature.group.query();
                this.categories = Category.query();
                this.brands = Brand.query({ active: true });
                this.Brand = Brand;
                this.Category = Category;
                this.BrandMG = BrandMG;
                this.BrandTV = BrandTV;
                this.selected = [];
                this.$scope = $scope;
                this.$rootScope = $rootScope;
                this.$injector = $injector;
                this.Settings = Settings;
                // this.fl.brands = this.selected;
                this.sort = this.products.sort = $stateParams.sort;
                this.q = { where: { active: true }, limit: 10 };
                this.f = [];
                this.fl.features = {}
                this.resetPriceRange();

                // This is done at ui-router resolve
                // var id = $stateParams.id;
                // // Storing the product id into localStorage because the _id of the selected product which was passed as a hidden parameter from products won't available on page refresh
                // if (localStorage !== null && JSON !== null && id !== null) {
                //     localStorage.productId = id;
                // }
                // var productId = localStorage !== null ? localStorage.productId : null;

                // if (productId && productId !== 'undefined') { // To avoid product undefined error at Category/slug/id page
                //     this.product = Product.get({id:productId});
                // }


                //Range slider config
                this.priceSlider = {
                    min: 0,
                    max: 3000,
                    options: {
                        floor: 0,
                        step: 1,
                        translate: function(value) {
                            return vm.Settings.currency.symbol + value;
                        },
                        onStart: function() {
                            // //console.log('start slider......');
                        },
                        onChange: function() {
                            // //console.log('change slider......');
                        },
                        onEnd: function() {
                            // //console.log('end slider......');
                            vm.filter(vm, 'price');
                        }
                    }
                };

                if ('page' in $stateParams) {
                    this.brands = false;
                    //console.log($stateParams);
                    if ($stateParams.slug === 'magazines' || $stateParams.slug === 'newspapers') {
                        this.brands = this.BrandMG.query({ active: true });
                        //console.log(this.brands);

                    } else if ($stateParams.slug === 'banner' || $stateParams.slug === 'social-media') {
                        this.brands = this.Brand.query({ active: true });
                        //console.log(this.brands);
                    } else if ($stateParams.slug === 'television' || $stateParams.slug === 'cinema' || $stateParams.slug === 'radio') {
                        this.brands = this.BrandTV.query({ active: true });
                        //console.log(this.brands);
                    } else {

                        //this.brands = this.Brand.query({active:true});
                    }
                    // If category or brand page

                    if ($stateParams.page && $stateParams._id) {
                        this.products.brand = { _id: $stateParams._id };
                        this.breadcrumb = { type: $stateParams.page };
                        this.generateBreadCrumb(this, $stateParams.page, $stateParams._id);
                        if ($stateParams.page === 'Category') {
                            this.fl.categories.push({ _id: $stateParams._id, name: $stateParams.slug });
                        } else if ($stateParams.page === 'Brand') {

                            this.fl.brands.push({ _id: $stateParams._id, name: $stateParams.slug });
                        }
                        // this.resetPriceRange(this);
                    } else {
                        this.q = { sort: this.sort, limit: 10 };
                    }
                    this.filter(this);
                } else {
                    this.q = { limit: 10 };
                }


                this.scroll = function() {
                    if (this.products.busy || this.products.end) {
                        return; }
                    this.products.busy = false;
                    this.q.skip = this.products.after;
                    this.displayProducts(this.q);
                };


                $scope.$on('$destroy', function() {
                    socket.unsyncUpdates('product');
                });

                this.selectedFeatures = [];
                this.selectedSubFeatures = [];
            }
            // for the checkboxs
        exists(item, list) {
            if (angular.isUndefined(list)) list = [];
            return list.indexOf(item) > -1;
            // this.filter(this);
        }
        toggle(item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) list.splice(idx, 1);
            else list.push(item);
            this.filter(this);
        }
        navigate(page, params) {
            if (page === 'sort') {
                delete params.$$hashKey;
                var paramString = JSON.stringify(params);
                this.$state.go(this.$state.current, { sort: paramString }, { reload: true });
            } else if (params) {
                this.$location.replace().path(page + '/' + params.slug + '/' + params._id);
            } else {
                this.$location.replace().path('/');
            }
        }
        gotoDetail(params) {
            this.$state.go('single-product', { id: params._id, slug: params.slug }, { reload: false });
        }
        gotoCheckout(params) {
            this.$state.go('checkout');
        }


        generateBreadCrumb(vm, page, id) {
            vm.breadcrumb.items = [];
            var api = vm.$injector.get(page);
            api.get({ id: id }).$promise.then(function(child) {
                vm.breadcrumb.items.push(child);
                if (page === 'Category') {
                    vm.breadcrumb.items.push({ name: 'All Categories' });
                } else if (page === 'Brand') {
                    vm.breadcrumb.items.push({ name: 'All Brands' });
                }
            });
        }
        filter(vm) {
            // var q = {};
            var f = [];
            if (vm.fl.features) {
                _.forEach(vm.fl.features, function(val, key) {
                    if (val.length > 0) {
                        f.push({ 'features.key': key, 'features.val': { $in: val } });
                    }
                });
            }

            if (vm.fl.brands) {
                if (vm.fl.brands.length > 0) {
                    var brandIds = [];
                    _.forEach(vm.fl.brands, function(brand) {
                        brandIds.push(brand._id);
                    });
                    f.push({ 'brand': { $in: brandIds } });
                }

            }
            if (vm.fl.categories) {
                if (vm.fl.categories.length > 0) {
                    var categoryIds = [];
                    _.forEach(vm.fl.categories, function(category) {
                        categoryIds.push(category._id);
                    });
                    f.push({ 'category': { $in: categoryIds } });
                }

            }

            f.push({ 'variants.price': { $gt: vm.priceSlider.min, $lt: vm.priceSlider.max } });

            // var vm = this;
            if (f.length > 0) {
                vm.q.where = { $and: f };
            } else {
                vm.q.where = {};
            }

            vm.displayProducts(vm.q, true);
            // vm.resetPriceRange(vm.q);

        }

        sortNow(sort) {
            this.q.sort = sort;
            this.displayProducts(this.q, true);
        }

        displayProducts(q, flush) {
            var products = this.products;
            var filtered = this.filtered;
            var $loading = this.$loading;
            if (flush) {
                q.skip = 0;
                products.items = [];
                products.end = false;
                products.after = 0;
            }
            $loading.start('products');
            products.busy = true;
            var vm = this;
            this.Product.query(q, function(data) {

                for (var i = 0; i < data.length; i++) {
                    var item = data[i];

                    //console.log(item.category);
                    var catid = item.category;
                    var brandid = item.brand;

                    vm.$http.get('/api/brands/' + brandid)
                        .then(success2)
                        .catch(err2);

                    function success2(res) {
                        ////console.log(res.data.name);    
                        item.startDate = res.data.name;
                    }

                    function err2(err) {
                        //console.log(err);
                        // if (product && err) {
                        // }

                    }

                    vm.$http.get('/api/categories/' + catid)
                        .then(success)
                        .catch(err);

                    function success(res) {
                        ////console.log(res.data.name);    
                        item.endDate = res.data.name;
                    }

                    function err(err) {
                        //console.log(err);
                        // if (product && err) {
                        // }

                    }

                    products.items.push(item);
                    //console.log(item);

                }
                // Products count
                filtered.count = data.length + products.after;
                if (data.length >= 5) { products.after = products.after + data.length; } else { products.end = true; }

                products.busy = false;
                $loading.finish('products');
            }, function() {
                products.busy = false;
                vm.$loading.finish('products');
            }).$promise.then(function() {
                vm.Product.count.query(q, function(res) {
                    products.count = res[0].count;
                });
            });

        }

        resetPriceRange(q) { // Could not be implemented. Need to try again later
            var vm = this
            vm.Product.pr.get(q, function(data) {
                vm.priceSlider.options.floor = data.min;
                vm.priceSlider.min = data.min;
                vm.priceSlider.options.ceil = data.max;
                vm.priceSlider.max = 3000;
            });
        }


        // For Price slider
        currencyFormatting(value) {
            return this.Settings.currency.symbol + ' ' + value.toString();
        }


        removeFeatures(features, k, f) {
            this.fl.features[k] = _.without(features, f)
            this.filter(this);
        }

        removeBrand(brand) {
            var index = this.fl.brands.indexOf(brand);
            if (index > -1) {
                this.fl.brands.splice(index, 1);
                this.filter(this);
            }
        }

        removeCategory() {
            this.fl.categories = undefined;
            this.filter();
        }

        handleError(error) { // error handler
            this.loading = false;
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
        .controller('MainController', MainController);

})();
