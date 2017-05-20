'use strict';

  function ShoppingCart(cartName, Settings, Shipping, Order, Mail, Pay, appConfig, $state) {
      this.cartName = cartName;
      this.clearCart = false;
      this.flag =  false;
      this.pflag =  false;
      this.checkoutParameters = {};
      this.items = [];
      this.skuArray = [];
      this.variantsArray = [];
      this.totalWeight = 0;
      this.taxRate = 10;
      this.tax = null;
      this.campaignName = "";
      this.objectives = "";
      this.startDate = "";
      this.endDate = "";
      this.products = null;
      this.totalSpend = null;
      this.spendStats = null;
      this.age = [];
      this.income = [];
      // load items from local storage when initializing
      this.loadItems();

      this.Settings = Settings;
      this.Shipping = Shipping;
      this.Order = Order;
      this.Mail = Mail;
      this.Pay = Pay;
      this.appConfig = appConfig;
      this.$state = $state;
  }

    //----------------------------------------------------------------
    // items in the cart
    //
    function CartItem(sku, name, slug, mrp, price, quantity, image, category, size, weight,status,publisher,publisheruid,advertiser,uid ,vid) {
        this.sku = sku;
        this.name = name;
        this.slug = slug;
        this.image = image;
        this.category = category;
        this.size = size;
        this.mrp = mrp;
        this.price = price * 1;
        this.quantity = quantity * 1;
        this.weight = weight ;
        this.status = status;
        this.publisher = publisher;
        this.publisheruid = publisheruid;
        this.advertiser = advertiser;
        this.uid = uid;
        this.vid = vid;
        this.status = 0;
    }

    //----------------------------------------------------------------
    // checkout parameters (one per supported payment service)
    // replaced this.serviceName with serviceName because of jshint complaint
    //
    function checkoutParameters(serviceName, merchantID, options) {
        this.serviceName = serviceName;
        this.merchantID = merchantID;
        this.options = options;
    }

  // load items from local storage
  ShoppingCart.prototype.loadItems = function () {
      var items = localStorage !== null ? localStorage[this.cartName + '_items'] : null;
      if (items !== null && JSON !== null) {
          try {
              items = JSON.parse(items);
              for (var i = 0; i < items.length; i++) {
                  var item = items[i];
                  
                  if(this.pflag){
                    if (item.sku !== null && item.name !== null && item.price !== null) {
                      item = new CartItem(item.sku, item.name, item.slug, item.mrp, item.price, item.quantity, item.image, item.category , item.size, item.weight, item.status, item.publisher,item.publisheruid,item.advertiser,item.uid ,item.vid);
                      this.items.push(item);
                      this.skuArray.push(item.sku);
                      this.variantsArray.push(item.vid);
                      // this.totalWeight = item.weight;
                  }else{
                    if (item.sku !== null && item.name !== null ) {
                      item = new CartItem(item.sku, item.name, item.slug, item.mrp, item.price, item.quantity, item.image, item.category , item.size, item.weight, item.status, item.publisher,item.publisheruid,item.advertiser,item.uid ,item.vid);
                      this.items.push(item);
                      this.skuArray.push(item.sku);
                      this.variantsArray.push(item.vid);
                      // this.totalWeight = item.weight;
                  }
                  }
                  }
              }

          }
          catch (err) {
              // ignore errors while loading...
          }
      }
  };

  // save items to local storage
  ShoppingCart.prototype.saveItems = function () {
      if (localStorage !== null && JSON !== null) {
          localStorage[this.cartName + '_items'] = JSON.stringify(this.items);
      }
  };

  // adds an item to the cart
  ShoppingCart.prototype.addItem = function (product,quantity) {

    if(this.pflag){
      quantity = this.toNumber(quantity);
      if (quantity !== 0) {
          // update quantity for existing item
          var found = false;
          for (var i = 0; i < this.items.length && !found; i++) {
              var item = this.items[i];
              if (item.sku === product.sku && item.vid === product.vid) {
                  found = true;
                  item.quantity = this.toNumber(this.toNumber(item.quantity) + quantity);
                  if(item.weight==null){item.weight = 0;}
                  item.slug=product.slug
                  if (item.quantity <= 0) {
                      this.items.splice(i, 1);
                      this.skuArray.splice(i,1);
                      this.variantsArray.splice(i,1);
                  }
              }
          }

          // new item, add now
          if (!found && product.price) {
              var itm = new CartItem(product.sku, product.name, product.slug, product.mrp, product.price, product.quantity, product.image, product.category , product.size, product.weight, product.status, product.publisher,product.publisheruid,product.advertiser,product.uid,product.vid);
              this.items.push(itm);
              this.skuArray.push(itm.sku);
              this.variantsArray.push(itm.vid);
          }

          // save changes
          this.saveItems();
      }
    }else{
      if (quantity !== 0) {
          // update quantity for existing item
          var found = false;
          for (var i = 0; i < this.items.length && !found; i++) {
              var item = this.items[i];
              if (item.sku === product.sku && item.vid === product.vid) {
                  found = true;
                  item.quantity = this.toNumber(this.toNumber(item.quantity) + quantity);
                  if(item.weight==null){item.weight = 0;}
                  item.slug=product.slug
                  if (item.quantity <= 0) {
                      this.items.splice(i, 1);
                      this.skuArray.splice(i,1);
                      this.variantsArray.splice(i,1);
                  }
              }
          }

          // new item, add now
          if (!found) {
              var itm = new CartItem(product.sku, product.name, product.slug, product.mrp, product.price, product.quantity, product.image, product.category , product.size, product.weight, product.status, product.publisher,product.publisheruid,product.advertiser,product.uid,product.vid);
              this.items.push(itm);
              this.skuArray.push(itm.sku);
              this.variantsArray.push(itm.vid);
          }

          // save changes
          this.saveItems();
      }
    }
  };

  // get the total price for all items currently in the cart
  ShoppingCart.prototype.getBestShipper = function () {
      var cartValue = this.getTotalPrice();
      var totalWeight = this.getTotalWeight();

      //return 0;
      return this.Shipping.best.query({country: this.Settings.country.name, weight: totalWeight, cartValue: cartValue});
  };


   // get handling fee
  ShoppingCart.prototype.getHandlingFee = function () {
      var cartValue = this.getTotalPrice();
      
     // return cartValue * 0.05 ;
    return 0;
  };

  // get the total price for all items currently in the cart
  ShoppingCart.prototype.getTotalWeight = function (sku) {
      var totalWeight = 0;
      for (var i = 0; i < this.items.length; i++) {
          var item = this.items[i];
          if (sku === undefined || item.sku === sku) {
              totalWeight += this.toNumber(item.quantity * item.weight);
          }
      }
      return totalWeight;
  };

  // get the total price for all items currently in the cart
  ShoppingCart.prototype.getTotalPrice = function (sku) {
      var total = 0;
      for (var i = 0; i < this.items.length; i++) {
          var item = this.items[i];
          if (sku === undefined || item.sku === sku) {
              total += this.toNumber(item.quantity * item.price);
          }
      }
      return total;
  };

  ShoppingCart.prototype.checkCart = function(id, vid){ // Returns false when there is item in cart
        if(!_.includes(this.skuArray, id) || !_.includes(this.variantsArray, vid)){
            return true;
        }else{
            return false;
        }
    };
  ShoppingCart.prototype.getQuantity = function(sku, vid){ // Get quantity based on the combination of product_id and variant_id
        for(var i = 0;i<this.items.length;i++){
            if(this.items[i].sku === sku && this.items[i].vid === vid){
              return this.items[i].quantity;
            }
        }
    };
    
  // get the total price for all items currently in the cart
  ShoppingCart.prototype.getTotalCount = function (sku) {
      var count = 0;
      for (var i = 0; i < this.items.length; i++) {
          var item = this.items[i];
          if (sku === undefined || item.sku === sku) {
              count += this.toNumber(item.quantity);
          }
      }
      return count;
  };

  // clear the cart
  ShoppingCart.prototype.clearItems = function () {
      this.items = [];
      this.skuArray = [];
      this.variantsArray = [];
      this.saveItems();
  };

  ShoppingCart.prototype.toNumber = function (value) {
      value = value * 1;
      return isNaN(value) ? 0 : value;
  };
   ShoppingCart.prototype.flagOn = function () {
     this.flag = true;
  };
   ShoppingCart.prototype.flagOff = function () {
     this.flag = false;
  };

  // define checkout parameters
ShoppingCart.prototype.addCheckoutParameters = function (serviceName, merchantID, options) {

    // check parameters
    if (serviceName != "PayPal" && serviceName != "PayNow" && serviceName != "Google" && serviceName != "Stripe" && serviceName != "COD") {
        throw "serviceName must be 'PayPal' or 'Google' or 'Stripe' or 'Cash On Delivery'.";
    }
    // if (merchantID == null) {
    //     throw "A merchantID is required in order to checkout.";
    // }

    // save parameters
    this.checkoutParameters[serviceName] = new checkoutParameters(serviceName, merchantID, options);
}

// check out
ShoppingCart.prototype.checkout = function (serviceName, clearCart) {
    
  serviceName = {name:serviceName.paymentMethod.name, email:serviceName.paymentMethod.email,options:serviceName};

  this.addCheckoutParameters(serviceName.name, serviceName.email, serviceName.options);

    // select serviceName if we have to
    if (serviceName.name == null) {
        var p = this.checkoutParameters[Object.keys(this.checkoutParameters)[0]];
        serviceName = p.serviceName;
    }

    // sanity
    if (serviceName.name == null) {
        throw "Use the 'addCheckoutParameters' method to define at least one checkout service.";
    }

    // go to work
    var parms = this.checkoutParameters[serviceName.name];
    if (parms == null) {
        throw "Cannot get checkout parameters for '" + serviceName.name + "'.";
    }
    switch (parms.serviceName) {
        case "PayPal":
              this.checkoutPayPal(parms, clearCart);
            break;
        case "PayNow":
              this.checkoutPayNow(parms, clearCart);
            break;
        case "Google":
            this.checkoutGoogle(parms, clearCart);
            break;
        case "Stripe":
            this.checkoutStripe(parms, clearCart);
            break;
        case "COD":
            this.checkoutCOD(parms, clearCart);
            break;
        default:
            throw "Unknown checkout service: " + parms.serviceName;
    }
}


ShoppingCart.prototype.checkoutPayPal = function (parms, clearCart) {


   

    var vm = this
 
     for (var i = 0; i < this.items.length; i++) {
       this.items[i].image = null;
     }

    var opt = parms.options
    var options = {uid: opt.uid, email: opt.email, recipient_name: opt.name, phone: opt.phone, line1: opt.address, city: opt.city, postal_code:opt.zip, country_code: opt.country_code, discount: opt.couponAmount, shipping: 0, currency_code:opt.currency_code, exchange_rate:opt.exchange_rate}
    var data = {
        cmd: "_cart",
        business: 'smkorera@gmail.com',
        upload: "1",
        rm: "2",
        charset: "utf-8",
        data: this.items,
        options: options
    };
    var form = $('<form/></form>');
    form.attr("id", "paypalForm");
    form.attr("action", "/api/pay/prepare");
    form.attr("method", "GET");
    form.attr("style", "display:none;");
    this.addFormFields(form, data);
    $("body").append(form);

    // submit form
    this.clearCart = clearCart == null || clearCart;
    form.submit();
    form.remove();
}


ShoppingCart.prototype.checkoutPayNow = function (parms, clearCart) {
  
  for (var i = 0; i < this.items.length; i++) {
       this.items[i].image = null;
     }
     
    var vm = this
    var opt = parms.options
    var options = {uid: opt.uid, email: opt.email, recipient_name: opt.name, phone: opt.phone, line1: opt.address, city: opt.city, postal_code:opt.zip, country_code: opt.country_code, discount: opt.couponAmount, shipping: 0, currency_code:opt.currency_code, exchange_rate:opt.exchange_rate}
    var data = {
        business: 'smkorera@gmail.com',
        upload: "1",
        rm: "2",
        charset: "utf-8",
        data: this.items,
        options: options
    };
    var form = $('<form/></form>');
    form.attr("id", "paypalForm");
    form.attr("action", "/api/pay/prepare");
    form.attr("method", "GET");
    form.attr("style", "display:none;");
    this.addFormFields(form, data);
    $("body").append(form);

    // submit form
    this.clearCart = clearCart == null || clearCart;
    form.submit();
    form.remove();
}

// check out using COD
ShoppingCart.prototype.checkoutCOD = function (parms, clearCart) {
    var vm = this
    var opt = parms.options
    var data = opt.items;
    var total = Math.round((this.getTotalPrice()+ this.getHandlingFee()-opt.couponAmount));
    var subtotal = Math.round((this.getTotalPrice()-opt.couponAmount));

    var items = []

    if (isNaN(opt.exchange_rate) || opt.exchange_rate === '') // If exchange rate is not a float value, force this to 1
        opt.exchange_rate = 1
    for (var k = 0; k < data.length; k++) {
       var i = data[k]
       items.push({sku: i.sku, name: i.name, url: i.image, description: i.slug,publisher:i.publisher,publisheruid:i.publisheruid, price: Math.round(i.price), quantity: i.quantity, currency: opt.currency_code})
    }
    if(opt.discount>0)
        items.push({sku: '#', name: 'Coupon Discount', url: '-', description: '-', price: -Math.round(opt.discount), quantity: 1, currency: opt.currency_code})

    var orderDetails = {
        uid: opt.uid,
        email: opt.email,
        phone: opt.phone,
        address: {country_code: opt.country_code, postal_code:opt.zip, state: opt.state, city: opt.city, line1: opt.address, recipient_name: opt.name}, 
        payment : {state:opt.payment},
        amount: {total: total, currency: opt.currency_code, details:{shipping:Math.round(this.getHandlingFee()),subtotal:subtotal}},
        exchange_rate: opt.exchange_rate,
        items: items,
        status: 'Payment Pending',
        payment_method: 'COD'
    }

    // When order.status is null, the client will replace with the Array[0] of order status at Settings page
    this.Order.save(orderDetails, function (data,err) {
        if(clearCart)
            vm.clearItems()
        vm.$state.go('order')
    })
}

// check out using Google Wallet
// for details see:
// developers.google.com/checkout/developer/Google_Checkout_Custom_Cart_How_To_HTML
// developers.google.com/checkout/developer/interactive_demo
ShoppingCart.prototype.checkoutGoogle = function (parms, clearCart) {

    // global data
    var data = {};

    // item data
    for (var i = 0; i < this.items.length; i++) {
        var item = this.items[i];
        var ctr = i + 1;
        data["item_name_" + ctr] = item.sku;
        data["item_description_" + ctr] = item.name;
        data["item_price_" + ctr] = item.price.toFixed(2);
        data["item_quantity_" + ctr] = item.quantity;
        data["item_merchant_id_" + ctr] = parms.merchantID;
    }

    // build form
    var form = $('<form/></form>');
    // NOTE: in production projects, use the checkout.google url below;
    // for debugging/testing, use the sandbox.google url instead.
    //form.attr("action", "https://checkout.google.com/api/checkout/v2/merchantCheckoutForm/Merchant/" + parms.merchantID);
    form.attr("action", "https://sandbox.google.com/checkout/api/checkout/v2/checkoutForm/Merchant/" + parms.merchantID);
    form.attr("method", "POST");
    form.attr("style", "display:none;");
    this.addFormFields(form, data);
    if(!parms.options){parms.options = {};}
    this.addFormFields(form, parms.options);
    $("body").append(form);

    // submit form
    this.clearCart = clearCart == null || clearCart;
    form.submit();
    form.remove();
}

// check out using Stripe
// for details see:
// https://stripe.com/docs/checkout
ShoppingCart.prototype.checkoutStripe = function (parms, clearCart) {
    var vm = this
    var opt = parms.options
    var data = opt.items;
    var total = Math.round((this.getTotalPrice()+opt.shipping.charge-opt.couponAmount)*opt.exchange_rate*100)/100;
    var subtotal = Math.round((this.getTotalPrice()-opt.couponAmount)*opt.exchange_rate*100)/100;
    parms.options.total = total

    var items = []

    if (isNaN(opt.exchange_rate) || opt.exchange_rate === '') // If exchange rate is not a float value, force this to 1
        opt.exchange_rate = 1
    for (var k = 0; k < data.length; k++) {
       var i = data[k]
       items.push({sku: i.sku, name: i.name, url: i.image, description: i.slug, price: Math.round(i.price*opt.exchange_rate*100)/100, quantity: i.quantity, currency: opt.currency_code})
    }
    if(opt.discount>0)
        items.push({sku: '#', name: 'Coupon Discount', url: '-', description: '-', price: -Math.round(opt.discount*opt.exchange_rate*100)/100, quantity: 1, currency: opt.currency_code})

    parms.options.items = items
    this.Pay.stripe.save(parms.options, function (res) {
        if(clearCart)
            vm.clearItems()
        vm.$state.go('order',{id: res.id, msg: 'Stripe payment successful'})
    },function(err){
        vm.$state.go('checkout',{id: err.data.id, msg: err.data.message})
    })
}

  // utility methods
  ShoppingCart.prototype.addFormFields = function (form, data) {
      if (data !== null) {
          $.each(data, function (name, value) {
              if (value !== null) {
                  var input = $('<input></input>').attr('type', 'hidden').attr('name', name).val(JSON.stringify(value));
                  form.append(input);
              }
          });
      }
  };

  angular.module('mediaboxApp')
    .factory('Cart', function (Settings, Shipping, Order, Mail, Pay, appConfig, $state) {
        var myCart = new ShoppingCart('mShop', Settings, Shipping, Order, Mail, Pay, appConfig, $state);
        return { cart: myCart };
    });
