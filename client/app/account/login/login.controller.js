'use strict';

class LoginController {
  constructor(Auth, $state) {
    this.user = {email: 'admin@codenx.com', password: 'codenx'};
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
    this.$state = $state;
  }

  login(form) {
    this.submitted = true;
    
    if (form.$valid) {
      this.loading = true;
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
      .then(() => {
        if(!angular.isUndefined(this.$state.params.referrer)){
          this.$state.go(this.$state.params.referrer);
        }else{
          this.$state.go('/');
        }
      })
      .catch(err => {
        this.errors.other = err.message;
        this.loading = false;
      });
    }
  }
}

angular.module('mediaboxApp')
  .controller('LoginController', LoginController);
