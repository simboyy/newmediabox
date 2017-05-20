'use strict';

angular.module('mediaboxApp')
  .config(function($stateProvider) {
    // login, signup are used for emergency situations otherwise LoginModal
    $stateProvider
      .state('login', {
        url: '/login?referrer',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginController',
        controllerAs: 'login',
        title:'Login to Mediabox'
      })
      .state('logout', {
        url: '/logout?referrer',
        referrer: '/',
        template: '',
        controller: function($state, Auth) {
          Auth.logout();
          $state.go('/');
        }
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupController',
        controllerAs: 'signup',
        title:'Signup for Mediabox'
      })
      .state('forgot', {
        url: '/forgot?email',
        templateUrl: 'app/account/password/forgot.html',
        controller: 'PasswordController',
        controllerAs: 'forgot',
        title:'Password Recovery'
      })
      .state('reset', {
        url: '/reset/:token',
        templateUrl: 'app/account/password/reset.html',
        controller: 'PasswordController',
        controllerAs: 'reset',
        title:'Reset Password'
      })
      .state('cp', {
        url: '/change-password',
        templateUrl: 'app/account/cp/cp.html',
        controller: 'CpController',
        controllerAs: 'cp',
        title:'Change Password',
        authenticate: true
      });
  })
  .run(function($rootScope, Auth) {
    $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
      if (next.name === 'logout' && current && current.name && !current.authenticate) {
        next.referrer = current.name;
      }
    });

    $rootScope.$on('$stateChangeSuccess', function (evt, toState) {
      if(toState.title){
        window.document.title = toState.title + ' - Mediabox';
      }else if(toState.name != 'crud-table'){
        var input = toState.name;
        input = input.replace(/([A-Z])/g, ' $1');
        input = input[0].toUpperCase() + input.slice(1);
        window.document.title = input + ' - Mediabox';
      }
    });
  });
