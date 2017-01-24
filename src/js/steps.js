$(document).ready(function() {
    //import moment for date format
    let moment = require('moment');

    //to hold user id
    let currentUser; 

    //will need to make request to db
    const displayData = () => {
        let record = data.narratives[data.narratives.length-1].date + "<br>";
        record += data.narratives[data.narratives.length-1].title + "<br>";
        record += data.narratives[data.narratives.length-1].text + "<br>";
        $("#narrative-entry").html(record);

        let weightRecord = data.weight[data.weight.length-1].date + "<br>";
        weightRecord += data.weight[data.weight.length-1].weight + "<br>";
        $("#weight-entry").html(weightRecord);

        let lengthRecord = data.length[data.length.length-1].date + "<br>";
        lengthRecord += data.length[data.length.length-1].length + "<br>";
        $("#length-entry").html(lengthRecord);

        let headCirRecord = data.headCir[data.headCir.length-1].date + "<br>";
        headCirRecord += data.headCir[data.headCir.length-1].headCir + "<br>";
        $("#headCir-entry").html(headCirRecord);
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
                console.log("not working")
                //consider modal for error 
            },
            success: (res) => {
                showNarrs(res);
            }//work in progress 
        });
    };

    const showNarrs = (data) => {
        let entries;
        for(let narrativeEntry in data) {
            let formatDate = moment(data[narrativeEntry].date).format("MMM Do YYYY");
            entries = "<tr><td>" + formatDate + "<td>" + data[narrativeEntry].title + "</td>" +
                "<td>" + data[narrativeEntry].content + "</td></tr>";
            $("#allNarrs-table").append(entries);
        }
    };

    const getWeight = (search) => {
        $.ajax({
            type: "GET",
            url: "/measurements/:userId",
            contentType: "application/json",
            data: JSON.stringify({
                userId: currentUser,
                type: weight
            }),
            error: () => {
                console.log("not working")
                //consider modal for error 
            },
            success: (res) => {
                console.log(res)
            }//work in progress 
        });
    };

    const getLength = (search) => {
        $.ajax({
            type: "GET",
            url: "/measurements/" + currentUser,
            contentType: "application/json",
            data: JSON.stringify({
                userId: currentUser,
                type: length 
            }),
            error: () => {
                console.log("not working")
                //consider modal for error 
            },
            success: (res) => {
                console.log(res)
            }//work in progress 
        });
    };

        const getHeadCir = (search) => {
        $.ajax({
            type: "GET",
            url: "/measurements/:userId",
            contentType: "application/json",
            data: JSON.stringify({
                userId: currentUser,
                type: headCir
            }),
            error: () => {
                console.log("not working")
                //consider modal for error 
            },
            success: (res) => {
                console.log(res)
            }//work in progress 
        });
    };

    //verify both password fields match
    const checkPassword = (password) => {
        let pass1 = $("#password").val();
        let pass2 = $("#verifyPassword").val();
        if (pass1 === pass2) {
            $("#passwordMessage").html("<p id='PassMatch'>Passwords Match!</p>")
        }
        else {
            $("#passwordMessage").html("<p id='PassMatch'>Passwords Do Not Match!</p>")
        }
    }

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
            },
        });
    };

    //grab user id and go to individual's dashboard
    $("#login").submit(function(e) {
        let username = $("#userEmailLogin").val();
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
                location.href = 'dashboard'
            },
        }); 
    });

    $("#logout").click(function(e) {
        e.preventDefault();
        $.ajax({
            type: "GET",
            url: 'logout',
            error: function() {
                alert("Please try to logout again.");
            },
            success: function() {
                location.href = "/"
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
                console.log(currentUser); 
                location.href = '/dashboard'
            } 
        });
    });

    $("#narrForm").submit(function(e) {
        e.preventDefault(); 
        let narrDate = $("#narrDate").val();
        let narrative = $("#narrInput").val();
        let narrTitle = $("#narrTitle").val();
        data.narratives.push({"title": narrTitle, "date": narrDate, "text": narrative});
        resetForm("#narrForm");
        $("#narrModal").modal("toggle"); 
        displayData(); 
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

    $("#narrLink").on('click', () => {
        console.log("narrLink clicked")
        getNarratives(); 
    });
});
  