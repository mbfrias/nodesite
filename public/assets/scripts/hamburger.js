/* This script makes the hamburger menu work on mobile devices. */

function myFunction() {
    var x = document.getElementById("topnav");
    if (x.className === "navbar") {
        /* extend the navbar to show the links */
        x.className += " responsive";
    } else {
        /* hide the links */
        x.className = "navbar";
    }
  }