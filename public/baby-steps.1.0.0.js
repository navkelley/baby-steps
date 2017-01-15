/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";
	
	$(document).ready(function () {
	
	    var data = {
	        "narratives": [{
	            "title": "First night home",
	            "date": "10/08/2016",
	            "text": "First night home was long night. Not sure what went wrong"
	        }, {
	            "title": "Smiles",
	            "date": "10/31/2016",
	            "text": "Had the first smile today and it was great. Made the first night home not even matter."
	
	        }, {
	            "title": "Has cold",
	            "date": "11/5/2016",
	            "text": "baby is so congested today, thinking he has a cold"
	        }, {
	            "title": "Growing and eating well",
	            "date": "11/23/2016",
	            "text": "He is eating 4-6oz on average each meal! He has also outgrown his 3 month clothes!"
	        }],
	
	        "weight": [{
	            "date": "10/06/2016",
	            "weight": "8lbs 12oz"
	        }, {
	            "date": "10/25/2016",
	            "weight": "9lbs 8oz"
	        }, {
	            "date": "11/10/2016",
	            "weight": "11lbs 5oz"
	        }],
	
	        "length": [{
	            "date": "10/06/2016",
	            "length": "20.5 inches"
	        }, {
	            "date": "10/25/2016",
	            "length": "21 inches"
	        }, {
	            "date": "11/10/2016",
	            "length": "24 inches"
	        }],
	
	        "headCir": [{
	            "date": "10/06/2016",
	            "headCir": "13 inches"
	        }, {
	            "date": "10/25/2016",
	            "headCir": "15 inches"
	        }, {
	            "date": "11/10/2016",
	            "headCir": "16.5 inches"
	        }]
	    };
	    //will need to make ajax request to db
	    //change all append to html--make sure select right div!
	    var displayData = function displayData() {
	        var record = data.narratives[data.narratives.length - 1].date + "<br>";
	        record += data.narratives[data.narratives.length - 1].title + "<br>";
	        record += data.narratives[data.narratives.length - 1].text + "<br>";
	        $("#narrative-entry").append(record);
	
	        var weightRecord = data.weight[data.weight.length - 1].date + "<br>";
	        weightRecord += data.weight[data.weight.length - 1].weight + "<br>";
	        $("#weight-entry").append(weightRecord);
	
	        var lengthRecord = data.length[data.length.length - 1].date + "<br>";
	        lengthRecord += data.length[data.length.length - 1].length + "<br>";
	        $("#length-entry").append(lengthRecord);
	
	        var headCirRecord = data.headCir[data.headCir.length - 1].date + "<br>";
	        headCirRecord += data.headCir[data.headCir.length - 1].headCir + "<br>";
	        $("#headCir-entry").append(headCirRecord);
	    };
	
	    var resetForm = function resetForm(form) {
	        $(form).find("input:text, textarea").val("");
	        $('input[type=date]')[0].value = "";
	    };
	
	    var getNarratives = function getNarratives(search) {
	        console.log(search);
	        var params = {
	            //not sure 
	        };
	        var url = "https://evening-hollows-59256";
	        $.getJson(url, params, function (data) {
	            showNarrs(data);
	        });
	    };
	
	    var showNarrs = function showNarrs(data) {
	        /*for (let i = 0; i < db or array? i++) {*/
	        var entries = "<tr><td>" + /*figure out how to get date, title, content*/+"</td></tr>";
	        $("#narrative-table").append(entries);
	        //}
	    };
	
	    var getMeasurements = function getMeasurements(search) {
	        console.log(search);
	        var params = {
	            type: type
	        };
	        var url = "https://evening-hollows-59256";
	        $.getJson(url, params, function (data) {
	            showResults(data);
	        });
	    };
	
	    $("#narrForm").submit(function (e) {
	        e.preventDefault();
	        var narrDate = $("#narrDate").val();
	        var narrative = $("#narrInput").val();
	        var narrTitle = $("#narrTitle").val();
	        data.narratives.push({ "title": narrTitle, "date": narrDate, "text": narrative });
	        resetForm("#narrForm");
	        $("#narrModal").modal("toggle");
	        displayData();
	    });
	
	    $("#weightForm").submit(function (e) {
	        e.preventDefault();
	        var weightDate = $("#weightDate").val();
	        var wLbs = $("#wLbs").val();
	        var wOz = $("#wOz").val();
	        data.weight.push({ "date": weightDate, "weight": wLbs + "lbs " + wOz + "oz" });
	        resetForm("#weightForm");
	        $("#weightModal").modal("toggle");
	        displayData();
	    });
	
	    $("#lengthForm").submit(function (e) {
	        e.preventDefault();
	        var lengthDate = $("#lengthDate").val();
	        var length = $("#lengthInput").val();
	        data.length.push({ "date": lengthDate, "length": length + " inches" });
	        resetForm("#lengthForm");
	        $("#lengthModal").modal("toggle");
	        displayData();
	    });
	
	    $("#headCirForm").submit(function (e) {
	        e.preventDefault();
	        var hDate = $("#headCirDate").val();
	        var headCir = $("#headCirInput").val();
	        data.headCir.push({ "date": hDate, "headCir": headCir + " inches" });
	        resetForm("#headCirForm");
	        $("#headCirModal").modal("toggle");
	        displayData();
	    });
	
	    $("#narrLink").click(function () {
	        getRequest();
	    });
	});

/***/ }
/******/ ]);
//# sourceMappingURL=baby-steps.1.0.0.js.map