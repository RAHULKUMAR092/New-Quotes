const quoteContainer= document.getElementById('quote-container');
const quoteText= document.getElementById('quote');
const authorText= document.getElementById('author');
const twitterBtn= document.getElementById('twitter');
const newQuoteBtn= document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];
// show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden= true;
}
// hide Loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden= true;
}

/// show New Quotes
function newQuote(){
    loading();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    //console.log(quote);
    // Check if Author field is blank and replace it with 'Unknown'.
    console.log(quote.author)
    if(!quote.author){
        authorText.textContent = 'Unknown';
    }else{
        authorText.textContent=quote.author;
    }
    //authorText.textContent =quote.author;
    
    // Check quotes length to ddetermine styling
    if(quote.text.length>120){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    // set quote,Hide Loader
    quoteText.textContent= quote.text;
    complete();
}

// Get qoute Form API
async function getQuotes(){
    loading();
    const apiUrl='https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();


    }catch(error){
        // catch Error Here
    }
}

// Tweet Quote
function tweetQuote(){
    const twitterUrl= `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');

}
// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


// On Load

getQuotes();
// loading();