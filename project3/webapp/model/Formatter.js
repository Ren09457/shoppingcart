sap.ui.define([],function (){
	"use strict";
	return {
        formatDate: function (inputDateString) {
            if (!inputDateString) {
                return "";
            }
            var inputDate = new Date ();
            var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
                pattern: "dd/MM/yyyy"
            });
            return dateFormat.format(inputDate);
        }
	};
});