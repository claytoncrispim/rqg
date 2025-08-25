/**
 * Importing the express module to create a web server.
 */
const express = require('express');

// Creating an instance of an Express application.
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies in requests.
const port = 3000; // Defining the port number for the server to listen on.

const quotes = [
    { 
        id: 1,
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },
    {
        id: 2,
        text: "That's one small step for a man, one giant leap for mankind.",
        author: "Neil Armstrong"
    }
];

// Route for the homepage
// This tells the server what to do when someone visits http://localhost:3000/
app.get('/', (req, res) => {
  res.send('This is the homepage of my quotes API.');
});

//Route for sending quote data as a JSON
app.get('/api/quotes', (req, res) => {

    res.json(quotes); // Sending the quotes array as a JSON response.
});

// Route for sending a specific quote by ID
app.get('/api/quotes/:id', (req, res) => {
    const quoteId = parseInt(req.params.id); // Extracting the ID from the request parameters
    const quote = quotes.find(q => q.id === quoteId); // Finding the quote in the array with the matching ID

    // If a quote was found, send it back. Otherwise, send a 404 error.
    if (quote) {
        res.json(quote); // Sending the found quote as a JSON response
    } else {
        res.status(404).json({ error: 'Quote not found' }); // Sending a 404 error if the quote is not found
    }
});


// Route for adding/creating a new quote
app.post(('/api/quotes'), (req, res) => {
    // Check if the request body contains both text and author
    if (!req.body.text || !req.body.author) {
        return res.status(400).json({ error: 'Quote text and author are required' });
    }

    // Create a new quote object with a unique ID
    const newQuote = {
        id: quotes.length > 0 ? Math.max(...quotes.map(q => q.id)) + 1 : 1, // Generate a new ID
        text: req.body.text,
        author: req.body.author
    };

    quotes.push(newQuote); // Add the new quote to the quotes array
    res.status(201).json(newQuote); // Send back the newly created quote with a 201 status code
});


// Route for UPDATING an existing quote by ID
app.put('/api/quotes/:id', (req, res) => {
    const quoteId = parseInt(req.params.id); // Extracting the ID from the request parameters
    const quoteIndex = quotes.findIndex(q => q.id === quoteId); // Finding the quote in the array with the matching ID

    // If a quote is not found, findIndex returns -1
    if (quoteIndex === -1) {
        return res.status(404).json({ error: 'Quote not found' }); // Sending a 404 error if the quote is not found
    }

    // Create the updated quote object
    const updatedQuote = {
        id: quoteId,
        text: req.body.text,
        author: req.body.author
    };

    // Replace the old quote with the updated one in the array
    quotes[quoteIndex] = updatedQuote;

    res.json(updatedQuote); // Send back the updated quote as a JSON response

});


// Route for DELETING a quote by ID
app.delete('/api/quotes/:id', (req, res) => {
    const quoteId = parseInt(req.params.id); // Extracting the ID from the request parameters
    const quoteIndex = quotes.findIndex(q => q.id === quoteId); // Finding the quote in the array with the matching ID

    // If a quote is not found, findIndex returns -1
    if (quoteIndex === -1) {
        return res.status(404).json({ error: 'Quote not found' }); // Sending a 404 error if the quote is not found
    }

    // Remove the quote from the array using its index
    quotes.splice(quoteIndex, 1);

    // Send back a success message
    res.json({ message: 'Quote deleted successfully' });
});

// Starting the server and making it listen on the defined port.
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});