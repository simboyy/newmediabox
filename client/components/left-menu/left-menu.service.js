(function () {
	'use strict';

	angular
		.module('mediaboxApp')
		.factory('PageOptions', PageOptions);

	function PageOptions() {
    var obj = {};
 	  obj.leftmenu = false;
 	  return obj;
  }
})();
