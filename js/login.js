// Global variables ---

const elForm = findElement(".login__form");
const elEmailInput = findElement(".login__email-input");
const elPasswordInput = findElement(".password__email-input");

// Listen submit of form ---

elForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    
    const emailInput = elEmailInput.value.trim();
    const passwordInput = elPasswordInput.value.trim();
    
    // Post method of fetch ---

    fetch('https://reqres.in/api/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(
        {
            email: emailInput,
            password: passwordInput,
        }
        ),
    })

    .then((response) => response.json())
    .then((data) => {
        if (data?.token) {
            window.localStorage.setItem('token', data.token);

            window.location.replace("index.html");
        };
    });
});


