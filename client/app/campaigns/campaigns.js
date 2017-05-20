'use strict';

angular.module('mediaboxApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('campaigns', {
        url: '/campaigns',
        templateUrl: 'app/campaigns/campaigns.html',
        controller: 'CampaignsController as campaigns',
        authenticate: 'manager'
      });
  });
