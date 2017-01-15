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
    //will need to make ajax request to db
    //change all append to html--make sure select right div!
    const displayData = () => {
        let record = data.narratives[data.narratives.length-1].date + "<br>";
        record += data.narratives[data.narratives.length-1].title + "<br>";
        record += data.narratives[data.narratives.length-1].text + "<br>";
        $("#narrative-entry").append(record);

        let weightRecord = data.weight[data.weight.length-1].date + "<br>";
        weightRecord += data.weight[data.weight.length-1].weight + "<br>";
        $("#weight-entry").append(weightRecord);

        let lengthRecord = data.length[data.length.length-1].date + "<br>";
        lengthRecord += data.length[data.length.length-1].length + "<br>";
        $("#length-entry").append(lengthRecord);

        let headCirRecord = data.headCir[data.headCir.length-1].date + "<br>";
        headCirRecord += data.headCir[data.headCir.length-1].headCir + "<br>";
        $("#headCir-entry").append(headCirRecord);
    };
    
    const resetForm = (form) => {
        $(form).find("input:text, textarea").val("");
        $('input[type=date]')[0].value = "";
    };

    const getNarratives = (search) => {
        console.log(search);
        let params = {
            //not sure 
        }
        let url = "https://evening-hollows-59256"
        $.getJson(url, params, (data) => {
            showNarrs(data);
        })
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
            type: type
        }
        let url = "https://evening-hollows-59256"
        $.getJson(url, params, (data) => {
            showResults(data);
        })
    };

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
        getRequest(); 
    });

});
  