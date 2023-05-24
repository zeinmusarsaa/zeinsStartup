// window.onload = function() {
//     document.getElementById('signupForm').addEventListener('submit', function(event) {
//         event.preventDefault();
    
//         let username = document.getElementById('userNameSignup').value;
//         let email = document.getElementById('email').value;
//         let password = document.getElementById('passwordSignup').value;

    
        
//         if (addUser(username, email, password)) {
//             localStorage.setItem('userName', username);
//             localStorage.setItem('loggedIn', 'true');
//             window.location.href = "./profile.html";
//         } else {
//             alert("Username is already taken. Please choose another.");
//         }
//     });
// }

// function addUser(name, email, password) {
//     let users = JSON.parse(localStorage.getItem('users') || '[]');

//     if (users.some(user => user.name === name)) {
//         return false;
//     } else {
//         users.push({name: name, email: email, password: password});
//         localStorage.setItem('users', JSON.stringify(users));
//         return true;
//     }
// }

