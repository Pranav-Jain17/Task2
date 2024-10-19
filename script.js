const API_KEY = "824703ee848b4404b51e035a09edbc47";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => loader());

// Function for loader
function loader() {
    let i = 0;
    let content = document.querySelector(".content");
    let loader = document.querySelector(".loader");
    let loaderContainer = document.querySelector(".loader-container");
    let body = document.querySelector("body");
    let number = document.querySelector(".number");
    let percentBar = document.querySelector(".percentBar");

    let interval = setInterval(function () {
        number.innerHTML = i + '<span>%</span>';
        percentBar.style.width = i + '%';
        i++;
        if (i == 101) {
            clearInterval(interval)
            setTimeout(function () {
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
                loaderContainer.style.opacity = '0';
                loaderContainer.style.visibility = 'hidden';
                loaderContainer.style.display = 'none';
                content.style.opacity = '1';
                content.style.visibility = 'visible';
                fetchNews("India");                     // Calling the API for the first time !
            })
        }
    }, 100)

}


// Function to reload the page
function reload() {
    window.location.reload();
}

// Function to show a message when no data is found
function showNoDataMessage() {
    const cardsContainer = document.getElementById("cards-container");
    cardsContainer.innerHTML = "<p>No articles found. Please try a different search.</p>";
}

// Function to handle errors when fetching news
function showErrorMessage() {
    const cardsContainer = document.getElementById("cards-container");
    cardsContainer.innerHTML = "<p>Error fetching data. Please try again later.</p>";
}

// Fetch news based on the query
async function fetchNews(query) {
    try {
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);

        // If the response is not successful, show an error message
        if (!res.ok) {
            throw new Error("Failed to fetch news.");
        }

        const data = await res.json();

        // If no articles are found, show a no data message
        if (data.articles.length === 0) {
            showNoDataMessage();
        } else {
            bindData(data.articles);
        }

    } catch (error) {
        console.error("Error fetching data:", error);
        showErrorMessage();
    }
}

// Function to bind articles to the UI
function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = ""; // Clear the existing content

    articles.forEach((article) => {
        if (!article.urlToImage) return; // Skip articles without an image
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

// Function to fill data into each card
function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");
    const readMoreBtn = cardClone.querySelector("#read");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    // Set up the "Read More" button
    readMoreBtn.addEventListener("click", () => {
        // Store article details in localStorage
        localStorage.setItem("articleDetails", JSON.stringify(article));
        window.location.href = "article.html";
    });
}

// Function to handle navigation item clicks
let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

// Search functionality
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});

// Function to handle Light/Dark Mode
function toggleMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}
