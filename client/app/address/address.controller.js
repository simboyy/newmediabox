'use strict';

(function() {

class AddressController {
    constructor(Toast, Address, Settings, socket, $http, $scope,$mdDialog) {
        var vm = this;
        this.Address = Address;
        this.addr = {};
        this.$http = $http;
        this.$mdDialog = $mdDialog;
        this.socket = socket;
        this.Toast = Toast;
        this.newAddress = false;
        this.options = {}
        this.Settings = Settings
        this.getMyAddress()
        $scope.$on('$destroy', function() {
            socket.unsyncUpdates('address');
        });
    }
      getMyAddress(){
        var vm = this;
        vm.Address.my.query(function (res) {
            vm.address = res;
            vm.addr = res[0];
            vm.socket.syncUpdates('address', vm.address);
        })

      }

      switchAddress(a){
          this.addr = a;
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
                vm.Toast.show({ type: 'error', text: res })
            })   
        })
        
      }
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
}

angular.module('mediaboxApp')
  .controller('AddressController', AddressController);

})();

