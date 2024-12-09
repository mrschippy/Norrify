const categorySelect = document.getElementById("category");
const norrifyButton = document.getElementById("norrifyButton");
const imageContainer = document.getElementById("imageContainer");
const randomImage = document.getElementById("randomImage");
const quoteText = document.getElementById("quoteText");
const quoteContainer = document.getElementById("quoteContainer");

// API URLs for the respective categories and quotes
const catAPI = "https://api.thecatapi.com/v1/images/search";
const randomImageAPI = "https://picsum.photos/500"; 
const chuckNorrisQuoteAPI = "https://api.chucknorris.io/jokes/random";

norrifyButton.addEventListener("click", async () => {
  const category = categorySelect.value;

  let imageUrl = "";
  let quote = "";

  try {
    // fetching random image based on the selected category
    if (category === "cats") {
      // fetch cat image from thecatapi.com (returns an array)
      const catResponse = await fetch(catAPI);
      const catData = await catResponse.json();
      imageUrl = catData[0].url;
    } else if (category === "random") {
      // fetch random image from picsum.photos with cache-busting query (important!)
      imageUrl = `${randomImageAPI}?random=${Math.random()}`;
    }

    // fetching random Chuck Norris joke
    const quoteResponse = await fetch(chuckNorrisQuoteAPI);
    const quoteData = await quoteResponse.json();
    quote = quoteData.value;

    // set the image and quote
    randomImage.src = imageUrl;
    quoteText.textContent = quote;

    // show the image and quote with animations
    imageContainer.style.display = "block";
    randomImage.style.opacity = 0;
    randomImage.style.transform = "scale(0.9)";
    quoteContainer.style.opacity = 0;

    // apply animations for smoother transitions
    setTimeout(() => {
      randomImage.style.transition = "opacity 1s, transform 1s";
      randomImage.style.opacity = 1; 
      randomImage.style.transform = "scale(1)"; 
      quoteContainer.style.transition = "opacity 1s";
      quoteContainer.style.opacity = 1;
    }, 100);

    // in case something goes wrong
  } catch (error) {
    console.error("Error fetching data:", error);
    quoteText.textContent = "Sorry, something went wrong!";
  }
});

// light/dark toggle

const darknessToggle = document.getElementById("darknessToggle");
const body = document.body;
const toggleText = document.querySelector(".boxOfDarkness p");

darknessToggle.addEventListener('click', () => {

    // toggle dark mode class on body
body.classList.toggle('darkMode');

darknessToggle.classList.add('clicked');

    // change the text depending on current light/dark mode
if (body.classList.contains('darkMode')) {
    toggleText.textContent = "Click on Chuck to toggle light mode";
} else {
    toggleText.textContent = "Click on Chuck to toggle dark mode";
  }

    // reset the animation after the button completes the movement
setTimeout(() => {
    darknessToggle.classList.remove('clicked');
}, 1000); // matches animation duration in CSS (1s)
});
