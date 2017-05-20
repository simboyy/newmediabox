'use strict';

angular.module('mediaboxApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('medias', {
        url: '/medias',
        templateUrl: 'app/medias/medias.html',
        controller: 'MediasCtrl',
        authenticate: 'true'
      });
  });
