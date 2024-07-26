// Initial array of quotes
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", category: "Inspiration" },
  { text: "The way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" }
];

// Function to display a random quote
function showRandomQuote() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  const filteredQuotes = getFilteredQuotes();
  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = 'No quotes available for this category.';
    return;
  }
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const randomQuote = filteredQuotes[randomIndex];
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
    populateCategoryFilter();
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
    populateCategoryFilter();
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

// Function to populate category filter dynamically
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

  // Restore the last selected category filter
  const lastSelectedCategory = localStorage.getItem('selectedCategory');
  if (lastSelectedCategory) {
    categoryFilter.value = lastSelectedCategory;
  }
}

// Function to get quotes based on selected category
function getFilteredQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  if (selectedCategory === 'all') {
    return quotes;
  }
  return quotes.filter(quote => quote.category === selectedCategory);
}

// Function to filter quotes based on selected category
function filterQuotes() {
  localStorage.setItem('selectedCategory', document.getElementById('categoryFilter').value);
  showRandomQuote();
}

// Event listener for the "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Load the last viewed quote and populate categories when the page loads
window.onload = () => {
  loadLastViewedQuote();
  populateCategoryFilter();
};

const SERVER_URL = 'https://jsonplaceholder.typicode.com/posts'; // Mock API endpoint

// Fetch quotes from the server
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(SERVER_URL);
    const serverQuotes = await response.json();
    return serverQuotes.map(quote => ({
      text: quote.body,
      category: 'Server'
    }));
  } catch (error) {
    console.error('Error fetching quotes from server:', error);
    return [];
  }
}

const SERVER_URL = 'https://jsonplaceholder.typicode.com/posts'; // Mock API endpoint

// Fetch quotes from the server
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(SERVER_URL);
    const serverQuotes = await response.json();
    return serverQuotes.map(quote => ({
      text: quote.body,
      category: 'Server'
    }));
  } catch (error) {
    console.error('Error fetching quotes from server:', error);
    return [];
  }
}

const SERVER_URL = 'https://jsonplaceholder.typicode.com/posts'; // Mock API endpoint

// Fetch quotes from the server
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(SERVER_URL);
    const serverQuotes = await response.json();
    return serverQuotes.map(quote => ({
      text: quote.body,
      category: 'Server'
    }));
  } catch (error) {
    console.error('Error fetching quotes from server:', error);
    return [];
  }
}

// Post new quotes to the server
async function postQuotesToServer(newQuotes) {
  try {
    const response = await fetch(SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newQuotes)
    });
    const result = await response.json();
    console.log('Quotes posted to server:', result);
  } catch (error) {
    console.error('Error posting quotes to server:', error);
  }
}


// Function to sync local data with server data
async function syncData() {
  const localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
  const serverQuotes = await fetchQuotesFromServer();

  // Simple conflict resolution: server data takes precedence
  const mergedQuotes = [...localQuotes, ...serverQuotes];

  // Remove duplicates (assuming unique text values for simplicity)
  const uniqueQuotes = mergedQuotes.reduce((acc, current) => {
    const x = acc.find(item => item.text === current.text);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  // Update local storage with merged quotes
  localStorage.setItem('quotes', JSON.stringify(uniqueQuotes));
  quotes = uniqueQuotes;

  console.log('Data synced with server');
}

// Periodic data fetching (e.g., every 30 seconds)
setInterval(syncData, 30000);

// Initial data sync on page load
window.onload = () => {
  syncData();
  loadLastViewedQuote();
  populateCategoryFilter();
};




// Function to show notifications
function showNotification(message) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.style.display = 'block';
  setTimeout(() => {
    notification.style.display = 'none';
  }, 5000);
}

// Enhanced syncData function to show notifications
async function syncData() {
  const localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
  const serverQuotes = await fetchQuotesFromServer();

  // Simple conflict resolution: server data takes precedence
  const mergedQuotes = [...localQuotes, ...serverQuotes];

  // Remove duplicates (assuming unique text values for simplicity)
  const uniqueQuotes = mergedQuotes.reduce((acc, current) => {
    const x = acc.find(item => item.text === current.text);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  // Check for conflicts
  const conflicts = localQuotes.filter(localQuote => 
    serverQuotes.some(serverQuote => serverQuote.text === localQuote.text)
  );

  // Update local storage with merged quotes
  localStorage.setItem('quotes', JSON.stringify(uniqueQuotes));
  quotes = uniqueQuotes;

  if (conflicts.length > 0) {
    showNotification('Conflicts detected and resolved. Server data takes precedence.');
  } else {
    showNotification('Data synced with server successfully.');
  }

  console.log('Data synced with server');
}

