const quoteBtn = document.getElementById('newQuote');
const quotes= [
 { text: "The best way to predict the future is to create it.", category: "Motivational" },
  { text: "A laugh is the shortest distance between two people.", category: "Funny" },
]
function randomQuote(){
    
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQ = quotes[randomIndex];
    quoteBtn.addEventListener('click', 
        document.getElementById('quoteDisplay').innerHTML( randomQ)
    );
    return;
}
randomQuote();