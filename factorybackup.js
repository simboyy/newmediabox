'use strict';

angular.module('mediaboxApp')
.factory('Product', ['$resource', function($resource) {
    var obj = {};
    obj = $resource('/api/products/:id', null, {'update': { method:'PUT' } });
    obj.count = $resource('/api/products/count');
    obj.pr = $resource('/api/products/priceRange');
    return obj;
}])

.factory('Shipping', ['$resource', function($resource) {
    var obj = {};
    obj = $resource('/api/shippings/:id', null, {'update': { method:'PUT' }});
    obj.best = $resource('/api/shippings/best', null, {'update': { method:'PUT' }});
    return obj;
}])

.factory('Category', ['$resource', function($resource) {
  var obj = {};
  obj = $resource('/api/categories/:id', null, {
  'update':   {method:'PUT'},
  'query':  {method:'GET', isArray:true}});
  obj.loaded = $resource('/api/categories/loaded');
  obj.tree = $resource('/api/categories/tree');
  return obj;
}])
.factory('Cat', ['$resource', function($resource) {
  var obj = {};
  obj = $resource('/api/cats/:id', null, {'update': { method:'PUT' }});
  obj.headings = $resource('/api/cats/headings');
  return obj;
}])
.factory('Country', ['$resource', function($resource) {
  var obj = {};
  obj = $resource('/api/countries/:id', null, {'update': { method:'PUT' }});
  obj.active = $resource('/api/countries/active', null, {'update': { method:'PUT' }});
  return obj;
}])
.factory('Brand', ['$resource','$rootScope', function($resource ,$rootScope) {
   var obj = {};

     var pageFlag = $rootScope.page;
     

   if(pageFlag == "OnlineStore"){

    }else if (pageFlag == "magazines") {

     return $resource('/api/brandmgs/:id', null, {'update': { method:'PUT' } });

    }else if (pageFlag == "Ticketing") {
      
      return $resource('/api/brands/:id', null, {'update': { method:'PUT' } });

    }else if (pageFlag == "television") {

      return $resource('/api/brandtvs/:id', null, {'update': { method:'PUT' } });
          
    }else{

      return $resource('/api/brands/:id', null, {'update': { method:'PUT' } });
    }
  
}])

.factory('BrandMG', ['$resource', function($resource) {
  return $resource('/api/brandmgs/:id', null, {'update': { method:'PUT' } });
}])

.factory('BrandTV', ['$resource', function($resource) {
  return $resource('/api/brandtvs/:id', null, {'update': { method:'PUT' } });
}])
.factory('Coupon', ['$resource', function($resource) {
  return $resource('/api/coupons/:id', null, {'update': { method:'PUT' } });
}])
.factory('Address', ['$resource', function($resource) {
  var obj = {};
  obj = $resource('/api/address/:id', null, {'update': { method:'PUT' } });
  obj.my = $resource('/api/address/my', null);
  return obj;
}])
.factory('Feature', ['$resource', function($resource) {
  var obj = {};
  obj = $resource('/api/features/:id', null, {'update': { method:'PUT' } });
  obj.group = $resource('/api/features/group', null, {'update': { method:'PUT' }});
  return obj;
}])

.factory('KeyFeature', ['$resource', function($resource) {
  var obj = {};
  obj = $resource('/api/keyfeatures/:id', null, {'update': { method:'PUT' } });
  obj.group = $resource('/api/keyfeatures/group', null, {'update': { method:'PUT' }});
  return obj;
}])


.factory('Media', ['$resource', function($resource) {
  var obj = {};
  obj = $resource('/api/media/:id', null, {'update': { method:'PUT' } });
  obj.my = $resource('/api/media/my/:id', null, {'update': { method:'PUT' } });
  obj.pub = $resource('/api/media/pub/:id', null, {'update': { method:'PUT' } });
  return obj;
}])

 .factory('Statistic', ['$resource', function($resource) {
    var obj = {};
    obj = $resource('/api/statistics/:id', null, {'update': { method:'PUT' } });
    obj.group = $resource('/api/statistics/group', null, {'update': { method:'PUT' }});
    return obj;
  }])
.factory('PaymentMethod', ['$resource', function($resource) {
  var obj = {};
  obj = $resource('/api/PaymentMethods/:id', null, {'update': { method:'PUT' } });
  obj.active = $resource('/api/PaymentMethods/active', null, {'update': { method:'PUT' }});
  return obj;
}])
.factory('Order', ['$resource', function($resource) {
  var obj = {};
  obj = $resource('/api/orders/:id', null, {'update': { method:'PUT' } });
  obj.my = $resource('/api/orders/my', null, {'update': { method:'PUT' }});
  obj.pub = $resource('/api/orders/pub', null, {'update': { method:'PUT' }});
  return obj;
}])

.factory('Campaign', ['$resource', function($resource) {
  var obj = {};
  obj = $resource('/api/campaigns/:id', null, {'update': { method:'PUT' } });
  obj.my = $resource('/api/campaigns/my', null, {'update': { method:'PUT' }});
  obj.pub = $resource('/api/campaigns/pub', null, {'update': { method:'PUT' }});
  return obj;
}])
.factory('Pay', ['$resource', function($resource) {
  var obj = {};
  obj = $resource('/api/pay/:id', null, {'update': { method:'PUT' } });
  obj.prepare = $resource('/api/pay/prepare');
  obj.stripe = $resource('/api/pay/stripe');
  obj.paynow = $resource('/api/pay/paynow');
  return obj;
}])
.factory('Review', ['$resource', function($resource) {
  var obj = {};
  obj = $resource('/api/reviews/:id', null, {'update': { method:'PUT' } });
  obj.my = $resource('/api/reviews/my');
  return obj;
}])
.factory('Wishlist', ['$resource', function($resource) {
  var obj = {};
  obj = $resource('/api/wishlists/:id', null, {'update': { method:'PUT' } });
  obj.my = $resource('/api/wishlists/my');
  return obj;
}])
.factory('Mail', ['$resource', function($resource) {
  return $resource('/api/sendmail/:id');
}])

.factory('Customers', ['$resource', function($resource) {
    return $resource('../../Content/customers.json');
}])
.factory('ProductDetails', ['$resource', function($resource) {
    return $resource('../../Content/product-details.json');
}])
.factory('EmployeeList', ['$resource', function($resource) {
    return $resource('../../Content/employees-list.json');
}])
.factory('EmployeeSales', ['$resource', function($resource) {
    return $resource('../../Content/employee-sales.json');
}])
.factory('EmployeeTeamSales', ['$resource', function($resource) {
    return $resource('../../Content/employee-and-team-sales.json');
}])
.factory('EmployeeAverageSales', ['$resource', function($resource) {
    return $resource('../../Content/employee-average-sales.json');
}])
.factory('EmployeeQuarterSales', ['$resource', function($resource) {
    return $resource('../../Content/employee-quarter-sales.json');
}])
.factory('ProductSales', ['$resource', function($resource) {
    return $resource('../../Content/product-sales.json');
}])
.factory('Orders', ['$resource', function($resource) {
    return $resource('../../Content/orders.json');
}])
.factory('OrderInformation', ['$resource', function($resource) {
    return $resource('../../Content/order-information.json');
}])
.factory('CountryCustomers', ['$resource', function($resource) {
    return $resource('../../Content/country-customers.json');
}])
.factory('TopSellingProducts', ['$resource', function($resource) {
    return $resource('../../Content/top-selling-products.json');
}])
.factory('scale', function() {
    return 0;//chroma.scale(["#ade1fb", "#097dc6"]).domain([1, 100]);
})
.factory('OrderDetails', ['$resource', function($resource) {
    return $resource('../../Content/order-details.json');
}]);