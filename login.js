// Function to handle user login
function login() {
    const nameEl = document.querySelector("#userName");
    localStorage.setItem("userName", nameEl.value);
    localStorage.setItem("loggedIn", "true");
    window.location.href = "./profile.html";
}

// Function to handle user sign up
function signup() {

    window.location.href = "./signup.html";


}

// const  userNameSignup = document.querySelector('#userNameSignup');
// const  passwordSignup = document.querySelector('#passwordSignup');

// const form = document.querySelector('#signupForm');

// const isPasswordSecure = (password) =>{
//     const rules = new RegExp("^(?=.{8,})(?=.*[0-9])");
//     return rules.test(password);
// }

// function isRequired(value){
//     if (value === ''){
//         return false;
//     } else {
//         return true;
//     }
//}

// const isBetween(length, min, max){
//     if (length < min || length > max){
//         return false;
//     }
//     else{
//         return true;
//     }
// }



function checkLoggedIn(){
    const userName = localStorage.getItem('userName');
    const loggedIn = localStorage.getItem('loggedIn');
    if (userName && loggedIn === "true"){
        window.location.href = "./profile.html";
    }
}
//Function to complete sign up
function completeSignup() {
    const nameEl = document.querySelector("#userNameSignup");
    localStorage.setItem("userName", nameEl.value);
    localStorage.setItem("loggedIn", "true");
    window.location.href = "./profile.html";
}


// Function to handle user logout
function logout(){
    localStorage.removeItem('userName');
    localStorage.removeItem('loggedIn');
    window.location.href = "./index.html";
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
    if (document.getElementById('signupButton')) {
        document.getElementById('signupButton').addEventListener('click', completeSignup);
    }
    
}
