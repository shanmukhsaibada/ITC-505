// Function to set a cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to get a cookie
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Handle task clicks using event delegation
document.getElementById('toDoList').addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('task')) {
        // Highlight the task
        const selectedTask = event.target;
        selectedTask.classList.add('highlight');

        // Show the email form
        document.getElementById('emailForm').style.display = 'block';

        // Handle form submission
        document.getElementById('emailForm').onsubmit = function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const taskName = selectedTask.dataset.task;
            setCookie(taskName, email, 7); // Set cookie to expire in 7 days

            // Change the task color to indicate submission
            selectedTask.classList.remove('highlight');
            selectedTask.classList.add('submitted');

            // Display the confirmation message below the submit button
            const messageElement = document.getElementById('message');
            messageElement.textContent = 'Email recorded and task submitted!';
            messageElement.style.display = 'block';

            // Hide the email form
            document.getElementById('emailForm').style.display = 'none';
        }
    }
});

// Set Last Modified Date
var lastModified = document.lastModified;
document.getElementById('lastModified').textContent = lastModified;

// Check if a cookie exists and update the task styles accordingly
window.onload = function() {
    document.querySelectorAll('.task').forEach(task => {
        const taskName = task.dataset.task;
        const email = getCookie(taskName);

        if (email) {
            task.classList.add('submitted');
        }
    });
}
