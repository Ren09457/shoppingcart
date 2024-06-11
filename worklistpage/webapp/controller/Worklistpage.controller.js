sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Sorter",
    "sap/ui/model/Filter"
],
function (Controller,JSONModel,Sorter,Filter) {
    "use strict";

    return Controller.extend("com.demo.worklistpage.controller.Worklistpage", {
        onInit: function () {
            debugger;
            var that=this;
            // var oViewModel, that = this;
            // // Model used to manipulate control states
            //  oViewModel = new JSONModel({
            //      worklistTableTitle: this.getResourceBundle().getText("worklistTableTitle")
            //  });
            //  this.setModel(oViewModel, "worklistView");
             that.onGetService();

        },
        onGetService: function () {
            debugger;
            var that = this;
            var TableModel = new JSONModel();
            that.getView().setModel(TableModel, "STableModel");
            var oDataHeader = this.getOwnerComponent().getModel();
            oDataHeader.read("/Products", {
                success: function (oData, res) {
                    debugger;
                    var sArray = []
                    var sData = oData.results;
                    for (var i = 0; i < oData.results.length; i++) {
                        var oQtySplit = sData[i].QuantityPerUnit.split(/(\d+)/);
                        var oQty = oQtySplit[oQtySplit.length - 1].toUpperCase();
                        var sObj = {};
                        sObj.CategoryID = sData[i].CategoryID;
                        sObj.Discontinued = sData[i].Discontinued;
                        sObj.ProductID = sData[i].ProductID;
                        sObj.ProductName = sData[i].ProductName;
                        sObj.QuantityPerUnit = oQty;
                        sObj.ReorderLevel = sData[i].ReorderLevel;
                        sObj.SupplierID = sData[i].SupplierID;
                        sObj.UnitPrice = parseFloat(sData[i].UnitPrice).toFixed(2);
                        sObj.UnitsInStock = sData[i].UnitsInStock;
                        sObj.UnitsOnOrder = sData[i].UnitsOnOrder;
                        sArray.push(sObj);
                    }
                    var ProductModel = new JSONModel(sArray);
                    ProductModel.setSizeLimit(sArray.length);
                    that.getView().setModel(ProductModel, "ProductModel");
                }
            });
        },
        SumList: function () {
            debugger;
            var that = this;
            var oPricePath = "UnitPrice";
            var oUnit = "QuantityPerUnit";
            var oData = [];
            var oTable = that.byId("tableSum");
            var uniqueQuantityUnit = [];
            oTable.getItems().filter(function (item) {
                var oPath = item.getBindingContextPath();
                var oContext = oTable.getModel("ProductModel").getProperty(oPath);
                oData.push(oContext);
                if (uniqueQuantityUnit.indexOf(oContext[oUnit]) === -1) {
                    uniqueQuantityUnit.push(oContext[oUnit]);
                }
            });
            that.getView().getModel("STableModel").setProperty("/QTYUnit", uniqueQuantityUnit);
            var oTotalArray = [];
            for (var i = 0; i < uniqueQuantityUnit.length; i++) {
                var sArray = that.onTotalUnitQtyData(uniqueQuantityUnit[i], oData, oPricePath, oUnit);
                oTotalArray.push(sArray);
            }
            that.byId(oPricePath + "SumId").setVisible(true);
            that.getView().getModel("STableModel").setProperty("/" + oPricePath + "totalVal", oTotalArray);
            that.getView().getModel("STableModel").setProperty("/sTotalPath", oPricePath);
            var sumMsg = "Sum Calculated";
            sap.m.MessageToast.show(sumMsg);
        },
        onTotalUnitQtyData: function (unitQty, oData, oPricePath, unit) {
            debugger;
            var oTotal = 0;
                for (var i = 0; i < oData.length; i++) {
                if (unitQty === oData[i][unit]) {
                    var stData = oData[i][oPricePath];
                    var oValue = parseFloat(stData);
                    oTotal += oValue;
                }
            }
            var oMainTotal = parseFloat(oTotal).toFixed(2);
            return oMainTotal;
        },
        openSubTotalFunc: function () {
            debugger;
            var that = this;
            // CategoryID is field with which we do subtotal functionality in table
            var fieldName = "CategoryID";
            var oPricePath = "UnitPrice";
            var oView = that.getView();
            var oTable = oView.byId("tableSum");
            var unique = [], oData = [];
            var qty = 0;
            oTable.getItems().filter(function (item) {
                var oPath = item.getBindingContextPath();
                var oContext = oTable.getModel("ProductModel").getProperty(oPath);
                oData.push(oContext);
                if (unique.indexOf(oContext[fieldName]) === -1) {
                    unique.push(oContext[fieldName]);
                }
            });
            unique.forEach(function (uniqVal) {
                debugger;
                var sObj = {};
                for (var i = 0; i < oTable.getItems().length; i++) {
                    var sPath = oTable.getItems()[i].getBindingContextPath();
                    var sContext = oTable.getModel("ProductModel").getProperty(sPath);
                    if (uniqVal === sContext[fieldName]) {
                        qty = that.onTotalUnitQtyData(uniqVal, oData, oPricePath, fieldName);
                        sObj[oPricePath] = qty;
                    }
                }
                sObj[fieldName] = uniqVal;
                if (sObj[fieldName] === uniqVal) {
                    sObj.Flag = "LightOrange";
                }
                oData.splice(oData.length, 0, sObj);
                oTable.getModel("ProductModel").setData(oData);
                oTable.getModel("ProductModel").setSizeLimit(oData.length);
                oTable.getModel("ProductModel").refresh();
                oTable.getBinding("items").sort(new Sorter(fieldName, false));
                qty = 0;
            });
        },
        onTableRefresh: function () {
            debugger;
            var that = this;
            that.onGetService();
        }
    });
});


