import React, { useState, useEffect } from "react";
import "./Widgets.css";

function YearProgress() {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const startOfNextYear = new Date(now.getFullYear() + 1, 0, 1);
    const elapsed = now - startOfYear;
    const total = startOfNextYear - startOfYear;
    const percent = Math.floor((elapsed / total) * 100);
    setPercentage(percent);
  }, []);

  const currentYear = new Date().getFullYear();
  const barLength = 20;
  const filledCount = Math.round((percentage / 100) * barLength);
  const emptyCount = barLength - filledCount;
  const barString = "█".repeat(filledCount) + "░".repeat(emptyCount);

  return (
    <div className="widget">
      <h2>{currentYear} Progress</h2>
      <div className="widget-content">
        <pre className="text-bar">{barString}</pre>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="widget-percentage">{percentage}% of the year passed</p>
      </div>
    </div>
  );
}

export default YearProgress;
