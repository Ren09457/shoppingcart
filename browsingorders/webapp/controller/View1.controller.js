sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Sorter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel,Sorter,Filter,FilterOperator) {
        "use strict";
        var that;
        var oDataMOdel;
        return Controller.extend("com.demo.browsingorders.controller.View1", {
            onInit: function () {
                debugger;
                that = this;
                oDataMOdel = this.getOwnerComponent().getModel();
                that._getreadDetails();
            },
            _getreadDetails:function(){
                debugger;
                var that = this;
                var oTable = this.getView().byId("idProductsTable");
                debugger;
                oDataMOdel.read("/StatusSet" ,{
                            success: function (Data) {
                        debugger;
                        var model = new JSONModel(Data);
                       that.getView().setModel(model, "Quotation");
                    },
                    error: function (Error) {
                        debugger;
                    sap.m.MessageBox.error("Error while reading data");
                    }
                    });
                },
                         
            onLiveEventSearchTable:function(oEvent){ 
                debugger;
                var ab = oEvent.mParameters.newValue;
                var aFilter = [];
                if(ab){
                        aFilter.push(new sap.ui.model.Filter({
                        path:'Key',
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
            onPressRefresh:function(){
                debugger;
            this._getreadDetails();
        },
        onselectionchange1:function(oevent){
            debugger;
            this.oCrossAppNav = sap.ushell.Container.getService("CrossApplicationNavigation");
            var href2 = this.oCrossAppNav.toExternal({
                target : { shellHash : "#z5036_aks-create"}
              });
        }
                      });
    });
    