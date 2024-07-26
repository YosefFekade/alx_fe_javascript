let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", category: "Inspiration" },
  { text: "The way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" }
];

// Function to display a random quote
function showRandomQuote() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  quoteDisplay.textContent = `${randomQuote.text} - ${randomQuote.category}`;
  sessionStorage.setItem('lastQuote', JSON.stringify(randomQuote));
}

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;

  if (newQuoteText && newQuoteCategory) {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    localStorage.setItem('quotes', JSON.stringify(quotes));
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
    alert('Quote added successfully!');
  } else {
    alert('Please enter both a quote and a category.');
  }
}

// Function to load the last viewed quote from session storage
function loadLastViewedQuote() {
  const lastQuote = JSON.parse(sessionStorage.getItem('lastQuote'));
  if (lastQuote) {
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.textContent = `${lastQuote.text} - ${lastQuote.category}`;
  }
}

// Event listener for the "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Load the last viewed quote when the page loads
window.onload = loadLastViewedQuote;

// Function to export quotes to a JSON file using Blob
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const exportFileDefaultName = 'quotes.json';

  const linkElement = document.createElement('a');
  linkElement.href = url;
  linkElement.download = exportFileDefaultName;
  document.body.appendChild(linkElement); // Append the link to the DOM
  linkElement.click();
  document.body.removeChild(linkElement); // Remove the link from the DOM
  URL.revokeObjectURL(url); // Release the URL object
}
  // Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      localStorage.setItem('quotes', JSON.stringify(quotes));
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  }
  
