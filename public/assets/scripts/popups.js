let open = null;

function showPopup(popupId) {
  // Close the current popup if one is open
  if (open) {
    closePopup(open);
  }

  // Show the specified popup
  const showThis = document.getElementById(popupId);
  if (showThis) {
    showThis.classList.add('active');
    open = popupId;
  }
}

function closePopup(popupId) {
  // Hide the specified popup by removing the "active" class
  const closeThis = document.getElementById(popupId);
  if (closeThis) {
    closeThis.classList.remove('active');
    open = null;
  }
}