/* Toggle between adding and removing the 
"responsive" class to topnav when the user clicks on the icon */
function toggleNav() {
    var nav = document.getElementById("myTopnav");
    if (nav.className === "topnav") {
        nav.className += " responsive";
    } else {
        nav.className = "topnav";
    }
}

//export {toggleNav};