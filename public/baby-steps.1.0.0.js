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
	
	    //to hold user id
	    var currentUser = void 0;
	
	    //will need to make request to db
	    var displayData = function displayData() {
	        var record = data.narratives[data.narratives.length - 1].date + "<br>";
	        record += data.narratives[data.narratives.length - 1].title + "<br>";
	        record += data.narratives[data.narratives.length - 1].text + "<br>";
	        $("#narrative-entry").html(record);
	
	        var weightRecord = data.weight[data.weight.length - 1].date + "<br>";
	        weightRecord += data.weight[data.weight.length - 1].weight + "<br>";
	        $("#weight-entry").html(weightRecord);
	
	        var lengthRecord = data.length[data.length.length - 1].date + "<br>";
	        lengthRecord += data.length[data.length.length - 1].length + "<br>";
	        $("#length-entry").html(lengthRecord);
	
	        var headCirRecord = data.headCir[data.headCir.length - 1].date + "<br>";
	        headCirRecord += data.headCir[data.headCir.length - 1].headCir + "<br>";
	        $("#headCir-entry").html(headCirRecord);
	    };
	
	    var resetForm = function resetForm(form) {
	        $(form).find("input:text, textarea").val("");
	        $('input[type=date]')[0].value = "";
	    };
	
	    var getNarratives = function getNarratives(search) {
	        $.ajax({
	            type: "GET",
	            url: "/narratives/" + currentUser,
	            contentType: "application/json",
	            success: function success(res) {
	                res.json(search);
	            } //work in progress 
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
	            userId: currentUser,
	            type: type
	        };
	        //change to heroku web once functional?
	        var url = "/measurements";
	        $.getJson(url, params, function (data) {
	            showResults(data);
	        });
	    };
	
	    //verify both password fields match
	    var checkPassword = function checkPassword(password) {
	        var pass1 = $("#password").val();
	        var pass2 = $("#verifyPassword").val();
	        if (pass1 === pass2) {
	            $("#passwordMessage").html("<p id='PassMatch'>Passwords Match!</p>");
	        } else {
	            $("#passwordMessage").html("<p id='PassMatch'>Passwords Do Not Match!</p>");
	        }
	    };
	    //grab user id and go to individual's dashboard----work in progress
	    $("#login").submit(function (e) {
	        var username = $("#userEmailLogin").val();
	        var password = $("#userPassLogin").val();
	        e.preventDefault();
	        $.ajax({
	            type: "POST",
	            url: '/login',
	            contentType: "application/json",
	            data: JSON.stringify({
	                username: username,
	                password: password
	            }),
	            error: function error() {
	                alert("An error has occurred.");
	            },
	            success: function success(res) {
	                //currentUser = 
	                console.log("hello is this working?");
	                //location.href = '/dashboard'
	            }
	        });
	    });
	
	    $("#sign-up").submit(function (e) {
	        e.preventDefault();
	        checkPassword();
	        var username = $("#userEmail").val();
	        var password = $("#password").val();
	        $.ajax({
	            type: "POST",
	            url: "/users",
	            contentType: "application/json",
	            data: JSON.stringify({
	                username: username,
	                password: password
	            }),
	            error: function error() {
	                $("#accountMessage").append("<p id='aMessage>Account could not be created.</p>");
	            },
	            success: function success(res) {
	                console.log(res);
	                currentUser = res.createdUser._id;
	                console.log(currentUser);
	            }
	        });
	    });
	
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
	        getNarratives();
	    });
	});

/***/ }
/******/ ]);
//# sourceMappingURL=baby-steps.1.0.0.js.map