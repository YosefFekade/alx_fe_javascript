const serverUrl = 'https://jsonplaceholder.typicode.com/posts';  // Example URL
let quotes = [];

// Fetch quotes from the server periodically
function fetchQuotesFromServer() {
  fetch(serverUrl)
    .then(response => response.json())
    .then(data => {
      const serverQuotes = data.map(item => ({
        text: item.title,
        category: item.body,
        id: item.id
      }));

      syncQuotes(serverQuotes);
    })
    .catch(error => console.error('Error fetching quotes from server:', error));
}

// Sync local data with server data
function syncQuotes(serverQuotes) {
  const localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];

  const newQuotes = serverQuotes.filter(serverQuote => 
    !localQuotes.some(localQuote => localQuote.id === serverQuote.id)
  );

  if (newQuotes.length > 0) {
    const updatedQuotes = [...localQuotes, ...newQuotes];
    localStorage.setItem('quotes', JSON.stringify(updatedQuotes));
    
    alert(`New quotes synced from the server: ${newQuotes.length}`);
    populateCategories();
    filterQuotes();
  }

  resolveConflicts(serverQuotes);
}

// Send a new quote to the server
function sendQuoteToServer(quote) {
  fetch(serverUrl, {
    method: 'POST',
    body: JSON.stringify({
      title: quote.text,
      body: quote.category
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log('Quote successfully sent to the server:', data);
  })
  .catch(error => console.error('Error sending quote to server:', error));
}

// Conflict resolution: Server data takes precedence
function resolveConflicts(serverQuotes) {
  const localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];

  serverQuotes.forEach(serverQuote => {
    const localQuote = localQuotes.find(localQuote => localQuote.id === serverQuote.id);

    if (localQuote && (localQuote.text !== serverQuote.text || localQuote.category !== serverQuote.category)) {
      localQuote.text = serverQuote.text;
      localQuote.category = serverQuote.category;
      alert(`Conflict resolved for quote: ${localQuote.id}. Server's version used.`);
    }
  });

  localStorage.setItem('quotes', JSON.stringify(localQuotes));
  filterQuotes();
}

// Show a random quote from the filtered results
function showRandomQuote() {
  const filteredQuotes = filterQuotes();
  if (filteredQuotes.length === 0) {
    document.getElementById('quoteDisplay').innerHTML = 'No quotes available for the selected category.';
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const randomQuote = filteredQuotes[randomIndex];
  document.getElementById('quoteDisplay').innerHTML = `"${randomQuote.text}" - Category: ${randomQuote.category}`;
}

// Create and insert the form to add a new quote
function createAddQuoteForm() {
  const formContainer = document.createElement('div');
  formContainer.innerHTML = `
    <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
    <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
    <button id="addQuoteButton">Add Quote</button>
  `;
  document.body.appendChild(formContainer);

  // Add event listener for the add quote button
  document.getElementById('addQuoteButton').addEventListener('click', addQuote);
}

// Add a new quote and sync it with the server
function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;

  if (!newQuoteText || !newQuoteCategory) {
    alert('Please enter both a quote and a category.');
    return;
  }

  const newQuote = {
    text: newQuoteText,
    category: newQuoteCategory,
    id: Date.now() // Generate a unique ID
  };

  quotes.push(newQuote);
  localStorage.setItem('quotes', JSON.stringify(quotes));
  sendQuoteToServer(newQuote);

  // Update the categories and display
  populateCategories();
  filterQuotes();
}

// Populate categories dynamically from the quotes array
function populateCategories() {
  const categories = ['all', ...new Set(quotes.map(quote => quote.category))];
  const categoryFilter = document.getElementById('categoryFilter');
  categoryFilter.innerHTML = categories.map(category => `<option value="${category}">${category}</option>`).join('');
}

// Filter quotes based on the selected category
function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  const filteredQuotes = selectedCategory === 'all' 
    ? quotes 
    : quotes.filter(quote => quote.category === selectedCategory);

  const quoteDisplay = document.getElementById('quoteDisplay');
  if (filteredQuotes.length > 0) {
    quoteDisplay.innerHTML = `"${filteredQuotes[0].text}" - Category: ${filteredQuotes[0].category}`;
  } else {
    quoteDisplay.innerHTML = 'No quotes available.';
  }

  return filteredQuotes;
}

// Import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    localStorage.setItem('quotes', JSON.stringify(quotes));
    populateCategories();
    filterQuotes();
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

// Export quotes to a JSON file
function exportToJsonFile() {
  const data = JSON.stringify(quotes);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  a.click();
  URL.revokeObjectURL(url);
}

// Initialize the application
function init() {
  quotes = JSON.parse(localStorage.getItem('quotes')) || [];
  populateCategories();
  showRandomQuote();
  fetchQuotesFromServer();
  setInterval(fetchQuotesFromServer, 60000); // Periodic sync every minute
  createAddQuoteForm(); // Create the quote form when initializing

  // Add event listener for category filtering
  document.getElementById('categoryFilter').addEventListener('change', filterQuotes);

  // Add event listener for the show random quote button
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);

  // Add event listener for file input (importing quotes)
  document.getElementById('importFile').addEventListener('change', importFromJsonFile);

  // Add event listener for the export button
  document.getElementById('exportQuotesButton').addEventListener('click', exportToJsonFile);
}

window.addEventListener('load', init);
