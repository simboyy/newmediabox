'use strict';

(function() {

class AdminController {
  constructor(User,Settings,appConfig) {
    var userRoles = appConfig.userRoles || [];
    this.options = [
      {field: 'name'},
      {field: 'role', dataType: 'select', options: userRoles}
    ];
    if(Settings.demo)
      this.options.push({field: 'null', heading: 'email (Hidden in demo mode)'})
    else
      this.options.push({field: 'email'})

    this.options.push({field: 'provider', noEdit: true})
    
  }

//   delete(user) {
//     user.$remove();
//     this.users.splice(this.users.indexOf(user), 1);
//   }
}

angular.module('mediaboxApp.admin')
  .controller('AdminController', AdminController);

})();
