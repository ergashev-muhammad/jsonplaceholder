// Global variables ---

const elUsers = findElement(".users");
const elUserTemplate = findElement("#user__template").content;
const elLogOutButton = findElement(".log-out__button");

// Validate authentication ---

const token = window.localStorage.getItem("token");

if (!token){
    window.location.replace("login.html");
};

// Return to log in page ---

elLogOutButton.addEventListener("click", () => {
    window.localStorage.removeItem("token");
    window.location.replace("index.html");
});

// Render function ---

const renderUsers = (array, node) => {
    node.innerHTML = null;
    
    const usersFragment = document.createDocumentFragment();
    
    array.forEach((user) => {
        
        // Creating new button for li ---
        
        const newButton = document.createElement("button");
        newButton.classList.add("user__button--posts");
        newButton.textContent = "Posts";
        
        // Transform to posts
        
        newButton.addEventListener("click", () => {
            window.location.replace("post.html");
        });
        
        // Copying ---
        
        const userTemplate = elUserTemplate.cloneNode(true);
        
        userTemplate.querySelector(".user__name").textContent = user.name;
        userTemplate.querySelector(".user__user-name").textContent = user.username;
        userTemplate.querySelector(".user__email").textContent = user.email;
        userTemplate.querySelector(".user__email").href = "mailto:" + user.email;
        userTemplate.querySelector(".user__address").textContent = user.address.street + " " + user.address.suite + " " + user.address.city;
        userTemplate.querySelector(".user__phone").textContent = user.phone;
        userTemplate.querySelector(".user__website").textContent = user.website;
        userTemplate.querySelector(".user__company").textContent = user.company.name;
        
        
        userTemplate.appendChild(newButton)
        usersFragment.appendChild(userTemplate);
    });
    
    node.appendChild(usersFragment);
};

// Getting users from link ---

fetch("https://jsonplaceholder.typicode.com/users")
.then((response) => response.json())
.then((data) => {
    if(data?.length > 0){
        renderUsers(data, elUsers)
    };
});




