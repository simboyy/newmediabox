'use strict';
(function() {
angular.module('mediaboxApp')
.constant('Settings', {
  demo: false,
  country: {
    name:'Zimbabwe', 
    code: 'ZW' // must be 2 digit code from the list https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2 
  },
  handlingFee:'5 %',
  currency: {
    code: 'USD', // Paypal currency code *** Please choose from https://developer.paypal.com/docs/classic/api/currency_codes/
    shop_currency: 'USD',
    symbol: '$ ', // Currency symbol to be displayed through out the shop
    exchange_rate: '1' // Paypal currency code(USD) / Shop currency (INR) ***  exchange_rate should not be 0 else it will generate divided by 0 error
  }, 
  paymentStatus: ['Pending','Paid','created'], // On success from Paypal it stores as created
  orderStatus: ['Payment Pending','Order Placed','Order Accepted','Order Executed','Shipped','Delivered','Cancelled','Not in Stock'],
  campaignStatus: ['Creative Pending','Campaign Placed','Campaign Ready','Campaign Accepted','Campaign Executed','Campaign Completed','Campaign Rejected'],
  menu: {
    pages : [ // Main menu8
      {text:'Transaction History', url: 'order', authenticate: true, icon: 'account_balance'},
      {text:'Manage Orders', url: 'orders', authenticate: true, role: 'manager', icon: 'shopping_basket'},
      {text:'Campaign Management', url: 'campaigns', authenticate: true, role: 'manager',icon: 'chrome_reader_mode'},
      {text:'Campaigns', url: 'campaign', authenticate: true, icon: 'perm_media'},
      {text:'Profile', url: 'address', authenticate: true, icon: 'directions'},
      //{text:'Reviews', url: 'review', authenticate: true, role: 'admin',icon: 'star'},
      //{text:'Moderate Reviews', url: 'reviews', authenticate: true, role: 'admin', icon: 'star'},
      //{text:'Wishlist', url: 'wish', authenticate: true, role: 'admin',icon: 'favorite'},
      {text:'My Library', url: 'media', authenticate: true, icon: 'photo_library'},
      {text:'Media Library', url: 'medias', authenticate: true,  role: 'manager', icon: 'photo_library'},
      {text:'Inventory', url: 'product', authenticate: true, role: 'manager', icon: 'style'},
      //{text:'Industry', url: 'brand', authenticate: true, role: 'admin', icon: 'verified_user'},
     // {text:'Categories', url: 'category', authenticate: true, role: 'admin', icon: 'subject'},
      //{text:'Coupons', url: 'coupon', authenticate: true, role: 'admin', icon: 'receipt'},
      //{text:'Features', url: 'feature', authenticate: true, role: 'admin', icon: 'spellcheck'},
      //{text:'Payment Methods', url: 'payment-method', authenticate: true, role: 'admin', icon: 'payment'},
      //{text:'Shippings', url: 'shipping', authenticate: true, role: 'admin', icon: 'local_shipping'}
    ],
    user : [ // Separate panel for user management tasks for both admin and user
     /// {text:'Users', url: 'admin', authenticate: true, role: 'admin', icon: 'perm_identity'},
      {text:'Change Password', authenticate: true, url: 'cp', icon: 'settings_applications'},
      {text:'logout', authenticate: true, url: 'logout', icon: 'logout'}
    ]    
  }
});
})();
