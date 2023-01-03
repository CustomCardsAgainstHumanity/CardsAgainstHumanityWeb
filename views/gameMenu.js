// Get the modal
const modal = document.getElementById('error-modal');
// Get the <span> element that closes the modal
const closeButton = document.getElementsByClassName('close-button')[0];
// When the user clicks the button, open the modal
function showError() {
    modal.style.display = 'block';
}
// When the user clicks on <span> (x), close the modal
closeButton.onclick = function() {
    modal.style.display = 'none';
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
function handleError(error) {
    if (typeof error === 'string' && error.length > 0) {
        const errorMessage = document.getElementById('error-message');
        errorMessage.innerText = error;
        showError();
    }
}