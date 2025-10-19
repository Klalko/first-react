const form = document.getElementById('form');
const firstname_input = document.getElementById('username');  //  Corrected ID
const email_input = document.getElementById('email');
const pass_input = document.getElementById('password');
const confpass_input = document.getElementById('confirm-password');
const error = document.getElementById('error');

form.addEventListener('submit', function (event) {
    event.preventDefault(); 

    let errors = [];
    const emailValue = email_input.value.trim();
    const passwordValue = pass_input.value.trim();

    
    if (firstname_input) {   
        const firstnameValue = firstname_input.value.trim();
        errors = getsignuperrors(firstnameValue, emailValue, passwordValue, confpass_input.value);
    } else { // Signin
        errors = getsigninerrors(emailValue, passwordValue);
    }

    if (errors.length > 0) {
        error.innerText = errors.join(". ");
        return; // Stop the form submission if there are errors
    }

    //  **Important:** This is where you'll interact with your server.
    //  Replace this placeholder code with your actual AJAX/fetch call
    //  to your server's sign-in endpoint.
    signIn(emailValue, passwordValue)
        .then(response => {
            if (response.success) {
                //  On successful sign-in, redirect based on the user's role.
                const userRole = response.role; // Role from the server
                console.log('User role:', userRole);  //  For debugging

                //  Redirect the user based on their role.
                if (userRole === 'doctor') {
                    window.location.href = '/doctor.html'; // Or whatever page
                } else if (userRole === 'patient') {
                    window.location.href = '/patient.html'; // Or whatever page
                } else if (userRole === 'admin') {
                    window.location.href = '/dashboard.html';
                } else {
                    window.location.href = '/main.html'; //  Default
                }
            } else {
                //  Handle sign-in errors (e.g., invalid credentials)
                error.innerText = response.message || 'Invalid credentials';
            }
        })
        .catch(error => {
            // Handle network errors or other exceptions
            error.innerText = 'An error occurred. Please try again later.';
            console.error('Sign-in error:', error);
        });
});

function getsignuperrors(firstname, email, password, confirmpassword) {
    let errors = [];

    if (firstname === '' || firstname == null) {
        errors.push('First name is required');
        firstname_input.classList.add('incorrect');
        firstname_input.previousElementSibling.style.setProperty("color", "red", "important");
        firstname_input.previousElementSibling.lastChild.setAttribute("fill", "red");
    }

    if (email === '' || email == null) {
        errors.push('Email is required');
        email_input.classList.add('incorrect');
        email_input.previousElementSibling.style.setProperty("color", "red", "important");
        email_input.previousElementSibling.lastChild.setAttribute("fill", "red");
    }

    if (password === '' || password == null) {
        errors.push('Password is required');
        pass_input.classList.add('incorrect');
        pass_input.previousElementSibling.style.setProperty("color", "red", "important");
        pass_input.previousElementSibling.lastChild.setAttribute("fill", "red");
    }
    if (password.length < 8) {
        errors.push('Password must be at least 8 characters');
        pass_input.classList.add('incorrect');
        pass_input.previousElementSibling.style.setProperty("color", "red", "important");
        pass_input.previousElementSibling.lastChild.setAttribute("fill", "red");
    }

    if (confirmpassword === '' || confirmpassword == null) {
        errors.push('Confirm password is required');
        confpass_input.classList.add('incorrect');
        confpass_input.previousElementSibling.style.setProperty("color", "red", "important");
        confpass_input.previousElementSibling.lastChild.setAttribute("fill", "red");
    } else if (password !== confirmpassword) {
        errors.push('Passwords do not match');
        pass_input.classList.add('incorrect');
        confpass_input.classList.add('incorrect');
        pass_input.previousElementSibling.style.setProperty("color", "red", "important");
        confpass_input.previousElementSibling.style.setProperty("color", "red", "important");
    }

    return errors;
}

function getsigninerrors(email, password) {
    let errors = [];

    if (email === '' || email == null) {
        errors.push('Email is required');
        email_input.classList.add('incorrect');
        email_input.previousElementSibling.style.setProperty("color", "red", "important");
        email_input.previousElementSibling.lastChild.setAttribute("fill", "red");
    }

    if (password === '' || password == null) {
        errors.push('Password is required');
        pass_input.classList.add('incorrect');
        pass_input.previousElementSibling.style.setProperty("color", "red", "important");
        pass_input.previousElementSibling.lastChild.setAttribute("fill", "red");
    }

    return errors;
}

const allinputs = [firstname_input, email_input, pass_input, confpass_input];
if (firstname_input) {
    allinputs.forEach(input => {
        input.addEventListener('input', function (event) {
            // Remove the red styling and reset the border color
            if (input.value !== '') {
                input.classList.remove('incorrect');
                input.previousElementSibling.style.removeProperty("color");
                input.previousElementSibling.lastChild.removeAttribute("fill");
                input.previousElementSibling.lastChild.setAttribute("fill", "white");
            }
        });
    });
}


function handleCredentialResponse(response) {
    // Get the JWT token from Google
    const jwt = response.credential;

    console.log("Google JWT Token:", jwt);

    // Ideally, send this token to your backend for verification
    localStorage.setItem("googleToken", jwt);

    // Redirect to main page after successful sign-in
    window.location.href = "/main.html";
}

window.onload = function () {
    if (google) {
        google.accounts.id.initialize({
            client_id: "1006312622508-7rphp7gidcbfe3ct3g2ol2hpkr2q7pki.apps.googleusercontent.com",
            callback: handleCredentialResponse
        });

        google.accounts.id.renderButton(
            document.querySelector(".g_id_signin"),
            { theme: "outline", size: "large" }
        );
    }
};


const select = document.getElementById("dropdown");
const extraFieldsContainer = document.getElementById("extra-fields");

if (select) {
    select.addEventListener('change', () => {
        extraFieldsContainer.innerHTML = ''; // Clear previous fields
        const val = select.value; // Get the selected value

        if (val === 'doctor') {
            const label = document.createElement("label");
            label.textContent = "Doctor ID";
            label.setAttribute("for", "doctor-id");

            const input = document.createElement("input");
            input.type = "text";
            input.id = "doctor-id";
            input.name = "doctor-id";
            input.className = "form-control mb-3";

            extraFieldsContainer.appendChild(label);
            extraFieldsContainer.appendChild(input);
        } else if (val === "Apply for admin") {
            const label = document.createElement("label");
            label.textContent = "Upload CV";
            label.setAttribute("for", "cv-upload");

            const input = document.createElement("input");
            input.type = "file";
            input.id = "cv-upload";
            input.name = "cv-upload";
            input.className = "form-control mb-3";

            extraFieldsContainer.appendChild(label);
            extraFieldsContainer.appendChild(input);
        } else {

        }
    });
}



/**
 * Placeholder for your actual sign-in function.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{success: boolean, role?: string, message?: string}>}
 */
function signIn(email, password) {
    //  **Replace this entire function** with your actual server interaction code.
    //  This is just a simulation.  DO NOT USE THIS IN PRODUCTION.
    return new Promise((resolve, reject) => {
        //  Simulate a server response after a short delay (for demonstration).
        setTimeout(() => {
            if (email === 'doctor@example.com' && password === 'password') {
                resolve({ success: true, role: 'doctor' });
            } else if (email === 'patient@example.com' && password === 'password') {
                resolve({ success: true, role: 'patient' });
            } else if (email === 'admin@example.com' && password === 'password') {
                resolve({ success: true, role: 'admin' });
            } else {
                resolve({ success: false, message: 'Invalid email or password.' });
            }
            //  In a real implementation, you would use fetch or an AJAX library
            //  to send the email and password to your server, and the server
            //  would respond with a success/failure indication and the user's role.
        }, 1000);
    });
}
