$(document).ready(function() {

    //import moment for date format
    let moment = require("moment");

    //to hold user id for records after been parsed from session storage
    let currentUser;

    const deleteRecord = () => {
        let td = $(".delete").parent();
        let tr = td.closest("tr");
        let dataType = tr.attr("data-type");
        switch(dataType) {
            case "narrative":
                deleteNarrativeRecord();
                break;
            case "weight":
                deleteWeightRecord();
                break;
            case "length":
                deleteLengthRecord();
                break;
            case "headCir":
                deleteHeadCirRecord();
                break;
        }
        /*if (dataType === "narrative") { 
            return deleteNarrativeRecord(); 
        }
        if (dataType === "weight") {
            return deleteWeightRecord();
        }
        if (dataType === "length") {
            return deleteLengthRecord(); 
        }
        if (dataType === "headCir") {
            return deleteHeadCirRecord(); 
        }*/
    };

    const lastNarr = (search) => {
        $.ajax({
            type: "GET",
            url: "/dashboard/narratives/" + currentUser,
            contentType: "application/json",
            error: () => {
                $("#narrative-data").html("<p>There was an error with last entry.</p>");
            }, 
            success: (records) => {
                if (typeof records[records.length-1] == "undefined") {
                    $("#narrative-data").html("<p>You do not have any entries in this category yet. Let's change that!</p>");
                }
                else {
                    let lastRecord = "<div><p class='hidden' data-id='" + records[records.length-1]._id + "'></p>"; 
                    lastRecord += "<p>" + moment(records[records.length-1].date).format("MMM Do YYYY") + "</p>";
                    lastRecord += "<p>" + records[records.length-1].title + "</p>";
                    lastRecord += "<p>" + records[records.length-1].content + "</p>";
                    $("#narrative-data").html(lastRecord);
                }
            }
        });
    };

    const lastWeight = (search) => {
        $.ajax({
            type: "GET",
            url: "/dashboard/weight/" + currentUser,
            contentType: "application/json",
            error: () => {
                $("#weight-data").html("<p>There was an error with last entry.</p>");
            },
            success: (records) => {
                if (typeof records[records.length-1] == "undefined") {
                    $("#weight-data").html("<p>You do not have any entries in this category yet, to add one click <i class='fa fa-plus-circle'></i></p>");
                }
                else {
                    let lastRecord = "<div><p class='hidden' data-id='" + records[records.length-1]._id + "'></p>"; 
                    lastRecord += "<p>" + moment(records[records.length-1].date).format("MMM Do YYYY") + "</p>";
                    lastRecord += "<p>" + records[records.length-1].content + "</p></div>";
                    $("#weight-data").html(lastRecord);
                }
            }
        });
    };

    const lastLength = (search) => {
        $.ajax({
            type: "GET",
            url: "/dashboard/length/" + currentUser,
            contentType: "application/json",
            error: () => {
                $("#length-data").html("<p>There was an error with last entry.</p>");
            },
            success: (records) => {
                if (typeof records[records.length-1] == "undefined") {
                    $("#length-data").html("<p>You do not have any entries in this category yet, to add one click <i class='fa fa-plus-circle'></i></p>");
                }
                else {
                    let lastRecord = "<div><p class='hidden' data-id='" + records[records.length-1]._id + "'></p>";
                    lastRecord += "<p>" + moment(records[records.length-1].date).format("MMM Do YYYY") + "</p>";
                    lastRecord += "<p>" + records[records.length-1].content + "</p></div>";
                    $("#length-data").html(lastRecord);
                }
            }
        });
    };

    const lastHeadCir = (search) => {
        $.ajax({
            type: "GET",
            url: "/dashboard/headCir/" + currentUser,
            contentType: "application/json",
            error: () => {
                $("#headCir-data").html("<p>There was an error with last entry.</p>");
            },
            success: (records) => {
                if (typeof records[records.length-1] == "undefined") {
                    $("#headCir-data").html("<p>You do not have any entries in this category yet, to add one click <i class='fa fa-plus-circle'></i></p>");
                }
                else {
                    let lastRecord = "<div><p class='hidden' data-id='" + records[records.length-1]._id + "'></p>";
                    lastRecord += "<p>" + moment(records[records.length-1].date).format("MMM Do YYYY") + "</p>";
                    lastRecord += "<p>" + records[records.length-1].content + "</p></div>";
                    $("#headCir-data").html(lastRecord);
                }
            }
        });
    };

    const getLastEntry = () => {
        lastNarr(); 
        lastWeight();
        lastLength();
        lastHeadCir();
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
        for(let narrative in data) {
            let formatDate = moment(data[narrative].date).format("MMM Do YYYY");
            entries = "<tr data-type='narrative' data='" + data[narrative]._id + "'><td>" + formatDate + "</td><td>" + data[narrative].title + "</td>" +
                "<td>" + data[narrative].content + "</td>" +
                "<td><i type='button' class='fa fa-trash delete' aria-hidden='true'></i></td></tr>";
            $("#allNarrs-table").append(entries);
        }
    };

    const deleteNarrativeRecord = (record) => {
        let td = $(".delete").parent();
        let tr = td.closest("tr");
        let id = tr.attr("data");
        return $.ajax({
            type: "DELETE",
            url: "/dashboard/narratives/" + id,
            contentType: "application/json",
        });
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
                showWeight(res);
            } 
        });
    };

    const showWeight = (data) => {
        let entries;
        for(let weight in data) {
            let formatDate = moment(data[weight].date).format("MMM Do YYYY");
            entries = "<tr data-type='weight' data='" + data[weight]._id + "'><td>" + formatDate + "</td>" +
                "<td>" + data[weight].content + "</td>" +
                "<td><i type='button' class='fa fa-trash delete' aria-hidden='true'></i></td></tr>";
            $("#allWeight-table").append(entries);
        }
    };

    const deleteWeightRecord = (record) => {
        let td = $(".delete").parent();
        let tr = td.closest("tr");
        let id = tr.attr("data");
        return $.ajax({
            type: "DELETE",
            url: "/dashboard/weight/" + id,
            contentType: "application/json",
        });
    };

    const getLength = (search) => {
        $.ajax({
            type: "GET",
            url: "/dashboard/length/" + currentUser,
            contentType: "application/json",
            error: () => {
                $("#allLength-entries").html("<p>There was an error getting all records.</p>");
            },
            success: (res) => {
                showLength(res);
            }
        });
    };

    const showLength = (data) => {
        let entries;
        for(let length in data) {
            let formatDate = moment(data[length].date).format("MMM Do YYYY");
            entries = "<tr data-type='length' data='" + data[length]._id + "'><td>" + formatDate + "</td>" +
                "<td>" + data[length].content + "</td>" +
                "<td><i type='button' class='fa fa-trash delete' aria-hidden='true'></i></td></tr>";
            $("#allLength-table").append(entries);
        }
    };

    const deleteLengthRecord = (record) => {
        let td = $(".delete").parent();
        let tr = td.closest("tr");
        let id = tr.attr("data");
        return $.ajax({
            type: "DELETE",
            url: "/dashboard/length/" + id,
            contentType: "application/json",
        });
    };

    const getHeadCir = (search) => {
        $.ajax({
            type: "GET",
            url: "/dashboard/headCir/" + currentUser,
            contentType: "application/json",
            error: () => {
                $("#allHeadCir-entries").html("<p>There was an error getting all records.</p>");
            },
            success: (res) => {
                showHeadCir(res);
            } 
        });
    };

    const showHeadCir = (data) => {
        let entries;
        for(let headCir in data) {
            let formatDate = moment(data[headCir].date).format("MMM Do YYYY");
            entries = "<tr data-type='headCir' data='" + data[headCir]._id + "'><td>" + formatDate + "</td>" +
                "<td>" + data[headCir].content + "</td>" +
                "<td><i type='button' class='fa fa-trash delete' aria-hidden='true'></i></td></tr>";
            $("#allHeadCir-table").append(entries);
        }
    };

    const deleteHeadCirRecord = (record) => {
        let td = $(".delete").parent();
        let tr = td.closest("tr");
        let id = tr.attr("data");
        return $.ajax({
            type: "DELETE",
            url: "/dashboard/headCir/" + id,
            contentType: "application/json",
        });
    };

    const checkPassword = (password) => {
        let pass1 = $("#password").val();
        let pass2 = $("#verifyPassword").val();
        if (pass1 === pass2) {
            console.log("matching");
        }
        else {
            console.log("not matching");
        }//need to rethink
    };

    $("#login").submit(function(e) {
        e.preventDefault();
        let username = $("#username").val();
        let password = $("#userPassLogin").val();
        $.ajax({
            type: "POST",
            url:"/login",
            contentType: "application/json",
            data: JSON.stringify({
                username: username,
                password: password 
            }),
            error: () => {
                $("#login-box").append("<p>Could not login. Please try again.</p>"); 
                return;
            },
            success: (user) => {
                let id = JSON.stringify(user);
                sessionStorage.setItem('user', id);
                currentUser = JSON.parse(sessionStorage.getItem('user'));
                //window.location.assign("/vitals.html");
                getLastEntry();
            },
        }); 
    });

    $("#logout").click(function(e) {
        e.preventDefault();
        delete window.currentUser;
        sessionStorage.clear();
        window.location.assign("/index.html");
    });

    $("#signup").submit(function(e) {
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
            error: () => {
                $("#accountMessage").append("<p id='aMessage'>Account could not be created.</p>");
            },
            success: (user) => {
                let id = JSON.stringify(user._id); 
                sessionStorage.setItem('user', id);
                currentUser = JSON.parse(sessionStorage.getItem('user'));
                window.location.assign("/vitals.html");
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
            success: (record) => {
                $("#narrDate")[0].value = "";
                $("#narrTitle").val("");
                $("#narrInput").val("");
                let displayNarrative = "<div><p class='hidden' data-id='" + record._id + "'></p>";
                displayNarrative += "<p>" + moment(record.date).format("MMM Do YYYY") + "</p>";
                displayNarrative += "<p>" + record.title + "</p>";
                displayNarrative += "<p>" + record.content + "</p></div>";
                $("#narrative-entry").html(displayNarrative) 
            },
        }); 
    });

    $("#weightForm").submit(function(e) {
        e.preventDefault();
        let weightDate = $("#weightDate").val();
        let wLbs = $("#wLbs").val();
        let wOz = $("#wOz").val(); 
        $.ajax({
            type: "POST",
            url: "/dashboard/weight",
            contentType: "application/json",
            data: JSON.stringify({
                userId: currentUser,  
                date: weightDate, 
                content: wLbs + " lbs " + wOz + " oz"
            }),
            error: () => {
                $("#weightEntry").append("<p>Could not submit log. Please try again.</p>");
            },
            success: (record) => {
                $("#weightDate")[0].value = "";
                $("#wLbs").val("");
                $("#wOz").val("");
                let displayWeightRecord = "<div><p class='hidden' data-id='" + record._id + "'></p>";
                displayWeightRecord += "<p>" + moment(record.date).format("MMM Do YYYY") + "</p>";
                displayWeightRecord += "<p>" + record.content + "</p></div>";
                $("#weight-entry").html(displayWeightRecord);
            },
        }); 
    });

    $("#lengthForm").submit(function(e) {
        e.preventDefault();
        let lengthDate = $("#lengthDate").val(); 
        let length = $("#lengthInput").val();
        $.ajax({
            type: "POST",
            url: "/dashboard/length",
            contentType: "application/json",
            data: JSON.stringify({
                userId: currentUser,  
                date: lengthDate, 
                content: length + " inches"
            }),
            error: () => {
                $("#lengthEntry").append("<p>Could not submit log. Please try again.</p>");
            },
            success: (record) => {
                $("#lengthDate")[0].value = "";
                $("#lengthInput").val(""); 
                let displayLengthRecord = "<div><p class='hidden' data-id='" + record._id + "'></p>";
                displayLengthRecord += "<p>" + moment(record.date).format("MMM Do YYYY") + "</p>";
                displayLengthRecord += "<p>" + record.content + "</p></div>";
                $("#length-entry").html(displayLengthRecord);
            },
        }); 
    });

    $("#headCirForm").submit(function(e) {
        e.preventDefault();
        let hDate = $("#headCirDate").val();
        let headCir = $("#headCirInput").val();
        $.ajax({
            type: "POST",
            url: "/dashboard/headCir",
            contentType: "application/json",
            data: JSON.stringify({
                userId: currentUser,  
                date: hDate, 
                content: headCir + " inches"
            }),
            error: () => {
                $("#headCirEntry").append("<p>Could not submit log. Please try again.</p>");
            },
            success: (record) => {
                $("#headCirDate")[0].value = "";
                $("#headCirInput").val("");
                let displayHeadCirRecord = "<div><p class='hidden' data-id='" + record._id + "'></p>";
                displayHeadCirRecord += "<p>" + moment(record.date).format("MMM Do YYYY") + "</p>";
                displayHeadCirRecord += "<p>" + record.content + "</p></div>";
                $("#headCir-entry").html(displayHeadCirRecord);
            },
        });
    });

    //toggle all record modals
    $(".records-modal").click(function() {
        let link = $(this);
        let type = link.attr("data-target");
        $(type).toggle();
        switch(type) {
            case "#allWeightModal":
                getWeight();
                break;
            case "#allLengthModal":
                getLength();
                break;
            case "#allHeadCirModal":
                getHeadCir();
                break;
            case "#allNarrModal":
                getNarratives();
                break;
        }
    });

    $(".close").click(function() {
        let close = $(this);
        let modal = close.attr("data-target");
        $(modal).toggle();
        $("tbody").empty();
    });

    //remove record
    $(document).on("click", ".delete", function(e) {
        e.preventDefault();
        let button = $(this);
        let tr = button.closest("tr");
        let id = tr.attr("data");
        let recordId = $(".hidden").data("id");
        const resolve = () => {
            remove();
            tr.remove();    
        };
        const reject = () => {
            $(".message").html("<p class='error'>Record could not be deleted.</p>");
        };
        const remove = () => {
            if (id === recordId) {
                $(".hidden").closest("div").empty(); 
            }
        };
        deleteRecord().then(resolve, reject);    
    });

    //prompt user to signin if not on click to protected links
    $("li").click(function(e) {
        let link = $(this);
        let pagePath = link.attr("data-link");
        if (pagePath === "vitals" || "journal" && sessionStorage.length === 0) {
            $("#main-content").html("<p>Sorry, you have to be logged in or register to see records.</p>");
            e.preventDefault();
        }
    })
});