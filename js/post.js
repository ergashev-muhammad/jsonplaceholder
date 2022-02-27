// Global variables ---

const elLogOutButton = findElement(".log-out__button");
const elHomePageButton = findElement(".home-page__button");
const elPosts = findElement(".posts");
const elPostTemplate = findElement("#post__template").content;

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

// Return to home page ---

elHomePageButton.addEventListener("click", () => {
    window.location.replace("index.html");
});

// Render function ---

const renderPosts = (array, node) => {
    node.innerHTML = null;

    const postsFragment = document.createDocumentFragment();

    array.forEach((post) => {

        // Creating new button for li ---
        
        const newButton = document.createElement("button");
        newButton.classList.add("post__button--comments");
        newButton.textContent = "Comments";
        
        // Transform to comments ---
        
        newButton.addEventListener("click", () => {
            window.location.replace("comment.html");
        });

        // Copying ---

        const postsTemplate = elPostTemplate.cloneNode(true);

        postsTemplate.querySelector(".post__title").textContent = post.title;
        postsTemplate.querySelector(".post__paragraph").textContent = post.body;

        postsTemplate.appendChild(newButton); 
        postsFragment.appendChild(postsTemplate);
    });

    node.appendChild(postsFragment);
};

// Getting users from link ---

fetch("https://jsonplaceholder.typicode.com/posts")
.then((response) => response.json())
.then((data) => {
    if(data?.length > 0){
        renderPosts(data, elPosts)
    };
});