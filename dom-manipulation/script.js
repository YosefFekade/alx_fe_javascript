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
