'use strict';

(function() {

function authInterceptor($q, $cookies, $injector, Util, Settings) {
  var state;
    
  return {
    // Add authorization token to headers
    request(config) {
      config.headers = config.headers || {};
      if(Settings.demo){
        if(config.method==='PATCH' ||config.method==='PUT' || config.method==='POST' || config.method==='DELETE'){
          var allowedURL = (config.url === '/auth/local') 
          || (config.url.match('api/users/*')) // Allow login, signup, change-password, forgot, reset ** User Deletion blocked at admin page
          || (config.url === '/api/orders') 
          || (config.url === '/api/reviews') 
          || (config.url === '/api/wishlists') 
          || (config.url === '/api/pay/stripe') 
          || (config.url === '/api/sendmail') 
          || (config.url.match('/api/address/*'))
          if(!allowedURL || config.method==='DELETE' || config.data.role){ // Do not allow delete in demo mode
            var response = {type: 'demo', text: 'Demo Mode: Unable to save', message: 'Demo Mode: Unable to save', data: 'Demo Mode: Unable to save'}
            $injector.get('Toast').show(response);
            return $q.reject(response);
          }
        }
      }
      if ($cookies.get('token') && Util.isSameOrigin(config.url)) {
        config.headers.Authorization = 'Bearer ' + $cookies.get('token');
      }
      return config;
    },

    // Intercept 401s and redirect you to login
    responseError(response) {
      // console.log('error at auth interceptor', response)
      if (response.status === 401) {
          // $injector.get('Toast').show({type: 'error', text: response.statusText});
          if(response.config.url!=="/auth/local") // If the request is not from login modal page
            $injector.get('LoginModal').show('/'); // Causes circular dependency

        // (state || (state = $injector.get('$state'))).go('login');
        // remove any stale tokens
        $cookies.remove('token');
      }
      return $q.reject(response);
    }
  };
}

angular.module('mediaboxApp.auth')
  .factory('authInterceptor', authInterceptor);

})();
