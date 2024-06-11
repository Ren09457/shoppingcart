sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "../model/Formatter",
    "sap/m/Text",
    "sap/m/Label"
],
function(Controller,JSONModel,Filter,FilterOperator,Formatter,Text,Label) {
  "use strict";
  var oContext;
    return Controller.extend("com.demo.project3.controller.View2", {
    formatter:Formatter,
    onInit() {
        debugger;
            oContext = this;
            var oRouter = this.getOwnerComponent().getRouter().getRoute("DetailPage");
            oRouter.attachPatternMatched(this._onObjectMatched, this); 
    },
    _onObjectMatched: function(oEvent){
        debugger;
        this.getView().bindElement({
            path:  "/" + window.decodeURIComponent(oEvent.getParameter("arguments").OrderID),
            model: "PrHeader"
        });
        // var obj = {
        //     "results":[]
        // }
        // var data = this.getOwnerComponent().getModel("productmodel1").getData();
        // obj.results.push(data);
        // var oModel = new JSONModel(obj);
        // oContext.getView().setModel(oModel,"PrHeader");
        // var oVerticalLayout = this.getView().byId("SimpleFormDisplay3");
        // oVerticalLayout.bindElement("/results/0");
        // oVerticalLayout.addContent(new Label({text: "Company Name"}));
        // oVerticalLayout.addContent(new Text({text: "{PrHeader>/results/0/CompanyName}"}));
        // oVerticalLayout.addContent(new Label({text: "Postal Code"}));
        // oVerticalLayout.addContent(new Text({text: "{ShipPostalCode}"}));
        // oVerticalLayout.addContent(new Label({text: "{Region}"}));
        // oVerticalLayout.addContent(new Text({text:"{Region}"}));
       },
    onBack: function(){
        debugger
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("MasterPage");
     },
     onCloseDetailPress: function (oEvent) {
        debugger;
        this.getView().getModel("appView").setProperty("/actionButtonsInfo/midColumn/fullScreen", false);
        this.getOwnerComponent().getRouter().navTo("RouteMasterPage");
    },
    toggleFullScreen:function(){
        debugger;
        var bFullScreen = this.getView().getModel("appView").getProperty("/actionButtonsInfo/midColumn/fullScreen");
        this.getView().getModel("appView").setProperty("/actionButtonsInfo/midColumn/fullScreen", !bFullScreen);
        if (!bFullScreen) {
        // store current layout and go full screen
        this.getView().getModel("appView").setProperty("/previousLayout", this.getView().getModel("appView").getProperty("/layout"));
        this.getView().getModel("appView").setProperty("/layout", "MidColumnFullScreen");
        } else {
        // reset to previous layout
        this.getView().getModel("appView").setProperty("/layout", this.getView().getModel("appView").getProperty("/previousLayout"));
        }
    }
  });
}
);
