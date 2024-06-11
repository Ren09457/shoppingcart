/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"comdemo/browsingorders/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
