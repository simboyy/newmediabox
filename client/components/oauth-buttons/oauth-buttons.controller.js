'use strict';

angular.module('mediaboxApp')
  .controller('OauthButtonsCtrl', function($window) {
    this.loginOauth = function(provider) {
      if(provider==='facebook')
        this.facebookLoading = true;
      if(provider==='google')
        this.googleLoading = true;
      if(provider==='twitter')
        this.twitterLoading = true;
      $window.location.href = '/auth/' + provider;
    };
  });
