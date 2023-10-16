// function to create a cookie

function makeCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    const expires = "expires="+ d.toUTCString();
    // notify website visitor of cookie creation in prompt (cancel to not create cookie)
    confirm("[EN] I use cookies to remember the language you selected. By clicking OK, you agree to the use of such cookies.\n\n[ES] Voy a utilizar cookies para recordar el idioma que has seleccionado. Al hacer clic en OK, aceptas el uso de dichas cookies.");
    // check for existing cookie
    if (getCookie(cname) == "") {
        // create cookie
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        // redirect to home page with new language
        window.location.replace(`/${cvalue}`);
    } else {
        // if cookie exists, check if it matches the current language
        if (getCookie(cname) != cvalue) {
            // if cookie does not match current language, delete cookie and create new one
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
            // redirect to home page with new language
            window.location.replace(`/${cvalue}`);
        } else {
            // nothing
        }
    }

}