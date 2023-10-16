// function to retrieve cookie data

function getCookie(cname) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    // loop through cookie array
    for (let i = 0; i <ca.length; i++) {
        let c = ca[i];
        // remove leading spaces
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        // if cookie found, return cookie value
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    // if cookie not found, return empty string
    return "";
}