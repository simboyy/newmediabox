'use strict';

(function() {

class CheckoutController {
    constructor(Cart,Country,PaymentMethod,Shipping,Coupon,Order,Pay,Toast, Address, Settings, socket, $scope,Auth,$stateParams,$state,$http,$mdDialog, $window) {
        var vm = this;
        this.msg = 'No items in cart.';
        this.customer = {};
        this.coupon = {};
        this.Coupon = Coupon;
        this.Shipping = Shipping;
        this.Order = Order;
        this.Pay = Pay;
        this.cart = Cart.cart;
        this.Address = Address;
        this.Auth = Auth;
        this.addr = {};
        this.order = {};
        this.$http = $http;
        this.$mdDialog = $mdDialog;
        this.$window = $window;
        this.socket = socket;
        this.Toast = Toast;
        this.Cart = Cart;
        this.newAddress = false;
        this.options = {email:'smkorera@mediabox.co.zw'}
        this.stripeToken = {
            number: '4242424242424242',
            cvc: '123',
            exp_month: '12',
            exp_year: '2020'
        }
        PaymentMethod.active.query(function(res){
            vm.paymentOptions = res;
            vm.options.paymentMethod = res[0];
        })
        this.Settings = Settings
        this.getMyAddress();
        if($stateParams.id === '404')
            this.payment = {id: $stateParams.id, msg: JSON.parse($stateParams.msg)}
        else if($stateParams.msg)
            this.payment = {id: $stateParams.id, msg: [{field: ':', issue: $stateParams.msg}]}

        this.$state = $state
        $scope.$on('$destroy', function() {
            socket.unsyncUpdates('address');
        });
        // vm.cartTotal = Cart.cart.getTotalPrice();
        // vm.cartCount = Cart.cart.getTotalCount();
        //vm.getBestShipper()
    }
      getMyAddress(){
        var vm = this;
        vm.Address.my.query(function (res) {
            vm.address = res;
            vm.addr = res[0];
            vm.options.paymentMethod = vm.paymentOptions[0];
            vm.socket.syncUpdates('address', vm.address);
        })

      }

      switchAddress(a){
          this.options.paymentMethod = this.paymentOptions[0];
          this.addr = a;
         // this.getBestShipper();         
      }
      delete(item){
          var vm = this;
          var confirm = this.$mdDialog.confirm()
            .title('Would you like to delete the address?')
            .textContent('This is unrecoverable')
            .ariaLabel('Confirm delete address')
            .ok('Please do it!')
            .cancel('No. keep')

            this.$mdDialog.show(confirm).then(function() {
                vm.Address.delete({id:item._id}, function() {},function (res) {
                    vm.Toast.show({ type: 'error', text: res });
                });  
            })
      }
      // Setting the default country on page load
      // getBestShipper(){
      //   var vm = this;
      //   vm.Cart.cart.getBestShipper().$promise.then(function(data){
      //       vm.shipping = data[0];
      //   })
      // }

      saveAddress(data){
          var vm = this;
          data.country = vm.Settings.country.name
          vm.loadingAddress = true;
          if(_.has(data, '_id')){
            this.Address.update({ id: data._id }, data, function () {
                vm.loadingAddress = false;
                vm.getMyAddress();
            }, function(err){ // If rejected by auth interceptor.service
                vm.loadingAddress = false;
            })
          }else{
              this.Address.save(data, function () {
                vm.loadingAddress = false;
                vm.getMyAddress();
            })
          }
          vm.addressForm(false);
      }

      addressForm(visible){
          this.showAddressForm = visible;
      }
      cancelForm(addr){
          this.showAddressForm = false;
          this.addr = this.address[0];
      }
      checkout(order,o,clearCart){


        var vm = this;
        order = _.merge(order,o)
        order.options = {};
        if(!_.has(order, 'phone') || !order.phone){
            vm.Toast.show({ type: 'error', text: 'You need to specify an address with phone number' });
            return;
        }
      
        if(!_.has(order, 'paymentMethod') || order.paymentMethod.name==undefined || o.paymentMethod.name ==null||o.paymentMethod.name== ""){
            vm.Toast.show({ type: 'error', text: 'Please select a payment method' });
            return;
        }
  
        if(this.cart.items.length==0){
            vm.Toast.show({ type: 'error', text: 'Your cart found empty. Please add some items' });
        }
        //order.shipping = vm.shipping.best
        if(!vm.coupon) vm.coupon = {amount : 0}
        else if(!vm.coupon.amount) vm.coupon = {amount : 0}
        order.couponAmount = vm.coupon.amount
        order.stripeToken = vm.stripeToken
        order.country_code = vm.Settings.country.code
        order.currency_code = vm.Settings.currency.code
        order.exchange_rate = vm.Settings.currency.exchange_rate
        order.total = vm.cartTotal  + this.cart.getHandlingFee() - vm.coupon.amount
        order.email = this.Auth.getCurrentUser().email;
        order.payment = 'Pending'
        order.items = this.cart.items;
        delete order._id;
        if(true){
            
            this.loading = true;
            this.cart.flagOff();

           this.cart.checkout(order,clearCart)
        }
        else{
            vm.Toast.show({ type: 'error', text: 'Item not available for your location' });
        }
      }

      removeCoupon(){
        this.coupon = {};
      }
      
      checkCoupon(code, cartValue){
        var q = {};
        var vm = this
        // x.where is required else it adds unneccessery colons which can not be parsed by the JSON parser at the Server
        q.where = {code:code,active:true,'minimumCartValue' : { $lte: cartValue } };
        this.Coupon.query(q, function(res){
          vm.coupon = res[0];
        })

      }
}

angular.module('mediaboxApp')
  .controller('CheckoutController', CheckoutController);

})();

