// Sample movie data
const movies = [
    { title: "Journey To The Unknown", poster: "images/JourneyToTheUnknown.png", showTimes: ["10:00 AM", "2:00 PM", "7:00 PM"] },
    { title: "ACE: The Legendary WWII Pilot", poster: "images/WWIIAce.png", showTimes: ["11:00 AM", "3:00 PM", "8:00 PM"] },
    { title: "Redemption: The story of Joe Smith", poster: "images/1950sNFL.png", showTimes: ["12:00 PM", "4:00 PM", "9:00 PM"] }
];


// Function to display movies in carousel
function displayMovies() {
    const movieCarousel = document.getElementById("movieCarousel");

    movies.forEach(movie => {
        // Create container for each movie
        const movieContainer = document.createElement("div");
        movieContainer.classList.add("movieContainer");

        // Create image element for movie poster
        const posterImg = document.createElement("img");
        posterImg.src = movie.poster;
        posterImg.alt = movie.title + " Poster";
        posterImg.classList.add("moviePoster"); // Add class for styling
        movieContainer.appendChild(posterImg);

        // Create list element for show times
        const showTimesList = document.createElement("ul");
        movie.showTimes.forEach(time => {
            const listItem = document.createElement("li");
            listItem.textContent = time;
            showTimesList.appendChild(listItem);
        });
        movieContainer.appendChild(showTimesList);

        // Append the movie container to the movie carousel
        movieCarousel.appendChild(movieContainer);
    });

    // Initialize carousel
    initCarousel();
}

// Function to initialize carousel
function initCarousel() {
    const carousel = document.querySelector('.carousel');
    const movieContainers = document.querySelectorAll('.movieContainer');
    const totalMovies = movieContainers.length;
    let currentIndex = 0;
    let intervalId;

    function showMovie(index) {
        movieContainers.forEach((movie, i) => {
            if (i === index) {
                movie.style.display = 'inline-block';
            } else {
                movie.style.display = 'none';
            }
        });
    }

    // Show the first movie initially
    showMovie(currentIndex);

    // Function to move to the next movie
    function nextMovie() {
        currentIndex = (currentIndex + 1) % totalMovies;
        showMovie(currentIndex);
    }

    // Function to move to the previous movie
    function prevMovie() {
        currentIndex = (currentIndex - 1 + totalMovies) % totalMovies;
        showMovie(currentIndex);
    }

    // Function to start auto-scrolling
    function startAutoScroll() {
        intervalId = setInterval(nextMovie, 3000); // Change interval as needed
    }

    // Function to stop auto-scrolling
    function stopAutoScroll() {
        clearInterval(intervalId);
    }

    // Add event listeners for carousel navigation
    document.getElementById('prevBtn').addEventListener('click', () => {
        prevMovie();
        stopAutoScroll();
        startAutoScroll();
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        nextMovie();
        stopAutoScroll();
        startAutoScroll();
    });

    // Start auto-scrolling initially
    startAutoScroll();

    // Pause auto-scrolling when mouse enters carousel
    carousel.addEventListener('mouseenter', stopAutoScroll);

    // Resume auto-scrolling when mouse leaves carousel
    carousel.addEventListener('mouseleave', startAutoScroll);
}

// Call the function to display movies in carousel when the page loads
window.onload = displayMovies;
