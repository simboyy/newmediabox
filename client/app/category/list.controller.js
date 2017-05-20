'use strict';
(function() {

function CategoriesListController($scope, $http, socket, $state, $stateParams, Modal, Toast, Settings, Category, $location, $anchorScroll, $mdDialog) {
  this.cols = [
    // {field: 'image', heading: 'image'},
    {field: 'edit', heading: 'Action'},
    {field: 'name', heading: 'name'},
    {field: 'status', heading: 'status'}
  ];
  this.header = 'Categories';
  this.sort = {};
  this.$mdDialog = $mdDialog;
  var vm = this;
  vm.loading = true;
  // vm.Cat = Cat;
	// the selected item id
	var _id = null;
  var originatorEv;
  
  // Tabs
   var selected = null,
   previous = null;
    // this.tabs = tabs;
      $scope.newSubItem = function (scope) {
        var nodeData = scope.$modelValue;
        nodeData.child.push({
          id: nodeData.id * 10 + nodeData.child.length,
          title: nodeData.title + '.' + (nodeData.child.length + 1),
          child: []
        });
      };

      $scope.visible = function (item) {
        return !($scope.query && $scope.query.length > 0  && item.title.indexOf($scope.query) === -1);

      };

      $scope.findNodes = function () {

      };

    
    this.getCategories = function() {
      vm.loading = true;
      $http.get('/api/categories').then(function(res) {
        vm.loading = false;
        vm.data = res.data;
        // socket.syncUpdates('category', vm.data);
      },handleError);
      

    };

    this.remove = function (scope,node) {
      var confirm = this.$mdDialog.confirm()
        .title('Are you sure to delete the category?')
        .textContent('This is unrecoverable')
        .ariaLabel('Confirm delete category')
        .ok('Please do it!')
        .cancel('No. keep')

        this.$mdDialog.show(confirm).then(function() {
            scope.remove();
            $http.delete('/api/categories/'+node._id,node); 
        })
    };

    vm.toggle = function (scope) {
      scope.toggle();
    };

    $scope.treeOptions = {
      dropped: function(event) {
        var sourceNode = event.source.nodeScope;
        var op = event.source.nodesScope.$nodeScope;
        var destNodes = event.dest.nodesScope;
        var sortBefore = event.source.index + 1;
        var sortAfter = event.dest.index + 1;
        var np = destNodes.$parent;
        var me = sourceNode.$modelValue;
        var oldParent = null;
        var newParent = null;
        // var oldParentId = null;
        if(!_.isNull(op)){ 
          // If I had a oldParent (If I was already assigned to a oldParent) 
          // Update oldParent's child reference
          oldParent = op.$modelValue;
          $http.put('/api/categories/'+oldParent._id, oldParent).then().catch(err);
        }
        if(!_.isUndefined(np) && !_.isNull(np)){ 
          // If I have a newParent now
          // Update my new parent's child reference
          newParent = np.$modelValue;
          
          $http.put('/api/categories/'+newParent._id, newParent).then().catch(err);
          me.parent = newParent._id;
        }
       
        $http.put('/api/categories/'+me._id, me).then(vm.getCategories).catch(err);
        // I was recently created or not under any parent
        }
        
    };

    
    this.selectedIndex = 2;
    $scope.$watch('selectedIndex', function(current, old){
      previous = selected;
    });
    
    // Add new category
    this.addTab = function (category) {
      $http.post('/api/categories',category)
      .then(function(res) {
        vm.loading = false;
        vm.getCategories();
        $location.hash('bottom');
        $anchorScroll();
      },handleError);
      
      
      
    };

  this.sort.reverse = true;
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
      saveAs(blob, 'cat.txt');
    }else if(type==='csv'){
    // Save as .csv
      blob = new Blob([document.getElementById('exportable').innerHTML], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'});
      saveAs(blob, 'cat.csv');
    }else if(type==='xls'){
    // Save as xls
      blob = new Blob([document.getElementById('exportable').innerHTML], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
      });
      saveAs(blob, 'cat.xls');
    }else{
    // Save as .json
    blob = new Blob([data], {type: 'text/plain;charset=utf-8'});
    saveAs(blob, 'cat.json');
    }
  };

  this.openMenu = function($mdOpenMenu, ev) {
    originatorEv = ev;
    $mdOpenMenu(ev);
  };
  vm.isSelected = function(cat) {
    return _id === cat._id;
  };


  // Start query the database for categories
  vm.loading = true;
  $http.get('/api/categories').then(function(res) {
    vm.loading = false;
    vm.data = res.data;
  },handleError);

  // Start query the database for brands
  vm.loading = true;
  $http.get('/api/brands').then(function(res) {
    vm.loading = false;
    vm.brands = res.data;
    socket.syncUpdates('brand', vm.brands);
  },handleError);

  this.saveSubCategory = function (i,cat) {
    if(cat){
      i.subcat.push(cat);
    }
    $http.put('/api/categories/'+i._id, i).then(success).catch(err);
    
  }
  function success(res) {
    var item = vm.cat = res.data;
    Toast.show({type: 'success', text: 'Category has been updated'});
  }

  function err(err) {
    Toast.show({type: 'warn', text: 'Error while updating database'});
  }
  
  this.changeStatus = function(x){
    $http.put('/api/categories/' + x._id, x).then(success).catch(err);
  };

  this.delete = function(data) {
    var confirm = this.$mdDialog.confirm()
    .title('Are you sure to delete the category?')
    .textContent('This is unrecoverable')
    .ariaLabel('Confirm delete category')
    .ok('Please do it!')
    .cancel('No. keep')

    this.$mdDialog.show(confirm).then(function() {
      $http.delete('/api/categories/' + data._id).then(function() {},handleError);
    })
  };

  function handleError(error) { // error handler
      vm.loading = false;
      if(error.status === 403){
        Toast.show({type: 'error', text: 'Not authorised to make changes.'});
      }
      else if(err.type!=='demo'){
        Toast.show({ type: 'error', text: error.status });
      }
  }

  $scope.$on('$destroy', function() {
    socket.unsyncUpdates('categories');
  });

  this.showInDetails = function (item) {
    _id = item._id;
    $state.go('category-detail', {categories: item}, { location: false });
  };

}

angular.module('mediaboxApp')
  .controller('CategoriesListController', CategoriesListController);

})();
