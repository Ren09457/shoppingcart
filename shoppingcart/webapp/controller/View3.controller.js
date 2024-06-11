sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"sap/m/Token"
], function (Controller, JSONModel) {
	"use strict";
	return Controller.extend("com.demo.shoppingcart.controller.View3", {
		onInit: function () {
			var that = this;
			 that.getRouter();
			const oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("View2").attachPatternMatched(this._onRouteMatched, this);
			var oProductsModel = that.getOwnerComponent().getModel("products1");
            that.getView().setModel(oProductsModel, "Cartprod");
			var oModel = new sap.ui.model.json.JSONModel();
  			var mData = {
  			"items": [
  			{
  			"key": "DZ",
  			"text": "Algeria"
  		},
  		{
  			"key": "AR",
 			 "text": "Argentina"
 		 },
  		{
  			"key": "AU",
  		"text": "Australia"
  		}
	]};
	oModel.setData(mData);
  	this.getView().setModel(oModel);
	},
		_onRouteMatched: function (oEvent) {
			var oProductsModel = this.getOwnerComponent().getModel("products1");
            this.getView().setModel(oProductsModel, "Cartprod");
		},
		getRouter : function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		backToCartPage:function(oEvent){
			debugger;
			this.getRouter().navTo("View1", {
				from : "View3",
			})
		}
	});
});