/*global QUnit*/

sap.ui.define([
	"comdemo/summationorthwind/controller/summation.controller"
], function (Controller) {
	"use strict";

	QUnit.module("summation Controller");

	QUnit.test("I should test the summation controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
