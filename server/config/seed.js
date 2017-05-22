/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

import User from '../api/user/user.model';
import Product from '../api/product/product.model';
import Category from '../api/category/category.model';
import Brand from '../api/brand/brand.model';
import PaymentMethod from '../api/PaymentMethod/PaymentMethod.model';
import Setting from '../api/setting/setting.model';
import Feature from '../api/feature/feature.model';
import Coupon from '../api/coupon/coupon.model';
import Shipping from '../api/shipping/shipping.model';
import Country from '../api/country/country.model';
import Address from '../api/address/address.model';

User.find(function (err, data) {
  if(data.length < 1){
    User.create({
      _id: '57c087895c0f110799b4c82d',
      provider: 'local',
      name: 'Test User',
      email: 'user@codenx.com',
      password: 'codenx'
    }, {
      _id: '57c087895c0f110799b4c82e',
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@codenx.com',
      password: 'codenx'
    }, function() {
        console.log('finished populating users');
    });
  }
});

Address.find(function (err, data) {
  if(data.length < 1){
    Address.create(
      { 
          "__v": 0,
          "_id": "57c087e05c0f110799b4c939",
          "active": true,
          "address": "K-250",
          "city": "Bhubaneswar",
          "country": "India",
          "name": "Ipsita Sahoo",
          "phone": "0000000000",
          "state": "Odisha",
          "uid": "57c087895c0f110799b4c82e",
          "zip": 765001
      },
      {
        "country": "India",
        "name": "Ipsita Sahoo",
        "address": "AB/1234",
        "city": "Rourkela",
        "zip": 769044,
        "state": "Odisha",
        "phone": "0000000000",
        "uid": "57c087895c0f110799b4c82e",
        "_id": "57d6b6f2944efb02ba415406",
        "active": true,
        "__v": 0
      }
    );
  }
});

Shipping.find(function (err, data) {
  if(data.length < 1){
    Shipping.create(
      {
        "_id": "561f73dbe87e75d814a98f5a",
        "carrier": "DTDC",
        "country": "India",
        "charge": 100,
        "minWeight": 0,
        "maxWeight": 200,
        "freeShipping": 500,
        "active": true,
        "__v": 0,
        "name": "DTDC"
      },
      {
        "__v": 0,
        "_id": "561f7ff6fb2f8dac199a618f",
        "active": true,
        "carrier": "UPS",
        "charge": 500,
        "country": "India",
        "freeShipping": 5000,
        "maxWeight": 100,
        "minWeight": 0
      },
      {
        "__v": 0,
        "_id": "561f801ffb2f8dac199a6190",
        "active": true,
        "carrier": "DHL",
        "charge": 300,
        "country": "India",
        "freeShipping": 3000,
        "maxWeight": 200,
        "minWeight": 0
      },
      {
        "_id": "561f804dfb2f8dac199a6191",
        "carrier": "DHL",
        "country": "India",
        "charge": 50,
        "minWeight": 100,
        "maxWeight": 500,
        "freeShipping": 1000,
        "active": true,
        "__v": 0
      }
    );
  }
});

Coupon.find(function (err, data) {
  if(data.length < 1){
    Coupon.create(
      {
        "__v": 0,
        "_id": "561cbd6fc3c4fab4009caa0e",
        "active": true,
        "amount": 100,
        "code": "A100",
        "info": "Rs 100 discount on all products above Rs 500",
        "minimumCartValue": 500,
        "type": "Discount"
      }
    );
  }
});

Feature.find(function (err, data) {
  if(data.length < 1){
    Feature.create(
      {
        "key": "Type",
        "val": "Blouses",
        "active": true,
        "_id": "57c087895c0f110799b4c839",
        "__v": 0
      },
      {
        "key": "Type",
        "val": "Gown",
        "active": true,
        "_id": "57c087895c0f110799b4c83a",
        "__v": 0
      },
      {
        "key": "Fit",
        "val": "Slim",
        "active": true,
        "_id": "57c087895c0f110799b4c83b",
        "__v": 0
      },
      {
        "key": "Fit",
        "val": "Regular",
        "active": true,
        "_id": "57c087895c0f110799b4c83e",
        "__v": 0
      },
      {
        "key": "Fit",
        "val": "Tight",
        "active": true,
        "_id": "57c087895c0f110799b4c83c",
        "__v": 0
      },
      {
        "key": "Fabric",
        "val": "Polyester",
        "active": true,
        "_id": "57c087895c0f110799b4c840",
        "__v": 0
      },
      {
        "key": "Fabric",
        "val": "Cotton",
        "active": true,
        "_id": "57c087895c0f110799b4c83f",
        "__v": 0
      },
      {
        "key": "Fit",
        "val": "Loose",
        "active": true,
        "_id": "57c087895c0f110799b4c83d",
        "__v": 0
      },
      {
        "key": "Neck",
        "val": "Round Neck",
        "active": true,
        "_id": "57c087895c0f110799b4c841",
        "__v": 0
      },
      {
        "key": "Neck",
        "val": "Collar",
        "active": true,
        "_id": "57c087895c0f110799b4c842",
        "__v": 0
      },
      {
        "key": "Color",
        "val": "Red",
        "active": true,
        "_id": "57c087895c0f110799b4c843",
        "__v": 0
      },
      {
        "key": "Color",
        "val": "Green",
        "active": true,
        "_id": "57c087895c0f110799b4c844",
        "__v": 0
      },
      {
        "key": "Color",
        "val": "Blue",
        "active": true,
        "_id": "57c087895c0f110799b4c845",
        "__v": 0
      },
      {
        "key": "Color",
        "val": "White",
        "active": true,
        "_id": "57c087895c0f110799b4c846",
        "__v": 0
      }
    );
  }
});

Setting.find(function (err, data) {
  if(data.length < 1){
    Setting.create({
      "minOrderValue" : 20,
      "shippingCharge" : 15
    });
  }
});

PaymentMethod.find(function (err, data) {
  if(data.length < 1){
    PaymentMethod.create({
      "name": "COD",
      "email": "-",
      "active": true,
      "_id": "57c087895c0f110799b4c834",
      "__v": 0
    },
    {
      "name": "PayPal",
      "email": "payment@codenx.com",
      "active": true,
      "_id": "57c087895c0f110799b4c835",
      "__v": 0
    },
    {
      "name": "Stripe",
      "email": "payment@codenx.com",
      "active": true,
      "__v": 0
    });
  }
});

Product.find(function (err, data) {
  if(data.length < 1){
    Product.create(
      
{
  "__v": 2,
  "_id": "57c18240993c5f4354000000",
  "active": true,
  "brand": "57c17dce993c5faed8000001",
  "category": "57c1904f993c5fe64d000001",
  "features": [
    {
      "val": "Skinny Fit",
      "key": "Type"
    },
    {
      "val": "Slim",
      "key": "Fit"
    },
    {
      "val": "Stretch",
      "key": "Fabric"
    },
    {
      "val": "Blue",
      "key": "Color"
    },
    {
      "val": "This model has height 6'2\",Chest 39\",Waist 32\"and is Wearing Size 30.",
      "key": "Model Stats"
    }
  ],
  "info": "FLYING MACHINE presents these blue coloured jeans, which will be perfect for regular wear. These skinny-fit jeans are made from stretch cotton, which will keep you comfortable all day. These will work well with most of your cool T-shirts and comfy footwear.",
  "keyFeatures": [
    {
      "key": "Fit",
      "val": "Slim"
    },
    {
      "key": "Color",
      "val": "Blue"
    }
  ],
  "name": "Flying MachineBlue Low Rise Skinny Fit Jeans (Jackson)",
  "nameLower": "flying machineblue low rise skinny fit jeans (jackson)",
  "sku": 35,
  "slug": "flying-machineblue-low-rise-skinny-fit-jeans-jackson",
  "type": "Men",
  "uid": "swadesh@codenx.com",
  "variants": [
    {
      "image": "uploads/jPFrHVIis_Lh_gp7HLolDnOs.jpg",
      "mrp": 2299,
      "price": 2299,
      "size": "30",
      "_id": "57cea23de804f70584e81d14"
    },
    {
      "image": "model-885091_640.jpg",
      "mrp": 2299,
      "price": 2299,
      "size": "32",
      "_id": "57cea23de804f70584e81d13"
    },
    {
      "image": "model-885091_640.jpg",
      "mrp": 2299,
      "price": 2299,
      "size": "34",
      "_id": "57cea23de804f70584e81d12"
    },
    {
      "image": "model-885091_640.jpg",
      "mrp": 2299,
      "price": 2299,
      "size": "36",
      "_id": "57cea23de804f70584e81d11"
    },
    {
      "image": "model-885091_640.jpg",
      "mrp": 2299,
      "price": 2299,
      "size": "38",
      "_id": "57cea23de804f70584e81d10"
    }
  ]
},
{
  "__v": 1,
  "_id": "57c18256993c5f5d54000001",
  "active": true,
  "brand": "5607c599dddfb6780c5bddf4",
  "category": "57c19208993c5fc13f00000c",
  "features": [
    {
      "key": "Type",
      "val": "Casual Jackets"
    },
    {
      "key": "Fabric",
      "val": "Cotton"
    },
    {
      "key": "Sleeves",
      "val": "Full Sleeves"
    },
    {
      "key": "Neck",
      "val": "COLLAR"
    },
    {
      "key": "Fit",
      "val": "Regular"
    },
    {
      "key": "Wash Care",
      "val": "Wash with similar colors, Dry Promptly, Steam Iron, Do Not Bleach, Do Not Wring"
    },
    {
      "key": "Color",
      "val": "Blue"
    },
    {
      "key": "Style",
      "val": "Solid"
    },
    {
      "key": "Model Stats",
      "val": "This model has height 6'0\",Chest 38\",Waist 33\"and is Wearing Size M."
    }
  ],
  "info": "Step out in style in that chilly weather wearing this jacket from Fort Collins. Made from cotton, this jacket will last you for a long time. It features a front zipper, which allows this jacket to embrace your body in a perfect fit. Also the high-neck collar adds to its visual appeal. Wear it with denims and boots of your choice for a sturdy look. ",
  "keyFeatures": [
    {
      "key": "Fabric",
      "val": "Cotton"
    },
    {
      "key": "Fit",
      "val": "Regular"
    },
    {
      "key": "Color",
      "val": "Blue"
    }
  ],
  "name": "Fort CollinsBlue Solid Casual Jacket",
  "nameLower": "fort collinsblue solid casual jacket",
  "sku": 37,
  "slug": "fort-collinsblue-solid-casual-jacket",
  "type": "Men",
  "uid": "swadesh@codenx.com",
  "variants": [
    {
      "image": "uploads/IHEVbE34afH8D_W7TFR4vJlA.jpg",
      "mrp": 2599,
      "price": 2599,
      "size": "M",
      "_id": "57cea134e804f70584e81d0b"
    },
    {
      "mrp": 2599,
      "price": 2599,
      "size": "L",
      "image": "dog-889376_640.jpg",
      "_id": "57cea134e804f70584e81d0a"
    },
    {
      "price": 2599,
      "size": "XL",
      "image": "dog-889376_640.jpg",
      "mrp": 2599,
      "_id": "57cea134e804f70584e81d09"
    },
    {
      "size": "XXL",
      "image": "dog-889376_640.jpg",
      "mrp": 2599,
      "price": 2599,
      "_id": "57cea134e804f70584e81d08"
    }
  ]
},
{
  "__v": 1,
  "_id": "57c18280993c5f4354000001",
  "active": true,
  "brand": "57c17a41993c5f81f9000000",
  "category": "57c198e2993c5fc13f00000f",
  "features": [
    {
      "key": "Type",
      "val": "Casual Jackets"
    },
    {
      "key": "Fabric",
      "val": "Cotton"
    },
    {
      "key": "Sleeves",
      "val": "Full Sleeves"
    },
    {
      "key": "Neck",
      "val": "COLLAR"
    },
    {
      "key": "Fit",
      "val": "Regular"
    },
    {
      "key": "Wash Care",
      "val": "Wash with similar colors, Dry Promptly, Steam Iron, Do Not Bleach, Do Not Wring"
    },
    {
      "key": "Color",
      "val": "Blue"
    },
    {
      "key": "Style",
      "val": "Solid"
    },
    {
      "key": "Model Stats",
      "val": "This model has height 6'0\",Chest 38\",Waist 33\"and is Wearing Size M."
    }
  ],
  "info": "Step out in style in that chilly weather wearing this jacket from Fort Collins. Made from cotton, this jacket will last you for a long time. It features a front zipper, which allows this jacket to embrace your body in a perfect fit. Also the high-neck collar adds to its visual appeal. Wear it with denims and boots of your choice for a sturdy look. ",
  "keyFeatures": [
    {
      "key": "Fabric",
      "val": "Cotton"
    },
    {
      "key": "Fit",
      "val": "Regular"
    },
    {
      "key": "Color",
      "val": "Blue"
    }
  ],
  "name": "Fort CollinsBlue Solid Casual Jacket",
  "nameLower": "fort collinsblue solid casual jacket",
  "sku": 37,
  "slug": "fort-collinsblue-solid-casual-jacket",
  "type": "Men",
  "uid": "swadesh@codenx.com",
  "variants": [
    {
      "image": "uploads/-KBlIEp5vF2oMyuKqE9EgNWv.jpg",
      "mrp": 2599,
      "price": 2599,
      "size": "M",
      "_id": "57cea116e804f70584e81d07"
    },
    {
      "mrp": 2599,
      "price": 2599,
      "size": "L",
      "image": "dog-889376_640.jpg",
      "_id": "57cea116e804f70584e81d06"
    },
    {
      "price": 2599,
      "size": "XL",
      "image": "dog-889376_640.jpg",
      "mrp": 2599,
      "_id": "57cea116e804f70584e81d05"
    },
    {
      "size": "XXL",
      "image": "dog-889376_640.jpg",
      "mrp": 2599,
      "price": 2599,
      "_id": "57cea116e804f70584e81d04"
    }
  ]
},
{
  "__v": 1,
  "_id": "57c182b2993c5f5d54000002",
  "active": true,
  "brand": "57c17a41993c5f81f9000000",
  "category": "57c1919a993c5fe64d000007",
  "features": [
    {
      "key": "Type",
      "val": "Round Neck T-Shirts"
    },
    {
      "key": "Fabric",
      "val": "Stretch"
    },
    {
      "key": "Sleeves",
      "val": "Half Sleeves"
    },
    {
      "val": "Round Neck",
      "key": "Neck"
    },
    {
      "key": "Fit",
      "val": "Slim"
    },
    {
      "key": "Color",
      "val": "Black"
    },
    {
      "key": "Model Stats",
      "val": "This model has height 6'4\",Chest 38\",Waist 31\"and is Wearing Size M."
    }
  ],
  "info": "",
  "keyFeatures": [
    {
      "key": "Neck",
      "val": "Round Neck"
    },
    {
      "key": "Fit",
      "val": "Slim"
    }
  ],
  "name": "Calvin Klein JeansBlack Round Neck T-Shirt",
  "nameLower": "calvin klein jeansblack round neck t-shirt",
  "sku": 21,
  "slug": "calvin-klein-jeansblack-round-neck-t-shirt",
  "type": "Men",
  "uid": "swadesh@codenx.com",
  "variants": [
    {
      "size": "S",
      "image": "uploads/Nkjo1oJY0RISOUCMDMx_IE-7.jpg",
      "mrp": 3299,
      "price": 3299,
      "_id": "57cea2e5e804f70584e81d42"
    },
    {
      "image": "woman-678313_640.jpg",
      "mrp": 3299,
      "price": 3299,
      "size": "M",
      "_id": "57cea2e5e804f70584e81d41"
    },
    {
      "image": "woman-678313_640.jpg",
      "mrp": 3299,
      "price": 3299,
      "size": "L",
      "_id": "57cea2e5e804f70584e81d40"
    },
    {
      "image": "woman-678313_640.jpg",
      "mrp": 3299,
      "price": 3299,
      "size": "XL",
      "_id": "57cea2e5e804f70584e81d3f"
    },
    {
      "image": "woman-678313_640.jpg",
      "mrp": 3299,
      "price": 3299,
      "size": "XXL",
      "_id": "57cea2e5e804f70584e81d3e"
    }
  ]
},
{
  "__v": 1,
  "_id": "57c182d0993c5f4354000002",
  "active": true,
  "brand": "5607c5c1dddfb6780c5bddf8",
  "category": "57c198e2993c5fc13f00000f",
  "features": [
    {
      "key": "Type",
      "val": "Round Neck T-Shirts"
    },
    {
      "key": "Fabric",
      "val": "Stretch"
    },
    {
      "key": "Sleeves",
      "val": "Half Sleeves"
    },
    {
      "val": "Round Neck",
      "key": "Neck"
    },
    {
      "key": "Fit",
      "val": "Slim"
    },
    {
      "key": "Color",
      "val": "Black"
    },
    {
      "key": "Model Stats",
      "val": "This model has height 6'4\",Chest 38\",Waist 31\"and is Wearing Size M."
    }
  ],
  "info": "",
  "keyFeatures": [
    {
      "key": "Neck",
      "val": "Round Neck"
    },
    {
      "key": "Fit",
      "val": "Slim"
    }
  ],
  "name": "Calvin Klein JeansBlack Round Neck T-Shirt",
  "nameLower": "calvin klein jeansblack round neck t-shirt",
  "sku": 21,
  "slug": "calvin-klein-jeansblack-round-neck-t-shirt",
  "type": "Men",
  "uid": "swadesh@codenx.com",
  "variants": [
    {
      "size": "S",
      "image": "uploads/m3DWWG6cqzYzbvBMbRVX3w0-.jpg",
      "mrp": 3299,
      "price": 3299,
      "_id": "57cea2bae804f70584e81d3d"
    },
    {
      "image": "woman-678313_640.jpg",
      "mrp": 3299,
      "price": 3299,
      "size": "M",
      "_id": "57cea2bae804f70584e81d3c"
    },
    {
      "image": "woman-678313_640.jpg",
      "mrp": 3299,
      "price": 3299,
      "size": "L",
      "_id": "57cea2bae804f70584e81d3b"
    },
    {
      "image": "woman-678313_640.jpg",
      "mrp": 3299,
      "price": 3299,
      "size": "XL",
      "_id": "57cea2bae804f70584e81d3a"
    },
    {
      "image": "woman-678313_640.jpg",
      "mrp": 3299,
      "price": 3299,
      "size": "XXL",
      "_id": "57cea2bae804f70584e81d39"
    }
  ]
},
{
  "__v": 1,
  "_id": "57c182fa993c5f5d54000003",
  "active": true,
  "brand": "57c17d4c993c5f81f9000001",
  "category": "57c191b2993c5fc13f00000a",
  "features": [
    {
      "key": "Type",
      "val": "Regular Fit"
    },
    {
      "key": "Fit",
      "val": "Regular"
    },
    {
      "key": "Fabric",
      "val": "Stretch"
    },
    {
      "key": "Color",
      "val": "Blue"
    },
    {
      "key": "Wash Care",
      "val": "y Clean Any SolvenNormal 40?c Do Not Bleach Warm Iron Dry Clean-F Dr"
    },
    {
      "key": "Style",
      "val": "Solid"
    },
    {
      "key": "Model Stats",
      "val": "This model has height 6'4\",Chest 38\",Waist 31\"and is Wearing Size 32."
    }
  ],
  "info": "Look hot on a cool evening wearing these blue coloured jeans from GAS. Made from stretch cotton fabric, these jeans offer you a perfect fit and a trendy look. Pair these jeans with your favourite T-shirt and sneakers for a stylish look. ",
  "keyFeatures": [
    {
      "key": "Fit",
      "val": "Regular"
    },
    {
      "key": "Color",
      "val": "Blue"
    }
  ],
  "name": "GasBlue Mid Rise Regular Fit Jeans",
  "nameLower": "gasblue mid rise regular fit jeans",
  "sku": 43,
  "slug": "gasblue-mid-rise-regular-fit-jeans",
  "type": "Men",
  "uid": "swadesh@codenx.com",
  "variants": [
    {
      "image": "uploads/CPDeV2S-ku75siwbMmfYWVzv.jpg",
      "mrp": 7990,
      "price": 7990,
      "size": "30",
      "_id": "57cea0e4e804f70584e81cfe"
    },
    {
      "image": "faces-101527_640.jpg",
      "mrp": 7990,
      "price": 7990,
      "size": "32",
      "_id": "57cea0e4e804f70584e81cfd"
    },
    {
      "image": "faces-101527_640.jpg",
      "mrp": 7990,
      "price": 7990,
      "size": "34",
      "_id": "57cea0e4e804f70584e81cfc"
    },
    {
      "image": "faces-101527_640.jpg",
      "mrp": 7990,
      "price": 7990,
      "size": "36",
      "_id": "57cea0e4e804f70584e81cfb"
    },
    {
      "image": "faces-101527_640.jpg",
      "mrp": 7990,
      "price": 7990,
      "size": "38",
      "_id": "57cea0e4e804f70584e81cfa"
    }
  ]
},
{
  "__v": 1,
  "_id": "57c1833f993c5f4354000003",
  "active": true,
  "brand": "57c17e6e993c5faed8000003",
  "category": "57c19929993c5fe64d00000e",
  "features": [
    {
      "key": "Type",
      "val": "Regular Fit"
    },
    {
      "key": "Fit",
      "val": "Regular"
    },
    {
      "key": "Fabric",
      "val": "Stretch"
    },
    {
      "key": "Color",
      "val": "Blue"
    },
    {
      "key": "Wash Care",
      "val": "y Clean Any SolvenNormal 40?c Do Not Bleach Warm Iron Dry Clean-F Dr"
    },
    {
      "key": "Style",
      "val": "Solid"
    },
    {
      "key": "Model Stats",
      "val": "This model has height 6'4\",Chest 38\",Waist 31\"and is Wearing Size 32."
    }
  ],
  "info": "Look hot on a cool evening wearing these blue coloured jeans from GAS. Made from stretch cotton fabric, these jeans offer you a perfect fit and a trendy look. Pair these jeans with your favourite T-shirt and sneakers for a stylish look. ",
  "keyFeatures": [
    {
      "key": "Fit",
      "val": "Regular"
    },
    {
      "key": "Color",
      "val": "Blue"
    }
  ],
  "name": "GasBlue Mid Rise Regular Fit Jeans",
  "nameLower": "gasblue mid rise regular fit jeans",
  "sku": 43,
  "slug": "gasblue-mid-rise-regular-fit-jeans",
  "type": "Men",
  "uid": "swadesh@codenx.com",
  "variants": [
    {
      "image": "uploads/ObBHwxqiTgsKf5WEzzmAhsQX.jpg",
      "mrp": 7990,
      "price": 7990,
      "size": "30",
      "_id": "57cea0cfe804f70584e81cf9"
    },
    {
      "image": "faces-101527_640.jpg",
      "mrp": 7990,
      "price": 7990,
      "size": "32",
      "_id": "57cea0cfe804f70584e81cf8"
    },
    {
      "image": "faces-101527_640.jpg",
      "mrp": 7990,
      "price": 7990,
      "size": "34",
      "_id": "57cea0cfe804f70584e81cf7"
    },
    {
      "image": "faces-101527_640.jpg",
      "mrp": 7990,
      "price": 7990,
      "size": "36",
      "_id": "57cea0cfe804f70584e81cf6"
    },
    {
      "image": "faces-101527_640.jpg",
      "mrp": 7990,
      "price": 7990,
      "size": "38",
      "_id": "57cea0cfe804f70584e81cf5"
    }
  ]
},
{
  "__v": 1,
  "_id": "57c183d8993c5f5d54000004",
  "active": true,
  "brand": "57c17e42993c5f81f9000004",
  "category": "57c1913a993c5fc13f000008",
  "features": [
    {
      "key": "Type",
      "val": "Round Neck T-Shirts"
    },
    {
      "val": "Cotton",
      "key": "Fabric"
    },
    {
      "key": "Sleeves",
      "val": "Half Sleeves"
    },
    {
      "key": "Neck",
      "val": "Round Neck"
    },
    {
      "key": "Fit",
      "val": "Slim"
    },
    {
      "key": "Color",
      "val": "Blue"
    },
    {
      "key": "Style",
      "val": "Printed"
    }
  ],
  "info": "",
  "keyFeatures": [
    {
      "key": "Fabric",
      "val": "Cotton"
    },
    {
      "key": "Neck",
      "val": "Round Neck"
    },
    {
      "key": "Fit",
      "val": "Slim"
    },
    {
      "key": "Color",
      "val": "Blue"
    }
  ],
  "name": "French ConnectionBlue Printed Round Neck T-Shirt",
  "nameLower": "french connectionblue printed round neck t-shirt",
  "sku": 39,
  "slug": "french-connectionblue-printed-round-neck-t-shirt",
  "type": "Men",
  "uid": "swadesh@codenx.com",
  "variants": [
    {
      "image": "uploads/6wuVnfABGn_cervN2GaZNduB.jpg",
      "mrp": 1499,
      "price": 1499,
      "size": "S",
      "_id": "57cea0fde804f70584e81d03"
    },
    {
      "image": "woman-885848_640.jpg",
      "mrp": 1499,
      "price": 1499,
      "size": "M",
      "_id": "57cea0fde804f70584e81d02"
    },
    {
      "image": "woman-885848_640.jpg",
      "mrp": 1499,
      "price": 1499,
      "size": "L",
      "_id": "57cea0fde804f70584e81d01"
    },
    {
      "image": "woman-885848_640.jpg",
      "mrp": 1499,
      "price": 1499,
      "size": "XL",
      "_id": "57cea0fde804f70584e81d00"
    },
    {
      "mrp": 1499,
      "price": 1499,
      "size": "XXL",
      "image": "woman-885848_640.jpg",
      "_id": "57cea0fde804f70584e81cff"
    }
  ]
},
{
  "__v": 1,
  "_id": "57c183fb993c5f4354000004",
  "active": true,
  "features": [
    {
      "key": "Type",
      "val": "Regular Fit"
    },
    {
      "key": "Fit",
      "val": "Regular"
    },
    {
      "key": "Fabric",
      "val": "Cotton"
    },
    {
      "val": "Blue",
      "key": "Color"
    },
    {
      "key": "Wash Care",
      "val": ", Flat Dry In Shadee Mild Detergent, Do Not Bleach, Do Not Tumble DryMachine Wash Cold, Wash Dark Colour Separately, Us"
    },
    {
      "key": "Style",
      "val": "Washed"
    },
    {
      "key": "Model Stats",
      "val": "This model has height 6'1\",Chest 40\",Waist 31\"and is Wearing Size 32."
    }
  ],
  "info": "",
  "keyFeatures": [
    {
      "key": "Fabric",
      "val": "Cotton"
    },
    {
      "key": "Fit",
      "val": "Regular"
    },
    {
      "key": "Color",
      "val": "Blue"
    }
  ],
  "name": "LeeBlue Mid Rise Regular Fit Jeans (Victory-A)",
  "nameLower": "leeblue mid rise regular fit jeans (victory-a)",
  "sku": 62,
  "slug": "leeblue-mid-rise-regular-fit-jeans-victory-a",
  "type": "Men",
  "uid": "swadesh@codenx.com",
  "variants": [
    {
      "image": "uploads/6KhT0jQ2BRPayJI0A3qNOqzh.jpg",
      "mrp": 2599,
      "price": 2599,
      "size": "30",
      "_id": "57cea077e804f70584e81ce7"
    },
    {
      "image": "fashion-83137_640.jpg",
      "mrp": 2599,
      "price": 2599,
      "size": "32",
      "_id": "57cea077e804f70584e81ce6"
    },
    {
      "image": "fashion-83137_640.jpg",
      "mrp": 2599,
      "price": 2599,
      "size": "34",
      "_id": "57cea077e804f70584e81ce5"
    },
    {
      "image": "fashion-83137_640.jpg",
      "mrp": 2599,
      "price": 2599,
      "size": "36",
      "_id": "57cea077e804f70584e81ce4"
    },
    {
      "image": "fashion-83137_640.jpg",
      "mrp": 2599,
      "price": 2599,
      "size": "38",
      "_id": "57cea077e804f70584e81ce3"
    }
  ]
},
{
  "__v": 1,
  "_id": "57c18451993c5f5d54000005",
  "active": true,
  "brand": "57c17e9f993c5f81f9000005",
  "category": "57c1904f993c5fe64d000001",
  "features": [
    {
      "key": "Type",
      "val": "Regular Fit"
    },
    {
      "key": "Fit",
      "val": "Regular"
    },
    {
      "key": "Fabric",
      "val": "Cotton"
    },
    {
      "val": "Blue",
      "key": "Color"
    },
    {
      "key": "Wash Care",
      "val": ", Flat Dry In Shadee Mild Detergent, Do Not Bleach, Do Not Tumble DryMachine Wash Cold, Wash Dark Colour Separately, Us"
    },
    {
      "key": "Style",
      "val": "Washed"
    },
    {
      "key": "Model Stats",
      "val": "This model has height 6'1\",Chest 40\",Waist 31\"and is Wearing Size 32."
    }
  ],
  "info": "",
  "keyFeatures": [
    {
      "key": "Fit",
      "val": "Regular"
    },
    {
      "key": "Fabric",
      "val": "Cotton"
    },
    {
      "key": "Color",
      "val": "Blue"
    }
  ],
  "name": "LeeBlue Mid Rise Regular Fit Jeans (Victory-A)",
  "nameLower": "leeblue mid rise regular fit jeans (victory-a)",
  "sku": 62,
  "slug": "leeblue-mid-rise-regular-fit-jeans-victory-a",
  "type": "Men",
  "uid": "swadesh@codenx.com",
  "variants": [
    {
      "image": "uploads/xVFdJqCjhQC-xHq3ctAn8QCp.jpg",
      "mrp": 2599,
      "price": 2599,
      "size": "30",
      "_id": "57cea05ce804f70584e81ce2"
    },
    {
      "image": "fashion-83137_640.jpg",
      "mrp": 2599,
      "price": 2599,
      "size": "32",
      "_id": "57cea05ce804f70584e81ce1"
    },
    {
      "image": "fashion-83137_640.jpg",
      "mrp": 2599,
      "price": 2599,
      "size": "34",
      "_id": "57cea05ce804f70584e81ce0"
    },
    {
      "image": "fashion-83137_640.jpg",
      "mrp": 2599,
      "price": 2599,
      "size": "36",
      "_id": "57cea05ce804f70584e81cdf"
    },
    {
      "image": "fashion-83137_640.jpg",
      "mrp": 2599,
      "price": 2599,
      "size": "38",
      "_id": "57cea05ce804f70584e81cde"
    }
  ]
},
{
  "__v": 1,
  "_id": "57c1847d993c5f4354000005",
  "active": true,
  "brand": "57c17ecf993c5faed8000004",
  "category": "57c1907a993c5fe64d000002",
  "features": [
    {
      "key": "Type",
      "val": "Henley T-Shirts"
    },
    {
      "key": "Fabric",
      "val": "Cotton"
    },
    {
      "val": "Half Sleeves",
      "key": "Sleeves"
    },
    {
      "key": "Neck",
      "val": "Henley"
    },
    {
      "key": "Fit",
      "val": "Regular"
    },
    {
      "key": "Color",
      "val": "Black"
    },
    {
      "key": "Wash Care",
      "val": "Normal Hand Machine Wash With Like Colors"
    },
    {
      "key": "Style",
      "val": "Solid"
    },
    {
      "key": "Model Stats",
      "val": "This model has height 6'4\",Chest 38\",Waist 31\"and is Wearing Size L."
    }
  ],
  "info": "",
  "keyFeatures": [
    {
      "key": "Fabric",
      "val": "Cotton"
    },
    {
      "val": "Regular",
      "key": "Fit"
    }
  ],
  "name": "Levi'sBlack Solid Henley T-Shirt",
  "nameLower": "levi'sblack solid henley t-shirt",
  "sku": 66,
  "slug": "levisblack-solid-henley-t-shirt",
  "type": "Men",
  "uid": "swadesh@codenx.com",
  "variants": [
    {
      "size": "S",
      "image": "uploads/OtZ3me5Rxf0mlMLuH4otg3fd.jpg",
      "mrp": 1399,
      "price": 1399,
      "_id": "57cea007e804f70584e81cd8"
    },
    {
      "mrp": 1399,
      "price": 1399,
      "size": "M",
      "image": "fig-892788_640.jpg",
      "_id": "57cea007e804f70584e81cd7"
    },
    {
      "image": "fig-892788_640.jpg",
      "mrp": 1399,
      "price": 1399,
      "size": "L",
      "_id": "57cea007e804f70584e81cd6"
    },
    {
      "price": 1399,
      "size": "XL",
      "image": "fig-892788_640.jpg",
      "mrp": 1399,
      "_id": "57cea007e804f70584e81cd5"
    }
  ]
},
{
  "__v": 1,
  "_id": "57c18496993c5f5d54000006",
  "active": true,
  "brand": "57c17d4c993c5f81f9000001",
  "category": "57c19150993c5fe64d000006",
  "features": [
    {
      "val": "Slim",
      "key": "Fit"
    },
    {
      "val": "Red",
      "key": "Color"
    },
    {
      "val": "Collar",
      "key": "Neck"
    },
    {
      "key": "Sleeves",
      "val": "Full Sleeves"
    },
    {
      "val": "Hand Wash Cold Water, Dry Naturally, Do Not Iron Imprint directly, Do not Bleach.",
      "key": "Wash Care"
    },
    {
      "val": "Cotton",
      "key": "Fabric"
    },
    {
      "val": "Solid",
      "key": "Style"
    },
    {
      "val": "This model has height 6'1\",Chest 40\",Waist 31\"and is Wearing Size M.",
      "key": "Model Stats"
    }
  ],
  "info": "Look effortlessly handsome by wearing this navy blue coloured shirt from Nautica. Tailored from cotton, this shirt features trendy pockets on the front, giving it a modish look. Team this shirt with denim bottoms and loafers on an outing.",
  "keyFeatures": [
    {
      "key": "Fabric",
      "val": "Cotton"
    },
    {
      "key": "Color",
      "val": "Red"
    },
    {
      "key": "Neck",
      "val": "Collar"
    },
    {
      "key": "Fit",
      "val": "Slim"
    }
  ],
  "name": "NauticaNavy Blue Solid Slim Fit Casual Shirt",
  "nameLower": "nauticanavy blue solid slim fit casual shirt",
  "sku": 70,
  "slug": "nauticanavy-blue-solid-slim-fit-casual-shirt",
  "type": "Men",
  "uid": "swadesh@codenx.com",
  "variants": [
    {
      "image": "uploads/16KNgfKYW1_m0MWQ4OhDHfUf.jpg",
      "mrp": 3999,
      "price": 3999,
      "size": "S",
      "_id": "57ce9fcde804f70584e81ccb"
    },
    {
      "image": "girl-918679_640.jpg",
      "mrp": 3999,
      "price": 3999,
      "size": "M",
      "_id": "57ce9fcde804f70584e81cca"
    },
    {
      "image": "girl-918679_640.jpg",
      "mrp": 3999,
      "price": 3999,
      "size": "L",
      "_id": "57ce9fcde804f70584e81cc9"
    },
    {
      "mrp": 3999,
      "price": 3999,
      "size": "XL",
      "image": "girl-918679_640.jpg",
      "_id": "57ce9fcde804f70584e81cc8"
    },
    {
      "image": "girl-918679_640.jpg",
      "mrp": 3999,
      "price": 3999,
      "size": "XXL",
      "_id": "57ce9fcde804f70584e81cc7"
    }
  ]
},
{
  "__v": 1,
  "_id": "57c184b9993c5f4354000006",
  "active": true,
  "brand": "57c17e42993c5f81f9000004",
  "category": "57c191c5993c5fe64d000008",
  "features": [
    {
      "val": "Blended",
      "key": "Fabric"
    },
    {
      "val": "Regular",
      "key": "Fit"
    },
    {
      "val": "White",
      "key": "Color"
    },
    {
      "val": "Solid",
      "key": "Style"
    },
    {
      "val": "This model has height 6'0\",Chest 37\",Waist 34\"and is Wearing Size 32.",
      "key": "Model Stats"
    }
  ],
  "info": "Outshine among your colleagues by wearing these grey milange coloured trousers from Arrow New York. Made from poly viscose material, these trousers offer you a perfect fit and have a trendy design. Team these trousers with white shirt and shoes for a stylish look.",
  "keyFeatures": [
    {
      "key": "Fit",
      "val": "Regular"
    },
    {
      "key": "Color",
      "val": "White"
    }
  ],
  "name": "Arrow New YorkGrey Milange Tapered Fit Formal Trouser",
  "nameLower": "arrow new yorkgrey milange tapered fit formal trouser",
  "sku": 9,
  "slug": "arrow-new-yorkgrey-milange-tapered-fit-formal-trouser",
  "type": "Men",
  "uid": "swadesh@codenx.com",
  "variants": [
    {
      "image": "uploads/DIWE3iQDN20_4z9zaDPHBGqO.jpg",
      "mrp": 1799,
      "price": 1799,
      "size": "30",
      "_id": "57cea338e804f70584e81d50"
    },
    {
      "image": "lipstick-850597_640.jpg",
      "mrp": 1799,
      "price": 1799,
      "size": "32",
      "_id": "57cea338e804f70584e81d4f"
    },
    {
      "image": "lipstick-850597_640.jpg",
      "mrp": 1799,
      "price": 1799,
      "size": "34",
      "_id": "57cea338e804f70584e81d4e"
    },
    {
      "mrp": 1799,
      "price": 1799,
      "size": "36",
      "image": "lipstick-850597_640.jpg",
      "_id": "57cea338e804f70584e81d4d"
    },
    {
      "price": 1799,
      "size": "38",
      "image": "lipstick-850597_640.jpg",
      "mrp": 1799,
      "_id": "57cea338e804f70584e81d4c"
    }
  ]
},
{
  "__v": 1,
  "_id": "57c184d3993c5f5d54000007",
  "active": true,
  "brand": "5607c5c1dddfb6780c5bddf8",
  "category": "57c1909e993c5fc13f000005",
  "features": [
    {
      "key": "Fabric",
      "val": "Cotton"
    },
    {
      "key": "Neck",
      "val": "V Neck"
    },
    {
      "key": "Fit",
      "val": "Regular"
    },
    {
      "key": "Wash Care",
      "val": "As indicated on the Label"
    },
    {
      "key": "Color",
      "val": "Orange"
    },
    {
      "key": "Style",
      "val": "Printed"
    },
    {
      "val": "This model has height 5'8\",Bust 32\",Waist 27\",Hip 35\"and is Wearing Size S.",
      "key": "Model Stats"
    }
  ],
  "info": "Let your hair down and steal the spotlight by wearing this orange, printed tunic from Akkriti by Pantaloons. Made from cotton, this tunic has a V-neck and 3/4th sleeves. This regular-fit, thigh-length tunic can be teamed up with leather leggings and stilettos to complete your diva look.",
  "keyFeatures": [
    {
      "key": "Fabric",
      "val": "Cotton"
    },
    {
      "key": "Fit",
      "val": "Regular"
    }
  ],
  "name": "Akkriti By PantaloonsOrange Printed Tunic",
  "nameLower": "akkriti by pantaloonsorange printed tunic",
  "sku": 1,
  "slug": "akkriti-by-pantaloonsorange-printed-tunic",
  "type": "Men",
  "uid": "swadesh@codenx.com",
  "variants": [
    {
      "image": "uploads/kS9YNER3d7RyD-m3242GHPIr.jpg",
      "mrp": 1299,
      "price": 1299,
      "size": "XS",
      "_id": "57cea34ae804f70584e81d55"
    },
    {
      "price": 1299,
      "size": "S",
      "image": "guess-attic-837137_640.jpg",
      "mrp": 1299,
      "_id": "57cea34ae804f70584e81d54"
    },
    {
      "image": "guess-attic-837137_640.jpg",
      "mrp": 1299,
      "price": 1299,
      "size": "M",
      "_id": "57cea34ae804f70584e81d53"
    },
    {
      "image": "guess-attic-837137_640.jpg",
      "mrp": 1299,
      "price": 1299,
      "size": "L",
      "_id": "57cea34ae804f70584e81d52"
    },
    {
      "image": "guess-attic-837137_640.jpg",
      "mrp": 1299,
      "price": 1299,
      "size": "XL",
      "_id": "57cea34ae804f70584e81d51"
    }
  ]
},
{
  "__v": 1,
  "_id": "57c184f2993c5f4354000007",
  "active": true,
  "brand": "57c17e1c993c5faed8000002",
  "category": "57c1923a993c5fc13f00000d",
  "features": [
    {
      "key": "Fabric",
      "val": "Polyester"
    },
    {
      "key": "Neck",
      "val": "Mandarin Collar"
    },
    {
      "key": "Fit",
      "val": "Regular"
    },
    {
      "key": "Color",
      "val": "Red"
    },
    {
      "val": "Solid",
      "key": "Style"
    },
    {
      "key": "Model Stats",
      "val": "This model has height 5'6\",Bust 32\",Waist 25\",Hip 35\"and is Wearing Size 8."
    }
  ],
  "info": "Look graceful and serene as you make your way to your next lunch date wearing this red, half placket shirt from Dorothy Perkins. Made from polyester, this shirt has roll-up sleeves and comes in regular fit. This shirt can be teamed up with denims and stilettos to complete your stylish look.",
  "keyFeatures": [
    {
      "key": "Fabric",
      "val": "Polyester"
    },
    {
      "key": "Fit",
      "val": "Regular"
    },
    {
      "key": "Color",
      "val": "Red"
    }
  ],
  "name": "Dorothy PerkinsRed Non Collar Half Placket Top",
  "nameLower": "dorothy perkinsred non collar half placket top",
  "sku": 29,
  "slug": "dorothy-perkinsred-non-collar-half-placket-top",
  "type": "Men",
  "uid": "swadesh@codenx.com",
  "variants": [
    {
      "size": "6",
      "image": "uploads/N0qwYTCEbnT-PixxA4LlXMwq.jpg",
      "mrp": 2290,
      "price": 2290,
      "_id": "57cea287e804f70584e81d30"
    },
    {
      "mrp": 2290,
      "price": 2290,
      "size": "8",
      "image": "guitar-944262_640.jpg",
      "_id": "57cea287e804f70584e81d2f"
    },
    {
      "price": 2290,
      "size": "10",
      "image": "guitar-944262_640.jpg",
      "mrp": 2290,
      "_id": "57cea287e804f70584e81d2e"
    },
    {
      "size": "12",
      "image": "guitar-944262_640.jpg",
      "mrp": 2290,
      "price": 2290,
      "_id": "57cea287e804f70584e81d2d"
    },
    {
      "mrp": 2290,
      "price": 2290,
      "size": "14",
      "image": "guitar-944262_640.jpg",
      "_id": "57cea287e804f70584e81d2c"
    },
    {
      "image": "guitar-944262_640.jpg",
      "mrp": 2290,
      "price": 2290,
      "size": "16",
      "_id": "57cea287e804f70584e81d2b"
    },
    {
      "price": 2290,
      "size": "18",
      "image": "guitar-944262_640.jpg",
      "mrp": 2290,
      "_id": "57cea287e804f70584e81d2a"
    },
    {
      "size": "20",
      "image": "guitar-944262_640.jpg",
      "mrp": 2290,
      "price": 2290,
      "_id": "57cea287e804f70584e81d29"
    }
  ]
},
{
  "__v": 1,
  "_id": "57c18513993c5f5d54000008",
  "active": true,
  "brand": "57c17ecf993c5faed8000004",
  "category": "57c198ce993c5fe64d00000c",
  "features": [
    {
      "key": "Fabric",
      "val": "Polyester"
    },
    {
      "key": "Neck",
      "val": "Round Neck"
    },
    {
      "key": "Fit",
      "val": "Regular"
    },
    {
      "val": "Rust",
      "key": "Color"
    },
    {
      "key": "Package Contents",
      "val": "Tunic With Belt"
    },
    {
      "key": "Style",
      "val": "Printed"
    },
    {
      "key": "Model Stats",
      "val": "This model has height 5'6\",Bust 32\",Waist 25\",Hip 35\"and is Wearing Size 8."
    }
  ],
  "info": "A perfect blend of style and comfort, this rust coloured tunic by Dorothy Perkins is a must-buy. Fashioned from polyester, this regular-fit tunic will keep you at ease all day long. Team this tunic with leggings and slip-ons for a chic look.",
  "keyFeatures": [
    {
      "key": "Fabric",
      "val": "Polyester"
    },
    {
      "key": "Neck",
      "val": "Round Neck"
    },
    {
      "key": "Fit",
      "val": "Regular"
    }
  ],
  "name": "Dorothy PerkinsRust Printed Tunic With Belt",
  "nameLower": "dorothy perkinsrust printed tunic with belt",
  "sku": 30,
  "slug": "dorothy-perkinsrust-printed-tunic-with-belt",
  "type": "Men",
  "uid": "swadesh@codenx.com",
  "variants": [
    {
      "image": "uploads/C6IK14QwmDI55pbnx3MaAFnc.jpg",
      "mrp": 2690,
      "price": 2690,
      "size": "6",
      "_id": "57cea272e804f70584e81d28"
    },
    {
      "image": "woman-918784_640.jpg",
      "mrp": 2690,
      "price": 2690,
      "size": "8",
      "_id": "57cea272e804f70584e81d27"
    },
    {
      "image": "woman-918784_640.jpg",
      "mrp": 2690,
      "price": 2690,
      "size": "10",
      "_id": "57cea272e804f70584e81d26"
    },
    {
      "size": "12",
      "image": "woman-918784_640.jpg",
      "mrp": 2690,
      "price": 2690,
      "_id": "57cea272e804f70584e81d25"
    },
    {
      "mrp": 2690,
      "price": 2690,
      "size": "14",
      "image": "woman-918784_640.jpg",
      "_id": "57cea272e804f70584e81d24"
    },
    {
      "image": "woman-918784_640.jpg",
      "mrp": 2690,
      "price": 2690,
      "size": "16",
      "_id": "57cea272e804f70584e81d23"
    },
    {
      "price": 2690,
      "size": "18",
      "image": "woman-918784_640.jpg",
      "mrp": 2690,
      "_id": "57cea272e804f70584e81d22"
    },
    {
      "size": "20",
      "image": "woman-918784_640.jpg",
      "mrp": 2690,
      "price": 2690,
      "_id": "57cea272e804f70584e81d21"
    }
  ]
},
{
  "__v": 1,
  "_id": "57c18531993c5f4354000008",
  "active": true,
  "brand": "57c17eec993c5f81f9000006",
  "category": "57c19938993c5fc13f000011",
  "features": [
    {
      "key": "Type",
      "val": "Blouses"
    },
    {
      "key": "Fabric",
      "val": "Polyester"
    },
    {
      "key": "Neck",
      "val": "Round Neck"
    },
    {
      "key": "Fit",
      "val": "Regular"
    },
    {
      "key": "Color",
      "val": "White"
    },
    {
      "key": "Style",
      "val": "Embroidered"
    },
    {
      "key": "Model Stats",
      "val": "This model has height 5'6\",Bust 33\",Waist 30\",Hip 36\"and is Wearing Size 8."
    }
  ],
  "info": "",
  "keyFeatures": [
    {
      "key": "Type",
      "val": "Blouses"
    },
    {
      "key": "Fabric",
      "val": "Polyester"
    },
    {
      "key": "Neck",
      "val": "Round Neck"
    },
    {
      "key": "Fit",
      "val": "Regular"
    },
    {
      "key": "Color",
      "val": "White"
    }
  ],
  "name": "Dorothy PerkinsWhite Embroidered Blouse",
  "nameLower": "dorothy perkinswhite embroidered blouse",
  "sku": 31,
  "slug": "dorothy-perkinswhite-embroidered-blouse",
  "type": "Men",
  "uid": "swadesh@codenx.com",
  "variants": [
    {
      "image": "uploads/Ttc_9o-wszooYmre0blxfbr3.jpg",
      "mrp": 3690,
      "price": 3690,
      "size": "6",
      "_id": "57cea261e804f70584e81d20"
    },
    {
      "image": "handsome-885096_640.jpg",
      "mrp": 3690,
      "price": 3690,
      "size": "8",
      "_id": "57cea261e804f70584e81d1f"
    },
    {
      "size": "10",
      "image": "handsome-885096_640.jpg",
      "mrp": 3690,
      "price": 3690,
      "_id": "57cea261e804f70584e81d1e"
    },
    {
      "mrp": 3690,
      "price": 3690,
      "size": "12",
      "image": "handsome-885096_640.jpg",
      "_id": "57cea261e804f70584e81d1d"
    },
    {
      "price": 3690,
      "size": "14",
      "image": "handsome-885096_640.jpg",
      "mrp": 3690,
      "_id": "57cea261e804f70584e81d1c"
    },
    {
      "image": "handsome-885096_640.jpg",
      "mrp": 3690,
      "price": 3690,
      "size": "16",
      "_id": "57cea261e804f70584e81d1b"
    },
    {
      "image": "handsome-885096_640.jpg",
      "mrp": 3690,
      "price": 3690,
      "size": "18",
      "_id": "57cea261e804f70584e81d1a"
    },
    {
      "mrp": 3690,
      "price": 3690,
      "size": "20",
      "image": "handsome-885096_640.jpg",
      "_id": "57cea261e804f70584e81d19"
    }
  ]
},
{
  "__v": 1,
  "_id": "57c18558993c5f5d54000009",
  "active": true,
  "brand": "57c17e6e993c5faed8000003",
  "category": "57c198ce993c5fe64d00000c",
  "features": [
    {
      "val": "Blouses",
      "key": "Type"
    },
    {
      "val": "Polyester",
      "key": "Fabric"
    },
    {
      "val": "Waist Length",
      "key": "Length"
    },
    {
      "val": "Cap Sleeves",
      "key": "Sleeves"
    },
    {
      "val": "Round Neck",
      "key": "Neck"
    },
    {
      "key": "Fit",
      "val": "Regular"
    },
    {
      "val": "Machine Wash",
      "key": "Wash Care"
    },
    {
      "val": "Green",
      "key": "Color"
    },
    {
      "val": "Printed",
      "key": "Style"
    }
  ],
  "info": "",
  "keyFeatures": [
    {
      "key": "Fabric",
      "val": "Polyester"
    },
    {
      "key": "Type",
      "val": "Blouses"
    },
    {
      "key": "Neck",
      "val": "Round Neck"
    },
    {
      "key": "Fit",
      "val": "Regular"
    },
    {
      "key": "Color",
      "val": "Green"
    }
  ],
  "name": "FaballeyPurple Printed Blouse",
  "nameLower": "faballeypurple printed blouse",
  "sku": 34,
  "slug": "faballeypurple-printed-blouse",
  "type": "Men",
  "uid": "swadesh@codenx.com",
  "variants": [
    {
      "image": "uploads/-PfYR4ydCwb_uIUobGtcOb48.jpg",
      "mrp": 660,
      "price": 660,
      "size": "S",
      "_id": "57cea24fe804f70584e81d18"
    },
    {
      "image": "woman-918583_640.jpg",
      "mrp": 660,
      "price": 660,
      "size": "M",
      "_id": "57cea24fe804f70584e81d17"
    },
    {
      "image": "woman-918583_640.jpg",
      "mrp": 660,
      "price": 660,
      "size": "L",
      "_id": "57cea24fe804f70584e81d16"
    },
    {
      "image": "woman-918583_640.jpg",
      "mrp": 660,
      "price": 660,
      "size": "XL",
      "_id": "57cea24fe804f70584e81d15"
    }
  ]
},
{
  "__v": 1,
  "_id": "57c18572993c5f4354000009",
  "active": true,
  "brand": "57c17e42993c5f81f9000004",
  "category": "57c19189993c5fc13f000009",
  "features": [
    {
      "key": "Type",
      "val": "Long coats"
    },
    {
      "key": "Fabric",
      "val": "TWEED"
    },
    {
      "key": "Sleeves",
      "val": "Full Sleeves"
    },
    {
      "key": "Neck",
      "val": "Round Neck"
    },
    {
      "key": "Fit",
      "val": "Regular"
    },
    {
      "key": "Wash Care",
      "val": "Dark colours to be washed separately"
    },
    {
      "key": "Color",
      "val": "Black"
    },
    {
      "key": "Style",
      "val": "Solid"
    },
    {
      "key": "Model Stats",
      "val": "This model has height 5'9\",Bust 35\",Waist 27\",Hip 36\"and is Wearing Size M."
    }
  ],
  "info": "Raise the temperature of cool evenings this winter, wearing this black coloured long coat from Fort Collins. Crafted from tweed, this coat is high on style quotient. Pair this coat with your favourite bottoms and tan coloured boots for a chic look. ",
  "keyFeatures": [
    {
      "key": "Neck",
      "val": "Round Neck"
    },
    {
      "key": "Fit",
      "val": "Regular"
    }
  ],
  "name": "Fort CollinsBlack Solid Long Coat",
  "nameLower": "fort collinsblack solid long coat",
  "sku": 35,
  "slug": "fort-collinsblack-solid-long-coat",
  "type": "Men",
  "uid": "swadesh@codenx.com",
  "variants": [
    {
      "image": "uploads/SQUkzlVVSs0qObd2XBcz_tZa.jpg",
      "mrp": 2975,
      "price": 2975,
      "size": "M",
      "_id": "57cea22be804f70584e81d0f"
    },
    {
      "image": "human-913934_640.jpg",
      "mrp": 2975,
      "price": 2975,
      "size": "L",
      "_id": "57cea22be804f70584e81d0e"
    },
    {
      "image": "human-913934_640.jpg",
      "mrp": 2975,
      "price": 2975,
      "size": "XL",
      "_id": "57cea22be804f70584e81d0d"
    },
    {
      "image": "human-913934_640.jpg",
      "mrp": 2975,
      "price": 2975,
      "size": "XXL",
      "_id": "57cea22be804f70584e81d0c"
    }
  ]
},
{
  "__v": 1,
  "_id": "57c1858a993c5f5d5400000a",
  "active": true,
  "brand": "57c17d4c993c5f81f9000001",
  "category": "57c1923a993c5fc13f00000d",
  "features": [
    {
      "val": "Cotton",
      "key": "Fabric"
    },
    {
      "val": "3/4th Sleeves",
      "key": "Sleeves"
    },
    {
      "val": "Round Neck",
      "key": "Neck"
    },
    {
      "val": "Regular",
      "key": "Fit"
    },
    {
      "val": "Handwash Separately In Cold Water Use Mild Detergr Dry In Shadeent Do Not Soak / Wring Dry Immediately After Wash",
      "key": "Wash Care"
    },
    {
      "val": "White",
      "key": "Color"
    },
    {
      "key": "Style",
      "val": "Printed"
    },
    {
      "val": "This model has height 5'7\",Bust 33\",Waist 29\",Hip 37\"and is Wearing Size S.",
      "key": "Model Stats"
    }
  ],
  "info": "A perfect fusion of traditional and contemporary style, this orange coloured tunic from Global Desi will be a classy addition to your closet. Fashioned from linen, this regular-fit tunic will keep you at ease all day long. Team this tunic with leggings and slip-ons for a graceful look.",
  "keyFeatures": [
    {
      "key": "Fabric",
      "val": "Cotton"
    },
    {
      "key": "Neck",
      "val": "Round Neck"
    },
    {
      "key": "Fit",
      "val": "Regular"
    },
    {
      "key": "Color",
      "val": "White"
    }
  ],
  "name": "Global DesiOrange Printed Tunic",
  "nameLower": "global desiorange printed tunic",
  "sku": 37,
  "slug": "global-desiorange-printed-tunic",
  "type": "Men",
  "uid": "swadesh@codenx.com",
  "variants": [
    {
      "size": "XS",
      "image": "uploads/Wbl-Ry9brtRVxFV7mJ_OIn2u.jpg",
      "mrp": 1599,
      "price": 1599,
      "_id": "57cea0b6e804f70584e81cf4"
    },
    {
      "mrp": 1599,
      "price": 1599,
      "size": "S",
      "image": "lady-in-red-912366_640.jpg",
      "_id": "57cea0b6e804f70584e81cf3"
    },
    {
      "price": 1599,
      "size": "M",
      "image": "lady-in-red-912366_640.jpg",
      "mrp": 1599,
      "_id": "57cea0b6e804f70584e81cf2"
    },
    {
      "size": "L",
      "image": "lady-in-red-912366_640.jpg",
      "mrp": 1599,
      "price": 1599,
      "_id": "57cea0b6e804f70584e81cf1"
    },
    {
      "image": "lady-in-red-912366_640.jpg",
      "mrp": 1599,
      "price": 1599,
      "size": "XL",
      "_id": "57cea0b6e804f70584e81cf0"
    }
  ]
},
{
  "__v": 1,
  "_id": "57c185a7993c5f435400000a",
  "active": true,
  "brand": "5607c58bdddfb6780c5bddf3",
  "category": "57c1924f993c5fe64d00000b",
  "features": [
    {
      "val": "Jackets",
      "key": "Type"
    },
    {
      "val": "Collar",
      "key": "Neck"
    },
    {
      "val": "Red",
      "key": "Color"
    },
    {
      "val": "Polyurethane",
      "key": "Fabric Details"
    },
    {
      "key": "Model Stats",
      "val": "This model has height 5'6\",Bust 32\",Waist 25\",Hip 35\"and is Wearing Size S."
    }
  ],
  "info": "Get a classic biker look wearing this jacket for women by Lara Karen. This PU (polyurethane) jacket will ensure a comfortable fit. Team this jacket with jeans and high heels while heading for a weekend outing. ",
  "keyFeatures": [
    {
      "key": "Fit",
      "val": "Regular"
    },
    {
      "key": "Neck",
      "val": "Collar"
    },
    {
      "key": "Color",
      "val": "Red"
    }
  ],
  "name": "Lara KarenBLACK WINTER JACKET",
  "nameLower": "lara karenblack winter jacket",
  "sku": 47,
  "slug": "lara-karenblack-winter-jacket",
  "type": "Men",
  "uid": "swadesh@codenx.com",
  "variants": [
    {
      "price": 3999,
      "size": "S",
      "image": "uploads/DIWE3iQDN20_4z9zaDPHBGqO.jpg",
      "mrp": 3999,
      "_id": "57cea0a3e804f70584e81cef"
    },
    {
      "size": "M",
      "image": "bella-kukan-906524_640.jpg",
      "mrp": 3999,
      "price": 3999,
      "_id": "57cea0a3e804f70584e81cee"
    },
    {
      "mrp": 3999,
      "price": 3999,
      "size": "L",
      "image": "bella-kukan-906524_640.jpg",
      "_id": "57cea0a3e804f70584e81ced"
    },
    {
      "price": 3999,
      "size": "XL",
      "image": "bella-kukan-906524_640.jpg",
      "mrp": 3999,
      "_id": "57cea0a3e804f70584e81cec"
    }
  ]
},
{
  "__v": 1,
  "_id": "57c185c1993c5f5d5400000b",
  "active": true,
  "brand": "57c17a41993c5f81f9000000",
  "category": "57c198f5993c5fe64d00000d",
  "features": [
    {
      "key": "Type",
      "val": "Gown"
    },
    {
      "val": "Round Neck",
      "key": "Neck"
    },
    {
      "val": "Regular",
      "key": "Fit"
    },
    {
      "val": "Red",
      "key": "Color"
    },
    {
      "val": "Poly Georgette",
      "key": "Fabric Details"
    },
    {
      "val": "This model has height 5'7\",Bust 32\",Waist 29\",Hip 35\"and is Wearing Size S.",
      "key": "Model Stats"
    }
  ],
  "info": "",
  "keyFeatures": [
    {
      "key": "Color",
      "val": "Red"
    },
    {
      "key": "Fabric",
      "val": "Cotton"
    },
    {
      "key": "Fit",
      "val": "Regular"
    },
    {
      "key": "Neck",
      "val": "Round Neck"
    }
  ],
  "name": "Lara KarenOff White Dresses",
  "nameLower": "lara karenoff white dresses",
  "sku": 51,
  "slug": "lara-karenoff-white-dresses",
  "type": "Men",
  "uid": "swadesh@codenx.com",
  "variants": [
    {
      "size": "S",
      "image": "uploads/q_YaGxfFSoalAmDHxIoL5rVy.jpg",
      "mrp": 2299,
      "price": 2299,
      "_id": "57cea08be804f70584e81ceb"
    },
    {
      "image": "woman-918776_640.jpg",
      "mrp": 2299,
      "price": 2299,
      "size": "M",
      "_id": "57cea08be804f70584e81cea"
    },
    {
      "size": "L",
      "image": "woman-918776_640.jpg",
      "mrp": 2299,
      "price": 2299,
      "_id": "57cea08be804f70584e81ce9"
    },
    {
      "mrp": 2299,
      "price": 2299,
      "size": "XL",
      "image": "woman-918776_640.jpg",
      "_id": "57cea08be804f70584e81ce8"
    }
  ]
},
{
  "__v": 1,
  "_id": "57c185df993c5f435400000b",
  "active": true,
  "brand": "57c17eec993c5f81f9000006",
  "category": "57c19125993c5fe64d000005",
  "features": [
    {
      "val": "Polyester",
      "key": "Fabric"
    },
    {
      "val": "Skinny",
      "key": "Fit"
    },
    {
      "val": "Dark Colours To Be Washed Separately",
      "key": "Wash Care"
    },
    {
      "val": "Blue",
      "key": "Color"
    },
    {
      "val": "Washed",
      "key": "Style"
    },
    {
      "val": "This model has height 5'8\",Bust 32\",Waist 29\",Hip 33\"and is Wearing Size 28.",
      "key": "Model Stats"
    }
  ],
  "info": "",
  "keyFeatures": [
    {
      "key": "Fabric",
      "val": "Polyester"
    },
    {
      "key": "Color",
      "val": "Blue"
    }
  ],
  "name": "LeeBlue Mid Rise Skinny Jeans",
  "nameLower": "leeblue mid rise skinny jeans",
  "sku": 54,
  "slug": "leeblue-mid-rise-skinny-jeans",
  "type": "Men",
  "uid": "swadesh@codenx.com",
  "variants": [
    {
      "image": "uploads/G8zyaeeFHhZ4f3Sit9baKJcz.jpg",
      "mrp": 3599,
      "price": 3599,
      "size": "26",
      "_id": "57cea039e804f70584e81cdd"
    },
    {
      "image": "woman-918895_640.jpg",
      "mrp": 3599,
      "price": 3599,
      "size": "28",
      "_id": "57cea039e804f70584e81cdc"
    },
    {
      "image": "woman-918895_640.jpg",
      "mrp": 3599,
      "price": 3599,
      "size": "30",
      "_id": "57cea039e804f70584e81cdb"
    },
    {
      "size": "32",
      "image": "woman-918895_640.jpg",
      "mrp": 3599,
      "price": 3599,
      "_id": "57cea039e804f70584e81cda"
    },
    {
      "image": "woman-918895_640.jpg",
      "mrp": 3599,
      "price": 3599,
      "size": "34",
      "_id": "57cea039e804f70584e81cd9"
    }
  ]
},
{
  "__v": 1,
  "_id": "57c185f8993c5f5d5400000c",
  "active": true,
  "brand": "57c17e1c993c5faed8000002",
  "category": "57c1923a993c5fc13f00000d",
  "features": [
    {
      "key": "Type",
      "val": "Shift Dresses"
    },
    {
      "key": "Fabric",
      "val": "100% Viscose"
    },
    {
      "val": "Round Neck",
      "key": "Neck"
    },
    {
      "key": "Fit",
      "val": "Regular"
    },
    {
      "key": "Wash Care",
      "val": "GENTLE WASH"
    },
    {
      "key": "Color",
      "val": "Blue"
    },
    {
      "key": "Package Contents",
      "val": "Dress Leather Belt"
    },
    {
      "val": "Solid",
      "key": "Style"
    },
    {
      "key": "Model Stats",
      "val": "This model has height 5'7\",Bust 32\",Waist 29\",Hip 35\"and is Wearing Size S."
    }
  ],
  "info": "Make a distinct style statement wearing this navy blue coloured dress from MANGO. A must-have for fashionable women, this short dress features trendy sleeves and back. This short dress is made from 100% viscose and features regular fit.",
  "keyFeatures": [
    {
      "key": "Neck",
      "val": "Round Neck"
    },
    {
      "key": "Color",
      "val": "Blue"
    }
  ],
  "name": "MangoBlue Solid Shift Dress With Belt",
  "nameLower": "mangoblue solid shift dress with belt",
  "sku": 55,
  "slug": "mangoblue-solid-shift-dress-with-belt",
  "type": "Men",
  "uid": "swadesh@codenx.com",
  "variants": [
    {
      "image": "uploads/kS9YNER3d7RyD-m3242GHPIr.jpg",
      "mrp": 3490,
      "price": 3490,
      "size": "XS",
      "_id": "57ce9ff4e804f70584e81cd4"
    },
    {
      "image": "male-419947_640.jpg",
      "mrp": 3490,
      "price": 3490,
      "size": "S",
      "_id": "57ce9ff4e804f70584e81cd3"
    },
    {
      "mrp": 3490,
      "price": 3490,
      "size": "M",
      "image": "male-419947_640.jpg",
      "_id": "57ce9ff4e804f70584e81cd2"
    },
    {
      "price": 3490,
      "size": "L",
      "image": "male-419947_640.jpg",
      "mrp": 3490,
      "_id": "57ce9ff4e804f70584e81cd1"
    },
    {
      "size": "XL",
      "image": "male-419947_640.jpg",
      "mrp": 3490,
      "price": 3490,
      "_id": "57ce9ff4e804f70584e81cd0"
    }
  ]
},
{
  "__v": 1,
  "_id": "57c18612993c5f435400000c",
  "active": true,
  "brand": "5607c599dddfb6780c5bddf4",
  "category": "57c198f5993c5fe64d00000d",
  "features": [
    {
      "key": "Type",
      "val": "Blouses"
    },
    {
      "key": "Fabric",
      "val": "Cotton"
    },
    {
      "key": "Neck",
      "val": "Collar"
    },
    {
      "key": "Fit",
      "val": "Loose"
    },
    {
      "val": "Blue",
      "key": "Color"
    },
    {
      "key": "Model Stats",
      "val": "This model has height 5'6\",Bust 32\",Waist 25\",Hip 35\"and is Wearing Size S."
    }
  ],
  "info": "Blue loose top",
  "keyFeatures": [
    {
      "val": "Blouses",
      "key": "Type"
    },
    {
      "key": "Fit",
      "val": "Loose"
    },
    {
      "key": "Neck",
      "val": "Collar"
    },
    {
      "key": "Color",
      "val": "Blue"
    }
  ],
  "name": "Miss Bennett LondonStripe Patch Pocket Shirt",
  "nameLower": "miss bennett londonstripe patch pocket shirt",
  "sku": 65,
  "slug": "miss-bennett-londonstripe-patch-pocket-shirt",
  "type": "Men",
  "uid": "swadesh@codenx.com",
  "variants": [
    {
      "size": "S",
      "image": "uploads/qygr4Qp2ATz5TpBqOLSkYpJa.jpg",
      "mrp": 1299,
      "price": 1299,
      "_id": "57ce9fe0e804f70584e81ccf"
    },
    {
      "mrp": 1299,
      "price": 1299,
      "size": "M",
      "image": "male-668140_640.jpg",
      "_id": "57ce9fe0e804f70584e81cce"
    },
    {
      "price": 1299,
      "size": "L",
      "image": "male-668140_640.jpg",
      "mrp": 1299,
      "_id": "57ce9fe0e804f70584e81ccd"
    },
    {
      "image": "male-668140_640.jpg",
      "mrp": 1299,
      "price": 1299,
      "size": "XL",
      "_id": "57ce9fe0e804f70584e81ccc"
    }
  ]
},
{
  "__v": 1,
  "_id": "57c18629993c5f5d5400000d",
  "active": true,
  "brand": "5607c5c1dddfb6780c5bddf8",
  "category": "57c190f7993c5fe64d000004",
  "features": [
    {
      "val": "Polyester",
      "key": "Fabric"
    },
    {
      "val": "Regular",
      "key": "Fit"
    },
    {
      "val": "Black",
      "key": "Color"
    },
    {
      "val": "Solid",
      "key": "Style"
    },
    {
      "val": "This model has height 5'7\",Bust 32\",Waist 30\",Hip 34\"and is Wearing Size 28.",
      "key": "Model Stats"
    }
  ],
  "info": "Establish yourself as the new fashionista by wearing these black jeans from Pepe Jeans. Made from polycotton spandex, these jeans have a drawstring and come in regular fit. These jeans can be teamed up with a crop top and sneakers to complete your stylish look.",
  "keyFeatures": [
    {
      "key": "Fabric",
      "val": "Polyester"
    },
    {
      "key": "Fit",
      "val": "Regular"
    },
    {
      "key": "Color",
      "val": "White"
    }
  ],
  "name": "Pepe JeansBlack Solid Jeans",
  "nameLower": "pepe jeansblack solid jeans",
  "sku": 68,
  "slug": "pepe-jeansblack-solid-jeans",
  "type": "Men",
  "uid": "swadesh@codenx.com",
  "variants": [
    {
      "image": "uploads/k1d2xPL3IqtRVRoU6KbKAUzo.jpg",
      "mrp": 2799,
      "price": 2799,
      "size": "26",
      "_id": "57ce9fb6e804f70584e81cc6"
    },
    {
      "image": "man-916491_640.jpg",
      "mrp": 2799,
      "price": 2799,
      "size": "28",
      "_id": "57ce9fb6e804f70584e81cc5"
    },
    {
      "image": "man-916491_640.jpg",
      "mrp": 2799,
      "price": 2799,
      "size": "30",
      "_id": "57ce9fb6e804f70584e81cc4"
    },
    {
      "image": "man-916491_640.jpg",
      "mrp": 2799,
      "price": 2799,
      "size": "32",
      "_id": "57ce9fb6e804f70584e81cc3"
    },
    {
      "size": "34",
      "image": "man-916491_640.jpg",
      "mrp": 2799,
      "price": 2799,
      "_id": "57ce9fb6e804f70584e81cc2"
    }
  ]
},
{
  "__v": 1,
  "_id": "57c18641993c5f435400000d",
  "active": true,
  "brand": "57c17e42993c5f81f9000004",
  "category": "57c1923a993c5fc13f00000d",
  "features": [
    {
      "val": "Anarkali",
      "key": "Type"
    },
    {
      "val": "Polyester",
      "key": "Fabric"
    },
    {
      "val": "Round Neck",
      "key": "Neck"
    },
    {
      "key": "Color",
      "val": "Blue"
    },
    {
      "val": "Cotton",
      "key": "Fabric Details"
    },
    {
      "val": "This model has height 5'8\",Bust 32\",Waist 27\",Hip 35\"and is Wearing Size S.",
      "key": "Model Stats"
    }
  ],
  "info": "Be the talk of the town by wearing this blue coloured Anarkali from Sangria. Crafted from cotton, this Anarkali features magnificent print and embroidered placket. Team this Anarkali with contrasting churidar and golden jhumkis for a lovely look.",
  "keyFeatures": [
    {
      "key": "Fabric",
      "val": "Polyester"
    },
    {
      "key": "Color",
      "val": "Blue"
    }
  ],
  "name": "SangriaBorder Printed Tier Kurta With Solid Embroidered Yoke And 3/4Th Sleeves",
  "nameLower": "sangriaborder printed tier kurta with solid embroidered yoke and 3/4th sleeves",
  "sku": 72,
  "slug": "sangriaborder-printed-tier-kurta-with-solid-embroidered-yoke-and-34th-sleeves",
  "type": "Men",
  "uid": "swadesh@codenx.com",
  "variants": [
    {
      "image": "uploads/NJB_V7Rmpvf3ULzx5WXgm5zq.jpg",
      "mrp": 1999,
      "price": 1999,
      "size": "XS",
      "_id": "57ce9f99e804f70584e81cc1"
    },
    {
      "image": "model-858751_640.jpg",
      "mrp": 1999,
      "price": 1999,
      "size": "S",
      "_id": "57ce9f99e804f70584e81cc0"
    },
    {
      "image": "model-858751_640.jpg",
      "mrp": 1999,
      "price": 1999,
      "size": "M",
      "_id": "57ce9f99e804f70584e81cbf"
    },
    {
      "mrp": 1999,
      "price": 1999,
      "size": "L",
      "image": "model-858751_640.jpg",
      "_id": "57ce9f99e804f70584e81cbe"
    },
    {
      "price": 1999,
      "size": "XL",
      "image": "model-858751_640.jpg",
      "mrp": 1999,
      "_id": "57ce9f99e804f70584e81cbd"
    }
  ]
},
{
  "__v": 1,
  "_id": "57c18657993c5f5d5400000e",
  "active": true,
  "brand": "5607c5c1dddfb6780c5bddf8",
  "category": "57c191c5993c5fe64d000008",
  "features": [
    {
      "key": "Fit",
      "val": "Slim"
    },
    {
      "key": "Color",
      "val": "Navy Blue"
    },
    {
      "key": "Neck",
      "val": "COLLAR"
    },
    {
      "key": "Sleeves",
      "val": "Full Sleeves"
    },
    {
      "key": "Fabric",
      "val": "Cotton"
    },
    {
      "key": "Style",
      "val": "Printed"
    },
    {
      "key": "Model Stats",
      "val": "This model has height 6'0\",Chest 37\",Waist 34\"and is Wearing Size 40."
    }
  ],
  "info": "",
  "keyFeatures": [
    {
      "key": "Fit",
      "val": "Slim"
    },
    {
      "key": "Fabric",
      "val": "Cotton"
    }
  ],
  "name": "ArrowNavy Blue Slim Fit Formal Shirt",
  "nameLower": "arrownavy blue slim fit formal shirt",
  "sku": 7,
  "slug": "arrownavy-blue-slim-fit-formal-shirt",
  "type": "Men",
  "uid": "swadesh@codenx.com",
  "variants": [
    {
      "image": "uploads/rvkIKygkUeZ3Zr8YNo7jxPPA.jpg",
      "mrp": 1799,
      "price": 1799,
      "size": "39",
      "_id": "57cea2fae804f70584e81d46"
    },
    {
      "image": "woman-804068_640.jpg",
      "mrp": 1799,
      "price": 1799,
      "size": "40",
      "_id": "57cea2fae804f70584e81d45"
    },
    {
      "image": "woman-804068_640.jpg",
      "mrp": 1799,
      "price": 1799,
      "size": "42",
      "_id": "57cea2fae804f70584e81d44"
    },
    {
      "image": "woman-804068_640.jpg",
      "mrp": 1799,
      "price": 1799,
      "size": "44",
      "_id": "57cea2fae804f70584e81d43"
    }
  ]
},
{
  "__v": 1,
  "_id": "57c18671993c5f435400000e",
  "active": true,
  "brand": "5607c5c1dddfb6780c5bddf8",
  "category": "57c1910d993c5fc13f000007",
  "features": [
    {
      "key": "Type",
      "val": "A-line"
    },
    {
      "key": "Fabric",
      "val": "Polyester"
    },
    {
      "key": "Fit",
      "val": "Regular"
    },
    {
      "key": "Wash Care",
      "val": "Machine wash"
    },
    {
      "val": "Light Blue",
      "key": "Color"
    },
    {
      "key": "Style",
      "val": "Solid"
    }
  ],
  "info": "",
  "keyFeatures": [
    
  ],
  "name": "TOPSHOPChevron Pleat A Line Skirt",
  "nameLower": "topshopchevron pleat a line skirt",
  "sku": 81,
  "slug": "topshopchevron-pleat-a-line-skirt",
  "type": "Men",
  "uid": "swadesh@codenx.com",
  "variants": [
    {
      "price": 5190,
      "size": "6",
      "image": "uploads/Qq8ktx4drI4WnY3FKvg0Ic7V.jpg",
      "mrp": 5190,
      "_id": "57ce9f43e804f70584e81cb7"
    },
    {
      "image": "woman-918819_640.jpg",
      "mrp": 5190,
      "price": 5190,
      "size": "8",
      "_id": "57ce9f43e804f70584e81cb6"
    },
    {
      "image": "woman-918819_640.jpg",
      "mrp": 5190,
      "price": 5190,
      "size": "10",
      "_id": "57ce9f43e804f70584e81cb5"
    },
    {
      "image": "woman-918819_640.jpg",
      "mrp": 5190,
      "price": 5190,
      "size": "12",
      "_id": "57ce9f43e804f70584e81cb4"
    },
    {
      "image": "woman-918819_640.jpg",
      "mrp": 5190,
      "price": 5190,
      "size": "14",
      "_id": "57ce9f43e804f70584e81cb3"
    },
    {
      "mrp": 5190,
      "price": 5190,
      "size": "16",
      "image": "woman-918819_640.jpg",
      "_id": "57ce9f43e804f70584e81cb2"
    }
  ]
},
{
  "__v": 1,
  "_id": "57c18689993c5f5d5400000f",
  "active": true,
  "brand": "57c17a41993c5f81f9000000",
  "category": "57c198f5993c5fe64d00000d",
  "features": [
    {
      "val": "Cotton",
      "key": "Fabric"
    },
    {
      "val": "POLY VISCOSE ELASTANE",
      "key": "Fabric"
    },
    {
      "val": "Collar",
      "key": "Neck"
    },
    {
      "val": "Regular",
      "key": "Fit"
    },
    {
      "key": "Wash Care",
      "val": "Dry clean only"
    },
    {
      "val": "Light Grey",
      "key": "Color"
    },
    {
      "val": "Solid",
      "key": "Style"
    }
  ],
  "info": "",
  "keyFeatures": [
    {
      "key": "Fabric",
      "val": "Cotton"
    },
    {
      "key": "Neck",
      "val": "Collar"
    }
  ],
  "name": "TOPSHOPHolly Sleeveless Jacket",
  "nameLower": "topshopholly sleeveless jacket",
  "sku": 86,
  "slug": "topshopholly-sleeveless-jacket",
  "type": "Men",
  "uid": "swadesh@codenx.com",
  "variants": [
    {
      "size": "6",
      "image": "uploads/xk4U_viiWUKhRtyB-WZzcmxT.jpg",
      "mrp": 5190,
      "price": 5190,
      "_id": "57ce9f2ce804f70584e81cb1"
    },
    {
      "image": "women-939996_640.jpg",
      "mrp": 5190,
      "price": 5190,
      "size": "8",
      "_id": "57ce9f2ce804f70584e81cb0"
    },
    {
      "size": "10",
      "image": "women-939996_640.jpg",
      "mrp": 5190,
      "price": 5190,
      "_id": "57ce9f2ce804f70584e81caf"
    },
    {
      "image": "women-939996_640.jpg",
      "mrp": 5190,
      "price": 5190,
      "size": "12",
      "_id": "57ce9f2ce804f70584e81cae"
    },
    {
      "size": "14",
      "image": "women-939996_640.jpg",
      "mrp": 5190,
      "price": 5190,
      "_id": "57ce9f2ce804f70584e81cad"
    },
    {
      "mrp": 5190,
      "price": 5190,
      "size": "16",
      "image": "women-939996_640.jpg",
      "_id": "57ce9f2ce804f70584e81cac"
    }
  ]
},
{
  "__v": 1,
  "_id": "57c186a2993c5f435400000f",
  "active": true,
  "brand": "57c17a41993c5f81f9000000",
  "category": "57c191da993c5fc13f00000b",
  "features": [
    {
      "key": "Type",
      "val": "Chinos"
    },
    {
      "key": "Fabric",
      "val": "Cotton Spandex (Stretchable)"
    },
    {
      "val": "Regular",
      "key": "Fit"
    },
    {
      "key": "Color",
      "val": "Red"
    },
    {
      "key": "Style",
      "val": "Solid"
    },
    {
      "key": "Model Stats",
      "val": "This model has height 5'6\",Bust 32\",Waist 25\",Hip 35\"and is Wearing Size 28."
    }
  ],
  "info": "Get a head-turning look wearing these red coloured chinos from United Colors of Benetton. Made from cotton spandex, these chinos stay extremely soft against the skin. Featuring a flawless finish, these chinos can be worn with a top of your choice for a modish look. ",
  "keyFeatures": [
    {
      "key": "Fabric",
      "val": "Polyester"
    },
    {
      "key": "Fit",
      "val": "Loose"
    },
    {
      "key": "Neck",
      "val": "Round Neck"
    },
    {
      "key": "Color",
      "val": "Green"
    }
  ],
  "name": "United Colors of BenettonRed Solid Chinos",
  "nameLower": "united colors of benettonred solid chinos",
  "sku": 98,
  "slug": "united-colors-of-benettonred-solid-chinos",
  "type": "Men",
  "uid": "swadesh@codenx.com",
  "variants": [
    {
      "image": "uploads/kMA-9tjsHRuo5dBYms8jvXuQ.jpg",
      "mrp": 2499,
      "price": 2499,
      "size": "24",
      "_id": "57ce9f16e804f70584e81cab"
    },
    {
      "image": "model-881432_640.jpg",
      "mrp": 2499,
      "price": 2499,
      "size": "26",
      "_id": "57ce9f16e804f70584e81caa"
    },
    {
      "image": "model-881432_640.jpg",
      "mrp": 2499,
      "price": 2499,
      "size": "28",
      "_id": "57ce9f16e804f70584e81ca9"
    },
    {
      "mrp": 2499,
      "price": 2499,
      "size": "30",
      "image": "model-881432_640.jpg",
      "_id": "57ce9f16e804f70584e81ca8"
    },
    {
      "image": "model-881432_640.jpg",
      "mrp": 2499,
      "price": 2499,
      "size": "32",
      "_id": "57ce9f16e804f70584e81ca7"
    },
    {
      "image": "model-881432_640.jpg",
      "mrp": 2499,
      "price": 2499,
      "size": "34",
      "_id": "57ce9f16e804f70584e81ca6"
    }
  ]
}, function() {
        console.log('finished populating products');
    });
  }
});

Category.find(function (err, data) {
  if(data.length < 1){
    Category.create({
  "__v": 1,
  "_id": "57c1904f993c5fe64d000001",
  "active": true,
  "category": 23,
  "head": "",
  "name": "Pants",
  "parent": "57c1901f993c5fc13f000003",
  "parentCategory": 2,
  "slug": "dresses",
  "uid": "admin@codenx.com",
},
{
  "__v": 1,
  "_id": "57c198bb993c5fc13f00000e",
  "active": true,
  "category": 101,
  "child": [
    
  ],
  "head": "",
  "name": "Tops",
  "parent": "57c19222993c5fe64d00000a",
  "parentCategory": 21,
  "slug": "tops",
  "sub_categories": [
    
  ],
  "uid": "admin@codenx.com",
},
{
  "__v": 1,
  "_id": "57c1923a993c5fc13f00000d",
  "active": true,
  "category": 104,
  "child": [
    
  ],
  "head": "",
  "name": "Tunics",
  "parent": "57c19222993c5fe64d00000a",
  "parentCategory": 12,
  "slug": "tunics",
  "sub_categories": [
    
  ],
  "uid": "admin@codenx.com",
},
{
  "__v": 1,
  "_id": "57c19938993c5fc13f000011",
  "active": true,
  "category": 12,
  "child": [
    
  ],
  "head": "",
  "name": "Ethnic",
  "parent": "57c19222993c5fe64d00000a",
  "parentCategory": 2,
  "slug": "tunics",
  "sub_categories": [
    
  ],
  "uid": "admin@codenx.com",
},
{
  "__v": 1,
  "_id": "57c19929993c5fe64d00000e",
  "active": true,
  "category": 30,
  "child": [
    
  ],
  "head": "",
  "name": "Jeans",
  "parent": "57c19222993c5fe64d00000a",
  "parentCategory": 1,
  "slug": "jeans",
  "sub_categories": [
    
  ],
  "uid": "admin@codenx.com",
},
{
  "__v": 1,
  "_id": "57c198f5993c5fe64d00000d",
  "active": true,
  "category": 100,
  "child": [
    
  ],
  "head": "",
  "name": "Dresses",
  "parent": "57c19222993c5fe64d00000a",
  "parentCategory": 13,
  "slug": "dresses",
  "sub_categories": [
    
  ],
  "uid": "admin@codenx.com",
},
{
  "__v": 1,
  "_id": "57c198ce993c5fe64d00000c",
  "active": true,
  "category": 15,
  "child": [
    
  ],
  "head": "",
  "name": "Western",
  "parent": "57c19222993c5fe64d00000a",
  "parentCategory": 1,
  "slug": "tops",
  "sub_categories": [
    
  ],
  "uid": "admin@codenx.com",
},
{
  "__v": 1,
  "_id": "57c1924f993c5fe64d00000b",
  "active": true,
  "category": 10,
  "child": [
    
  ],
  "name": "Winter",
  "parent": "57c19222993c5fe64d00000a",
  "parentCategory": 1,
  "slug": "women",
  "sub_categories": [
    
  ],
  "uid": "admin@codenx.com",
},
{
  "__v": 0,
  "_id": "57cebfcee804f70584e81d56",
  "active": true,
  "child": [
    
  ],
  "name": "Pants",
  "parent": "57c1901f993c5fc13f000003",
  "slug": "pants",
},
{
  "__v": 1,
  "_id": "57c19125993c5fe64d000005",
  "active": true,
  "category": 108,
  "child": [
    
  ],
  "head": "",
  "name": "Leggings & Jeggings",
  "parent": "57c19222993c5fe64d00000a",
  "parentCategory": 22,
  "slug": "leggings-jeggings",
  "sub_categories": [
    
  ],
  "uid": "admin@codenx.com",
},
{
  "__v": 1,
  "_id": "57c198e2993c5fc13f00000f",
  "active": true,
  "category": 21,
  "child": [
    
  ],
  "head": "",
  "name": "Shirts",
  "parent": "57c1901f993c5fc13f000003",
  "parentCategory": 1,
  "slug": "shirts",
  "sub_categories": [
    
  ],
  "uid": "admin@codenx.com",
},
{
  "__v": 1,
  "_id": "57c19208993c5fc13f00000c",
  "active": true,
  "category": 208,
  "child": [
    
  ],
  "head": "Western",
  "name": "Suits & Blazers",
  "parent": "57c1901f993c5fc13f000003",
  "parentCategory": 17,
  "slug": "suits-blazers",
  "sub_categories": [
    
  ],
  "uid": "admin@codenx.com",
},
{
  "__v": 1,
  "_id": "57c191c5993c5fe64d000008",
  "active": true,
  "category": 206,
  "child": [
    
  ],
  "head": "Ethnic",
  "name": "Track Wear",
  "parent": "57c1901f993c5fc13f000003",
  "parentCategory": 23,
  "slug": "track-wear",
  "sub_categories": [
    
  ],
  "uid": "admin@codenx.com",
},
{
  "__v": 1,
  "_id": "57c191da993c5fc13f00000b",
  "active": true,
  "category": 209,
  "child": [
    
  ],
  "head": "Pants",
  "name": "Casual Trousers",
  "parent": "57c1901f993c5fc13f000003",
  "parentCategory": 23,
  "slug": "casual-trousers",
  "sub_categories": [
    
  ],
  "uid": "admin@codenx.com",
},
{
  "__v": 1,
  "_id": "57c191f2993c5fe64d000009",
  "active": true,
  "category": 207,
  "child": [
    
  ],
  "head": "Pants",
  "name": "Shorts & 3/4ths",
  "parent": "57c1901f993c5fc13f000003",
  "parentCategory": 23,
  "slug": "shorts-34ths",
  "sub_categories": [
    
  ],
  "uid": "admin@codenx.com",
},
{
  "__v": 1,
  "_id": "57c191b2993c5fc13f00000a",
  "active": true,
  "category": 205,
  "child": [
    
  ],
  "head": "Jeans",
  "name": "Denims",
  "parent": "57c1901f993c5fc13f000003",
  "parentCategory": 32,
  "slug": "denims",
  "sub_categories": [
    
  ],
  "uid": "admin@codenx.com",
},
{
  "__v": 1,
  "_id": "57c19189993c5fc13f000009",
  "active": true,
  "category": 203,
  "child": [
    
  ],
  "head": "Winter",
  "name": "Winter Wear",
  "parent": "57c1901f993c5fc13f000003",
  "parentCategory": 11,
  "slug": "winter-wear",
  "sub_categories": [
    
  ],
  "uid": "admin@codenx.com",
},
{
  "__v": 1,
  "_id": "57c19150993c5fe64d000006",
  "active": true,
  "category": 201,
  "child": [
    
  ],
  "head": "Shirts",
  "name": "Casual Shirts",
  "parent": "57c1901f993c5fc13f000003",
  "parentCategory": 21,
  "slug": "casual-shirts",
  "sub_categories": [
    
  ],
  "uid": "admin@codenx.com",
},
{
  "__v": 1,
  "_id": "57c1919a993c5fe64d000007",
  "active": true,
  "category": 204,
  "child": [
    
  ],
  "head": "Shirts",
  "name": "Formal Shirts",
  "parent": "57c1901f993c5fc13f000003",
  "parentCategory": 20,
  "slug": "formal-shirts",
  "sub_categories": [
    
  ],
  "uid": "admin@codenx.com",
},
{
  "__v": 1,
  "_id": "57c1913a993c5fc13f000008",
  "active": true,
  "category": 200,
  "child": [
    
  ],
  "head": "Shirts",
  "name": "Polo & Tees",
  "parent": "57c1901f993c5fc13f000003",
  "parentCategory": 20,
  "slug": "polo-tees",
  "sub_categories": [
    
  ],
  "uid": "admin@codenx.com",
},
{
  "__v": 1,
  "_id": "57c1910d993c5fc13f000007",
  "active": true,
  "category": 107,
  "child": [
    
  ],
  "head": "",
  "name": "Skirts",
  "parent": "57c19222993c5fe64d00000a",
  "parentCategory": 22,
  "slug": "skirts",
  "sub_categories": [
    
  ],
  "uid": "admin@codenx.com",
},
{
  "__v": 1,
  "_id": "57c190f7993c5fe64d000004",
  "active": true,
  "category": 32,
  "child": [
    
  ],
  "head": "",
  "name": "Jeans",
  "parent": "57c1901f993c5fc13f000003",
  "parentCategory": 2,
  "slug": "jeans",
  "sub_categories": [
    
  ],
  "uid": "admin@codenx.com",
},
{
  "__v": 1,
  "_id": "57c190df993c5fc13f000006",
  "active": true,
  "category": 105,
  "child": [
    
  ],
  "head": "",
  "name": "Trousers",
  "parent": "57c1901f993c5fc13f000003",
  "parentCategory": 22,
  "slug": "trousers",
  "sub_categories": [
    
  ],
  "uid": "admin@codenx.com",
},
{
  "__v": 17,
  "_id": "57c1901f993c5fc13f000003",
  "active": true,
  "category": 2,
  "child": [
    "57c190f7993c5fe64d000004",
    "57c1907a993c5fe64d000002",
    "57c190df993c5fc13f000006",
    "57c198e2993c5fc13f00000f",
    "57c19208993c5fc13f00000c",
    "57c191b2993c5fc13f00000a",
    "57c19189993c5fc13f000009",
    "57c19150993c5fe64d000006",
    "57c1913a993c5fc13f000008",
    "57c1919a993c5fe64d000007",
    "57c191c5993c5fe64d000008",
    "57c191da993c5fc13f00000b",
    "57c191f2993c5fe64d000009",
    "57cebfcee804f70584e81d56"
  ],
  "name": "Men",
  "parentCategory": 0,
  "slug": "men",
  "sub_categories": [
    
  ],
  "uid": "swadesh@codenx.com",
},
{
  "__v": 1,
  "_id": "57c1907a993c5fe64d000002",
  "active": true,
  "category": 102,
  "child": [
    
  ],
  "head": "",
  "name": "Tees",
  "parent": "57c1901f993c5fc13f000003",
  "parentCategory": 20,
  "slug": "tees",
  "sub_categories": [
    
  ],
  "uid": "admin@codenx.com",
},
{
  "__v": 10,
  "_id": "57c19222993c5fe64d00000a",
  "active": true,
  "category": 1,
  "child": [
    "57c1910d993c5fc13f000007",
    "57c1923a993c5fc13f00000d",
    "57c1909e993c5fc13f000005",
    "57c19125993c5fe64d000005",
    "57c198ce993c5fe64d00000c",
    "57c198bb993c5fc13f00000e",
    "57c19938993c5fc13f000011",
    "57c198f5993c5fe64d00000d",
    "57c1924f993c5fe64d00000b",
    "57c19929993c5fe64d00000e"
  ],
  "name": "Women",
  "parentCategory": 0,
  "slug": "women",
  "sub_categories": [
    
  ],
  "uid": "admin@codenx.com",
},
{
  "__v": 1,
  "_id": "57c1909e993c5fc13f000005",
  "active": true,
  "category": 20,
  "child": [
    
  ],
  "head": "",
  "name": "Shirts",
  "parent": "57c19222993c5fe64d00000a",
  "parentCategory": 2,
  "slug": "shirts",
  "sub_categories": [
    
  ],
  "uid": "admin@codenx.com",
}, function() {
        console.log('finished populating categories');
    });
  }
});

Brand.find(function (err, data) {
  if(data.length < 1){
    Brand.create({
  "_id": "5607c58bdddfb6780c5bddf3",
  "name": "Estelle",
  "info": "Estelle",
  "slug": "estelle",
  "__v": 0,
  "active": true
},
{
  "_id": "5607c599dddfb6780c5bddf4",
  "name": "FREECULTR",
  "info": "FREECULTR",
  "slug": "freecultr",
  "__v": 0,
  "active": true
},
{
  "__v": 0,
  "slug": "alleviater",
  "info": "Alleviater",
  "name": "Alleviater",
  "_id": "5607c5c1dddfb6780c5bddf8",
  "active": true
},
{
  "_id": "57c17a41993c5f81f9000000",
  "__v": 0,
  "brand": 10,
  "active": true,
  "info": "Li-Ning",
  "name": "Li-Ning",
  "slug": "li-ning",
  "uid": "swadesh@codenx.com"
},
{
  "_id": "57c17d4c993c5f81f9000001",
  "__v": 0,
  "active": true,
  "info": "Knotty Derby",
  "name": "Knotty Derby",
  "slug": "knotty-derby",
  "uid": "admin@codenx.com",
  "brand": 70
},
{
  "_id": "57c17d83993c5faed8000000",
  "__v": 0,
  "active": true,
  "info": "J Collection",
  "name": "J Collection",
  "slug": "j-collection",
  "uid": "admin@codenx.com",
  "brand": 90
},
{
  "_id": "57c17dab993c5f81f9000002",
  "__v": 0,
  "active": true,
  "info": "Inc.5",
  "name": "Inc.5",
  "slug": "inc5",
  "uid": "admin@codenx.com",
  "brand": 100
},
{
  "_id": "57c17dce993c5faed8000001",
  "__v": 0,
  "active": true,
  "info": "Garfield",
  "name": "Garfield",
  "slug": "garfield",
  "uid": "admin@codenx.com",
  "brand": 120
},
{
  "_id": "57c17df7993c5f81f9000003",
  "__v": 0,
  "active": true,
  "info": "Happy Feet",
  "name": "Happy Feet",
  "slug": "happy-feet",
  "uid": "admin@codenx.com",
  "brand": 110
},
{
  "_id": "57c17e1c993c5faed8000002",
  "__v": 0,
  "active": true,
  "info": "John Jacobs",
  "name": "John Jacobs",
  "slug": "john-jacobs",
  "uid": "admin@codenx.com",
  "brand": 80
},
{
  "_id": "57c17e42993c5f81f9000004",
  "__v": 0,
  "active": true,
  "info": "Melange",
  "name": "Melange",
  "slug": "melange",
  "uid": "admin@codenx.com",
  "brand": 40
},
{
  "_id": "57c17e6e993c5faed8000003",
  "__v": 0,
  "active": true,
  "info": "Phosphorus",
  "name": "Phosphorus",
  "slug": "phosphorus",
  "uid": "admin@codenx.com",
  "brand": 20
},
{
  "_id": "57c17e9f993c5f81f9000005",
  "__v": 0,
  "active": true,
  "info": "Massimo Italiano",
  "name": "Massimo Italiano",
  "slug": "massimo-italiano",
  "uid": "admin@codenx.com",
  "brand": 50
},
{
  "_id": "57c17ecf993c5faed8000004",
  "__v": 0,
  "active": true,
  "info": "New Look",
  "name": "New Look",
  "slug": "new-look",
  "uid": "admin@codenx.com",
  "brand": 30
},
{
  "_id": "57c17eec993c5f81f9000006",
  "__v": 0,
  "active": true,
  "info": "LA BRIZA",
  "name": "LA BRIZA",
  "slug": "la-briza",
  "uid": "admin@codenx.com",
  "brand": 60
}, function() {
        console.log('finished populating brands');
    });
  }
});

Country.find(function (err, data) {
  if(data.length < 1){
    Country.create({"code":"AF","dial_code":"+93","name":"Afghanistan"},
    {"code":"AL","dial_code":"+355","name":"Albania"},
    {"code":"DZ","dial_code":"+213","name":"Algeria"},
    {"code":"AS","dial_code":"+1 684","name":"AmericanSamoa"},
    {"code":"AD","dial_code":"+376","name":"Andorra"},
    {"code":"AO","dial_code":"+244","name":"Angola"},
    {"code":"AI","dial_code":"+1 264","name":"Anguilla"},
    {"code":"AQ","dial_code":"+672","name":"Antarctica"},
    {"code":"AG","dial_code":"+1268","name":"Antigua and Barbuda"},
    {"code":"AR","dial_code":"+54","name":"Argentina"},
    {"code":"AM","dial_code":"+374","name":"Armenia"},
    {"code":"AW","dial_code":"+297","name":"Aruba"},
    {"code":"AU","dial_code":"+61","name":"Australia"},
    {"code":"AT","dial_code":"+43","name":"Austria"},
    {"code":"AZ","dial_code":"+994","name":"Azerbaijan"},
    {"code":"BS","dial_code":"+1 242","name":"Bahamas"},
    {"code":"BH","dial_code":"+973","name":"Bahrain"},
    {"code":"BD","dial_code":"+880","name":"Bangladesh"},
    {"code":"BB","dial_code":"+1 246","name":"Barbados"},
    {"code":"BY","dial_code":"+375","name":"Belarus"},
    {"code":"BE","dial_code":"+32","name":"Belgium"},
    {"code":"BZ","dial_code":"+501","name":"Belize"},
    {"code":"BJ","dial_code":"+229","name":"Benin"},
    {"code":"BM","dial_code":"+1 441","name":"Bermuda"},
    {"code":"BT","dial_code":"+975","name":"Bhutan"},
    {"code":"BO","dial_code":"+591","name":"Bolivia, Plurinational State of"},
    {"code":"BA","dial_code":"+387","name":"Bosnia and Herzegovina"},
    {"code":"BW","dial_code":"+267","name":"Botswana"},
    {"code":"BR","dial_code":"+55","name":"Brazil"},
    {"code":"IO","dial_code":"+246","name":"British Indian Ocean Territory"},
    {"code":"BN","dial_code":"+673","name":"Brunei Darussalam"},
    {"code":"BG","dial_code":"+359","name":"Bulgaria"},
    {"code":"BF","dial_code":"+226","name":"Burkina Faso"},
    {"code":"BI","dial_code":"+257","name":"Burundi"},
    {"code":"KH","dial_code":"+855","name":"Cambodia"},
    {"code":"CM","dial_code":"+237","name":"Cameroon"},
    {"code":"CA","dial_code":"+1","name":"Canada"},
    {"code":"CV","dial_code":"+238","name":"Cape Verde"},
    {"code":"KY","dial_code":"+ 345","name":"Cayman Islands"},
    {"code":"CF","dial_code":"+236","name":"Central African Republic"},
    {"code":"TD","dial_code":"+235","name":"Chad"},
    {"code":"CL","dial_code":"+56","name":"Chile"},
    {"code":"CN","dial_code":"+86","name":"China"},
    {"code":"CX","dial_code":"+61","name":"Christmas Island"},
    {"code":"CC","dial_code":"+61","name":"Cocos (Keeling) Islands"},
    {"code":"CO","dial_code":"+57","name":"Colombia"},
    {"code":"KM","dial_code":"+269","name":"Comoros"},
    {"code":"CG","dial_code":"+242","name":"Congo"},
    {"code":"CD","dial_code":"+243","name":"Congo, The Democratic Republic of the"},
    {"code":"CK","dial_code":"+682","name":"Cook Islands"},
    {"code":"CR","dial_code":"+506","name":"Costa Rica"},
    {"code":"CI","dial_code":"+225","name":"Cote d'Ivoire"},
    {"code":"HR","dial_code":"+385","name":"Croatia"},
    {"code":"CU","dial_code":"+53","name":"Cuba"},
    {"code":"CY","dial_code":"+357","name":"Cyprus"},
    {"code":"CZ","dial_code":"+420","name":"Czech Republic"},
    {"code":"DK","dial_code":"+45","name":"Denmark"},
    {"code":"DJ","dial_code":"+253","name":"Djibouti"},
    {"code":"DM","dial_code":"+1 767","name":"Dominica"},
    {"code":"DO","dial_code":"+1 849","name":"Dominican Republic"},
    {"code":"EC","dial_code":"+593","name":"Ecuador"},
    {"code":"EG","dial_code":"+20","name":"Egypt"},
    {"code":"SV","dial_code":"+503","name":"El Salvador"},
    {"code":"GQ","dial_code":"+240","name":"Equatorial Guinea"},
    {"code":"ER","dial_code":"+291","name":"Eritrea"},
    {"code":"EE","dial_code":"+372","name":"Estonia"},
    {"code":"ET","dial_code":"+251","name":"Ethiopia"},
    {"code":"FK","dial_code":"+500","name":"Falkland Islands (Malvinas)"},
    {"code":"FO","dial_code":"+298","name":"Faroe Islands"},
    {"code":"FJ","dial_code":"+679","name":"Fiji"},
    {"code":"FI","dial_code":"+358","name":"Finland"},
    {"code":"FR","dial_code":"+33","name":"France"},
    {"code":"GF","dial_code":"+594","name":"French Guiana"},
    {"code":"PF","dial_code":"+689","name":"French Polynesia"},
    {"code":"GA","dial_code":"+241","name":"Gabon"},
    {"code":"GM","dial_code":"+220","name":"Gambia"},
    {"code":"GE","dial_code":"+995","name":"Georgia"},
    {"code":"DE","dial_code":"+49","name":"Germany"},
    {"code":"GH","dial_code":"+233","name":"Ghana"},
    {"code":"GI","dial_code":"+350","name":"Gibraltar"},
    {"code":"GR","dial_code":"+30","name":"Greece"},
    {"code":"GL","dial_code":"+299","name":"Greenland"},
    {"code":"GD","dial_code":"+1 473","name":"Grenada"},
    {"code":"GP","dial_code":"+590","name":"Guadeloupe"},
    {"code":"GU","dial_code":"+1 671","name":"Guam"},
    {"code":"GT","dial_code":"+502","name":"Guatemala"},
    {"code":"GG","dial_code":"+44","name":"Guernsey"},
    {"code":"GN","dial_code":"+224","name":"Guinea"},
    {"code":"GW","dial_code":"+245","name":"Guinea-Bissau"},
    {"code":"GY","dial_code":"+595","name":"Guyana"},
    {"code":"HT","dial_code":"+509","name":"Haiti"},
    {"code":"VA","dial_code":"+379","name":"Holy See (Vatican City State)"},
    {"code":"HN","dial_code":"+504","name":"Honduras"},
    {"code":"HK","dial_code":"+852","name":"Hong Kong"},
    {"code":"HU","dial_code":"+36","name":"Hungary"},
    {"code":"IS","dial_code":"+354","name":"Iceland"},
    {"code":"IN","dial_code":"+91","name":"India"},
    {"code":"ID","dial_code":"+62","name":"Indonesia"},
    {"code":"IR","dial_code":"+98","name":"Iran, Islamic Republic of"},
    {"code":"IQ","dial_code":"+964","name":"Iraq"},
    {"code":"IE","dial_code":"+353","name":"Ireland"},
    {"code":"IM","dial_code":"+44","name":"Isle of Man"},
    {"code":"IL","dial_code":"+972","name":"Israel"},
    {"code":"IT","dial_code":"+39","name":"Italy"},
    {"code":"JM","dial_code":"+1 876","name":"Jamaica"},
    {"code":"JP","dial_code":"+81","name":"Japan"},
    {"code":"JE","dial_code":"+44","name":"Jersey"},
    {"code":"JO","dial_code":"+962","name":"Jordan"},
    {"code":"KZ","dial_code":"+7 7","name":"Kazakhstan"},
    {"code":"KE","dial_code":"+254","name":"Kenya"},
    {"code":"KI","dial_code":"+686","name":"Kiribati"},
    {"code":"KP","dial_code":"+850","name":"Korea, Democratic People's Republic of"},
    {"code":"KR","dial_code":"+82","name":"Korea, Republic of"},
    {"code":"KW","dial_code":"+965","name":"Kuwait"},
    {"code":"KG","dial_code":"+996","name":"Kyrgyzstan"},
    {"code":"LA","dial_code":"+856","name":"Lao People's Democratic Republic"},
    {"code":"LV","dial_code":"+371","name":"Latvia"},
    {"code":"LB","dial_code":"+961","name":"Lebanon"},
    {"code":"LS","dial_code":"+266","name":"Lesotho"},
    {"code":"LR","dial_code":"+231","name":"Liberia"},
    {"code":"LY","dial_code":"+218","name":"Libyan Arab Jamahiriya"},
    {"code":"LI","dial_code":"+423","name":"Liechtenstein"},
    {"code":"LT","dial_code":"+370","name":"Lithuania"},
    {"code":"LU","dial_code":"+352","name":"Luxembourg"},
    {"code":"MO","dial_code":"+853","name":"Macao"},
    {"code":"MK","dial_code":"+389","name":"Macedonia, The Former Yugoslav Republic of"},
    {"code":"MG","dial_code":"+261","name":"Madagascar"},
    {"code":"MW","dial_code":"+265","name":"Malawi"},
    {"code":"MY","dial_code":"+60","name":"Malaysia"},
    {"code":"MV","dial_code":"+960","name":"Maldives"},
    {"code":"ML","dial_code":"+223","name":"Mali"},
    {"code":"MT","dial_code":"+356","name":"Malta"},
    {"code":"MH","dial_code":"+692","name":"Marshall Islands"},
    {"code":"MQ","dial_code":"+596","name":"Martinique"},
    {"code":"MR","dial_code":"+222","name":"Mauritania"},
    {"code":"MU","dial_code":"+230","name":"Mauritius"},
    {"code":"YT","dial_code":"+262","name":"Mayotte"},
    {"code":"MX","dial_code":"+52","name":"Mexico"},
    {"code":"FM","dial_code":"+691","name":"Micronesia, Federated States of"},
    {"code":"MD","dial_code":"+373","name":"Moldova, Republic of"},
    {"code":"MC","dial_code":"+377","name":"Monaco"},
    {"code":"MN","dial_code":"+976","name":"Mongolia"},
    {"code":"ME","dial_code":"+382","name":"Montenegro"},
    {"code":"MS","dial_code":"+1664","name":"Montserrat"},
    {"code":"MA","dial_code":"+212","name":"Morocco"},
    {"code":"MZ","dial_code":"+258","name":"Mozambique"},
    {"code":"MM","dial_code":"+95","name":"Myanmar"},
    {"code":"NA","dial_code":"+264","name":"Namibia"},
    {"code":"NR","dial_code":"+674","name":"Nauru"},
    {"code":"NP","dial_code":"+977","name":"Nepal"},
    {"code":"NL","dial_code":"+31","name":"Netherlands"},
    {"code":"AN","dial_code":"+599","name":"Netherlands Antilles"},
    {"code":"NC","dial_code":"+687","name":"New Caledonia"},
    {"code":"NZ","dial_code":"+64","name":"New Zealand"},
    {"code":"NI","dial_code":"+505","name":"Nicaragua"},
    {"code":"NE","dial_code":"+227","name":"Niger"},
    {"code":"NG","dial_code":"+234","name":"Nigeria"},
    {"code":"NU","dial_code":"+683","name":"Niue"},
    {"code":"NF","dial_code":"+672","name":"Norfolk Island"},
    {"code":"MP","dial_code":"+1 670","name":"Northern Mariana Islands"},
    {"code":"NO","dial_code":"+47","name":"Norway"},
    {"code":"OM","dial_code":"+968","name":"Oman"},
    {"code":"PK","dial_code":"+92","name":"Pakistan"},
    {"code":"PW","dial_code":"+680","name":"Palau"},
    {"code":"PS","dial_code":"+970","name":"Palestinian Territory, Occupied"},
    {"code":"PA","dial_code":"+507","name":"Panama"},
    {"code":"PG","dial_code":"+675","name":"Papua New Guinea"},
    {"code":"PY","dial_code":"+595","name":"Paraguay"},
    {"code":"PE","dial_code":"+51","name":"Peru"},
    {"code":"PH","dial_code":"+63","name":"Philippines"},
    {"code":"PN","dial_code":"+872","name":"Pitcairn"},
    {"code":"PL","dial_code":"+48","name":"Poland"},
    {"code":"PT","dial_code":"+351","name":"Portugal"},
    {"code":"PR","dial_code":"+1 939","name":"Puerto Rico"},
    {"code":"QA","dial_code":"+974","name":"Qatar"},
    {"code":"RO","dial_code":"+40","name":"Romania"},
    {"code":"RU","dial_code":"+7","name":"Russia"},
    {"code":"RW","dial_code":"+250","name":"Rwanda"},
    {"code":"RE","dial_code":"+262","name":"Réunion"},
    {"code":"BL","dial_code":"+590","name":"Saint Barthélemy"},
    {"code":"SH","dial_code":"+290","name":"Saint Helena, Ascension and Tristan Da Cunha"},
    {"code":"KN","dial_code":"+1 869","name":"Saint Kitts and Nevis"},
    {"code":"LC","dial_code":"+1 758","name":"Saint Lucia"},
    {"code":"MF","dial_code":"+590","name":"Saint Martin"},
    {"code":"PM","dial_code":"+508","name":"Saint Pierre and Miquelon"},
    {"code":"VC","dial_code":"+1 784","name":"Saint Vincent and the Grenadines"},
    {"code":"WS","dial_code":"+685","name":"Samoa"},
    {"code":"SM","dial_code":"+378","name":"San Marino"},
    {"code":"ST","dial_code":"+239","name":"Sao Tome and Principe"},
    {"code":"SA","dial_code":"+966","name":"Saudi Arabia"},
    {"code":"SN","dial_code":"+221","name":"Senegal"},
    {"code":"RS","dial_code":"+381","name":"Serbia"},
    {"code":"SC","dial_code":"+248","name":"Seychelles"},
    {"code":"SL","dial_code":"+232","name":"Sierra Leone"},
    {"code":"SG","dial_code":"+65","name":"Singapore"},
    {"code":"SK","dial_code":"+421","name":"Slovakia"},
    {"code":"SI","dial_code":"+386","name":"Slovenia"},
    {"code":"SB","dial_code":"+677","name":"Solomon Islands"},
    {"code":"SO","dial_code":"+252","name":"Somalia"},
    {"code":"ZA","dial_code":"+27","name":"South Africa"},
    {"code":"GS","dial_code":"+500","name":"South Georgia and the South Sandwich Islands"},
    {"code":"ES","dial_code":"+34","name":"Spain"},
    {"code":"LK","dial_code":"+94","name":"Sri Lanka"},
    {"code":"SD","dial_code":"+249","name":"Sudan"},
    {"code":"SR","dial_code":"+597","name":"Suriname"},
    {"code":"SJ","dial_code":"+47","name":"Svalbard and Jan Mayen"},
    {"code":"SZ","dial_code":"+268","name":"Swaziland"},
    {"code":"SE","dial_code":"+46","name":"Sweden"},
    {"code":"CH","dial_code":"+41","name":"Switzerland"},
    {"code":"SY","dial_code":"+963","name":"Syrian Arab Republic"},
    {"code":"TW","dial_code":"+886","name":"Taiwan"},
    {"code":"TJ","dial_code":"+992","name":"Tajikistan"},
    {"code":"TZ","dial_code":"+255","name":"Tanzania, United Republic of"},
    {"code":"TH","dial_code":"+66","name":"Thailand"},
    {"code":"TL","dial_code":"+670","name":"Timor-Leste"},
    {"code":"TG","dial_code":"+228","name":"Togo"},
    {"code":"TK","dial_code":"+690","name":"Tokelau"},
    {"code":"TO","dial_code":"+676","name":"Tonga"},
    {"code":"TT","dial_code":"+1 868","name":"Trinidad and Tobago"},
    {"code":"TN","dial_code":"+216","name":"Tunisia"},
    {"code":"TR","dial_code":"+90","name":"Turkey"},
    {"code":"TM","dial_code":"+993","name":"Turkmenistan"},
    {"code":"TC","dial_code":"+1 649","name":"Turks and Caicos Islands"},
    {"code":"TV","dial_code":"+688","name":"Tuvalu"},
    {"code":"UG","dial_code":"+256","name":"Uganda"},
    {"code":"UA","dial_code":"+380","name":"Ukraine"},
    {"code":"AE","dial_code":"+971","name":"United Arab Emirates"},
    {"code":"GB","dial_code":"+44","name":"United Kingdom"},
    {"code":"US","dial_code":"+1","name":"United States"},
    {"code":"UY","dial_code":"+598","name":"Uruguay"},
    {"code":"UZ","dial_code":"+998","name":"Uzbekistan"},
    {"code":"VU","dial_code":"+678","name":"Vanuatu"},
    {"code":"VE","dial_code":"+58","name":"Venezuela, Bolivarian Republic of"},
    {"code":"VN","dial_code":"+84","name":"Viet Nam"},
    {"code":"VG","dial_code":"+1 284","name":"Virgin Islands, British"},
    {"code":"VI","dial_code":"+1 340","name":"Virgin Islands, U.S."},
    {"code":"WF","dial_code":"+681","name":"Wallis and Futuna"},
    {"code":"YE","dial_code":"+967","name":"Yemen"},
    {"code":"ZM","dial_code":"+260","name":"Zambia"},
    {"code":"ZW","dial_code":"+263","name":"Zimbabwe"},
    {"code":"AX","dial_code":"+358","name":"Aland Islands"}, function() {
        console.log('finished populating countries');
    });
  }
});
