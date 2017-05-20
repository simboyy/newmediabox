'use strict';

angular.module('mediaboxApp', [
  'mediaboxApp.auth',
  'mediaboxApp.admin',
  'mediaboxApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngMessages',
  'btford.socket-io',
  'ui.router',
  'validation.match',
  'ngMaterial',
  'ngAnimate',
  'ngMdIcons',
  'angularMoment',
  'infinite-scroll',
  'materialDatePicker',
  'ngFileUpload',
  'rzModule',
  'darthwade.dwLoading',
  'ui.tree',
  'ui.odometer',
  'oitozero.ngSweetAlert',
  'naif.base64',
  'ngPintura',
  'ngOnload',
  'kendo.directives',
  'ui.calendar', 
  'ui.bootstrap',
  'daterangepicker'
])
.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $urlMatcherFactoryProvider, $mdThemingProvider, $mdIconProvider) {
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);

  // set the default palette name
  var defaultPalette = 'blue';
  // define a palette to darken the background of components
  var greyBackgroundMap = $mdThemingProvider.extendPalette(defaultPalette, {'A100': 'fafafa'});

  $mdThemingProvider.definePalette('grey-background', greyBackgroundMap);
  $mdThemingProvider.setDefaultTheme(defaultPalette);

  // customize the theme
  $mdThemingProvider
    .theme(defaultPalette)
    .primaryPalette(defaultPalette)
    .accentPalette('pink')
    .backgroundPalette('grey-background');

  // var spritePath = 'bower_components/material-design-icons/sprites/svg-sprite/';
  // $mdIconProvider.iconSet('navigation', spritePath + 'svg-sprite-navigation.svg');
  // $mdIconProvider.iconSet('image', spritePath + 'svg-sprite-image.svg');
  // $mdIconProvider.iconSet('action', spritePath + 'svg-sprite-action.svg');
  // $mdIconProvider.iconSet('content', spritePath + 'svg-sprite-content.svg');
  // $mdIconProvider.iconSet('toggle', spritePath + 'svg-sprite-toggle.svg');
  // $mdIconProvider.iconSet('alert', spritePath + 'svg-sprite-alert.svg');
  // $mdIconProvider.iconSet('social', spritePath + 'svg-sprite-social.svg');
  // $mdIconProvider.iconSet('avatar', '../assets/iconsets/avatar-icons.svg', 128);
  // $mdIconProvider.defaultIconSet(spritePath + 'svg-sprite-alert.svg');
})
.controller('preLoaderCtrl', function($scope){
  $scope.siteLoaded = true
});

