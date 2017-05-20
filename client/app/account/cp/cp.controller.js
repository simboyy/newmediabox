'use strict';

class CpController {
  constructor(Auth,Settings,Toast) {
    this.errors = {};
    this.submitted = false;
    this.Settings = Settings;
    this.Toast = Toast;
    this.Auth = Auth;
  }

  changePassword(form) {
    this.submitted = true;

    if (form.$valid) {
      this.loading = true;

      this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
        .then(() => {
          this.loading = false;
          this.message = 'Password successfully changed.';
        })
        .catch(() => {
          this.loading = false;
          form.password.$setValidity('mongoose', false);
          this.errors.other = 'Incorrect password';
          this.message = '';
        });
    }else{
        this.Toast.show({type: 'info', text: 'Form is not valid. Check your inputs'});
    }
  }
}

angular.module('mediaboxApp')
  .controller('CpController', CpController);
