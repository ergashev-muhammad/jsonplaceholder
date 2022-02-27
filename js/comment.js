// Global variables ---

const elLogOutButton = findElement(".log-out__button");
const elCommentButtonPost = findElement(".comment__button--post");
const elComments = findElement(".comments");
const elCommentTemplate = findElement("#comment__template").content;

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

// Return to post page ---

elCommentButtonPost.addEventListener("click", () => {
    window.location.replace("post.html");
});

// Render function ---

const renderComments = (array, node) => {
    node.innerHTMl = null;

    // Creating fragment

    const commentsFragment = document.createDocumentFragment();

    array.forEach((comment) => {

        // Copying

        const commentTemplate = elCommentTemplate.cloneNode(true);

        commentTemplate.querySelector(".comment__title").textContent = comment.name;
        commentTemplate.querySelector(".comment__email").textContent = comment.email;
        commentTemplate.querySelector(".comment__email").href = "mailto:" + comment.email;
        commentTemplate.querySelector(".comment__paragraph").textContent = comment.body;

        commentsFragment.appendChild(commentTemplate);
    })

    node.appendChild(commentsFragment);
};

// Getting comments from link ---

fetch("https://jsonplaceholder.typicode.com/comments")
.then((response) => response.json())
.then((data) => {
    if(data?.length > 0){
        renderComments(data, elComments)
    };
});