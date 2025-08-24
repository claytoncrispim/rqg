import { useState, useEffect } from 'react';
import QuoteBox from './QuoteBox.jsx';

function App() {
  const [quote, setQuote] = useState({
    quote: "Loading...", // Changed 'text' to 'quote'
    author: ""
  });
  
  const [allQuotes, setAllQuotes] = useState([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      // 👇 1. Use the new, working URL
      const response = await fetch("https://dummyjson.com/quotes");
      const data = await response.json();
      const quotesArray = data.quotes; // 👈 2. Access the 'quotes' array from the response
      
      setAllQuotes(quotesArray);
      
      const randomIndex = Math.floor(Math.random() * quotesArray.length);
      setQuote(quotesArray[randomIndex]);
    };
    
    fetchQuotes();
  }, []);

  const handleNewQuote = () => {
    if (allQuotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * allQuotes.length);
      const newQuote = allQuotes[randomIndex];
      setQuote(newQuote);
    }
  };

  return (
    <div>
      <h1>Random Quote Generator</h1>
      <QuoteBox currentQuote={quote} />
      <button onClick={handleNewQuote}>New Quote</button>
    </div>
  )
}

export default App