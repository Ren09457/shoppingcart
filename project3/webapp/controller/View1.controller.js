sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "../model/Formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/BusyIndicator",
    "sap/m/MessageBox",
    "sap/m/Text"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel,MessageToast,Formatter,Filter,FilterOperator,BusyIndicator,MessageBox,Text) {
        "use strict";
        return Controller.extend("com.demo.browseorders.controller.MasterPage", {
            formatter:Formatter,
            onInit: function () {
            debugger;
            var oRouter = this.getOwnerComponent().getRouter().getRoute("RouteMasterPage");
            oRouter.attachPatternMatched(this._onObjectMatched, this);
            },
            _onObjectMatched: function(oEvent){
                debugger;
                this.getView().byId("idProductsTable").removeSelections(true);
                this.getView().getModel("appView").setProperty("/layout", "OneColumn");
	            },
                    onLiveEventSearchTable:function(oEvent){ 
                    debugger;
                    var ab = oEvent.mParameters.newValue;
                    var aFilter = [];
                    if(ab){
                            aFilter.push(new sap.ui.model.Filter({
                            path:'ShipAddress',
                            operator:sap.ui.model.FilterOperator.Contains,
                            value1:ab
                        }));
                            var oFinalFilter = new sap.ui.model.Filter({
                            filters:aFilter,
                            and:false
                        });
                        this.getView().byId("idProductsTable").getBinding('items').filter(oFinalFilter)
                    }
                },
                readEntries:function(){
                    debugger;
                    this.getView().byId("idProductsTable").getBinding('items').filter([]);
                },
                    navigatetodetailpage2:function(oEvent){
                    debugger;
                    this.getView().getModel("appView").setProperty("/layout", "TwoColumnsMidExpanded");
                    const oTable = this.getView().byId("idProductsTable");
                    const aItems = oTable.getItems();
                    var oItem = oEvent.getSource().getSelectedItem().getBindingContext().getObject();
                    var oModel = new JSONModel(oItem);
                    this.getOwnerComponent().setModel(oModel,"PrHeader");
                    var oRouter = this.getOwnerComponent().getRouter();
                    oRouter.navTo("DetailPage", {
                                "OrderID": window.encodeURIComponent(oItem.OrderID)
                    });
                }
             });
    });

