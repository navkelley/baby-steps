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
	
	    var mock_data = {
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
	
	    var displayData = function displayData() {
	        var date = new Map([mock_data.narratives.date]);
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;
	
	        try {
	            for (var _iterator = date[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var entry = _step.value;
	
	                console.log(date);
	                $("#narrative-entry").html(date);
	            }
	        } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion && _iterator.return) {
	                    _iterator.return();
	                }
	            } finally {
	                if (_didIteratorError) {
	                    throw _iteratorError;
	                }
	            }
	        }
	    };
	    /*function displayData() {
	        for(var i = 0, i < mock_data.narratives.length, i++) {
	            let date = mock_data.narratives[i].date;
	            console.log(date);
	            console.log(i);
	            $("#narrative-entry").html(date);
	        }
	    }*/
	
	    var resetForm = function resetForm(form) {
	        $(form).find("input:text, textarea").val("");
	        $('input[type=date]')[0].value = "";
	    };
	
	    $("#narrForm").submit(function (e) {
	        e.preventDefault();
	        var narrDate = $("#narrDate").val();
	        var narrative = $("#narrInput").val();
	        var narrTitle = $("#narrTitle").val();
	        mock_data.narratives.push({ "title": narrTitle, "date": narrDate, "text": narrative });
	        console.log(mock_data.narratives);
	        resetForm("#narrForm");
	        $("#narrModal").modal("toggle");
	        displayData();
	    });
	
	    $("#weightForm").submit(function (e) {
	        e.preventDefault();
	        var weightDate = $("#weightDate").val();
	        var wLbs = $("#wLbs").val();
	        var wOz = $("#wOz").val();
	        mock_data.weight.push({ "date": weightDate, "weight": wLbs + "lbs " + wOz + "oz" });
	        console.log(mock_data.weight);
	        resetForm("#weightForm");
	        $("#weightModal").modal("toggle");
	    });
	
	    $("#lengthForm").submit(function (e) {
	        e.preventDefault();
	        var lengthDate = $("#lengthDate").val();
	        var length = $("#lengthInput").val();
	        mock_data.length.push({ "date": lengthDate, "length": length + " inches" });
	        resetForm("#lengthForm");
	        $("#lengthModal").modal("toggle");
	    });
	
	    $("#headCirForm").submit(function (e) {
	        e.preventDefault();
	        var hDate = $("#headCirDate").val();
	        var headCir = $("#headCirInput").val();
	        mock_data.headCir.push({ "date": hDate, "headCir": headCir + " inches" });
	        resetForm("#headCirForm");
	        $("#headCirModal").modal("toggle");
	    });
	});

/***/ }
/******/ ]);
//# sourceMappingURL=baby-steps.1.0.0.js.map