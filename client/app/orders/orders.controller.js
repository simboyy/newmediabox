'use strict';

(function() {

class OrdersController {
    constructor(Cart,Auth ,Order,Toast, Settings,$state,$stateParams,$loading) {
        var vm = this;

        this.Order = Order;
        this.orderStatusLov = Order.status;
        this.Toast = Toast;
        this.Auth = Auth;
        this.Settings = Settings // Used to get currency symbol
        this.$state = $state;
        this.options = {};        
        this.itemsGrid = [];

        this.tab = 1;
        this.tabMenu = 1;

        this.setTab = function (tabId) {
            this.tab = tabId;
        };

        this.isSet = function (tabId) {
            return this.tab === tabId;
        };

        
        this.setMenuTab = function(newTab){
          console.log(newTab);
          this.tabMenu = newTab;
        };

        this.isSetMenu = function(tabNum){
          return this.tabMenu === tabNum;
        };

        $loading.start("orders");


        this.orders = Order.pub.query({},function(res){
          var total=0;
          for(var i=0;i<res.length;i++){
          //     var subTotal = 0;
          var  item=res[i];
              for (var j = 0; j < item.items.length; j++) {

                    // items[i].total = 0;
                  
                   var p = item.items[j].price;
                   var q = item.items[j].quantity;
                   total+=(p*q);
                   // var x.sub.push(total);
                 }
              // res.total = total;
              console.log(total);
              $loading.finish("orders");
          }
           $loading.finish("orders");
          res.total = total;
        });


    /***data table**/

     this.mainGridOptions = {
                dataSource: {
                    
                    transport: {
                        read: function (options) {//options holds the grids current page and filter settings
                            Order.pub.query(function(res){

                              for(var j=0;j<res.length;j++){
                                       var total = 0;                      
                                      var item = res[j];
                                     for (var i = 0; i < item.items.length; i++) {

                                       var p = item.items[i].price;
                                       var q = item.items[i].quantity;
                                       total+=(p*q);
                                       
                                                        
                                     }
                                    
                                    res[j].total = total;                                
                                  }

                                options.success(res);
                                      console.log(res);
        
                            });
                           
                        },
                    },
                    pageSize: 10,
                    serverPaging: true,
                    serverSorting: true
                },
                toolbar: [ 'excel','pdf' ],

                excel: {
                        allPages: true,
                        proxyURL: "//demos.telerik.com/kendo-ui/service/export",
                        fileName: 'Mediabox-Orders.xlsx',
                        filterable: true
                    },
                pdf: {
                    allPages: true,
                    avoidLinks: true,
                    paperSize: "A4",
                    margin: { top: "2cm", left: "1cm", right: "1cm", bottom: "1cm" },
                    landscape: true,
                    repeatHeaders: true,
                    template: $("#page-template").html(),
                    scale: 0.8
                },
                sortable: true,
                pageable: true,


                filterable: true,

                dataBound: function() {
                    this.expandRow(this.tbody.find("tr.k-master-row").first());
                },
                columns: [
            { field: "created_at", title: "Order Date" ,type: 'datetime',template: "#=  (created_at == null)? '' : kendo.toString(kendo.parseDate(created_at, 'yyyy-MM-dd'), 'MM/dd/yy') #"},
            { field: "status", title: "Status" },
            { field: "payment.id", title: "Payment Reference" },
            { field: "total", title: "Total" ,format:"{0:c2}"}]
            };

            this.detailGridOptions = function(dataItem) {

                return {
                    dataSource: {
                        transport: {
                        read: function (options) {//options holds the grids current page and filter settings
                            var itemsGrid= [];
                            Order.pub.query({},function(res){
 
                              var total=0;
                              var totalOrder = res.length;

                              // console.log(res.OrderName);
                              // for(var i=0;i<res.length;i++){
                              //     var subTotal = 0;
                                  for(var j=0;j<res.length;j++){
                                    total = 0;
                                  // console.log();
                                      // subTotal += res[i].shipping.charge;
                                      var item = res[j];
                                      //console.log(dataItem.orderNo);


                                     //s console.log(item.orderNo);
                                      //itemsGrid.push(item.items);
                                      // var x = item.items
                                      // var x.sub = [];

                                     for (var i = 0; i < item.items.length; i++) {

                                        var itemGridTemp = {
                                            orderNo:item.orderNo,
                                            id:item._id,
                                            advertiser:item.items[i].advertiser,
                                            category:item.items[i].category,
                                            mrp:item.items[i].mrp,
                                            name:item.items[i].name,
                                            price:parseFloat(item.items[i].price),
                                            publisher:item.items[i].publisher,
                                            quantity:item.items[i].quantity,
                                            size:item.items[i].size,
                                            sku:item.items[i].sku,
                                            uid:item.items[i].uid
                                        }

                                        // items[i].total = 0;
                                      
                                       var p = item.items[i].price;
                                       var q = item.items[i].quantity;
                                       total+=(p*q);
                                       res.totalSpend = total;
                                       // var x.sub.push(total);

                                       vm.itemsGrid.push(itemGridTemp);
                    
                                     }
                                     //console.log(total);
                                    
                                  }
                                  res.total = total;
                                  res.totalOrder =totalOrder;

                                    var data = [];
                                    //console.log(vm.itemsGrid);
                                      for (var i = 0; i < vm.itemsGrid.length; i++) {
                                        var item = vm.itemsGrid[i];
                                        if(item.orderNo == dataItem.orderNo){
                                            //alert(item.campaignNo);
                                            data.push(item);
                                        }

                                        options.success(data);
                                        console.log(data);
        
                                        vm.data = [];
                                            
                                    }
                                    
                                    vm.itemsGrid= [];

                           
                            });
                           
                        },
                    },
                        serverPaging: true,
                        serverSorting: true,
                        serverFiltering: true,
                        pageSize: 5,
                        filter: { field: "orderNo", operator: "eq", value: dataItem.orderNo}
            
                    },
                    scrollable: false,
                    sortable: true,

                    pageable: true,
                    columns: [
                    { field: "orderNo", title:"Order #", width: "50px" },
                    { field: "publisher", title:"Product/Site", width: "100px" },
                    { field: "name", title:"Name", width: "100px" },
                    { field: "price", title: "Price" ,format:"{0:c2}", width: "50px"},
                    { field: "quantity", title:"Quantity",width:"50px" }
                   
                   
                    ]
                };
            };

        }//end constuctor

    navigate(params){
       this.$state.go('single-product', {id:params.sku,slug:params.description}, {reload: false});
    }

    getTotal(item){
      // console.log(item);
      var total = 0

      for (var i = 0; i < item.items.length; i++) {

                // items[i].total = 0;
              
               var p = item.items[i].price;
               var q = item.items[i].quantity;
               total+=(p*q);
               // var x.sub.push(total);
             }
      // console.log(total);

      return total;

    }

     changeStatus(order){

      //console.log(order);
    var vm = this
    var vm = this
    this.Order.update({ id:order._id }, order).$promise.then(function(res) {
    }, function(error) { // error handler
      if(error.data.errors){
        vm.Toast.show({
          type: 'error',
          text: error.data.errors.status.message
        });
      }
      else{
        vm.Toast.show({
          type: 'success',
          text: error.statusText
        });
      }
    });
  }
    
}

angular.module('mediaboxApp')
  .controller('OrdersController', OrdersController);

})();

