$(document).ready(function() {

    //require("babel-register");
    //require("babel-polyfill");

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

    //function to get date
    getDate = (date) => {
        for (let i of mock_data.narratives) {
            console.log(i); 
        }
    }

    getDate();

    $("#narrForm").submit(function(e) {
        e.preventDefault(); 
        let narrDate = $("#narrDate").val();
        let narrative = $("#narrInput").val();
        console.log(narrative, narrDate); 
    });
});
  