// Array of quote objects
const quotes = []; // Initialize empty quotes array

// Function to display a random quote
function showRandomQuote() {
  // Get a random index within the quotes array
  const randomIndex = Math.floor(Math.random() * quotes.length);

  // Get the randomly chosen quote object
  const randomQuote = quotes[randomIndex];

  // Select the DOM elements for quote text and category
  const quoteText = document.getElementById("quote-text");
  const quoteCategory = document.getElementById("quote-category");

  // Update the content of the DOM elements
  quoteText.textContent = randomQuote.text;
  quoteCategory.textContent = randomQuote.category;
}

// Function to create and handle the quote addition form
function createAddQuoteForm() {
  // Select the container element for the form
  const formContainer = document.getElementById("add-quote-form");

  // ... (rest of the code for creating form elements remains the same)

  // Handle form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission behavior

    const newQuoteText = document.getElementById("new-quote").value.trim();
    const newQuoteCategory = document.getElementById("new-quote-category").value.trim();

    // Check if quote text or category is empty
    if (!newQuoteText || !newQuoteCategory) {
      alert("Please enter both quote and category!");
      return;
    }

    // Create a new quote object
    const newQuote = { text: newQuoteText, category: newQuoteCategory };

    // Add the new quote to the quotes array
    quotes.push(newQuote);

    // Clear the input fields
    quoteInput.value = "";
    categoryInput.value = "";

    // Save the updated quotes array to local storage
    saveQuotes();

    // Display a message or call showRandomQuote to update the displayed quote
    console.log("Quote added successfully!");
    // showRandomQuote(); // Uncomment this to automatically update the displayed quote
  });

  // Append the form to the container element
  formContainer.appendChild(form);
}

// Function to create and populate the category selection dropdown (optional)
// ... (implementation for category selection remains the same)

// Function to save quotes array to local storage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Function to load quotes array from local storage on page load
function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  if (storedQuotes) {
    try {
      quotes.push(...JSON.parse(storedQuotes)); // Load and merge quotes from storage
    } catch (error) {
      console.error("Error parsing quotes from Local Storage:", error);
    }
  }
}

// Function to export quotes as a JSON file
function exportQuotesToJson() {
  const jsonData = JSON.stringify(quotes);
  const blob = new Blob([jsonData], { type: "application/json" });
  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = "quotes.json";
  downloadLink.click();
}

// Function to handle JSON file import (optional - session storage example)
function importQuotesFromJson(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes(); // Update local storage as well
      alert("Quotes imported successfully!");
    } catch (error) {
      alert("Error importing quotes: Invalid JSON format!");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// Load quotes from local storage on page load
loadQuotes();

// Call other functions to initialize the application (showRandomQuote, createAddQuoteForm, etc.)

// Optional: Use session storage for temporary data (e.g., last viewed quote)
// sessionStorage.setItem("lastViewedQuoteIndex", someIndex);
// const lastViewedQuoteIndex = sessionStorage.getItem("lastViewedQuoteIndex");
