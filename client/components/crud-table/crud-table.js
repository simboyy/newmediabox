'use strict';

angular.module('mediaboxApp')
.directive('crudTable', function ($http,$state) {
  return {
    templateUrl: 'components/crud-table/main.html',
    restrict: 'E',
    scope: {api:'@', columns: '=options'},
    transclude:true,
    link: function (scope, element, attrs) {
      var obj = [];
      var columns = scope.columns;
      angular.forEach(columns, function(i){
        var o = {};
        // Extract sortType from dataType
        if(i.dataType==='numeric' || i.dataType==='number' || i.dataType==='float' || i.dataType==='integer' || i.dataType==='currency') {
          i.dataType = 'parseFloat';
          o.sortType = 'parseFloat';
        }else if(i.dataType==='date' || i.dataType==='calendar'){
          i.dataType = 'date';
          o.sortType = 'date';
        }else if(i.dataType==='dropdown' || i.dataType==='select' || i.dataType==='option'){
          i.dataType = 'dropdown';
          o.sortType = 'lowercase';
        }else if(i.dataType==='textarea' || i.dataType==='multiline'){
          i.dataType = 'textarea';
          o.sortType = 'lowercase';
        }else if(i.dataType==='image' || i.dataType === 'photo' || i.dataType==='picture'){
          i.dataType = 'image';
          o.sortType = 'lowercase';
        }else{
          o.sortType = 'lowercase';
        }
        // check heading (Assign heading if not exists)
        if('heading' in i) {
          o.heading = i.heading;
        }else if('title' in i){
          o.heading = i.title;
        }else{
          o.heading = i.field;
        }

        // Assign fields to object
        o.field = i.field;
        // o.sort = attrs.sort; // The field where the sort=true
        o.noSort = i.noSort;
        o.noAdd = i.noAdd;
        o.noEdit = i.noEdit;
        o.dataType = i.dataType;
        o.options = i.options;

        obj.push(o);
      });
      $state.go('crud-table', {api:attrs.api, options: attrs, columns: obj}, { location: false });
    }
  };
});
