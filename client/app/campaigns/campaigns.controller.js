'use strict';

(function() {

class CampaignsController {
  constructor(Cart,Country,Auth,PaymentMethod,Shipping,Coupon,Campaign,Toast, Settings,$state,$scope,$loading,Upload, $timeout, $http, socket, $mdDialog,$compile,uiCalendarConfig) {
       
       $loading.start("campaigns");
         var vm = this;
         vm.itemsGrid = [];
         this.Cart = Cart,
         this.campaignStatusLov = Campaign.status;
        this.Campaign = Campaign;
        this.Toast = Toast;
        this.Settings = Settings;
        this.$state = $state;
        this.options = {};
        //this.campaigns = Campaign.query();
        this.campaignStatus =  [
            {name:'', val:402},
            {name:'Approved', val:305},
            {name:'Reject', val:500}
          ];

      this.campaignStatusCreativeAdded =  [
        {name:'Completed', val:309},
      ];


      this.tab = 2;

        this.setTab = function (tabId) {
            this.tab = tabId;
        };

        this.isSet = function (tabId) {
            return this.tab === tabId;
        };


     
      var qAll = {};
      qAll.where = { 'items.advertiser.email' : Auth.getCurrentUser().email };
      this.campaigns = Campaign.pub.query(qAll,function(res){
          var totalCampaign = res.length;

         res.totalCampaign =totalCampaign;
              console.log(totalCampaign);
              $loading.finish("campaigns");
             
          // }
          // res.total = total;
        });


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
      console.log(answer);
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

     

      var qPending = {};
    qPending.where = { $and: [ { 'items.publisheruid' : Auth.getCurrentUser().email }, { 'status':'Campaign Placed'} ] };
    

    this.campaignsPending = Campaign.pub.query(qPending,function(res){
 
     
      var totalCampaign = res.length;

     res.totalCampaign =totalCampaign;
          console.log(totalCampaign);
          $loading.finish("campaigns");
         
      // }
      // res.total = total;
    });

     var qScheduled = {};
    qScheduled.where = { $and: [ { 'items.publisheruid' : Auth.getCurrentUser().email },{'items.startDate': { $gt: Date.now()}}, { 'status':'Campaign Accepted'} ] };

    this.campaignsScheduled = Campaign.pub.query(qScheduled,function(res){
 
     
      var totalCampaign = res.length;

     res.totalCampaign =totalCampaign;
          console.log(totalCampaign);
          $loading.finish("campaigns");
         
      // }
      // res.total = total;
    });

    var qRunning = {};
    qRunning.where = { $and: [ { 'items.publisheruid' : Auth.getCurrentUser().email },{'items.startDate': { $lt: Date.now()}} ,{'items.endDate': { $gt: Date.now()}}, { 'status':'Campaign Accepted'} ] };

    this.campaignsRunning = Campaign.pub.query(qRunning,function(res){
 
     
      var totalCampaign = res.length;

     res.totalCampaign =totalCampaign;
          console.log(totalCampaign);
          $loading.finish("campaigns");
         
      // }
      // res.total = total;
    });

    var qFinished = {};
    qFinished.where = { $and: [ { 'items.publisheruid' : Auth.getCurrentUser().email },{'items.endDate': { $lt: Date.now()}} ,{ 'status':'Campaign Accepted'} ] };

    this.campaignsCompleted = Campaign.pub.query(qFinished,function(res){
 
     
      var totalCampaign = res.length;

     res.totalCampaign =totalCampaign;
          console.log(totalCampaign);
          $loading.finish("campaigns");
         
      // }
      // res.total = total;
    });

     this.items = Campaign.pub.query(qAll,function(res){
      
      var total=0;
      
      // for(var i=0;i<res.length;i++){
      //     var subTotal = 0;
          for(var j=0;j<res.length;j++){

           // console.log(res[j].campaignDate);

            total = 0;
          // console.log();
              // subTotal += res[i].shipping.charge;
              var item = res[j];

              // console.log(item.items);
              // var x = item.items
              // var x.sub = [];

             for (var i = 0; i < item.items.length; i++) {
              
               var p = item.items[i].price;
               var q = item.items[i].quantity;
               total+=(p*q);
               // var x.sub.push(total);
             }
             // console.log(total);
          }
          res.total = total;
          //console.log(res);
          $loading.finish('campaigns');

      // }
      // res.total = total;
    });

     this.itemsGrid = [];

    this.mainGridOptions = {
                dataSource: {
                    
                    transport: {
                        read: function (options) {//options holds the grids current page and filter settings
                          
                            var qPending = {};
                              qPending.where = { $and: [ { 'items.publisheruid' : Auth.getCurrentUser().email }, { 'status':'Campaign Placed'} ] };
                              Campaign.pub.query(qPending ,function(res){

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
                                 // console.log(res);
        
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


              filterable: true,

                dataBound: function() {
                    this.expandRow(this.tbody.find("tr.k-master-row").first());
                },
                columns: [//{ field: "items[0].advertiser.company", title: "Advertiser" },
                //{ field: "campaignNo", title: "Campaign ID" },
            { field: "campaignName", title: "Campaign Name" },
            { field: "created_at", title: "Campaign Date" ,type: 'datetime',template: "#=  (created_at == null)? '' : kendo.toString(kendo.parseDate(created_at, 'yyyy-MM-dd'), 'MM/dd/yy') #"},
            //{ field: "endDate", title: "End Date",type: 'datetime',template: "#=  (endDate == null)? '' : kendo.toString(kendo.parseDate(endDate, 'yyyy-MM-dd'), 'MM/dd/yy') #" },
            { field: "total", title: "Total" ,template: function (dataItem) {
                         return "<div></span><span style='display:inline-block;width:75%;text-align:left;white-space:nowrap;'>$ " + dataItem.total + "</span></div>";
                     }},
            { field: "status", title: "Status" , template: function (dataItem) {
                           return " <span class=\"md-subhead\"><md-select ng-model=\"dataItem.status\"  ng-change=\"vm.changeStatus(dataItem)\" flex><md-option ng-value=\"o\" ng-repeat=\"o in vm.Settings.campaignStatus\">{{o}}</md-option></md-select></span>";
                                    // return "<div  ng-if = \"dataItem.status =='Campaign Placed'\">"+
                                    //  "<md-select ng-model=\"dataItem.status\" value=\"dataItem.status\" ng-options=\"p.name for p in vm.campaignStatus track by p.val\" ng-change=\"vm.action(dataItem)\" class=\"k-select\" style=\"max-width: 150px\"></md-select>"+
                                    //   "</div>"+

                                    //  "<div  ng-show = \"!dataItem.status.val=='402'\" >"+
                                    //  "<select ng-model=\"dataItem.status\" ng-options=\"p.name for p in vm.campaignStatusCreativeAdded track by p.val\" ng-change=\"vm.action(o)\" class=\"k-select\"  style=\"max-width: 150px\"></select>"+
                                    //  "</div>"; 
                     }}]
            };

            this.detailGridOptions = function(dataItem) {

              this.dataItem = dataItem;
              this.uCampaign = dataItem;
              console.log(this.dataItem);

                return {
                    update:function(e){
                      console.log(e);
                     // e.success();
                      alert("update called");
                      e.container.find("input[name=price]").data("KendoNumericTextBox");

                    },
                     edit:function(e){
                       //e.success();
                      alert("edit called");
                      e.container.find("input[name=price]").data("KendoNumericTextBox");

                    },
                     destroy:function(e){
                       e.success();
                      alert("update called");
                      e.container.find("input[name=price]").data("KendoNumericTextBox");

                    },
                      create:function(e){
                       e.success();
                      alert("update called");
                      e.container.find("input[name=price]").data("KendoNumericTextBox");

                    },
                    toolbar:["create"],
                    dataSource: {
                      schema:{
                        model:{
                          id:"id",
                          fields:{
                            "id":{type :"number"},
                            "publisher":{type :"String"},
                            "name":{type :"String"},
                            "price":{type :"number"},
                            "quantity":{type :"number"},
                            "creative":{type :"upload"}
                          }
                        }
                      },
                      filter: { field: "id", operator: "eq", value:dataItem.id},
                        transport: {
                          read: function (options) {//options holds the grids current page and filter settings
                            var itemsGrid= [];
                           var qPending = {};
                              qPending.where = { $and: [ { 'items.publisheruid' : Auth.getCurrentUser().email }, { 'status':'Campaign Placed'} ] };
                              Campaign.pub.query(qPending ,function(res){
                                //console.log(res);
        
 
                              var totalFinal=0;
                              var totalCampaign = res.length;

                                  for(var j=0;j<res.length;j++){
                                    var total = 0;
                           
                                      var item = res[j];
                                     for (var i = 0; i < item.items.length; i++) {

                                        var itemGridTemp = {
                                            campaignNo:item.campaignNo,
                                            campaignName:item.campaignName,
                                            campaignid:item._id,
                                            advertiser:item.items[i].advertiser,
                                            category:item.items[i].category,
                                            creative:item.items[i].creative,
                                            image:item.items[i].image,
                                            messages:item.items[i].messages,
                                            mrp:item.items[i].mrp,
                                            name:item.items[i].name,
                                            price:item.items[i].price,
                                            publisher:item.items[i].publisher,
                                            quantity:item.items[i].quantity,
                                            request:item.items[i].request,
                                            size:item.items[i].size,
                                            sku:item.items[i].sku,
                                            status:item.items[i].status,
                                            uid:item.items[i].uid,
                                            position:i,

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
                                        if(item.campaignNo == dataItem.campaignNo){
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
                    editable: "inline",

                    pageable: true,
                    columns: [
                    //{ field: "campaignNo", title:"Campaign #", width: "70px" },
                    //{ field: "email", title:"Email", width: "70px" },
                    { field: "publisher", title:"Publisher", width: "80px" },
                    { field: "name", title:"Name", width: "70px" },
                    { field: "category", title:"Dates", width: "100px" ,template:function(dataItem){
                        return  "<div class=\"form-group has-feedback\">"+
                                "<label class=\"control-label\">&nbsp</label>"+
                                 "<input type=\"text\" name=\"daterange\"  class=\"form-control\" width=\"150px\" value=\"dataItem.category\" id=\"config-demo\"   ng-model= \"dataItem.category\"\>"+
                                 "<i class=\"glyphicon glyphicon-calendar form-control-feedback\"></i>"+
                                "</div>";
                     }},
                    { 
                      field: "price",
                       title:"Price",
                        width: "50px" ,
                      
                  template: function (dataItem) {
                     
                        return  "<md-input-container>"+
                                "<label>&nbsp</label>"+
                                 "<input  type=\"number\" value=\"dataItem.price\" ng-model= \"dataItem.price\"\>"+
                                "</md-input-container>";
                 }},
                    { field: "quantity", title:"Quantity",width:"40px", template: function (dataItem) {
                     
                        return  "<md-input-container>"+
                                "<label>&nbsp</label>"+
                                 "<input  type=\"number\" value=\"dataItem.quantity\" ng-model= \"dataItem.quantity\"\>"+
                                "</md-input-container>";
                 } },
                    { 
                        field: "creative", 
                        title:"Creative",
                         width: "40px" ,
                         template: function (dataItem) {
                            return "<div ng-hide=\"dataItem.creative\">"+
                                 "<button  class=\"btn btn-danger\" ng-hide=\"isAdmin()\" ng-click=\"vm.mediaLibrary(dataItem)\" ><i class=\"fa fa-image\"></i><span class=\"glyphicon glyphicon-upload\"></span></button></div>"+
                                 "</div>"+
                                 "<div ng-show=\"dataItem.creative\">"+
                                 "<button  class=\"btn btn-success\" ng-hide=\"isAdmin()\" ng-click=\"vm.imageDetails(dataItem.creative)\" ><i class=\"fa fa-image\"></i><span class=\"glyphicon glyphicon-upload\"></span></button></div>"+
                                 "</div>";
                         //return "<div> <button  class=\"btn btn-danger\"  ng-click=\"vm.open(cart.items,item,item.creative,'md')\" ><i class=\"fa fa-image\"></i><span class=\"glyphicon glyphicon-upload\"></span></button></div>";
                     }},
                 //    { 
                 //      field: "status.name", 
                 //      title: "Status", 
                 //      width: "40px" ,
                 //      template: function (dataItem) {
                 //      return "<div ng-show= \"dataItem.status.val=='305'\" class=\"alert alert-success\"><small>Approved</small></div>"+
                 //         // "<div ng-show=\"!dataItem.creative\" class=\"alert alert-danger\" ><small>Needs Creative</small></div>"+
                 //          "<div  ng-show = \"dataItem.status.val=='402'\" class=\"alert alert-danger\" ><small>Pending<small></div>"+
                 //       "<div  ng-show = \"dataItem.status.val=='300'\" class=\"alert alert-success\" ><small>Ready</small> </div>"+
                 //      "<div  ng-show = \"dataItem.status.val=='500'\" class=\"alert alert-danger\" ><small>Rejected</small> </div>"+
                 //        "<div  ng-show = \"dataItem.status.val=='309'\" class=\"alert alert-success\" ><small>Completed</small> </div>";
                 // } 

                 //    },
                //     { 
                //       title:"Action",
                //        width: "50px" ,
                //         template: function (dataItem) {
                //        //return "<div ng-show= \"dataItem.status.val=='305'\"><button class=\"btn-success btn-sm btn-success\" ng-click=\"cart.addItem({sku:dataItem.sku, name:dataItem.name,slug:adspace.formart,mrp:dataItem.mrp, weight:dataItem.maxSize,size:dataItem.size,price:dataItem.price , publisher:dataItem.publisher,uid:dataItem.uid,category:dataItem.category,image:dataItem.image,quantity:1} ,true);\" ng-show=\"checkCart(dataItem.name)\"><i class=\"fa fa-shopping-cart\" ></i></button></div>";
                //     // return "<button class=\"btn-success btn-sm btn-success\" ng-click=\"goToSite(site)\">Buy</button>";
                //     return "<div  ng-if = \"dataItem.status.val=='402'\">"+
                //            "<select ng-model=\"dataItem.status\" ng-options=\"p.name for p in vm.campaignStatus track by p.val\" ng-change=\"vm.action(dataItem)\" class=\"k-select\" style=\"max-width: 150px\"></select>"+
                // "</div>"+

                //            "<div  ng-show = \"!dataItem.status.val=='402'\" >"+
                //            "<select ng-model=\"dataItem.status\" ng-options=\"p.name for p in vm.campaignStatusCreativeAdded track by p.val\" ng-change=\"vm.action(o)\" class=\"k-select\"  style=\"max-width: 150px\"></select>"+
                //            "</div>";  
                //  }},
                 // { command: [
                 //    { name :"Update",
                 //      click:function(dataItem){
                 //        console.log(e);
                 //        alert("clicked event");
                 //    }},
                 //    // {name:"edit"},
                 //    // {name:"destroy"}

                 //  ],width :"40px"}
                 //  
                  { 
                        field: "campaignNo", 
                        title:"Update",
                         width: "60px" ,
                         template: function (dataItem) {
                            return "<div>"+
                                 "<button  class=\"btn btn-success\"  ng-click=\"vm.updateItem(dataItem)\" ><i class=\"fa fa-check\">Update</i><span class=\"glyphicon glyphicon-check\"></span></button></div>"+
                                 "</div>";
                        
                     }}
                 ]
                };
            };




  }//end constructor

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
      // //console.log(total);

      return total;

 }


action(items) {

     var newStatus =  {name:'Approved', val:305};

     //var updated = _.merge(itemToMergeCampaign,items.itemToMergeItem);
      // method

     if(items){
      console.log(vm.uCampaign._id);
      //vm.uCampaign.items = [];
      console.log(items);

      Campaign.update({ id:vm.uCampaign._id }, items).$promise.then(function(res) {
        //console.log(res);
        toastr.success("Campaign has been Approved","Success");
      }, function(error) { // error handler
        //console.log(error);
        if(error.data.errors){
          var err = error.data.errors;
          toastr.error(err[Object.keys(err)].message,err[Object.keys(err)].name);
        }
        else{
          var msg = error.data.message;
          toastr.error(msg);
        }
      });
      }

    }

  changeStatus(campaign){
     var vm = this
    var vm = this

    this.Campaign.update({ id:campaign._id }, {  campaignName:campaign.campaignName,
      status:campaign.status,
      startDate:campaign.items[0].startDate,
      endDate:campaign.items[0].endDate}).$promise.then(function(res) {
    }, function(error) { // error handler
      if(error){
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

  updateItem(campaign){
    
  var dateArray = campaign.category.split('-');

  var newItem = {
     name: campaign.name,
     publisher:campaign.publisher,
     category :campaign.category,
     price :campaign.price,
     quantity: campaign.quantity,
     position:true
    }

  


    var vm = this
    this.Campaign.update({ id:campaign.campaignid }, { campaignName:campaign.campaignName,
      startDate:dateArray[0],
      endDate:dateArray[1],
      items:newItem }).$promise.then(function(res) {
    }, function(error) { // error handler
      if(error){
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
  .controller('CampaignsController', CampaignsController);

})();

    