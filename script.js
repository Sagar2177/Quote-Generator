
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show Loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide Loader
function complete(){
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quotw from API
async function getQuote(){
    loading();
   // const proxyUrl = "https://cors-anywhere.herokuapp.com/"
    const apiUrl = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json"

    try{
        const response =await fetch(apiUrl);
        const data = await response.json();
        if (data.quoteAuthor === ''){
            authorText.innerText = 'Unknown';
        }else{
            authorText.innerText = data.quoteAuthor;
        }
        if(data.quoteText.length>120){
            quoteText.classList.add('long-quote');
        }
        else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        complete();
    } catch(error){
        getQuote();
        
    }
}

// Tweet Quote
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank')

}

// Event Listeners
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click', tweetQuote);
// On Load
getQuote();