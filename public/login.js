// Function to handle user login
function login() {
    const nameEl = document.querySelector("#userName");
    fetch('http://localhost:8080/cookie/userName/' + nameEl.value, { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'Logged in') {
                window.location.href = "./profile.html";
            }
        });
}

// Function to handle user sign up
function signup() {
    window.location.href = "./signup.html";
}

function checkLoggedIn() {
    fetch('http://localhost:8080/cookie')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'Logged in'){
                window.location.href = "./profile.html";
            }
        });
}

//Function to complete sign up
function completeSignup() {
    const nameEl = document.querySelector("#userNameSignup");
    fetch('http://localhost:8080/cookie/userName/' + nameEl.value, { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'Logged in') {
                window.location.href = "./profile.html";
            }
        });
}


// Function to handle user logout
function logout(){
    // You would need to implement a server route to handle logging out, which
    // would delete the session data.
    fetch('http://localhost:8080/logout', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'Logged out') {
                window.location.href = "./index.html";
            }
        });
}

window.onload = function() {
    // Add event listeners
    checkLoggedIn();
    if (document.getElementById('logoutLink')) {
        document.getElementById('logoutLink').addEventListener('click', logout);
    }
    if (document.getElementById('loginButton')) {
        document.getElementById('loginButton').addEventListener('click', login);
    }
    if (document.getElementById('signupButton')) {
        document.getElementById('signupButton').addEventListener('click', signup);
    }
}
