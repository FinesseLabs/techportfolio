console.log("script.js is loaded!");
const projectsGrid = document.getElementById('projects-grid');
const loadingMessage = document.getElementById('loading-message');
const blogContainer = document.getElementById('blog-container');
const blogLoadingMessage = document.getElementById('blog-loading-message');

let projectPage = 1;
let blogPage = 1;

async function loadMoreProjects() {
    loadingMessage.style.display = 'block';
    // Simulate loading new projects (replace this with actual API/data fetch logic)
    setTimeout(() => {
        for (let i = 1; i <= 3; i++) {
            const figure = document.createElement('figure');
            figure.innerHTML = `
                <img src="https://via.placeholder.com/300" alt="Project ${projectPage * 3 + i}" />
                <figcaption><a href="#" target="_blank">Project ${projectPage * 3 + i}</a></figcaption>
            `;
            projectsGrid.appendChild(figure);
        }
        projectPage++;
        loadingMessage.style.display = 'none';
    }, 1000);
}

async function loadMoreBlogPosts() {
    blogLoadingMessage.style.display = 'block';
    // Simulate loading new blog posts
    setTimeout(() => {
        for (let i = 1; i <= 2; i++) {
            const article = document.createElement('article');
            article.innerHTML = `
                <hgroup>
                    <h3>Post Title ${blogPage * 2 + i}</h3>
                </hgroup>
                <p>This is a sample blog post. Visitors can comment below.</p>
                <form>
                    <input type="text" placeholder="Your name" required />
                    <textarea placeholder="Your comment" required></textarea>
                    <button type="submit">Submit</button>
                </form>
            `;
            blogContainer.appendChild(article);
        }
        blogPage++;
        blogLoadingMessage.style.display = 'none';
    }, 1000);
}

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        if (projectsGrid.childElementCount < 15) {
            loadMoreProjects();
        } else {
            loadMoreBlogPosts();
        }
    }
});
// Blog Post Array
const blogPosts = [];

// Form Submission Handler
document.getElementById('blog-form').addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    // Create new post object
    const newPost = {
        title,
        content,
        date: new Date().toLocaleString(), // Add timestamp
    };

    // Add to blogPosts array
    blogPosts.push(newPost);

    // Update Post Wall
    updatePostWall();

    // Reset form
    e.target.reset();

    alert('Post submitted!');
});

// Update Post Wall
function updatePostWall() {
    const postWallList = document.getElementById('post-wall-list');
    postWallList.innerHTML = ''; // Clear the wall

    // Render each post
    blogPosts.forEach((post, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${post.title}</strong><br><small>${post.date}</small>`;
        li.addEventListener('click', () => expandPost(index)); // Add click handler
        postWallList.appendChild(li);
    });
}

// Expand Post in Main Area
function expandPost(index) {
    const post = blogPosts[index];
    const expandedTitle = document.getElementById('expanded-post-title');
    const expandedContent = document.getElementById('expanded-post-content');
    const expandedDate = document.getElementById('expanded-post-date');

    // Update expanded post details
    expandedTitle.textContent = post.title;
    expandedContent.textContent = post.content;
    expandedDate.textContent = `Posted on: ${post.date}`;

    // Highlight active post in Post Wall
    const allPosts = document.querySelectorAll('.post-wall li');
    allPosts.forEach((li) => li.classList.remove('active')); // Remove active from all
    allPosts[index].classList.add('active'); // Add active to clicked post
}
const terminalOutput = document.getElementById('terminal-output');
const terminalInput = document.getElementById('terminal-input');

// Define command responses
const commands = {
    about: "Hi! I'm a passionate web developer and cybersecurity enthusiast. I specialize in building sleek, secure, and innovative digital solutions.",
    projects: "Here are some of my web developement projects:\n1. Snake Game - Fun game accessible on both mobile and desktop.\n2. Cybersecurity blog - A penetration testing tool.\n3. Dev Portfolio - A sleek portfolio website.",
    contact: "You can contact me at: techfinesse59@gmail.com or connect via LinkedIn.",
    help: "Available commands:\n1. about\n2. projects\n3. contact\n4. clear - Clear the terminal.",
};

// Handle user input
terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const command = terminalInput.value.trim().toLowerCase(); // Get input
        terminalInput.value = ''; // Clear input
        processCommand(command);
    }
});

// Process terminal commands
function processCommand(command) {
    let response = '';

    if (commands[command]) {
        response = commands[command]; // Valid command
    } else if (command === 'clear') {
        terminalOutput.innerHTML = ''; // Clear the terminal
        return;
    } else {
        response = `Unknown command: "${command}". Type 'help' for a list of commands.`; // Invalid command
    }

    // Add response to terminal output
    terminalOutput.innerHTML += `<div>> ${command}</div><div>${response}</div>`;
    terminalOutput.scrollTop = terminalOutput.scrollHeight; // Auto-scroll to bottom
}
   // Password Strength Checker
   function checkPassword() {
    const password = document.getElementById("passwordInput").value;
    const resultElement = document.getElementById("result");

    if (!password) {
        resultElement.textContent = "Start typing to check password strength...";
        return;
    }

    try {
        fetch('https://password-strength-checker-meb1.onrender.com/check-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.strength) {
                resultElement.textContent = `Password Strength: ${data.strength}`;
                resultElement.style.color =
                    data.strength === 'Weak' ? 'red' :
                    data.strength === 'Medium' ? 'yellow' : 'green';
            } else {
                resultElement.textContent = "Error checking password!";
            }
        });
    } catch (error) {
        resultElement.textContent = "Unable to connect to the server.";
        resultElement.style.color = "red";
        console.error(error);
    }
}


// Dark Mode Toggle
document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const body = document.body;

    // Check if user has a saved preference
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
        darkModeToggle.textContent = "☀️ Light Mode";
    }

    darkModeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");

        // Save preference to localStorage
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
            darkModeToggle.textContent = "☀️ Light Mode";
        } else {
            localStorage.setItem("darkMode", "disabled");
            darkModeToggle.textContent = "🌙 Dark Mode";
        }
    });
});
