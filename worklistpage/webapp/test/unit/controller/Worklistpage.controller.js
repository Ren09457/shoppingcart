/*global QUnit*/

sap.ui.define([
	"comdemo/worklistpage/controller/Worklistpage.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Worklistpage Controller");

	QUnit.test("I should test the Worklistpage controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
