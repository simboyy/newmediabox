'use strict';

angular.module('mediaboxApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('doc', {
        url: '/index',
        templateUrl: 'app/documentation/index.html',
        controller: 'DocumentationCtrl as doc'
      })
      .state('terms', {
        url: '/index/terms',
        templateUrl: 'app/documentation/install.html',
        controller: 'DocumentationCtrl as doc'
      })
      .state('faq', {
        url: '/index/faq',
        templateUrl: 'app/documentation/features.html',
        controller: 'DocumentationCtrl as doc'
      })
      .state('verified-publishers', {
        url: '/index/verified',
        templateUrl: 'app/documentation/use.html',
        controller: 'DocumentationCtrl as doc'
      });
  })
  .directive('docMenu', function($state){
    return {
      restrict: 'E',
      link: function(scope, element, attrs) {
        scope.page = $state.current.name;
      },
      template: `
      <md-toolbar class="md-whiteframe-2dp">
        <div class="md-toolbar-tools navbar" layout="row" layout-align="space-around center">
          <h3><a ui-sref="/">Material Shop</a></h3>
        <md-button ui-sref="docInstall" class="md-raised md-default md-button md-ink-ripple" flex="20" ng-hide="page=='docInstall'"><ng-md-icon icon="now_widgets"></ng-md-icon>Installation</md-button>
        <md-button ui-sref="doc" class="md-raised md-default md-button md-ink-ripple" flex="20" ng-hide="page=='doc'"><ng-md-icon icon="star"></ng-md-icon>Highlights</md-button>
        <md-button ui-sref="docFeatures" class="md-raised md-default md-button md-ink-ripple" flex="20" ng-hide="page=='docFeatures'"><ng-md-icon icon="spellcheck"></ng-md-icon>Features</md-button>
        <md-button ui-sref="docUse" class="md-raised md-default md-button md-ink-ripple" flex="20" ng-hide="page=='docUse'"><ng-md-icon icon="spellcheck"></ng-md-icon>Store Use</md-button>
        <md-button ui-sref="/" class="md-raised md-default md-button md-ink-ripple" flex="20" ng-hide="page=='docBack'"><ng-md-icon icon="spellcheck"></ng-md-icon>Store Demo</md-button>
      </div>
      </md-toolbar>
      `
    };
  })
  .directive('docNav', function($state){
    return {
      restrict: 'E',
      link: function(scope, element, attrs) {
        scope.page = $state.current.name;
      },
      template: `
      <md-button ui-sref="docInstall" class="md-raised md-primary md-button md-ink-ripple" ng-hide="page=='docInstall'"><ng-md-icon icon="now_widgets"></ng-md-icon>Installation</md-button>
        <md-button ui-sref="doc" class="md-raised md-primary md-button md-ink-ripple"   ng-hide="page=='doc'"><ng-md-icon icon="star"></ng-md-icon>Highlights</md-button>
        <md-button ui-sref="docFeatures" class="md-raised md-primary md-button md-ink-ripple" ng-hide="page=='docFeatures'"><ng-md-icon icon="spellcheck"></ng-md-icon>Features</md-button>
      `
    };
  });
