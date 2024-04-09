const btn = document.querySelector('#js-new-quote');
btn.addEventListener('click', getQuote);

const answerBtn = document.querySelector('#js-tweet');
answerBtn.addEventListener('click', getAnswer);

const answerText = document.querySelector('#js-answer-text');
const endpoint = "https://trivia.cyberwisp.com/getrandomchristmasquestion"

let answer ='';

async function getQuote() {
    try {
        
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw Error(response.statusText)
        }
        const json = await response.json();
        console.log(json['question']);
        displayQuote(json['question']);
        console.log(json['answer']);
        answer = json['answer'];
        answerText.textContent = '';
    } catch (err) {
        console.log(err);
        alert('Failed to fetch new quote')
    }

}

function getAnswer() {
    answerText.textContent = answer;
}

function displayQuote(quote) {
    const quoteText = document.querySelector
    ("#js-quote-text");
    quoteText.textContent = quote;
}

getQuote()