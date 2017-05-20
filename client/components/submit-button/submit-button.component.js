'use strict';
(function(){
class submitButtonComponent {
  /*@ngInject*/
  constructor($timeout) {

  }
}

angular.module('mediaboxApp')
  .component('submitButton', {
    template: `
    <div layout="column" layout-align="center stretch">
	    <md-button type="submit" class="md-raised circular-progress-button md-primary" ng-disabled="!$ctrl.form.$valid || $ctrl.loading" aria-label="{{$ctrl.text}}">
				<span  layout="row" layout-align="center center">
					<ng-md-icon icon="lock" ng-hide="$ctrl.loading"></ng-md-icon>
					<md-progress-circular md-mode="indeterminate" md-diameter="25" ng-show="$ctrl.loading" class="md-accent md-hue-1"></md-progress-circular>
					<span flex>{{$ctrl.text}}</span>
				</span>
	    </md-button>
		</div>
    `,
    bindings: { 
      loading: '<', // Read only
      form: '<', // String
      text: '@?' // 2way
    },
    controller: submitButtonComponent
})
})();

