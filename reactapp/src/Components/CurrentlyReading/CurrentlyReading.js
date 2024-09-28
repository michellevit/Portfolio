import React, { useState } from "react";
import "./CurrentlyReading.css";
import booksData from './Books.json';


const CurrentlyReading = () => {
  const [activeYears, setActiveYears] = useState([]);

  const { currentBook, previousBooks } = booksData;

  // Group previous books by year
  const readingData = previousBooks.reduce((acc, book) => {
    if (!acc[book.year]) {
      acc[book.year] = [];
    }
    acc[book.year].push({
      title: book.title,
      author: book.author,
      url: book.url,
    });
    return acc;
  }, {});

  const toggleYear = (year) => {
    if (activeYears.includes(year)) {
      setActiveYears(activeYears.filter((activeYear) => activeYear !== year));
    } else {
      setActiveYears([...activeYears, year]);
    }
  };

  const sortedYears = Object.keys(readingData).sort((a, b) => b - a);

  return (
    <div className="currently-reading">
      {currentBook && (
        <div className="current-book">
          <h3>Currently Reading:</h3>
          <a href={currentBook.url} class="current-book" target="_blank" rel="noopener noreferrer">
            {currentBook.title} by {currentBook.author}
          </a>
        </div>
      )}

      {sortedYears.map((year) => (
        <div key={year} className="year-block">
          <button
            onClick={() => toggleYear(year)}
            className={`year-button ${activeYears.includes(year) ? "active" : ""}`}
          >
            {year}
          </button>
          {activeYears.includes(year) && (
            <ul className="book-list">
              {readingData[year].map((book, index) => (
                <li key={index}>
                  <a href={book.url} target="_blank" rel="noopener noreferrer">
                    {book.title} by {book.author}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default CurrentlyReading;