'use strict';

angular.module('mediaboxApp')
  .controller('DocumentationCtrl', function () {
    this.topFeatures = [
      {h: 'PayPal Shopping Cart', p: 'Enter your paypal app ID into settings, add products and start selling with no matter of time. This has got inbuilt multi currency support with curency conversion feature', i: 'assets/images/paypal.png'},
      {h: 'MEAN Stack', p: 'Developed using the most popular MEAN(MongoDB + Express + Angular + Node) which has a RestAPI based architecture with high scallability.', i: 'assets/images/mean.png'},
      {h: 'Authentication', p: 'Inbuilt authentication mechanism with role based user access and user management', i: 'assets/images/user-roles.png'},
      {h: 'Material Design', p: 'Most of the components are based on Google Material designe guidelines which gives you a responsive, bold and accessible design with great amount of user interactivity', i: 'assets/images/material-design.png'},
      {h: 'Emails', p: 'Integration of emails at diffent levels like Order Placement, Forgot/Reset password gives a secure as well as informative feeling', i: 'assets/images/email.png'},
      {h: 'Modular Code', p: 'The modular application structure gives you enormous ability to modify, test and deploy easily', i: 'assets/images/code.png'}
    ]
    this.why = [
      {h: 'Drag and drop category selection', i: 'playlist_add', c: 'fill: #FF5722'},
      {h: 'AngularJS Shopping Cart', i:'shopping_basket',c:'fill:#DE140E'},
      {h: 'Local + OAUTH login', i: 'lock_outline', c: 'fill: #2196F3'},
      {h: 'Email integration', i: 'email', c: 'fill: #FABD0E'},
      {h: 'PayPal Checkout', i: 'account_balance_wallet', c: 'fill: #795548'},
      {h: 'Material Design', i: 'devices', c: 'fill: #ab47bc'},
      {h: 'CRUD Generator', i: 'settings', c: 'fill: #3949ab'},
      {h: 'Image uploader', i: 'collections', c: 'fill: #8bc34a'},
      {h: 'ReST API based backend', i: 'http', c: 'fill: #26a69a'}
    ]

    this.future = [
      {h2: 'Multivendor',p:'Support for multiple vendors where each vendor will have their own profile to mange their orders'}
     ,{h2: 'Social Media',p:'Integration of social info profile of each customer'}
     ,{h2: 'Backorders',p:'Shoppers can order an item even if stock is 0'}
     ,{h2: 'Additional Payment Methods',p:'Support for more payment methods e.g. Stripe, Credit Card.'}
     ,{h2: 'Inventory Mangement',p:'The store owner can manage inventory with automated replenishment orders'}
     ,{h2: 'SMS Integration',p:'SMS for each important transaction performed'}
     ,{h2: 'Hotkeys',p:'Keyboard Shortcuts for regular tasks'}
     ,{h2: 'Reviews',p:'Product Reviews and Comments'}
     ,{h2: 'Ratings',p:'Product Ratings feature'}
     ,{h2: 'Tax Management',p:'Integrated Tax Manager'}
     ,{h2: 'Theming',p:'Advanced theming support for the whole website'}
     ,{h2: 'Static Page Management',p:'Create and edit static pages, such as Contact, About, or Support.'}
     ,{h2: 'Returns and Refunds',p: 'Adminster and manage returns and refunds.'}

    ]
    
    this.newFeatures = [
      {h2: 'Coupons',p:'Ability yo manage discount coupons on cart total',i:'settings'}
     ,{h2: 'Media Management',p:'With integrated drag and drop image upload its easy to manage the images for the whole shop'}
     ,{h2: 'NodeJS Module',p:'ES6 module structure for serve side programming.'}
     ,{h2: 'Order Management',p:'PayPal integration with orders'}
     ,{h2: 'User Roles',p:'Role based user management for both client and server side e.g. User, Manager, Administrator'}
     ,{h2: 'Email Integration',p:'Now an email is sent as soon as a order is placed or payment failed'}
     ,{h2: 'Material Design',p:'Mobile Centered Material Designed components with accessibility support'}
     ,{h2: 'New Design Principle',p:'Flex based page design principle'}
     ,{h2: 'CRUD Table',p:'Free Material CRUD Table module comes with this Material Shop'}
     ,{h2: 'Image Selector',p:'Directly select image for a product from the media gallery'}
     ,{h2: 'Cloning',p:'Now Clone any brand, country, shipping, coupon to save time'}
     ,{h2: 'Multi Level Category',p:'Drag and drop category management upto 10 levels'}
     ,{h2: 'Multi Currency',p:'Support for additional currencies beyond US Dollars from a single settings page'}
     ,{h2: 'Forgot Password',p:'Forgotten password of a user or shop manager can be retrieved with a encryption based email service'}
     ,{h2: 'Contact Page',p:'A tiny little popup window for anybody to reach the store owner with any grievance or suggestions'}
     ,{h2: 'PayPal',p:'Now PayPal integration is more powerful with the managed payment status'}
     ,{h2: 'Search',p:'Auto-suggest, keyword product search.'}
    ]
    
    this.storeFrontFeatures = [
      {h2: 'MEAN',p:'The MEAN Stack ecommerce with Material Design'}
      ,{h2: 'AngularJS',p:'A whole ecommerce application created using AngularJS as front end'}
      ,{h2: 'NodeJS',p:'The backend (server side) is backed with the awesome NodeJS framework for better speed and wide extensions support with a very large community base'}
      ,{h2: 'MongoDB',p:'The document based No_SQL database used for faster communication and more efficiency'}
      ,{h2: 'Modular',p:'Industry standard application module structure'}
      ,{h2: 'Single Page',p:'SPA(Single Page App) created with the power of AngularJS and ui-router'}
      ,{h2: 'One Page Checkout',p:'Instant and single page advance checkout system'}
      ,{h2: 'SocketIO',p:'Now every activity by a user or shop manger is reflected in realtime across the web app(without page reloads)'}
      ,{h2: 'Acive/Inactive',p:'Option to save inactive product for publishing later'}
      ,{h2: 'Product Variants',p:'Option to add multiple variants of a single product with different price, size and image'}
      ,{h2: 'Product Features',p:'Additional product details in key/value list'}
      ,{h2: 'Featured Product Details',p:'More product details in key/value list which need to be highlighted in the product details page'}
      ,{h2: 'Cross Platform',p:'Cross Platform development setup with efficient with gulp, bower, npm'}
      ,{h2: 'Product Category',p:'Category wise product details'}
      ,{h2: 'Filters',p:'Advanced features like Multiple brands selector, Prodcut type filter, price slider'}
      ,{h2: 'OAUTH',p:'Integrated social media login'}
      ,{h2: 'Passwords',p:'Reset and Change Password option'}
      ,{h2: 'Infinite Scroll',p:'Automatically load more products on scroll without the need of pagination'}
      ,{h2: 'SEO friendly',p:'SEO friendly URLs for each page'}
      ,{h2: 'Assistive Technology',p:'Ready for screen readers for improved assistive'}
      ,{h2: 'Contact Form',p:'Email service for queries/suggestions/grievances through popup contact form'}
    ]

    this.storeBackFeatures = [
      {h2: 'Manage Backoffice',p:'Products, Categories, Brand, Order Management from admin panel with easy directives'}
      ,{h2: 'Order Management',p:'Manage Order and Change Status from admin panel'}
      ,{h2: 'Product Variants',p:'Facility for Multiple product variants (size, color, price, image)'}
      ,{h2: 'User roles',p:'- Administrator, User, Manager'}
      ,{h2: 'Quality Code',p:'Secure and quality code - Takes care all single page web app standards'}
      ,{h2: 'Secure',p:'Securely built and prevent security attacks'}
      ,{h2: 'CRUD Generator',p:'Generates CRUD(Create, Read, Update, Delete) pages automatically from database.'}
      ,{h2: 'ReST API',p:'NodeJS based ReST API architecture'}
      ,{h2: 'Date picker',p:'Integrated material designed date picker for date fields'}
      ,{h2: 'Modular Code',p:'Code is Modular, Maintainable, Well Structured, Easy to customize, Production Ready'}
      ,{h2: 'HTML Components Generator',p:'Automatically generates dropdowns, datepickers, number field, toggle switch based on field types'}
      ,{h2: 'Exportable',p:'Easily export the table as Excel, JSON, txt format'}
    ]
  });
