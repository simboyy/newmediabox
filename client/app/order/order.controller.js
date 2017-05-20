'use strict';

(function() {

class OrderController {
    constructor(Cart,Auth ,Order,Toast, Settings,$state,$stateParams,$loading) {
        var vm = this;
        this.orderStatusLov = Order.status;
        this.Toast = Toast;
        this.Auth = Auth;
        this.Settings = Settings // Used to get currency symbol
        this.$state = $state;
        this.options = {};
        this.payment = $stateParams;
        this.itemsGrid = [];

        if($stateParams.id) // If payment was successful clear cart
          Cart.cart.clearItems()

        this.itemsGrid = [];

        $loading.start("orders");


        this.orders = Order.my.query({},function(res){
          var total=0;
          for(var i=0;i<res.length;i++){
      //     var subTotal = 0;
            var  item=res[i];
            total += item.amount.total;
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
                            Order.my.query({sort:{created_at:-1}},function(res){

                             
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
                                      //console.log(res);
        
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
                        fileName: 'Mediabox-campaigns.xlsx',
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
                editable: "popup",


                filterable: true,

                dataBound: function() {
                    this.expandRow(this.tbody.find("tr.k-master-row").first());
                },
              columns: [
           // { field: "orderNo", title: "Order Number" },
            { field: "created_at", title: "Order Date" ,type: 'datetime',template: "#=  (created_at == null)? '' : kendo.toString(kendo.parseDate(created_at, 'yyyy-MM-dd'), 'MM/dd/yy') #"},
            { field: "status", title: "Status" },
            { field: "payment.id", title: "Payment Reference" },
            { field: "amount.total", title: "Total" ,format:"{0:c2}"}]
            };

            this.detailGridOptions = function(dataItem) {
     
                return {
                    dataSource: {
                        filter: { field: "orderNo", operator: "eq", value:dataItem.orderNo},
                        transport: {
                        read: function (options) {//options holds the grids current page and filter settings
                            var itemsGrid= [];
                            var q = {};
                             //q.where = { $and: [ { 'items.uid' : Auth.getCurrentUser().email }, { 'status':'Campaign Placed'} ] };
                            Order.my.query(function(res){
                                //console.log(res);
        
 
                              var totalFinal=0;
                              var totalOrder = res.length;

                                  for(var j=0;j<res.length;j++){
                                    var total = 0;
                           
                                      var item = res[j];
                                     for (var i = 0; i < item.items.length; i++) {

                                        var itemGridTemp = {
                                            orderNo:item.orderNo,
                                            puburl:item.items[i].url,
                                            id:item.items[i]._id,
                                            advertiser:item.items[i].advertiser,
                                            category:item.items[i].category,
                                            mrp:item.items[i].mrp,
                                            name:item.items[i].name,
                                            price:parseFloat(item.items[i].price),
                                            publisher:item.items[i].publisher,
                                            quantity:item.items[i].quantity,
                                            size:item.items[i].size,
                                            sku:item.items[i].sku,
                                            uid:item.items[i].uid,
                                        }

                                       
                                      
                                       var p = item.items[i].price;
                                       var q = item.items[i].quantity;
                                       total+=(p*q);
                                       
                                     
                                       vm.itemsGrid.push(itemGridTemp);
                    
                                     }
                                    
                                    res[j].total = total;                                
                                  }
                                  
                                  res.totalFinal =total;

                    
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
                        filterable:true
                        
            
                    },
                    scrollable: false,
                    sortable: true,

                    pageable: true,
                     columns: [
                    { field: "orderNo", title:"Order #", width: "50px" },
                    { field: "publisher" , title: "Publisher",width: "50px"},
                    //{ field: "category", title:"Category", width: "100px" },
                    { field: "name", title:"Name", width: "100px" },
                    { field: "price", title:"Price", width: "50px" ,format:"{0:c2}"},
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
  .controller('OrderController', OrderController);

})();

    