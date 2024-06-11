sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
	
], function (Controller,JSONModel,MessageToast) {
	"use strict";
    var that;
	return Controller.extend("com.demo.shoppingcart.controller.View2", {
        onInit: function () {
			debugger;
        	const oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("View2").attachPatternMatched(this.onObjectMatched, this);
			this._oDSC = this.byId("DynamicSideContent");
        },
        onObjectMatched(oEvent) {
			debugger;
        	var oProductsModel = this.getOwnerComponent().getModel("products1");
            this.getView().setModel(oProductsModel, "Cartprod"); 
			try {
			// var oProductsModel = this.getOwnerComponent().getModel("products1");
			var modeldata  =this.getView().getModel("Cartprod").getData();
			this.getView().getModel("Cartprod").setProperty("/itemscount", modeldata.addingproduct.length);
			// var count = 0;
				var that = this;
				var oProductsModel = that.getOwnerComponent().getModel("products1");
				that.getView().setModel(oProductsModel, "Cartprod");
				that.totalquantity();
				that.totalamount();
            // this.getView().setModel(oProductsModel, "Cartprod");
					
				} catch (error) {
					history.go(-1);
				}
				// var count = 0;
				// var that = this;
				// var oProductsModel = that.getOwnerComponent().getModel("products1");
				// that.getView().setModel(oProductsModel, "Cartprod");
				// that.totalamount();
        },
        goback:function(){
			debugger;
            history.go(-1);
			
        },
		onSubmit: function (oEvent) {
				that = this;
				var a  = this.getView().byId("shipto").getSelectedKey();
				var b = this.getView().byId("shipAddr").getSelectedKey();
				var c = this.getView().byId("DP17").getValue();	
				// var d = this.getView().byId("total1").getValue();
				this.getOwnerComponent().getModel("products1").setProperty("/shippingto", a);
				this.getOwnerComponent().getModel("products1").setProperty("/shippingaddress", b);
				this.getOwnerComponent().getModel("products1").setProperty("/shippingdate", c);	
				// this.getOwnerComponent().getMModel("products1").setProperty("/totalamount",d);
				var router = sap.ui.core.UIComponent.getRouterFor(this);
				router.navTo("View3");
		},
		onChange:function(oEvent){
			var value  = oEvent.mParameters.value;
			var index= oEvent.mParameters.id.split("-")[18]
			var modeldata  =this.getView().getModel("Cartprod").getData();
			modeldata.addingproduct[index].amount=Number(modeldata.addingproduct[index].price) * Number(value);
			this.getView().getModel("Cartprod").setData(modeldata);
			this.totalquantity();
			this.totalamount();			
		},
		 onDelete: function (oEvent) {
				var index= oEvent.mParameters.id.split("-")[10];
				var modeldata  =this.getView().getModel("Cartprod").getData();
				modeldata.addingproduct.splice(index, 1);
				for (let i = 0; i < modeldata.addingproduct.length; i++) {
					if (modeldata.addingproduct[i].srno!==i+1) {
						modeldata.addingproduct[i].srno=i+1		
					}
				}
				this.getView().getModel("Cartprod").setProperty("/itemscount", modeldata.addingproduct.length);
				this.getView().getModel("Cartprod").setData(modeldata);
                this.totalamount();
				this.totalquantity();
			},
			totalamount:function(oEvent){
				var modeldata=this.getView().getModel("Cartprod").getData();
				var Amount = 0;
			for (let i = 0; i < modeldata.addingproduct.length; i++) {
				Amount=Number(Amount) + Number(modeldata.addingproduct[i].amount);
			}
				this.getView().getModel("Cartprod").setProperty("/totalamount",Amount);
			},
			totalquantity:function () {
				var modeldata=this.getView().getModel("Cartprod").getData();
				var Quantity = 0;
				for (let i = 0; i < modeldata.addingproduct.length; i++) {
					Quantity=Number(Quantity) + Number(modeldata.addingproduct[i].qnt);
			}
			this.getView().getModel("Cartprod").setProperty("/cartCount", Quantity);
		},
		handleToggleClick: function (oEvent) {
			this._oDSC.toggle();
		},
		navigateToView1:function(){
			history.go(-1);
		},
		onDeleteCart:function() {
			debugger;
			// create a fragment with dialog, and pass the selected data
			if (!this.dialog) {
				// This fragment can be instantiated from a controller as follows:
				this.dialog = sap.ui.xmlfragment("com.demo.shoppingcart.Fragments.deletecartdialog", this);
				this.getView().addDependent(this.dialog);
				//debugger;
			}
			this.dialog.open();
			//debugger;
		},
		onYes:function(oEvent){
			debugger;
				this.getView().getModel("Cartprod").setData();
				this.dialog.close();
		},
		closeMatDialog:function(){
			debugger;
			MessageToast.show("Unable to delete the product!!!");
			this.dialog.close();
		}
	});
});