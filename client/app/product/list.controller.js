'use strict';
(function() {

function ProductsListController($scope, $http, socket, $state, $mdDialog, $stateParams, Modal, Toast, Settings) {
  this.cols = [
    {field: 'image', heading: 'image'},
    {field: 'name', heading: 'name'},
    {field: 'active', heading: 'active'}
  ];
  this.header = 'Product';
  this.sort = {};
  this.$mdDialog = $mdDialog;
  var vm = this;
  vm.loading = true;

	// the selected item id
	var _id = null;
  var originatorEv;

  this.sort.predicate = 'name';
  this.sort.reverse = false;
  this.order = function(predicate) {
    this.sort.reverse = (this.sort.predicate === predicate) ? !this.sort.reverse : false;
    this.sort.predicate = predicate;
  };

  this.l = 10;
  this.loadMore = function() {
    this.l += 2;
  };

  this.exportData = function (type) {
    var data = JSON.stringify(this.data, undefined, 2);
    var blob;
    if(type==='txt'){
    // Save as .txt
       blob = new Blob([data], {type: 'text/plain;charset=utf-8'});
      saveAs(blob, 'product.txt');
    }else if(type==='csv'){
    // Save as .csv
      blob = new Blob([document.getElementById('exportable').innerHTML], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'});
      saveAs(blob, "product.csv");
    }else if(type==='xls'){
    // Save as xls
      blob = new Blob([document.getElementById('exportable').innerHTML], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
      });
      saveAs(blob, "product.xls");
    }else{
    // Save as .json
    blob = new Blob([data], {type: 'text/plain;charset=utf-8'});
    saveAs(blob, 'product.json');
    }
  };

  this.openMenu = function($mdOpenMenu, ev) {
    originatorEv = ev;
    $mdOpenMenu(ev);
  };
  vm.isSelected = function(product) {
    return _id === product._id;
  };

  // Start query the database for products
  vm.loading = true;
  $http.get('/api/products').then(function(res) {
    vm.loading = false;
    vm.data = res.data;
    socket.syncUpdates('product', vm.data);
  },handleError);

  // Start query the database for brands
  vm.loading = true;
  $http.get('/api/brands').then(function(res) {
    vm.loading = false;
    vm.brands = res.data;
    socket.syncUpdates('brand', vm.brands);
  },handleError);

  $http.get('/api/brandmgs').then(function(res) {
    vm.loading = false;
    vm.brandmgs = res.data;
    socket.syncUpdates('brandmg', vm.brandmgs);
  },handleError);

  $http.get('/api/brandtvs').then(function(res) {
    vm.loading = false;
    vm.brandtvs = res.data;
    socket.syncUpdates('brandtv', vm.brandtvs);
  },handleError);

  // Start query the database for categories
  vm.loading = true;
  $http.get('/api/categories').then(function(res) {
    vm.loading = false;
    vm.categories = res.data;
    socket.syncUpdates('category', vm.categories);
  },handleError);

  // Start query the database for features
  vm.loading = true;
  $http.get('/api/features').then(function(res) {
    vm.loading = false;
    vm.features = res.data;
    socket.syncUpdates('feature', vm.features);
  },handleError);
  // Start query the database for features
  vm.loading = true;
  $http.get('/api/keyfeatures').then(function(res) {
    vm.loading = false;
    vm.keyfeatures = res.data;
    socket.syncUpdates('feature', vm.features);
  },handleError);

  vm.loading = true;
  $http.get('api/statistics').then(function(res) {
    vm.loading = false;
    vm.statistics = res.data;
    socket.syncUpdates('statistic',vm.statistics);
  },handleError);

  this.changeStatus = function(x){
      $http.put('/api/products/' + x._id, {active: x.active}).then(function() {
      },handleError);
  };

  this.delete = function(data) {
    var confirm = this.$mdDialog.confirm()
    .title('Would you like to delete the product completely?')
    .textContent('All its details will be deleted as well')
    .ariaLabel('Confirm delete product')
    .ok('Please do it!')
    .cancel('No. keep')

    this.$mdDialog.show(confirm).then(function() {
        $http.delete('/api/products/' + data._id).then(function() {},handleError);
    })
  };

  function handleError(error) { // error handler
      vm.loading = false;
      if(error.status === 403){
        Toast.show({
          type: 'error',
          text: 'Not authorised to make changes.'
        });
      }
      else{
        Toast.show({
          type: 'error',
          text: error.status
        });
      }
  }

  $scope.$on('$destroy', function() {
    socket.unsyncUpdates('product');
  });

  this.showInDetails = function (item) {
    _id = item._id;
    $state.go('product-detail', {products: item, brands: vm.brands,brandmgs: vm.brandmgs, brandtvs: vm.brandtvs,categories: vm.categories, features: vm.features ,keyfeatures: vm.keyfeatures,statistics: vm.statistics}, { location: false });
  }

  this.gotoDetail = function (params){
      $state.go('single-product', {id:params._id, slug:params.slug}, {reload: false});
  }

}

angular.module('mediaboxApp')
  .controller('ProductsListController', ProductsListController);

})();
