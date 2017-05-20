'use strict';

angular.module('mediaboxApp.auth', [
  'mediaboxApp.constants',
  'mediaboxApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
