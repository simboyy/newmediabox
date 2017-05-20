'use strict';

angular.module('mediaboxApp')
.filter('localPrice', function(Settings, $filter) {
      return function(input, key) {
        var input = Math.round((input / Settings.currency.exchange_rate)*100)/100;
        if(!input){ return 0; }
        if(parseFloat(input) != 0){
            return $filter('currency')(input,Settings.currency.symbol);
        }
        return $filter('currency')(input);
      }
  })
  .filter('pluralize', function() {
    return function(noun, key) {
        var plural = noun;
        if (noun.substr(noun.length - 2) == 'us') {
          plural = plural.substr(0, plural.length - 2) + 'i';
        } else if (noun.substr(noun.length - 2) == 'ch' || noun.charAt(noun.length - 1) == 'x' || noun.charAt(noun.length - 1) == 's') {
          plural += 'es';
        } else if (noun.charAt(noun.length - 1) == 'y' && ['a','e','i','o','u'].indexOf(noun.charAt(noun.length - 2)) == -1) {
          plural = plural.substr(0, plural.length - 1) + 'ies';
        } else if (noun.substr(noun.length - 2) == 'is') {
          plural = plural.substr(0, plural.length - 2) + 'es';
        } else {
          plural += 's';
        }
        return plural;
      }
    })

.filter('unique', function() {
      return function(input, key) {
          var unique = {};
          var uniqueList = [];
          for(var i = 0; i < input.length; i++){
              if(typeof unique[input[i][key]] === 'undefined'){
                  unique[input[i][key]] = '';
                  uniqueList.push(input[i]);
              }
          }
          return uniqueList;
      };
  })
  .filter('labelCase', [function(){
      return function(input){
        if(!input){
          return input;
        }else{
          input = input.replace(/([A-Z])/g, ' $1');
          return input[0].toUpperCase() + input.slice(1);
        }
      };
  }])
  .filter('camelCase', [function(){
    return function(input){
      if(!input){
        return input;
      }else{
        return input.toLowerCase().replace(/ (\w)/g, function(match, letter){
          return letter.toUpperCase();
        });
      }
    };
  }])

  .filter('reverse', [function() {
    return function(items) {
      if(items){
        return items.slice().reverse();
      }else{
        return items;
      }
    };
  }]);
