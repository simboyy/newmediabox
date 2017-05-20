'use strict';

angular.module('mediaboxApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('campaign', {
        url: '/campaign',
        templateUrl: 'app/campaign/campaign.html',
        controller: 'CampaignController as campaign',
        authenticate: true
      });
  });
