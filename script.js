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

// Load quotes from local storage
function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
      quotes = JSON.parse(storedQuotes);
    }
  }
  
  // Save quotes to local storage
  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }
  loadQuotes();


  
  function exportToJsonFile() {
    const dataStr = JSON.stringify(quotes);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
  
    const exportFileDefaultName = 'quotes.json';
  
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }
  // Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  }

