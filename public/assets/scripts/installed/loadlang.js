// get cookie to check if language cookie exists
const lang = getCookie("lang");

// if it does exist, load the language
if (lang != "") {
    location.replace(`/${lang}`);
}

