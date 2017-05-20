'use strict';

angular.module('mediaboxApp')


.controller('CampaignCompletedController', function ($scope, Cart ,Auth,$log, $mdSidenav,Campaign,$loading,Upload, $timeout, $http, socket, $mdDialog, Settings, Toast) {
//clear items added to campaign from cart
  //clear items added to campaign from cart
   Cart.cart.clearItems();
   Cart.cart.products = 20;
   
   Auth.getCurrentUser().photo = {};

   //alert(Auth.getCurrentUser().company);
   ////console.log(Auth.getCurrentUser());

 

   $loading.start("campaigns");

   ////console.log(Cart);

  var vm = this;
  vm.cart = Cart.cart;



   vm.itemsGrid = [];

   vm.toggleLeft = buildDelayedToggler('left');
    vm.toggleRight = buildToggler('right');
    vm.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };
    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
      var timer;
      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }
    function buildToggler(navID) {
      return function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }
    }

     vm.cmp = {};
    vm.campaignStatusLov = Campaign.status;
    vm.campaignStatus =  [
      {name:'', val:402},
      {name:'Avail Check', val:201},
      {name:'Buy', val:202},
    ];

      vm.mediaLibrary = function(index){
    $mdDialog.show({
      template: `<md-dialog aria-label="Media Library" ng-cloak flex="95">
        <md-toolbar class="md-warn">
          <div class="md-toolbar-tools">
            <h2>Media Library</h2>
            <span flex></span>
            <md-button class="md-icon-button" ng-click="cancel()">
              <ng-md-icon icon="close" aria-label="Close dialog"></ng-md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-dialog-content>
            <div class="md-dialog-content padding"  class="md-whiteframe-z2">
                <md-grid-list class="media-list" md-cols-xs ="3" md-cols-sm="4" md-cols-md="5" md-cols-lg="7" md-cols-gt-lg="10" md-row-height-gt-md="1:1" md-row-height="4:3" md-gutter="12px" md-gutter-gt-sm="8px" layout="row" layout-align="center center">
                  <md-grid-tile ng-repeat="i in media" class="md-whiteframe-z2" ng-click="ok(i.path)">
                    <div class="thumbnail">
                        <img ng-src="{{i.path}}" draggable="false" alt="{{i.name}}">
                    </div>
                    <md-grid-tile-footer><h3>{{i.name}}</h3></md-grid-tile-footer>
                  </md-grid-tile>
                </md-grid-list>
          </div>
        </md-dialog-content>
        <md-dialog-actions layout="row">
          <span flex></span>
          <md-button ng-click="addNewImage()" class="md-warn md-raised">
           Add new Creative
          </md-button>
        </md-dialog-actions>
      </md-dialog>
`,
      controller: function($scope, $mdDialog, $http, socket, $state) {
        // Start query the database for the table
        var vm = this
        $scope.loading = true;
        $http.get('/api/media/').then(function(res) {
          $scope.loading = false;
          $scope.media = res.data;
          socket.syncUpdates('media', $scope.data);
        }, handleError);

        function handleError(error) { // error handler
            $scope.loading = false;
            if(error.status === 403){
              Toast.show({
                type: 'error',
                text: 'Not authorised to make changes.'
              });
            }
            else{
              Toast.show({
                type: 'error',
                text: error.status
              });
            }
        }
        $scope.ok = function(path){
          $mdDialog.hide(path);
        }
        $scope.hide = function() {
          $mdDialog.hide();
        };
        $scope.cancel = function() {
          $mdDialog.cancel();
        };
        $scope.addNewImage = function(){
          $state.go('media');
          //vm.save(vm.product)
          $mdDialog.hide();
        }
      }

    }).then(function(answer) {
      //console.log(answer);
      if(index===1000000)
        vm.cart.items.push({size:'x', creative:answer})
      else
        vm.cart.items[index].creative = answer;
    }, function() {
    });
  }


    vm.imageDetails = function(img) {
  $mdDialog.show({
    template: `
    <md-dialog aria-label="Image Details Dialog"  ng-cloak>
  <md-toolbar>
    <div class="md-toolbar-tools">
      <h2>Media Details</h2>
      <span flex></span>
      <md-button class="md-icon-button" ng-click="cancel()">
        <ng-md-icon icon="close" aria-label="Close dialog"></ng-md-icon>
      </md-button>
    </div>
  </md-toolbar>
  <md-dialog-content>
    <div class="md-dialog-content">
      <div layout="row" class="md-whiteframe-z2">
        <div class="flexbox-container">
          <div>
            <img ng-src="{{img}}" draggable="false"  class="detail-image"/>
          </div>
          </div>
      </div>
  </md-dialog-content>
  <md-dialog-actions layout="row">
    <span flex></span>
    <md-button ng-click="delete(img)" class="md-warn">
     Delete Permanently
    </md-button>
  </md-dialog-actions>
</md-dialog>
`,
    controller: function($scope, $mdDialog) {
        $scope.img = img;
        $scope.delete = function(img){
          var confirm = $mdDialog.confirm()
            .title('Would you like to delete the media permanently?')
            .textContent('Media once deleted can not be undone.')
            .ariaLabel('Delete Media')
            .ok('Please do it!')
            .cancel('Cancel');
          $mdDialog.show(confirm).then(function() {
            $http.delete('/api/media/' + img._id).then(function() {
              $mdDialog.hide();
            },handleError);
          }, function() {
            $mdDialog.hide();
          });
        }
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
    }
  }).then(function(answer) {
    $scope.alert = 'You said the information was "' + answer + '".';
  }, function() {
    $scope.alert = 'You cancelled the dialog.';
  });
  }

     

    vm.campaignsAll = Campaign.my.query({},function(res){
 
     
      var totalCampaign = res.length;

     res.totalCampaign =totalCampaign;
          ////console.log(totalCampaign);
          $loading.finish("campaigns");
         
      // }
      // res.total = total;
    });


    var qPending = {};
    qPending.where = { $and: [ { 'items.advertiser.email' : Auth.getCurrentUser().email }, { 'status':'Campaign Placed'} ] };
    

    vm.campaignsPending = Campaign.my.query(qPending,function(res){
 
     
      var totalCampaign = res.length;

     res.totalCampaign =totalCampaign;
          ////console.log(totalCampaign);
          $loading.finish("campaigns");
         
      // }
      // res.total = total;
    });

    var qScheduled = {};
    qScheduled.where = { $and: [ { 'items.advertiser.email' : Auth.getCurrentUser().email },{'items.startDate': { $gt: Date.now()}}, { 'status':'Campaign Accepted'} ] };

    vm.campaignsScheduled = Campaign.my.query(qScheduled,function(res){
 
     
      var totalCampaign = res.length;

     res.totalCampaign =totalCampaign;
          ////console.log(totalCampaign);
          $loading.finish("campaigns");
         
      // }
      // res.total = total;
    });

    var qRunning = {};
    qRunning.where = { $and: [ { 'items.advertiser.email' : Auth.getCurrentUser().email },{'items.startDate': { $lt: Date.now()}} ,{'items.endDate': { $gt: Date.now()}}, { 'status':'Campaign Accepted'} ] };

    vm.campaignsRunning = Campaign.my.query(qRunning,function(res){
 
     
      var totalCampaign = res.length;

     res.totalCampaign =totalCampaign;
          ////console.log(totalCampaign);
          $loading.finish("campaigns");
         
      // }
      // res.total = total;
    });

    var qFinished = {};
    qFinished.where = { $and: [ { 'items.advertiser.email' : Auth.getCurrentUser().email },{'items.endDate': { $lt: Date.now()}} ,{ 'status':'Campaign Completed'} ] };

    vm.campaignsCompleted = Campaign.my.query(qFinished,function(res){
 
     
      var totalCampaign = res.length;

     res.totalCampaign =totalCampaign;
          ////console.log(totalCampaign);
          $loading.finish("campaigns");
         
      // }
      // res.total = total;
    });




    vm.getTotal = function(item){
      // //console.log(item);
      var total = 0

      for (var i = 0; i < item.items.length; i++) {

                // items[i].total = 0;
              
               var p = item.items[i].price;
               var q = item.items[i].quantity;
               total+=(p*q);
               // var x.sub.push(total);
             }
      // //console.log(total);

      return total;

        }
    
    
   // alert(Auth.getCurrentUser().email);
    
    
  
          vm.mainGridOptions = {
                dataSource: {
                    
                    transport: {
                        read: function (options) {
                        //options holds the grids current page and filter settings
                        var itemsGrid= [];
                             var qFinished = {};
                            qFinished.where = { $and: [ { 'items.advertiser.email' : Auth.getCurrentUser().email },{'items.endDate': { $lt: Date.now()}} ,{ 'status':'Campaign Accepted'} ] };
                            Campaign.my.query(qFinished,function(res){

                              console.log(res);

                             
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
                                      ////console.log(res);
        
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
            //{ field: "campaignNo", title: "Campaign ID" },
            { field: "campaignName", title: "Campaign Name" },
            { field: "created_at", title: "Date Created" ,type: 'datetime',template: "#=  (created_at == null)? '' : kendo.toString(kendo.parseDate(created_at, 'yyyy-MM-dd'), 'MM/dd/yy') #"},
            //{ field: "endDate", title: "Start Date-End Date",type: 'datetime',template: "#=  (endDate == null)? '' : kendo.toString(kendo.parseDate(endDate, 'yyyy-MM-dd'), 'MM/dd/yy') #" },
            { field: "status", title: "Status",template:function (dataItem) {
               return "<div ng-show= \"dataItem.status.val=='305'\" class=\"alert alert-success\"><small>Approved</small></div>"+
                         // "<div ng-show=\"!dataItem.creative\" class=\"alert alert-danger\" ><small>Needs Creative</small></div>"+
                          "<div  ng-show = \"dataItem.status=='Campaign Placed'\" class=\"alert alert-danger\" ><small>Waiting Response<small></div>"+
                         "<div  ng-show = \"dataItem.status=='Campaign Accepted'\" class=\"alert alert-success\" ><small>Campaign Approved</small> </div>"+
                          "<div  ng-show = \"dataItem.status=='Campaign Rejected'\" class=\"alert alert-danger\" ><small>Campaign Rejected</small> </div>"+
                            "<div  ng-show = \"dataItem.status=='Campaign Completed'\" class=\"alert alert-success\" ><small>Campaign Completed</small> </div>";
            } },
            { field: "total", title: "Total" ,format:"{0:c2}"}]
            };

            vm.detailGridOptions = function(dataItem) {
     
                return {
                    dataSource: {
                        filter: { field: "campaignNo", operator: "eq", value:dataItem.campaignNo},
                        transport: {
                        read: function (options) {//options holds the grids current page and filter settings
                            var itemsGrid= [];
                             var qFinished = {};
                            qFinished.where = { $and: [ { 'items.advertiser.email' : Auth.getCurrentUser().email },{'items.endDate': { $lt: Date.now()}} ,{ 'status':'Campaign Accepted'} ] };
                            Campaign.my.query(qFinished,function(res){
                                ////console.log(res);
        
 
                              var totalFinal=0;
                              var totalCampaign = res.length;

                                  for(var j=0;j<res.length;j++){
                                    var total = 0;
                           
                                      var item = res[j];
                                     for (var i = 0; i < item.items.length; i++) {

                                        var itemGridTemp = {
                                            campaignNo:item.campaignNo,
                                            status:item.status,
                                            id:item._id,
                                            advertiser:item.items[i].advertiser,
                                            category:item.items[i].category,
                                            creative:item.items[i].creative,
                                            image:item.items[i].image,
                                            messages:item.items[i].messages,
                                            mrp:item.items[i].mrp,
                                            name:item.items[i].name,
                                            price:item.items[i].price,
                                            publisher:item.items[i].publisher,
                                            publisheruid:item.items[i].publisheruid,
                                            quantity:item.items[i].quantity,
                                            request:item.items[i].request,
                                            size:item.items[i].size,
                                            sku:item.items[i].sku,
                                            uid:item.items[i].uid
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
                                    ////console.log(vm.itemsGrid);
                                    for (var i = 0; i < vm.itemsGrid.length; i++) {
                                        var item = vm.itemsGrid[i];
                                        if(item.campaignNo == dataItem.campaignNo){
                                            //alert(item.campaignNo);
                                            data.push(item);
                                        }

                                        options.success(data);
                                        //console.log(data);
        
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
                    { field: "campaignNo", title:"Campaign #", width: "70px" },
                    //{ field: "publisher", title:"Publisher", width: "100px" },
                   // { field: "category", title:"Category", width: "50px" },
                    { field: "name", title:"Name", width: "80px" },
                    { field: "category", title:"Start - End Date",width:"60px" },
                    { field: "price", title: "Price" ,width:"50px", format:"{0:c2}"},
                    { field: "quantity", title:"Inserts",width:"30px" },
                 //    { 

                 //    title: "Status",
                 //     width: "40px",
                 //      template: function (dataItem) {
                 //          return "<div ng-show= \"dataItem.status.val=='305'\" class=\"alert alert-success\"><small>Approved</small></div>"+
                 //         // "<div ng-show=\"!dataItem.creative\" class=\"alert alert-danger\" ><small>Needs Creative</small></div>"+
                 //          "<div  ng-show = \"dataItem.status.val=='402'\" class=\"alert alert-danger\" ><small>Pending<small></div>"+
                 //         "<div  ng-show = \"dataItem.status.val=='300'\" class=\"alert alert-success\" ><small>Ready</small> </div>"+
                 //          "<div  ng-show = \"dataItem.status.val=='500'\" class=\"alert alert-danger\" ><small>Rejected</small> </div>"+
                 //            "<div  ng-show = \"dataItem.status.val=='309'\" class=\"alert alert-success\" ><small>Completed</small> </div>";
                 //     } 
                 // },
                    { 
                        field: "creative", 
                        title:"Creative",
                         width: "20px" ,
                         template: function (dataItem) {
                            return "<div ng-hide=\"dataItem.creative\">"+
                                 "<button  class=\"btn btn-danger\" ng-hide=\"isAdmin()\" ng-click=\"vm.mediaLibrary(dataItem)\" ><i class=\"fa fa-image\"></i><span class=\"glyphicon glyphicon-upload\"></span></button></div>"+
                                 "</div>"+
                                 "<div ng-show=\"dataItem.creative\">"+
                                 "<button  class=\"btn btn-success\" ng-hide=\"isAdmin()\" ng-click=\"vm.imageDetails(dataItem.creative)\" ><i class=\"fa fa-image\"></i><span class=\"glyphicon glyphicon-upload\"></span></button></div>"+
                                 "</div>";
                         //return "<div> <button  class=\"btn btn-danger\"  ng-click=\"vm.open(cart.items,item,item.creative,'md')\" ><i class=\"fa fa-image\"></i><span class=\"glyphicon glyphicon-upload\"></span></button></div>";
                     }},
                    { 
                        title:"Action",
                         width: "40px" ,
                         template: function (dataItem) {
                         return "<div  ng-show= \"dataItem.status=='Campaign Accepted'\" ><md-button ng-click=\"vm.addToCart({'sku':dataItem.id, 'name':dataItem.name ,'advertiser':dataItem.advertiser,'publisher':dataItem.publisher,'publisheruid':dataItem.publisheruid,'price':dataItem.price, 'quantity':dataItem.quantity,'image':dataItem.image,  'vid':dataItem.id} ,dataItem.quantity)\" class=\"md-raised cart\">"+
                                "<ng-md-icon icon=\"shopping_cart\"></ng-md-icon>"+
                                "</div>";
                        // return "<button class=\"btn-success btn-sm btn-success\" ng-click=\"goToSite(site)\">Buy</button>";
                     }}
                    ]
                };
            };


                vm.action = function(campaign) {
                  // method
                  ////console.log(campaign);
                 Campaign.delete({id:campaign._id},function(){
                        ////console.log("Campaign deleted");

                          Campaign.save(campaign).$promise.then(function() {
                           toastr.success("Campaign info saved successfully","Success");
                      });
                      });

                }

   
                vm.changeStatus = function(campaign){

                  Campaign.update({ id:campaign._id }, campaign).$promise.then(function(res) {
                    ////console.log(res);
                  }, function(error) { // error handler
                    ////console.log(error);
                    if(error.data.errors){
                      var err = error.data.errors;
                      toastr.error(err[Object.keys(err)].message,err[Object.keys(err)].name);
                    }
                    else{
                      var msg = error.data.message;
                      toastr.error(msg);
                    }
                  });
                };


                   vm.addToCart = function(item ,i){
                                     
                    Cart.cart.addItem(item,i);
                    Cart.cart.flagOn();

                      Toast.show({
                      type: 'success',
                      text: item.publisher+"-"+item.name+""+"Has Been Added to Cart"
                    });
                };

                var toNumber = function (value) {
                  value = value * 1;
                  return isNaN(value) ? 0 : value;
              };


  });