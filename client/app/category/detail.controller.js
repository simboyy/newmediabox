'use strict';
(function() {

function CategoriesDetailController($http, $state, Toast, $stateParams, ToggleComponent, Settings, $mdDialog, socket) {
  var vm = this;
  vm.myDate = new Date();
  vm.header = 'cat';
  vm.cat = {};
  vm.options = {};
  vm.cat.subcat = [];
  vm.cat.newSubCat = {};
  vm.cat.features = [];
  vm.cat.keyFeatures = [];
  vm.unsavedCategory = $stateParams.categories;
  vm.category = angular.copy($stateParams.categories);
  vm.options.categories = angular.copy($stateParams.categories);

  vm.mediaLibrary = function(index){
    $mdDialog.show({
      template: `<md-dialog aria-label="Media Library" ng-cloak flex="95">
        <md-toolbar class="md-warn">
          <div class="md-toolbar-tools">
            <h2>Media Library</h2>
            <span flex></span>
            <md-button class="md-icon-button" ng-click="cancel()">
              <ng-md-icon icon="close" aria-label="Close dialog"></ng-md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-dialog-content>
            <div class="md-dialog-content"  class="md-whiteframe-z2">
                <md-grid-list class="media-list" md-cols-xs ="3" md-cols-sm="4" md-cols-md="5" md-cols-lg="7" md-cols-gt-lg="10" md-row-height-gt-md="1:1" md-row-height="4:3" md-gutter="12px" md-gutter-gt-sm="8px" layout="row" layout-align="center center">
                  <md-grid-tile ng-repeat="i in media" class="md-whiteframe-z2" ng-click="ok(i.path)">
                		<div class="thumbnail">
                				<img ng-src="{{i.path}}" draggable="false" alt="{{i.name}}">
                		</div>
                    <md-grid-tile-footer><h3>{{i.name}}</h3></md-grid-tile-footer>
                  </md-grid-tile>
                </md-grid-list>
          </div>
        </md-dialog-content>
        <md-dialog-actions layout="row">
          <span flex></span>
          <md-button ng-click="addNewImage()" class="md-warn md-raised">
           Add new Image
          </md-button>
        </md-dialog-actions>
      </md-dialog>
`,
      controller: function($scope, $mdDialog, $http, socket, $state) {
          function handleError(error) { // error handler
            $scope.loading = false;
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

        // Start query the database for the table
        $scope.loading = true;
        $http.get('/api/media/').then(function(res) {
          $scope.loading = false;
          $scope.media = res.data;
          socket.syncUpdates('media', $scope.data);
        }, handleError);

      
        $scope.ok = function(path){
          $mdDialog.hide(path);
        };
        $scope.hide = function() {
          $mdDialog.hide();
        };
        $scope.cancel = function() {
          $mdDialog.cancel();
        };
        $scope.addNewImage = function(){
          $state.go('media');
          vm.save(vm.cat)
          $mdDialog.hide();
        };
      }

    }).then(function(answer) {
      vm.cat.subcat[index].image = answer;
    }, function() {
    });
  }

  // goBack.$inject = ['ToggleComponent'];
  function goBack() {
    ToggleComponent('categories.detailView').close();
    $state.go('^', {}, { location: false });
  }
  vm.goBack = goBack;

  vm.save = function(cat) {
    // refuse to work with invalid data
    if(!cat){
      Toast.show({
        type: 'error',
        text: 'No cat defined.'
      });
      return;
    }
    if('newSubCat' in cat){
      vm.cat.subcat.push(cat.newSubCat);
    }
   
   function success() {
      vm.cat.newSubCat = {};
      Toast.show({
        type: 'success',
        text: 'Category has been updated'
      });
    };

    function err(err) {
      console.log(err);
      if (cat && err) {
      }

      Toast.show({
        type: 'warn',
        text: 'Error while updating database'
      });
    };

    $http.patch('/api/categories/'+cat._id, cat)
    .then(success)
    .catch(err);
  };

  vm.deleteFeature = function(index,cat) {
    vm.cat.features.splice(index, 1);
    vm.save(cat)
  };

  vm.deleteKF = function(index,cat) {
    vm.cat.keyFeatures.splice(index, 1);
    vm.save(cat)
  };

  vm.deleteVariants = function(index,cat) {
    vm.cat.subcat.splice(index, 1);
    vm.save(cat)
  };

}

angular.module('mediaboxApp')
  .controller('CategoriesDetailController', CategoriesDetailController);

})();
