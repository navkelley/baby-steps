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
	        console.log("getNarratives function called");
	        $.ajax({
	            type: "GET",
	            url: "/dashboard/narratives/588688dfcd037306a91c8781",
	            contentType: "application/json",
	            error: function error() {
	                console.log("not working");
	                //consider modal for error 
	            },
	            success: function success(res) {
	                console.log(res);
	                showNarrs(res);
	            } //work in progress 
	        });
	    };
	
	    var showNarrs = function showNarrs(data) {
	        var entries = void 0;
	        for (var i = 0; i < data.length; i++) {
	            entries = "<tr><td>" + "stuff" + "</td></tr>";
	        }
	        $("#narrative-table").append(entries);
	    };
	
	    var getWeight = function getWeight(search) {
	        $.ajax({
	            type: "GET",
	            url: "/measurements/:userId",
	            contentType: "application/json",
	            data: JSON.stringify({
	                userId: currentUser,
	                type: weight
	            }),
	            error: function error() {
	                console.log("not working");
	                //consider modal for error 
	            },
	            success: function success(res) {
	                console.log(res);
	            } //work in progress 
	        });
	    };
	
	    var getLength = function getLength(search) {
	        $.ajax({
	            type: "GET",
	            url: "/measurements/:userId",
	            contentType: "application/json",
	            data: JSON.stringify({
	                userId: currentUser,
	                type: length
	            }),
	            error: function error() {
	                console.log("not working");
	                //consider modal for error 
	            },
	            success: function success(res) {
	                console.log(res);
	            } //work in progress 
	        });
	    };
	
	    var getHeadCir = function getHeadCir(search) {
	        $.ajax({
	            type: "GET",
	            url: "/measurements/:userId",
	            contentType: "application/json",
	            data: JSON.stringify({
	                userId: currentUser,
	                type: headCir
	            }),
	            error: function error() {
	                console.log("not working");
	                //consider modal for error 
	            },
	            success: function success(res) {
	                console.log(res);
	            } //work in progress 
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
	
	    var getUserId = function getUserId(username) {
	        $.ajax({
	            type: "POST",
	            url: "/getUserId",
	            contentType: "application/json",
	            data: JSON.stringify({
	                username: username
	            }),
	            error: function error(_error) {
	                console.log(err);
	            },
	            success: function success(user) {
	                currentUser = user._id;
	            }
	        });
	    };
	
	    //grab user id and go to individual's dashboard
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
	                location.href = '/';
	            },
	            success: function success(user) {
	                getUserId(username);
	                location.href = 'dashboard';
	            }
	        });
	    });
	
	    $("#logout").click(function (e) {
	        e.preventDefault();
	        $.ajax({
	            type: "GET",
	            url: 'logout',
	            error: function error() {
	                alert("Please try to logout again.");
	            },
	            success: function success() {
	                location.href = "/";
	            }
	        });
	    });
	
	    $("#sign-up").submit(function (e) {
	        e.preventDefault();
	        checkPassword();
	        var firstName = $("#firstName").val();
	        var lastName = $("#lastName").val();
	        var name = firstName + lastName;
	        var username = $("#username").val();
	        var email = $("#userEmail").val();
	        var password = $("#password").val();
	        $.ajax({
	            type: "POST",
	            url: "/register",
	            contentType: "application/json",
	            data: JSON.stringify({
	                name: name,
	                email: email,
	                username: username,
	                password: password
	            }),
	            error: function error() {
	                $("#accountMessage").append("<p id='aMessage'>Account could not be created.</p>");
	            },
	            success: function success(user) {
	                currentUser = user._id;
	                console.log(currentUser);
	                location.href = '/dashboard';
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
	
	    $("#narrLink").on('click', function () {
	        console.log("narrLink clicked");
	        getNarratives();
	    });
	});

/***/ }
/******/ ]);
//# sourceMappingURL=baby-steps.1.0.0.js.map