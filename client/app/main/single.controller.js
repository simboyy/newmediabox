'use strict';

(function() {

    class SingleProductController {

        constructor($stateParams, $location, $scope, $timeout, Product, Review, socket, SingleProduct, Auth, Toast, LoginModal, $mdDialog, appConfig) {
            var vm = this;



            vm.$mdDialog = $mdDialog;
            vm.$scope = $scope;
            vm.$timeout = $timeout;
            vm.currentUser = Auth.getCurrentUser();
            vm.LoginModal = LoginModal
            vm.Auth = Auth
            vm.Toast = Toast
            vm.Review = Review

            $scope.vm = vm;

            var id = $stateParams.id;
            //console.log($stateParams);
            //
            if (id == null) {

                var slug = $location.search().slug;
                var id = $location.search().id;

                vm.product = Product.get({ id: id }, function(res) {

                      vm.learn(res);


                });

            } else {

                if (localStorage !== null && JSON !== null && id !== null) {
                    localStorage.productId = id;
                }
                vm.productId = localStorage !== null ? localStorage.productId : null;

                SingleProduct.$promise.then(function(res) {

                    vm.product = res;

                    vm.learn(res);

                    //console.log(res.category.name);
                    if (!appConfig.reviewSettings.enabled) { // If the settings says not to enable reviews
                        return;
                    }
                    vm.q = { pid: SingleProduct._id }
                    vm.getReviews()

                })
                vm.i = 0;

            }

            vm.changeIndex = function(i) {
                vm.i = i;
            };

        }


        preview(adspace) {

            //console.log(adspace);
            var vm = this

            if (adspace.image) {

                vm.name = adspace.name;
                vm.size = adspace.size;
                vm.formart = adspace.formart;

                vm.image = {
                    src: adspace.image,
                    position: {
                        x: -137.5,
                        y: -68
                    },
                    scaling: 1,
                    maxScaling: 5,
                    scaleStep: 0.11,
                    mwScaleStep: 0.09,
                    moveStep: 99,
                    fitOnload: true,
                    progress: 0
                };

                this.$timeout(function() {
                    angular.element('#movecenter').triggerHandler('click');
                });


                this.$scope.$watch('adspace.image', function(newValue) {
                    if (typeof(newValue) != "string") {
                        //console.log(newValue);

                    }
                });

            } else {
                vm.name = false;
                vm.size = false;
            }



        }
        getReviews() {
            var vm = this
            vm.Review.my.query(vm.q, function(r) {
                vm.reviews = r;
                vm.publishtRatings(vm.reviews)
            })
        }
        publishtRatings(r) {
            var vm = this
            var reviewCount = 0
            var rating = { r5: 0, r4: 0, r3: 0, r2: 0, r1: 0, count: 0, total: 0, avg: 0 }
            r.forEach(function(i) {
                if (i.message) reviewCount++
                    if (i.rating) rating.count++
                        if (i.rating) rating.total = rating.total + i.rating
                if (i.rating == 5) rating.r5++
                    if (i.rating == 4) rating.r4++
                        if (i.rating == 3) rating.r3++
                            if (i.rating == 2) rating.r2++
                                if (i.rating == 1) rating.r1++
            }, this);
            vm.reviewCount = reviewCount
            rating.avg = Math.round(rating.total / rating.count * 10) / 10
            vm.rating = rating
        }
        deleteReview(review) {
            var vm = this
            var confirm = this.$mdDialog.confirm()
                .title('Are you sure to delete your review?')
                .textContent('This is unrecoverable')
                .ariaLabel('Confirm delete review')
                .ok('Please do it!')
                .cancel('No. keep')

            this.$mdDialog.show(confirm).then(function() {
                vm.Review.delete({ id: review._id }, function() {
                    vm.getReviews()
                }, function(err) {
                    vm.Toast.show({ type: 'error', text: 'Error while saving your review: ' + err.data })
                });
            })
        }

        learn(res) {
            var vm = this;

            if (res.category.name == "Magazines") {
                vm.magazines = true;

            } else if (res.category.name == "Television") {
                vm.television = true;

            } else if (res.category.name == "Radio") {
                vm.radio = true;

            } else if (res.category.name == "Newspapers") {
                vm.newspapers = true;

            } else if (res.category.name == "Fliers") {
                vm.fliers = true;

            } else if (res.category.name == "Cinema") {
                vm.cinema = true;

            } else if (res.category.name == "Airline") {
                vm.airline = true;

            } else if (res.category.name == "Instore") {
                vm.instore = true;

            } else if (res.category.name == "Email Marketing") {
                vm.emailMarketing = true;

            } else if (res.category.name == "Bulk SMS") {
                vm.bulkSms = true;

            } else if (res.category.name == "Banner") {
                vm.banner = true;

            } else if (res.category.name == "Social Media") {
                vm.socialMedia = true;

            } else if (res.category.name == "Billboards") {
                vm.billboards = true;

            } else {
                vm.default = true;

            }

        }
        myReview(review) {
            if (this.Auth.getCurrentUser().email == review.email)
                return true
        }

        reviewForm() {
            var vm = this
            if (!vm.Auth.getCurrentUser().name) {
                vm.LoginModal.show('single-product', true) // Reload the route, else it won't show the wishlist status of the product
                return
            }
            vm.$mdDialog.show({
                templateUrl: 'app/main/review-form.html',
                controller: NewReviewController
            }).then(function(data) {
                vm.getReviews()
                if (vm.reviewSettings.moderate)
                    vm.Toast.show({ type: 'success', text: 'Your review is under moderation. Will be visible to public after approval.' })
            });

            function NewReviewController($scope, $mdDialog, Review, Toast) {
                var user = vm.Auth.getCurrentUser()
                $scope.hide = function() {
                    $mdDialog.hide();
                };
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };
                $scope.save = function(data) {
                    if (!data) {
                        $scope.message = 'Please rate the item from a scale of 1-5'
                        return
                    }
                    data.pid = vm.product._id;
                    data.pname = vm.product.name;
                    data.pslug = vm.product.slug;
                    data.email = user.email;
                    data.reviewer = user.name;
                    Review.save(data, function() {}, function(err) {
                        Toast.show({ type: 'error', text: 'Error while saving your review: ' + err.data })
                    })
                    $mdDialog.hide(data);
                };
            }
            NewReviewController.$inject = ['$scope', '$mdDialog', 'Review', 'Toast'];
        }
    }

    SingleProductController.$inject = ['$stateParams', '$location', '$scope', '$timeout', 'Product', 'Review', 'socket', 'SingleProduct', 'Auth', 'Toast', 'LoginModal', '$mdDialog', 'appConfig'];

    angular.module('mediaboxApp')
        .controller('SingleProductController', SingleProductController);

})();
