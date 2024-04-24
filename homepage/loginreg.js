function login() {
    var enteredUsername = document.getElementById('login-email').value;
    var enteredPassword = document.getElementById('login-password').value;
    var flag = 0;
    var logged = false;

    // Check if entered credentials match admin credentials
    if (enteredUsername === 'admin' && enteredPassword === 'admin') {
        window.location.href = "index.html";
        alert('Admin Login Successful');
        return;
    }

    // Your login authentication logic for registered users should go here
    var storedUsers = JSON.parse(localStorage.getItem('users'));
    if (storedUsers) {
        for (var i = 0; i < storedUsers.length; i++) {
            if (((enteredUsername === storedUsers[i].username || enteredUsername === storedUsers[i].email) && enteredPassword === storedUsers[i].password) || enteredUsername === "arengo@gmail.com" && enteredPassword ==="arengo") {
                window.location.href = "index.html";
                alert('Login Successful');
                logged = true;
                flag = 1;
                break;
            }
        }
    }
    if (flag === 0) {
        alert(`Invalid ${enteredUsername} or Password`);
    }
    
}

function register() {
    var username = document.getElementById('register-username').value;
    var password = document.getElementById('register-password').value;
    var email = document.getElementById('register-email').value;
    var pattern = /\S+@\S+\.\S+/;

    // Your registration logic should go here
    if (!username) {
        alert('Username is required');
    } else if (!email) {
        alert('Email is Empty');
    } else if (!pattern.test(email)) {
        alert('Please Enter a valid email');
    } else if (!password) {
        alert('Password is required');
    } else if (!confirm) {
        alert('Confirm Password is required');
    } else if (username.length <= 8) {
        alert('Username must be greater than eight characters.');
    } else {
        // add data structure like a class USER 
        
        var newUser = {
            username: username,
            password: password,
            email: email
        };
        var storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        storedUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(storedUsers));
        alert('Registration successful!');
        console.log('Redirecting to login page');
        window.location.href = 'login.html';
        
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#login-btn').onclick = login;
    document.getElementById('login-password').addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            login();
        }
    })

    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission
            register(); // Call the register function
        });
    }
});