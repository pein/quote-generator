const quote = document.getElementById("quote");
const quoteText = document.getElementById("quote__content");
const author = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

// Get Quote FROM API

async function getQuote() {
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const APIUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const res = await fetch(proxyUrl + APIUrl);
    const data = await res.json();

    // if Author is blank, add 'unknown'
    if (data.aauthor === "") {
      author.innerText = "Unknown";
    } else {
      author.innerText = data.quoteAuthor;
    }
    //Reduce font size for long quotes
    if (data.quoteText.length > 120) {
      quoteText.classList.add("quote__long");
    } else {
      quoteText.classList.remove("quote__long");
    }

    quoteText.innerText = data.quoteText;
  } catch (error) {
    // getQuote();
  }
}

//OnLoad

getQuote();
