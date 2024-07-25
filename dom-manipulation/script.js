// Array of quote objects
const quotes = [
  { text: "The best way to predict the future is to create it.", category: "Motivational" },
  { text: "A laugh is the shortest distance between two people.", category: "Funny" },
  // Add more quote objects here
];

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

  // Create the form elements
  const form = document.createElement("form");
  const quoteInput = document.createElement("input");
  const categoryInput = document.createElement("input");
  const submitButton = document.createElement("button");

  // Set attributes and content for form elements
  quoteInput.type = "text";
  quoteInput.placeholder = "Enter your quote here";
  quoteInput.id = "new-quote";

  categoryInput.type = "text";
  categoryInput.placeholder = "Enter quote category";
  categoryInput.id = "new-quote-category";

  submitButton.type = "submit";
  submitButton.textContent = "Add Quote";

  // Add elements to the form
  form.appendChild(quoteInput);
  form.appendChild(categoryInput);
  form.appendChild(submitButton);

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

    // Display a message or call showRandomQuote to update the displayed quote
    console.log("Quote added successfully!");
    // showRandomQuote(); // Uncomment this to automatically update the displayed quote
  });

  // Append the form to the container element
  formContainer.appendChild(form);
}

// Function to create and populate the category selection dropdown
function createCategorySelect() {
  // Get all unique categories from the quotes array
  const categories = new Set(quotes.map(quote => quote.category));

  // Select the category select element
  const categorySelect = document
