function triggerSpinner() {
    var sendButton = document.getElementById("submit");
    sendButton.innerHTML = "<i class='fas fa-spinner fa-spin-pulse'></i>";
    setTimeout(function() {
        sendButton.innerHTML = "Send";
    }, 10000);
}