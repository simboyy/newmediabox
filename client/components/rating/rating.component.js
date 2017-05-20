'use strict';
(function(){
class ratingComponent {
  /*@ngInject*/
  constructor($timeout) {
    var vm = this;
    // if (vm.readOnly === undefined) vm.readOnly = false
    var starsArray = [];
// Initialize to 5 stars 
    for (var index = 0; index < 5; index++) {
      var starItem = {
        index: index,
        class: 'star-off'
      };
      starsArray.push(starItem)
    }
    vm.starsArray = starsArray

// On mousover
    vm.setMouseOverRating = function(rating) {
      if (vm.readOnly) {
        return;
      }
      vm.validateStars(rating);
    };
// Highlight stars
    vm.validateStars = function(rating) {
      if (!vm.starsArray || vm.starsArray.length === 0) {
        return;
      }
      for (var index = 0; index < vm.starsArray.length; index++) {
        var starItem = vm.starsArray[index];
        if (index <= (rating - 1)) {
          starItem.class = 'star-on'
        } else {
          starItem.class = 'star-off'
        }
      }
    }

// On click select star
    vm.setRating = function(rating) {
      if (vm.readOnly) return
      vm.rating = rating;
      vm.validateStars(vm.rating);
      $timeout(function() {
        vm.onRating({
          rating: vm.rating
        });
      });
    }
  }
}

angular.module('mediaboxApp')
  .component('rating', {
    template: `
    <div class="angular-material-rating" layout="row">  
      <a class="button star-button" ng-class="item.class"    ng-mouseover="$ctrl.setMouseOverRating($index + 1)"    ng-mouseleave="$ctrl.setMouseOverRating($ctrl.rating)"    ng-click="$ctrl.setRating($index + 1)" ng-repeat="item in $ctrl.starsArray">
        <ng-md-icon icon="star"></ng-md-icon>  
      </a>
    </div>
    `,
    bindings: { 
      message: '<', // Read only
      max: '@?', // String
      rating: '=?', // 2way
      readOnly: '=?', // 2way
      onRating: '&' // Callback
    },
    controller: ratingComponent
})
})();

