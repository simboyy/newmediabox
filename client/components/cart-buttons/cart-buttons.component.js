'use strict';
(function(){
class cartButtonsController {
  /*@ngInject*/
  constructor(Cart ,Auth) {
    this.cart = Cart.cart;
    this.Auth = Auth;
    this.addItem = function(product, variant, i){
      var advertiser = this.Auth.getCurrentUser();
      i = i || 1;

      if(product.campaignName){
       
        this.cart.addItem({sku:variant._id, name:variant.name, slug:variant.formart, mrp:variant.model, image:variant.image,weight: variant.maxSize,size:variant.size ,price:variant.price, quantity:1,'advertiser':advertiser, publisher:variant.publisher,publisheruid:variant.publisheruid, vid:variant._id} ,i)
      }

       //ng-click="cart.addItem({sku:adspace.sku, name:adspace.name,slug:adspace.formart,mrp:adspace.model, weight:adspace.maxSize,size:adspace.size,price:adspace.price ,status: {name:'New', val:402}, publisher:product.name,advertiser:user,uid:product.uid,category:product.brand.name,image:product.logo[0].base64,quantity:1} ,true);"
      /*
         todo add category to cart
       */
    
      this.cart.addItem({sku:variant._id, name:variant.name, slug:variant.formart, mrp:variant.model, weight: variant.maxSize,size:variant.size ,price:variant.price,status: {name:'New', val:402},publisher:product.name,publisheruid:product.uid,advertiser:this.Auth.getCurrentUser(), uid:product.uid, image:product.logo[0].base64, quantity:1,  vid:variant._id} ,i)
    }
  }
}

angular.module('mediaboxApp')
  .component('cartButtons', {
    template: `    
        <section class="md-actions cta" layout="row" layout-align="start end" ng-show="$ctrl.variant.price" ng-if="$ctrl.cart.checkCart($ctrl.variant._id, $ctrl.variant._id)">
            <md-button ng-click="$ctrl.addItem($ctrl.product, $ctrl.variant)" class="md-raised md-primary"
            aria-label="Add to cart">
                <ng-md-icon icon="shopping_cart"></ng-md-icon>Add to cart
            </md-button>
        </section>

        <section class="md-actions cta" ng-hide="$ctrl.variant.price" layout="row" layout-align="start end" ng-if="$ctrl.cart.checkCart($ctrl.variant._id, $ctrl.variant._id)">
            <md-button ng-click="$ctrl.addItem($ctrl.product, $ctrl.variant)" class="md-raised md-primary"
            aria-label="Add to cart">
                <ng-md-icon icon="mail_outline"></ng-md-icon>Enquire
            </md-button>
        </section>

        <section class="md-actions cta" layout="row" layout-align="start center" ng-if="!$ctrl.cart.checkCart($ctrl.variant._id, $ctrl.variant._id)">
            <md-button class="md-raised md-primary left md-icon-button" 
            ng-click="$ctrl.addItem($ctrl.product, $ctrl.variant,-1)" 
            aria-label="Remove from cart">
                <ng-md-icon icon="remove"></ng-md-icon>
            </md-button>

            <md-button class="middle" aria-label="Cart quantity" ui-sref="checkout">Buy {{$ctrl.cart.getQuantity($ctrl.variant._id, $ctrl.variant._id)}}</md-button>

            <md-button class="md-raised md-primary right md-icon-button" ng-click="$ctrl.addItem($ctrl.product, $ctrl.variant,1)" aria-label="Add to cart">
                <ng-md-icon icon="add"></ng-md-icon>
            </md-button>
        </section>
    `,
    bindings: { 
      product: '<', // One way binding towards controller
      variant: '<', // One way binding towards controller
      readOnly: '@?' // String value
    },
    controller: cartButtonsController
})
})();

