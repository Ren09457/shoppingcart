sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel) {
        "use strict";
        var that;
        var oDataMOdel;

        return Controller.extend("com.demo.project2.controller.View1", {
            onInit: function () {
                debugger
                that = this;
                // var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
                // sap.ui.getCore().setModel(oModel);
                oDataMOdel = this.getOwnerComponent().getModel();
                that.readCustomers();
                // var oModel = new JSONModel(Data);
                // this.getView().setModel(oModel);
            },
            readCustomers:function(){
                oDataMOdel.read("/Customers" ,{
                    success: function (Data) {
                debugger
                var aa = []
                var ab = Data.results.length
                for(var i=0;i<ab; i++){
                    var oData = {
                        "CustomerID": Data.results[i].CustomerID,
                            "results":[{
                                "CompanyName": Data.results[i].CompanyName,
                                "ContactName": Data.results[i].ContactName,
                                "results":[{
                                    "ContactTitle": Data.results[i].ContactTitle,
                                    "Address": Data.results[i].Address,
                                    "results":[{
                                        "City": Data.results[i].City,
                                        "Region": Data.results[i].Region,
                                    }]
                                    

                                }]
                            }],
                            // "ContactName": Data.results[i].ContactName
                    }
                    aa.push(oData)
                }
                var payload = {
                    results:[]
                }
                payload.results = aa

                var model = new JSONModel(payload);
                that.getView().setModel(model)
            },
            error: function (Error) {
                debugger;
                that.busyDialog.close();
                sap.m.MessageBox.error("Error while reading data");
            }
        });
        },
            
            onCollapseAll: function() {
                var oTreeTable = this.byId("Basic2");
                oTreeTable.collapseAll();
            },
    
            onCollapseSelection: function() {
                var oTreeTable = this.byId("Basic2");
                oTreeTable.collapse(oTreeTable.getSelectedIndices());
            },
    
            onExpandFirstLevel: function() {
                var oTreeTable = this.byId("Basic2");
                oTreeTable.expandToLevel(1);
            },
    
            onExpandSelection: function() {
                var oTreeTable = this.byId("Basic2");
                oTreeTable.expand(oTreeTable.getSelectedIndices());
            },
            onnavigate:function(oevent){
                this.oCrossAppNav = sap.ushell.Container.getService("CrossApplicationNavigation"); 
                var href2 = this.oCrossAppNav.toExternal({
                    target : { 
                        shellHash : "#listreport-display" 
                    }
                  }); 
            }
        });
    });
