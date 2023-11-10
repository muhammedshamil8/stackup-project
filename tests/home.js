

document.addEventListener('DOMContentLoaded', function () {
    
    const addButton = document.getElementById('addButton');

    if (addButton) {
        addButton.addEventListener('click', function () {
            alert('Button clicked! You can add your logic here.');
        });
    }
});
