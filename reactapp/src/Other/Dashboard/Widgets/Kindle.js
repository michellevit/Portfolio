import React, { useState, useEffect } from "react";
import "./Widgets.css";
import data from "./KindleQuotes.json";

function Kindle() {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    if (data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length);
      setQuote(data[randomIndex]);
    }
  }, []);

  if (!quote) return null;

  return (
    <div className="widget">
      <h2>Kindle Quotes</h2>
      <div className="widget-content">
        <blockquote className="widget-quote">“{quote.quote}”</blockquote>
        <p className="widget-author">— {quote.book}</p>
      </div>
    </div>
  );
}

export default Kindle;
