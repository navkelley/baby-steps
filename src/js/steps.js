$(document).ready(function() {

    const mock_data = {
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

    const displayData = () => {
        for (let i of mock_data.narratives) {
            if (i == "narratives") {
                $("#narrative-entry").append("<p>" + mock_data.narratives[mock_data.narratives.length -1]
                 + "</p>");
                console.log(i);
            }
        }
    };

    const resetForm = (form) => {
        $(form).find("input:text, textarea").val("");
        $('input[type=date]')[0].value = "";

    };

    $("#narrForm").submit(function(e) {
        e.preventDefault(); 
        let narrDate = $("#narrDate").val();
        let narrative = $("#narrInput").val();
        let narrTitle = $("#narrTitle").val();
        mock_data.narratives.push({"title": narrTitle, "date": narrDate, "text": narrative});
        console.log(mock_data.narratives);
        displayData();
        resetForm("#narrForm");  
    });

    $("#weightForm").submit(function(e) {
        e.preventDefault();
        let weightDate = $("#weightDate").val();
        let wLbs = $("#wLbs").val();
        let wOz = $("#wOz").val(); 
        mock_data.weight.push({"date": weightDate, "weight": wLbs + "lbs " + wOz + "oz"});
        resetForm("#weightForm");
    });

    $("#lengthForm").submit(function(e) {
        e.preventDefault();
        let lengthDate = $("#lengthDate").val(); 
        let length = $("#lengthInput").val();
        mock_data.length.push({"date": lengthDate, "length": length + " inches"});
        resetForm("#lengthForm");
    });

    $("#headCirForm").submit(function(e) {
        e.preventDefault();
        let hDate = $("#headCirDate").val();
        let headCir = $("#headCirInput").val();
        mock_data.headCir.push({"date": hDate, "headCir": headCir + " inches"});
        resetForm("#headCirForm");
    }); 
});
  