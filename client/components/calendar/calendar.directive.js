'use strict';

angular.module('mediaboxApp')

  .directive('input', ['$mdDatePicker', '$timeout', function($mdDatePicker, $timeout) {
    return {
      restrict: 'E',
      require: '?ngModel',
      templateUrl: 'components/calendar/calendar.html',
      link: function(scope, element, attrs, ngModel) {
        if ('undefined' !== typeof attrs.type && 'calendar' === attrs.type && ngModel) {
            $timeout(function() {
              var isDate = moment(ngModel.$modelValue).isValid();
              if(isDate){
                ngModel.$setViewValue(moment(ngModel.$modelValue).format('YYYY-MM-DD'));
                ngModel.$render();
              }
            });
          // ngModel.$setViewValue('2013-12-10');
          // ngModel.$render();
          angular.element(element).on('click', function(ev) {
            var isDate = moment(ngModel.$modelValue).isValid();
            if(!isDate){
              ngModel.$modelValue = Date.now();
            }
            $mdDatePicker(ev, ngModel.$modelValue).then(function(selectedDate) {
              $timeout(function() {
                var isDate = moment(selectedDate).isValid();
                if(isDate){
                  ngModel.$setViewValue(moment(selectedDate).format('YYYY-MM-DD'));
                  ngModel.$render();
                }
              });
            });
          });
        }
      }
    }
  }])
  .controller('DatePickerCtrl', ['$scope', '$mdDialog', 'currentDate', '$mdMedia', function($scope, $mdDialog, currentDate, $mdMedia) {
    var self = this;
    this.currentDate = currentDate;
    this.currentMoment = moment(self.currentDate);
    this.weekDays = moment.weekdaysMin();

    $scope.$mdMedia = $mdMedia;
    $scope.yearsOptions = [];
    for (var i = 1970; i <= (this.currentMoment.year() + 100); i++) {
      $scope.yearsOptions.push(i);
    }
    $scope.year = this.currentMoment.year();

    this.setYear = function() {
      self.currentMoment.year($scope.year);
    };

    this.selectDate = function(dom) {
      self.currentMoment.date(dom);
    };

    this.cancel = function() {
      $mdDialog.cancel();
    };

    this.confirm = function() {
      $mdDialog.hide(this.currentMoment.toDate());
    };

    this.getDaysInMonth = function() {
      var days = self.currentMoment.daysInMonth(),
        firstDay = moment(self.currentMoment).date(1).day();

      var arr = [];
      for (var i = 1; i <= (firstDay + days); i++){
        arr.push(i > firstDay ? (i - firstDay) : false);
      }
      return arr;
    };

    this.nextMonth = function() {
      self.currentMoment.add(1, 'months');
      $scope.year = self.currentMoment.year();
    };

    this.prevMonth = function() {
      self.currentMoment.subtract(1, 'months');
      $scope.year = self.currentMoment.year();
    };
  }])

  .factory('$mdDatePicker', ['$mdDialog', function($mdDialog) {
    var datePicker = function(targetEvent, currentDate) {
      var jsDate = moment(currentDate, 'DD-MMM-YYYY').toDate();
      if (!angular.isDate(jsDate)){ currentDate = Date.now(); }
      return $mdDialog.show({
        controller: 'DatePickerCtrl',
        controllerAs: 'datepicker',
        templateUrl: '/modal.datepicker.html',
        targetEvent: targetEvent,
        locals: {
          currentDate: currentDate
        }
      });
    };

    return datePicker;
  }]);
