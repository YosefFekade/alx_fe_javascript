const serverUrl = 'https://jsonplaceholder.typicode.com/posts';  // Example URL
let quotes = [];

// Fetch quotes from the server periodically
function fetchQuotesFromServer() {
  fetch(serverUrl)
    .then(response => response.json())
    .then(data => {
      // Assume 'data' contains quotes in the format [{id, title: text, body: category}]
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

  // Find new quotes from the server
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

// Add a new quote and sync it with the server
function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;

  if (newQuoteText && newQuoteCategory) {
    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    
    quotes.push(newQuote);
    saveQuotes();
    populateCategories();
    alert("Quote added successfully!");
    
    sendQuoteToServer(newQuote);
  } else {
    alert("Please enter both a quote and a category.");
  }

  document.getElementById('newQuoteText').value = '';
  document.getElementById('newQuoteCategory').value = '';
}

// Save quotes to local storage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Populate categories dynamically
function populateCategories() {
  const categoryFilter = document.getElementById('categoryFilter');
  const categories = [...new Set(quotes.map(quote => quote.category))];

  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

// Filter quotes based on selected category
function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  const quoteDisplay = document.getElementById('quoteDisplay');

  localStorage.setItem('selectedCategory', selectedCategory);

  let filteredQuotes = quotes;
  if (selectedCategory !== 'all') {
    filteredQuotes = quotes.filter(quote => quote.category === selectedCategory);
  }

  quoteDisplay.innerHTML = '';

  filteredQuotes.forEach(quote => {
    const quoteElement = document.createElement('div');
    quoteElement.textContent = `"${quote.text}" - Category: ${quote.category}`;
    quoteDisplay.appendChild(quoteElement);
  });
}

// Load the last selected filter from local storage
function loadLastSelectedFilter() {
  const lastSelectedCategory = localStorage.getItem('selectedCategory');
  if (lastSelectedCategory) {
    document.getElementById('categoryFilter').value = lastSelectedCategory;
    filterQuotes();
  }
}

// Load saved quotes from local storage
function loadQuotes() {
  const savedQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
  quotes = savedQuotes;
}

// Show notification when conflict occurs
function showConflictNotification(conflictMessage) {
  const notification = document.createElement('div');
  notification.className = 'conflict-notification';
  notification.textContent = conflictMessage;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 5000);  // Remove after 5 seconds
}

// On page load, initialize the app
window.onload = function() {
  loadQuotes();
  populateCategories();
  loadLastSelectedFilter();
  fetchQuotesFromServer();  // Fetch initial server data

  // Periodically fetch new quotes from the server
  setInterval(fetchQuotesFromServer, 60000);
};
