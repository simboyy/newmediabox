'use strict';

angular.module('mediaboxApp')
  .controller('MediasCtrl', function ($scope, Upload, Media ,Auth ,$timeout, $http, socket, $mdDialog, Settings, Toast) {

  $scope.imageDetails = function(img) {
  $mdDialog.show({
    template: `
    <md-dialog aria-label="Image Details Dialog"  ng-cloak>
  <md-toolbar>
    <div class="md-toolbar-tools">
      <h2>Media Details</h2>
      <span flex></span>
      <md-button class="md-icon-button" ng-click="cancel()">
        <ng-md-icon icon="close" aria-label="Close dialog"></ng-md-icon>
      </md-button>
    </div>
  </md-toolbar>
  <md-dialog-content>
    <div class="md-dialog-content">
      <div layout="row" class="md-whiteframe-z2">
        <div class="flexbox-container">
        	<div>
            <img ng-src="{{img.path}}" draggable="false" alt="{{img.name}}" class="detail-image"/>
          </div>
        	<div>
            <ul>
              <li><strong>Media Name:</strong> {{img.originalFilename}}</li>
              <li><strong>Media Size:</strong> {{img.size}}</li>
              <li><strong>Media type:</strong> {{img.type}}</li>
              <li><strong>Media path:</strong> {{img.path}}</li>
              <li><strong>Date Uploaded:</strong> {{img.created_at}}</li>
              <li><strong>Uploaded By:</strong> {{img.uid}}</li>

            </ul>
        	</div>
        </div>
      </div>
  </md-dialog-content>
  <md-dialog-actions layout="row">
    <span flex></span>
    <md-button ng-click="delete(img)" class="md-warn">
     Delete Permanently
    </md-button>
  </md-dialog-actions>
</md-dialog>
`,
    controller: function($scope, Auth , Media ,$mdDialog) {
        $scope.img = img;
        $scope.delete = function(img){
          var confirm = $mdDialog.confirm()
            .title('Would you like to delete the media permanently?')
            .textContent('Media once deleted can not be undone.')
            .ariaLabel('Delete Media')
            .ok('Please do it!')
            .cancel('Cancel');
          $mdDialog.show(confirm).then(function() {
            $http.delete('/api/media/' + img._id).then(function() {
              $mdDialog.hide();
            },handleError);
          }, function() {
            $mdDialog.hide();
          });
        }
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
    }
  }).then(function(answer) {
    $scope.alert = 'You said the information was "' + answer + '".';
  }, function() {
    $scope.alert = 'You cancelled the dialog.';
  });
  }
    // Start query the database for the table
    $scope.loading = true;

    Media.pub.query(function(res) {
      console.log(res);
      $scope.loading = false;
      $scope.data = res;
      socket.syncUpdates('media', $scope.data);
    });

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
    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });
    $scope.$watch('file', function () {
        if ($scope.file != null) {
            $scope.files = [$scope.file];
        }
    });
    $scope.log = '';

    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              if (!file.$error) {
                Upload.upload({
                    url: 'api/media',
                    data: {
                      username: $scope.username,
                      file: file
                    }
                }).then(function (resp) {
                    $timeout(function() {
                        $scope.log = 'file: ' +
                        resp.config.data.file.name +
                        ', Response: ' + JSON.stringify(resp.data) +
                        '\n' + $scope.log;
                        $scope.result = resp.data;
                    });
                }, function (response) {
                    if (response.status > 0) {
                        $scope.errorMsg = response.status + ': ' + response.data;
                    }
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 *
                    		evt.loaded / evt.total);
                    $scope.log = 'progress: ' + progressPercentage +
                    	'% ' + evt.config.data.file.name + '\n' +
                      $scope.log;
                    $scope.progress =
                          Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
              }
            }
        }
    };
});
