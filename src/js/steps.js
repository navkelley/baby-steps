$(document).ready(function() {

    const data = {
        "narratives": [
            {
                "title": "First night home",
                "date": "10/08/2016",
                "text": "First night home was long night. Not sure what went wrong",
            },
            {
                "title": "Smiles",
                "date": "10/31/2016",
                "text": "Had the first smile today and it was great. Made the first night home not even matter."

            },
            {
                "title": "Has cold",
                "date": "11/5/2016",
                "text": "baby is so congested today, thinking he has a cold",
            },
            {
                "title": "Growing and eating well",
                "date": "11/23/2016",
                "text": "He is eating 4-6oz on average each meal! He has also outgrown his 3 month clothes!",
            },
        ],


        "weight": [
            {
                "date": "10/06/2016",
                "weight": "8lbs 12oz",
            },
            {
                "date": "10/25/2016",
                "weight": "9lbs 8oz",
            },
            {
                "date": "11/10/2016",
                "weight": "11lbs 5oz",
            },
        ],

        "length": [
            {
                "date": "10/06/2016",
                "length": "20.5 inches",
            },
            {
                "date": "10/25/2016",
                "length": "21 inches",
            },
            {
                "date": "11/10/2016",
                "length": "24 inches",
            },
        ],

        "headCir": [
            {
                "date": "10/06/2016",
                "headCir": "13 inches",
            },
            {
                "date": "10/25/2016",
                "headCir": "15 inches",
            },
            {
                "date": "11/10/2016",
                "headCir": "16.5 inches",
            },
        ]
    };

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
            url: "/narratives/" + currentUser,
            contentType: "application/json",
            success: function (res) {
                res.json(search);
            }//work in progress 
        });
    };

    const showNarrs = (data) => {
        /*for (let i = 0; i < db or array? i++) {*/
        let entries = "<tr><td>" + /*figure out how to get date, title, content*/ + 
            "</td></tr>"
        $("#narrative-table").append(entries);
        //}
    };

    const getMeasurements = (search) => {
        console.log(search);
        let params = {
            userId: currentUser,
            type: type
        }
        //change to heroku web once functional
        let url = "/measurements"
        $.getJson(url, params, (data) => {
            showResults(data);
        })
    };

    $("#login").submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "GET",
            url:'/',
            error: function() {
                alert("An error has occurred.");
            },
            datatype: 'jsonp',
            success: function(data) {
                let currentUser = user._id;
                console.log(currentUser);
            },
        }); 
    });

    $("#sign-up").submit(function(e) {
        e.preventDefault();
        let username = $("#userEmail").val();
        let password = $("#password").val();
        $.ajax({
            type: "POST",
            url: "/users",
            contentType: "application/json",
            data: JSON.stringify({
                username: username,
                password: password
            }),
            success: function (res) {
                res.json({createdUser});
                let currentUser = createdUser_id; 
                console.log(currentUser);
            }//work in progress 
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

    $("#narrLink").click(() => {
        getNarratives(); 
    });
//on submit of login: make post req, return id in res, client save userId 
});
  