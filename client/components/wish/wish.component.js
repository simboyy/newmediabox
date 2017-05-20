'use strict';
(function(){
class wishComponent {
  /*@ngInject*/
  constructor(Wishlist, Toast, Auth, LoginModal) {
    var vm = this
    var product = {}
    var variant = {}
    vm.$onChanges = function (changesObj) {
      if(changesObj.product) product = changesObj.product.currentValue
      if(changesObj.variant) variant = changesObj.variant.currentValue
      else variant = '~~~~~~~~~~~~~~~'
      if (product  && variant) {
        var q = {where: {'product._id': product._id, 'variant._id': variant._id}}
        vm.cls = 'md-primary'
        var wishlist = Wishlist.my.query(q, function(data){
          if(data[0]) vm.cls = 'md-accent'
        })
      }
    };

  // On click select star
    vm.toggleWishlist = function() {
      if (vm.readOnly) return
      if(!Auth.getCurrentUser().name){
          LoginModal.show('single-product', true) // Reload = true
          return
      }
      var p = { product: this.product, variant: this.variant} 
        // pid: vm.product._id,
        // pname: vm.product.name,
        // slug: vm.product.slug,
        // image:vm.product.variants[0].image,
        // price:vm.product.variants[0].price,
        // mrp:vm.product.variants[0].mrp,
        // keyFeatures: vm.product.keyFeatures
      // }
      Wishlist.save(p, function(data){
        if(data._id){
          Toast.show({type: 'success', text: 'Added to your wishlist'})
          vm.cls = 'md-accent'
        }
        else
          vm.cls = 'md-primary'
      })
    }
  }
}

angular.module('mediaboxApp')
  .component('wish', {
    template: `
    <md-button class="wishlist-component md-mini" aria-label="Add to wishlist" ng-class="$ctrl.cls"
    ng-click="$ctrl.toggleWishlist()">
        <ng-md-icon icon="favorite"></ng-md-icon>&nbsp;<span ng-if="$ctrl.cls === 'md-accent'">Wished</span><span ng-if="$ctrl.cls !== 'md-accent'">Add To Wishlist</span>
    </md-button>
    `,
    bindings: { 
      product: '<', // Read only
      variant: '<', // Read only
      pid: '<', // Product ID passed because initially the whole product object will not be ready
      readOnly: '@?' // String value
    },
    controller: wishComponent
})
})();

