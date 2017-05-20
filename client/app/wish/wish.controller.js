'use strict';

(function() {

class WishController {
    constructor(Wishlist,$state) {
        this.Wishlist = Wishlist
        this.wishes = Wishlist.query()       
        this.$state = $state       
    }
    remove(wish){
        var vm = this
        this.Wishlist.delete({id:wish._id}, function(res){
            if(res){          
                vm.wishes = vm.Wishlist.query()
            }
        })
    }
    gotoDetail(params){
       this.$state.go('single-product', {id:params.pid, slug:params.slug}, {reload: false});
    }
}

angular.module('mediaboxApp')
  .controller('WishController', WishController);

})();

