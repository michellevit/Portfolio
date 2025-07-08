import React, { useState, useEffect } from "react";
import "./Widgets.css";
import quotes from "./Data/Quotes.json";

function Quotes() {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  if (!quote) return null;

  return (
    <div className="widget">
      <h2>Quote</h2>
      <div className="widget-content">
        <blockquote className="widget-quote">“{quote.text}”</blockquote>
        <p className="widget-author">— {quote.author}</p>
      </div>
    </div>
  );
}

export default Quotes;
