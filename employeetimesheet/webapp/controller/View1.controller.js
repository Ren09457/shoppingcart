sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter",
    "sap/m/MessageBox"
   
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel,  Filter, FilterOperator, Sorter, MessageBox) {
        "use strict";
        var that, oDataModel;
        return Controller.extend("com.demo.employeetimesheet.controller.View1", {
           

            onInit: function () {
                that = this;

                oDataModel = this.getOwnerComponent().getModel();
                this.onRead();
                this.onReadProject();
                var oMinDateModel = new JSONModel({
                    minDate: new Date()
                });
                this.getView().setModel(oMinDateModel, "minDateModel");
            },

            onRead: function () {
                //debugger;
                // that.oDataModel = this.getOwnerComponent().getModel();
                var empName = "shubham";
                var empId = 5033;
                var oFilter = [new sap.ui.model.Filter("EMPLOYEE_NAME", sap.ui.model.FilterOperator.EQ, empName),
                new sap.ui.model.Filter("EMPLOYEE_ID", sap.ui.model.FilterOperator.EQ, empId)];
                oDataModel.read("/EMP_TIMESHEET_ENTRY", {
                    filters: [oFilter],
                    urlParameters: { "$expand": "PROJECT_TASK_MASTER_REF,STATUS_MASTER_REF" },
                    success: function (data) {
                        //    BusyIndicator.hide(0);
                        debugger
                        var oModel = new JSONModel(data);
                        that.getView().setModel(oModel, "employeeModel");
                    },

                });
            },

            onSearch: function (oEvent) {
                //debugger;
                var aFilters = [];
                var sQuery = oEvent.getSource().getValue();
                if (sQuery && sQuery.length > 0) {
                    var oFilter1 = [
                        new sap.ui.model.Filter("PROJECT_TASK_MASTER_REF/results/0/PROJECT_NAME", sap.ui.model.FilterOperator.Contains, sQuery),
                        new sap.ui.model.Filter("PROJECT_TASK_MASTER_REF/results/0/TASK_NAME", sap.ui.model.FilterOperator.Contains, sQuery)
                    ];
                    var allFilters = new sap.ui.model.Filter(oFilter1, false);
                    aFilters.push(allFilters);
                }
                var oList = this.byId("employeetable");
                var oBinding = oList.getBinding("items");
                oBinding.filter(aFilters);

            },


            // onSelectionChange: function (oEvent) {
            //     debugger
            //     var row_Data = oEvent.getSource().getSelectedItem().getBindingContext("employeeModel").getObject();
            //     var oModel = new JSONModel(row_Data);
            //     this.getOwnerComponent().setModel(oModel, "view2Model");

            //     var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            //     oRouter.navTo("View2");
            // },

            // createEntry: function () {
            //     debugger
            //     if (!this.newRegister) {
            //         this.newRegister = sap.ui.xmlfragment("empmanagement.view.Fragment.Create", this);
            //         this.getView().addDependent(this.newRegister);
            //     }
            //     this.newRegister.open(); 
            // },

            onReadProject: function () {
                debugger

                var distinctProject = [];
                var distinctTask = [];
                // that.oDataModel = this.getOwnerComponent().getModel();
                // var oFilter = new sap.ui.model.Filter("Kunnr", sap.ui.model.FilterOperator.EQ, sLoginId);
                oDataModel.read("/EMP_PROJECT_TASK_MASTER", {
                    success: function (data) {
                        debugger
                        //    BusyIndicator.hide(0);
                        for (var i = 0; i < data.results.length; i++) {
                            var projectId = data.results[i].PROJECT_ID + " - " + data.results[i].PROJECT_NAME;
                            distinctProject.push(projectId);
                        }
                        var UniqueProjectId = new Set(distinctProject);
                        var uniqueProjectIdArray = [...UniqueProjectId];

                        for (var i = 0; i < data.results.length; i++) {
                            var taskId = data.results[i].TASK_ID + " - " + data.results[i].TASK_NAME;

                            distinctTask.push(taskId);
                        }
                        var UniqueTaskId = new Set(distinctTask);
                        var uniqueTaskIdArray = [...UniqueTaskId];

                        var oModel = new JSONModel(uniqueProjectIdArray);
                        that.getView().setModel(oModel, "projectModel");

                        var oModel = new JSONModel(uniqueTaskIdArray);
                        that.getView().setModel(oModel, "TaskModel");
                    },
                });
            },

            // createMultipleEntry: function () {
            //     debugger
            //     if (!this.newMultipleEntry) {
            //         this.newMultipleEntry = sap.ui.xmlfragment("empmanagement.view.Fragment.CreateMultiple", this);
            //         this.getView().addDependent(this.newMultipleEntry);
            //     }
            //     this.newMultipleEntry.open();
            // },

            // onMultipleEntry : function(){
            //     debugger;
            //     var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            //     oRouter.navTo("View2"); 
            // },

            // onSort: function (oEvent) {
            //     //onSort--- this fuction is used to sort the data form the table 
            //     //debugger;
            //     if (!this.onViewSort) {
            //         this.onViewSort = sap.ui.xmlfragment("empmanagement.view.Fragment.sortFragment", this);
            //         this.getView().addDependent(this.onViewSort);
            //     }
            //     this.onViewSort.open();
            // },

            // handleSortDialogConfirm: function (oEvent) {
            //     // handleConfirm-- this fuction mention in onsort fagament 
            //     debugger
            //     var that = this;

            //    if (oEvent.mParameters.sortItem !== undefined) {
                
            //     var sortItem = oEvent.getParameter("sortItem");
            //     var sortDesc = oEvent.getParameter("sortDescending");
            //     var oTable = that.getView().byId("employeetable");
            //     var oBinding = oTable.getBinding("items");
            //     oBinding.sort(new Sorter(sortItem.getKey(), sortDesc));
            //    }
            // //    if (oEvent.mParameters.filterItems.length > 0) {
            // //     var aFilters = [];
            // //    var status= Object.values(oEvent.mParameters.filterKeys)
            // //     for (let i = 0; i < status.length; i++) {
            // //       if (status[i]===true) {
            // //         var oFilter = new sap.ui.model.Filter("STATUS", sap.ui.model.FilterOperator.EQ, i+1);
            // //          aFilters.push(oFilter);
    
            // //       } 
                    
            // //     }
            // //      this.getView().byId("employeetable").getBinding("items").filter(aFilters);
            // //    }
            //     // var oTable = this.byId("employeetable");
            //     // var oBinding = oTable.getBinding("items");
            //     // var mParams = oEvent.getParameters();
            //     // var oSorter = null;

            //     // // Determine the selected sort item
            //     // switch (mParams.sortItem.getKey()) {
            //     //     case "date": // Sort by Date
            //     //         oSorter = new sap.ui.model.Sorter("Date", mParams.sortDescending);
            //     //         break;
            //     //     // Add more cases for other sorting options if needed
            //     //     default:
            //     //         break;
            //     // }
            //     // if (oSorter) {
            //     //     oBinding.sort(oSorter);
            //     // }


            // },


            // if (oEvent.mParameters.filterItems.length > 0) {
            //     var s = oEvent.mParameters.filterString;
            //     var words = s.match(/\b\w+\b/g);
            //     words = words.splice(3, 4)
            //     for (var i = 0; i < words.length; i++) {
            //         var word = words[i];
            //         var oFilter = new sap.ui.model.Filter("board", sap.ui.model.FilterOperator.Contains, words);
            //         aFilters.push(oFilter);
            //     }

            //  this.getView().byId("employeetable").getBinding("items").filter(aFilters);
            // }



            // onFilter: function (oEvent) {

            //     if (!this.onViewFilter) {
            //         this.onViewFilter = sap.ui.xmlfragment("empmanagement.view.Fragment.filterFragment", this);
            //         this.getView().addDependent(this.onViewFilter);
            //     }
            //     this.onViewFilter.open();
            // },
            onConfirmFilter: function (oEvent) {
                debugger;
            //     var aFilterItems = oEvent.getParameters().filterItems;
            //     var aFilters = [];
            //     // var comFil;
            //     var oTable = this.getView().byId("employeetable");
            //     var binding = oTable.getBinding("items");


            //  var oFilter1 = new sap.ui.model.Filter("status", sap.ui.model.FilterOperator.Contains, 1);
            //  var oFilter2 = new sap.ui.model.Filter("status", sap.ui.model.FilterOperator.Contains, 2);
            //  aFilters.push(new sap.ui.model.Filter([oFilter1, oFilter2] , false));
            //  binding.filter(aFilters);
            //  oTable.getBinding("items").refresh();

            if (oEvent.mParameters.filterItems.length > 0) {
                var aFilters = [];
            //    var status= Object.values(oEvent.mParameters.filterKeys)

                for (let i = 0; i < oEvent.mParameters.filterItems.length; i++) {
                    var key=Number(oEvent.mParameters.filterItems[i].mProperties.key)
                    var oFilter = new sap.ui.model.Filter("STATUS", sap.ui.model.FilterOperator.EQ, key);
                     aFilters.push(oFilter);        
                }
                 this.getView().byId("employeetable").getBinding("items").filter(aFilters);
               }

                // aFilterItems.forEach(function (oItem) {

                //     if (oItem.getKey() === "1") {
                //         if (oItem.getText() === "PENDING") {
                //             var status = 1;
                //         } else {
                //             var status = 2;
                //         }
                //         var filter = new Filter("STATUS", FilterOperator.EQ, status);
                //         aFilters.push(filter);
                //     } else if (oItem.getKey() === "2") {
                //         // var filter = new Filter("STATUS_DESCRIPTION", FilterOperator.EQ, oItem.getText());
                //         // aFilters.push(filter);
                //         var from = oEvent.getParameter("from");
                //         var to = oEvent.getParameter("to");
                //         var oFilter = new sap.ui.model.Filter("DATE", FilterOperator.BT, from, to, false);
                //         aFilters.push(oFilter);
                //     }
                // });

            },
            onReset: function (oEvent) {
                debugger;
                this.onInit();
            },
            // onCancel: function (oEvent) {
            //     //debugger;
            //     this.newRegister.close();
            //     this.newRegister.destroy();
            //     this.newRegister = null;

            // },
            getTime: function (oEvent) {
                var time = "PT" + oEvent.getHours() + "H" + oEvent.getMinutes() + "M" + oEvent.getSeconds() + "S";
                return time;
            },
            // onCreate: function (oEvent) {
            //     debugger;

            //     var currentDate = new Date();
            //     var formattedDate = currentDate.toISOString();
            //     var datePart = formattedDate.split('T')[0];
            //     var CurrentDate = datePart.replace(/-/g, '.');


            //     var ID = sap.ui.getCore().byId("EMPLOYEE_ID");
            //     var EmpId = parseInt(ID.getText());
            //     var employeeName = sap.ui.getCore().byId("EMPLOYEE_NAME").getText();
            //     // var ID = sap.ui.getCore().byId("EMPLOYEE_ID").getValue();
            //     // // var ID = this.getView().byId("EMPLOYEE_ID").getText();
            //     // var employeeName = sap.ui.getCore().byId("EMPLOYEE_NAME").getValue();
            //     var date = sap.ui.getCore().byId("DATE").getValue();
            //     var startTime = this.getTime(sap.ui.getCore().byId("START_TIME").getDateValue());
            //     var endTime = this.getTime(sap.ui.getCore().byId("END_TIME").getDateValue());

            //     // if(startTime < endTime){
            //     //     MessageBox.error("Something went wrong"); 
            //     // }
            //     var breakTime = this.getTime(sap.ui.getCore().byId("BREAK_TIME").getDateValue());
            //     var projectArray = sap.ui.getCore().byId("PROJECT_NAME").getValue();
            //     var projectId = parseInt(projectArray.split(" - ")[0]);
            //     // var projectName = projectArray.split(" - ")[1];
            //     // var projectId = projectName.split()
            //     var taskArray = sap.ui.getCore().byId("TASK_NAME").getValue();
            //     var taskId = parseInt(taskArray.split(" - ")[0]);
            //     // var taskName =  projectArray.split(" - ")[1];
            //     var remark = sap.ui.getCore().byId("REMARK").getValue();
            //     var status = sap.ui.getCore().byId("STATUS");
            //     var pStatus = parseInt(status.getSelectedKey());

            //     var detail = {
            //         EMPLOYEE_ID: EmpId,
            //         EMPLOYEE_NAME: employeeName,
            //         DATE: new Date(date),
            //         START_TIME: startTime,
            //         END_TIME: endTime,
            //         BREAK_TIME: breakTime,
            //         PROJECT_ID: projectId,
            //         TASK_ID: taskId,
            //         STATUS: pStatus,
            //         EMPLOYEE_REMARK: remark

            //     };

            //     oDataModel.create("/EMP_TIMESHEET_ENTRY", detail, {
            //         success: function (detail, response) {
            //             MessageBox.success("Timesheet Entry added successfully");
            //             that.onCancel();
            //             that.onRead();
            //         },
            //         error: function (error) {
            //             MessageBox.error("Something went wrong");
            //         }
            //     });


            // },
            // onChangeBreak : function(oEvent){
            //     debugger;

            //     var brkTime = sap.ui.getCore().byId("BREAK_TIME");
            //     var stTime = sap.ui.getCore().byId("START_TIME");

            //     // var breakTime = this.getTime(sap.ui.getCore().byId("BREAK_TIME").getDateValue());
            //     if (brkTime.getSelectedKey() < stTime.getSelectedKey()) {
            //         idType.setValueState(sap.ui.core.ValueState.Error).setValueStateText("Select valid time");
            //         idType.focus();
            //         bFlag = false;
            //     } else idType.setValueState(sap.ui.core.ValueState.None);
            // },

            // navigatetoregister: function (oEvent) {
            //     debugger;

            //     var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            //     oRouter.navTo("View2");
            // }

        });
    });
