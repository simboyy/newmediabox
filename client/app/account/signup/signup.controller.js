'use strict';

class SignupController {
  constructor(Auth, $state) {
    this.user = {};
    this.errors = {};
    this.submitted = false;
    this.Auth = Auth;
    this.$state = $state;
  }

  register(form) {

    console.log(this.user);
    this.submitted = true;
    if (form.$valid) {
      this.loading = true;
      this.Auth.createUser({
        name: this.user.name,
        email: this.user.email,
        phone: this.user.phone,
        company: this.user.company,
        website: this.user.website,
        role: this.user.role,
        password: this.user.password
      })
      .then(() => {
        // Account created, redirect to home
        this.$state.go('/');
      })
      .catch(err => {
        err = err.data;
        // this.errors = {};
        this.loading = false;
        // Update validity of form fields that match the sequelize errors
        if (err.name) {
          angular.forEach(err.errors, field => {
            // console.log('err',field);
            form[field.path].$setValidity('mongoose', false);
            // this.errors[field] = err.message;
          });
        }
      });
    }
  }
  cancel(){
    this.$state.go('login');
  }
}

angular.module('mediaboxApp')
  .controller('SignupController', SignupController);
