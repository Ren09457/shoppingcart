sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/Device",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, Device, JSONModel,MessageToast,Filter,FilterOperato) {
	"use strict";
	var product1 = {}
	return Controller.extend("com.demo.shoppingcart.controller.View1", {
        onInit: function () {
			debugger;
			this.ObjectMatched();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("View1").attachPatternMatched(this.ObjectMatched, this);
		},
		ObjectMatched :function(){
			debugger;
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData({
  	itemCount: 0,
});
	sap.ui.getCore().setModel(oModel, "products");
			product1 = {
				"addingproduct": []
			}
            var that = this;
			var oProductsModel = that.getOwnerComponent().getModel("productmodel");
            var iPagesCount;
				iPagesCount = 1;
			if (Device.system.desktop) {
				iPagesCount = 4;
			} else if (Device.system.tablet) {
				iPagesCount = 2;
			}
			var oSettingsModel = new JSONModel({ pagesCount: iPagesCount });
			oProductsModel.setSizeLimit(6);
			this.getView().setModel(oSettingsModel, "settings");
			this.getView().setModel(oProductsModel, "products");
			var oModel = new sap.ui.model.json.JSONModel();
		},
			onShoppingCartPressed:function(oevent){
			var obj = {};
			var a = oevent.mParameters.id;
			var numb = Number(a.split('-')[18]);
			var productcollection =this.getView().getModel("products").oData.ProductCollection[numb];
			var c  =this.getView().byId("gridList").getItems()[numb].getContent()[0].getItems()[4].mAggregations.items[0].mProperties.value;
			obj.productname = productcollection.Name;
			obj.productname2= productcollection.ProductPicUrl;
			obj.qnt = c;
			obj.price=productcollection.Price;
			obj.amount= obj.qnt*obj.price;
			obj.srno = Number(product1.addingproduct.length) + 1;
			if (c<=0) {
				sap.m.MessageToast.show("Quantity Should be greater than zero");
				return c;
			}
			var oData = product1.addingproduct.push(obj)
			var oModel = new JSONModel(product1);
			var count=0;
			for (let i = 0; i < product1.addingproduct.length; i++) {
			count=count + Number(product1.addingproduct[i].qnt)
		}
			this.byId("cartBadge").setValue(count);
			this.getOwnerComponent().setModel(oModel, "products1");
			this.getOwnerComponent().getModel("products1").setProperty("/cartCount", count);
			// this.getOwnerComponent().getModel("products1").refresh(true);
			MessageToast.show("Product added Successfully");
		},
		onselectionchange:function(){
				const oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("View2");
		},
		onLiveEventSearchTable: function(oEvent) {
			debugger;
			var ab = oEvent.mParameters.newValue;
			var aFilter = [];
			if (ab || ab === '') { // Check if the value is empty or not
				aFilter.push(new sap.ui.model.Filter({
					path: "Name", // Replace 'PropertyName' with the actual property name in your mock data
					operator: sap.ui.model.FilterOperator.Contains,
					value1: ab
				}));
				this.getView().byId("gridList").getBinding('items').filter(aFilter);
			}
		},
		onrefresh:function(oevent){
			debugger;
			this.byId("search").setValue();
			this.getView().byId("gridList").getBinding('items').filter([]);
	},
	onselectionchange1:function(oevent){
		debugger;
		this.oCrossAppNav = sap.ushell.Container.getService("CrossApplicationNavigation"); 
		var href2 = this.oCrossAppNav.toExternal({
			target : { shellHash : "#cart2-display?sap-ui-app-id-hint=saas_approuter_com.demo.project3" }
		  }); 
	}

		
		
		
		
		

	});
});
