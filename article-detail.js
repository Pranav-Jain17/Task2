window.addEventListener("load", () => {
    const articleDetails = JSON.parse(localStorage.getItem("articleDetails"));

    if (articleDetails) {
        const headline = document.getElementById("article-headline");
        const author = document.getElementById("article-author");
        const date = document.getElementById("article-date");
        const source = document.getElementById("article-source");
        const img = document.getElementById("article-img");
        const content = document.getElementById("article-content");
        const originalLink = document.getElementById("original-article-link");

        headline.textContent = articleDetails.title || "No Title Available";
        author.textContent = articleDetails.author || "Unknown Author";
        date.textContent = new Date(articleDetails.publishedAt).toLocaleString("en-US", {
            timeZone: "Asia/Jakarta",
        });
        source.textContent = articleDetails.source.name || "Unknown Source";
        img.src = articleDetails.urlToImage || "https://via.placeholder.com/600x300";  // Default image if not available
        content.textContent = articleDetails.content || articleDetails.description || "No content available.";

        originalLink.href = articleDetails.url;
    } else {
        // Handle case when no article details are available
        document.querySelector('.article-detail').innerHTML = "<p>Article not found.</p>";
    }
});



// Function to return to home page
const backButton = document.getElementById("back-button");

backButton.addEventListener("click", () => {
    window.location.href = "index.html";
});
