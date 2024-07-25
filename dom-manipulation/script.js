let quotes= [
    {text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    {text: "Life is what happens when you're busy making other plans.", category: "Life"},
];
function showRandomQuote()  {
    const randomIndex= Math.floor(Math.random()* quotes.length);
    const quote = quotes[randomIndex];
    document.getElementById('quoteDisplay').innerHTML= `"${quote.text}"-${quote.category}`;
    return;
}
function addQuote(){
   const newQuoteText= document.getElementById('newQuoteText').value;
   const newQuoteCategory=document.getElementById('newQuoteCategory').value;
   if(newQuoteText&& newQuoteCategory){
    quotes.push({text:newQuoteText,category:newQuoteCategory})
    document.getElementById('newQuoteText').value='';
    document.getElementById('newQuoteCategory').value='';
    alert("quote added succesfully");
   }else{
    alert("please add a quote ");
   }
}
document.getElementById('newQuote').addEventListener('click',showRandomQuote);
