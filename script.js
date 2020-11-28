const quote = document.getElementById("quote");
const quoteText = document.getElementById("quote__content");
const authorName = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

function showLoadingSpinner() {
  loader.hidden = false;
  quote.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    loader.hidden = true;
    quote.hidden = false;
  }
}
// Get Quote FROM API

async function getQuote() {
  showLoadingSpinner();

  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const APIUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const res = await fetch(proxyUrl + APIUrl);
    const data = await res.json();

    // if Author is blank, add 'unknown'
    if (data.author === "") {
      author.innerText = "Unknown";
    } else {
      authorName.innerText = data.quoteAuthor;
    }
    //Reduce font size for long quotes
    if (data.quoteText.length > 120) {
      quoteText.classList.add("quote__long");
    } else {
      quoteText.classList.remove("quote__long");
    }

    quoteText.innerText = data.quoteText;
  } catch (error) {
    //@TODO: prevent an infint loop with a counter
    getQuote();
  }

  removeLoadingSpinner();
}

// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorName.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

// Event Listners

newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

//OnLoad

getQuote();
