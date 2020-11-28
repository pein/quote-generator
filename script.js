// Get Quote FROM API

async function getQuote() {
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const APIUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const res = await fetch(proxyUrl + APIUrl);
    const data = await res.json();
    console.log(data);
  } catch (error) {
    getQuote();
    console.log("No Quote!", error);
  }
}

//OnLoad

getQuote();
