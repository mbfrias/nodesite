// Get the banner and dismiss button elements
const banner = document.getElementById('thanksbanner');
const dismissButton = document.getElementById('dismiss');

// Check if the URL contains a parameter indicating the contact form submission
const urlParams = new URLSearchParams(window.location.search);
const submitted = urlParams.get('submitted');

if (submitted === 'true') {
    // Show the banner if the 'submitted' parameter is set to 'true'
    banner.style.display = 'block';

    // Add click event listener to the dismiss button
    dismissButton.addEventListener('click', () => {
        banner.style.display = 'none';
    });
}
