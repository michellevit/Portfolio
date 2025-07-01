import React, { useState, useEffect } from "react";
import "./Widgets.css";
import quotes from "./Quotes.json";

function QuotesWidget() {
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
        <blockquote style={{ fontStyle: "italic", margin: 0 }}>
          “{quote.text}”
        </blockquote>
        <div style={{ marginTop: "0.5em", fontSize: "small" }}>
          — {quote.author}
        </div>
      </div>
    </div>
  );
}

export default QuotesWidget;
