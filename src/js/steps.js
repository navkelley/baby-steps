$(document).ready(function() {
    //import moment for date format
    let moment = require('moment');

    //to hold user id
    let currentUser; 

    //will need to make request to db
    const displayLastEntry = (data) => {
        let record = data.narratives[data.narratives.length-1].date + "<br>";
        record += data.narratives[data.narratives.length-1].title + "<br>";
        record += data.narratives[data.narratives.length-1].text + "<br>";
        $("#narrative-entry").html(record);

        /*let weightRecord = data.weight[data.weight.length-1].date + "<br>";
        weightRecord += data.weight[data.weight.length-1].weight + "<br>";
        $("#weight-entry").html(weightRecord);

        let lengthRecord = data.length[data.length.length-1].date + "<br>";
        lengthRecord += data.length[data.length.length-1].length + "<br>";
        $("#length-entry").html(lengthRecord);

        let headCirRecord = data.headCir[data.headCir.length-1].date + "<br>";
        headCirRecord += data.headCir[data.headCir.length-1].headCir + "<br>";
        $("#headCir-entry").html(headCirRecord);*/
    };
    
    const resetForm = (form) => {
        $(form).find("input:text, textarea").val("");
        $('input[type=date]')[0].value = "";
    };

    const getNarratives = (search) => {
        $.ajax({
            type: "GET",
            url: "/dashboard/narratives/" + currentUser,
            contentType: "application/json",
            error: () => {
                $("#allNarrative-entries").html("<p>There was an error getting all records.</p>"); 
            },
            success: (res) => {
                showNarrs(res);
            }
        });
    };

    const showNarrs = (data) => {
        let entries;
        for(let narratives in data) {
            let formatDate = moment(data[narratives].date).format("MMM Do YYYY");
            entries = "<tr><td>" + formatDate + "<td>" + data[narratives].title + "</td>" +
                "<td>" + data[narratives].content + "</td></tr>";
            $("#allNarrs-table").append(entries);
        }
    };

    const getWeight = (search) => {
        $.ajax({
            type: "GET",
            url: "/dashboard/weight/" + currentUser,
            contentType: "application/json",
            error: () => {
                $("#allWeight-entries").html("<p>There was an error getting all records.</p>"); 
            },
            success: (res) => {
                console.log("weight logs", res);
                showWeight(res);
            } 
        });
    };

    const showWeight = (data) => {
        let entries;
        for(let weight in data) {
            let formatDate = moment(data[weight].date).format("MMM Do YYYY");
            entries = "<tr><td>" + formatDate + "<td>" + data[weight].content + "</td></tr>";
            $("#allWeight-table").append(entries);
        }
    };

    const getLength = (search) => {
        $.ajax({
            type: "GET",
            url: "/dashboard/length/" + currentUser,
            contentType: "application/json",
            data: JSON.stringify({
                userId: currentUser,
                type: length 
            }),
            error: () => {
                $("#allLength-entries").html("<p>There was an error getting all records.</p>");
            },
            success: (res) => {
                console.log(res);
                showLength(res);
            }
        });
    };

    const showLength = (data) => {
        let entries;
        for(let length in data) {
            let formatDate = moment(data[length].date).format("MMM Do YYYY");
            entries = "<tr><td>" + formatDate + "<td>" + data[length].content + "</td></tr>";
            $("#allLength-table").append(entries);
        }
    };

        const getHeadCir = (search) => {
        $.ajax({
            type: "GET",
            url: "/dashboard/headCir/" + currentUser,
            contentType: "application/json",
            data: JSON.stringify({
                type: headCir
            }),
            error: () => {
                $("#allHeadCir-entries").html("<p>There was an error getting all records.</p>");
            },
            success: (res) => {
                console.log(res);
                showHeadCir(res);
            } 
        });
    };

    const showHeadCir = (data) => {
        let entries;
        for(let headCir in data) {
            let formatDate = moment(data[headCir].date).format("MMM Do YYYY");
            entries = "<tr><td>" + formatDate + "<td>" + data[headCir].content + "</td></tr>";
            $("#allHeadCir-table").append(entries);
        }
    };

    //verify both password fields match
    const checkPassword = (password) => {
        let pass1 = $("#password").val();
        let pass2 = $("#verifyPassword").val();
        if (pass1 === pass2) {
            $("#passwordMessage").html("<p id='PassMatch'>Passwords Match!</p>");
        }
        else {
            $("#passwordMessage").html("<p id='PassMatch'>Passwords Do Not Match!</p>");
        }
    };

    const getUserId = (username) => {
        $.ajax({
            type: "POST",
            url: "/getUserId",
            contentType: "application/json",
            data: JSON.stringify({
                username: username
            }),
            error: (error) => {
                console.log(err)
            },
            success:(user) => {
                currentUser = user._id;
                console.log(currentUser);
            },
        });
    };

    //show and hide html elements
    $("#dashboard").hide();
    $("#sign-up").hide();

    //grab user id and go to individual's dashboard
    $("#login").submit(function(e) {
        let username = $("#username").val();
        let password = $("#userPassLogin").val();
        e.preventDefault();
        $.ajax({
            type: "POST",
            url:'/login',
            contentType: "application/json",
            data: JSON.stringify({
                username: username,
                password: password 
            }),
            error: () => {
                alert("An error has occurred.");
                location.href = '/'
            },
            success: (user) => {
                getUserId(username); 
                $("#login").hide();
                $("#sign-up").hide();
                $("#dashboard").show();
            },
        }); 
    });

    $("#logout").click(function(e) {
        e.preventDefault();
        $.ajax({
            type: "GET",
            url: '/logout',
            error: function() {
                alert("Please try to logout again.");
            },
            success: function() { 
                delete window.currentUser;
                $("#dashboard").hide();
                $("#sign-up").hide(); 
                $("#login").show(); 
            }
        });
    });

    $("#sign-up").submit(function(e) {
        e.preventDefault();
        checkPassword();
        let firstName = $("#firstName").val();
        let lastName = $("#lastName").val();
        let name = firstName + lastName;
        let username = $("#username").val();
        let email = $("#userEmail").val();
        let password = $("#password").val();
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
            error: function() {
                $("#accountMessage").append("<p id='aMessage'>Account could not be created.</p>")
            },
            success: function (user) {
                currentUser = user._id;
                console.log("this user:", currentUser); 
                $("#sign-up").hide();
                $("#login").hide(); 
                $('#dashboard').show();
            } 
        });
    });

    $("#narrForm").submit(function(e) {
        e.preventDefault(); 
        let narrDate = $("#narrDate").val();
        let narrative = $("#narrInput").val();
        let narrTitle = $("#narrTitle").val();
        $.ajax({
            type: "POST",
            url: "/dashboard/narratives",
            contentType: "application/json",
            data: JSON.stringify({
                userId: currentUser, 
                title: narrTitle, 
                date: narrDate, 
                content: narrative
            }),
            error: () => {
                $("#narrEntry").append("<p>Could not submit log. Please try again.</p>");
            },
            success: (narrative) => {
                resetForm("#narrForm");
                $("#narrModal").modal("toggle"); 
                displayLastEntry(narrative);//work in progress 
            },
        }); 
    });

    $("#weightForm").submit(function(e) {
        e.preventDefault();
        let weightDate = $("#weightDate").val();
        let wLbs = $("#wLbs").val();
        let wOz = $("#wOz").val(); 
        data.weight.push({"date": weightDate, "weight": wLbs + "lbs " + wOz + "oz"});
        resetForm("#weightForm");
        $("#weightModal").modal("toggle");
        displayData();
    });

    $("#lengthForm").submit(function(e) {
        e.preventDefault();
        let lengthDate = $("#lengthDate").val(); 
        let length = $("#lengthInput").val();
        data.length.push({"date": lengthDate, "length": length + " inches"});
        resetForm("#lengthForm");
        $("#lengthModal").modal("toggle");
        displayData();
    });

    $("#headCirForm").submit(function(e) {
        e.preventDefault();
        let hDate = $("#headCirDate").val();
        let headCir = $("#headCirInput").val();
        data.headCir.push({"date": hDate, "headCir": headCir + " inches"});
        resetForm("#headCirForm");
        $("#headCirModal").modal("toggle");
        displayData();
    });
//================== open/close/empty display all modals ===================//
    $("#narrLink").on('click', () => {
        getNarratives(); 
    });

    $("#narrClose").on('click', () => {
        $("#allNarrs-table").empty(); 
    });

    $("#weightLink").on('click', () => {
        getWeight(); 
    });

    $("#weightClose").on('click', () => {
        $("#allWeight-table").empty(); 
    });

    $("#lengthLink").on('click', () => {
        getLength(); 
    });

    $("#lengthClose").on('click', () => {
        $("#allLength-table").empty(); 
    });

    $("#headCirLink").on('click', () => {
        getHeadCir(); 
    });

    $("#headCirClose").on('click', () => {
        $("#allHeadCir-table").empty(); 
    });

//=================== register new account modal =====================//
    $("#register").on('click', () => {
        $("#dashboard").hide();
        $("#login").hide();
        $("#sign-up").show(); 
    })
});
  