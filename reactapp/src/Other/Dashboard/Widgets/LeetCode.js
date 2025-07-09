import React, { useState, useEffect } from "react";
import leetRef from "./Data/LeetCode75.json";
import "./Widgets.css";

const LeetCode = () => {
  const [stats, setStats] = useState(null);
  const [form, setForm] = useState({
    number: "",
    question: "",
    difficulty: "",
    category: "",
    secret: ""
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [autoFill, setAutoFill] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "number") {
      const match = leetRef.find((item) => item.number.toString() === value);
      if (match) {
        setForm((prev) => ({
          ...prev,
          question: match.name,
          difficulty: match.difficulty.toLowerCase(),
          category: match.category,
        }));
        setAutoFill(true);
      } else {
        setForm((prev) => ({ ...prev, question: "", difficulty: "", category: "" }));
        setAutoFill(false);
      }
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch("https://us-central1-portfolio-mfdev.cloudfunctions.net/getLeetcode");
      const json = await res.json();
      if (!json.documents) return;

      const entries = json.documents.map((doc) => ({
        ...doc.fields,
        date: doc.fields.date.stringValue,
        difficulty: doc.fields.difficulty.stringValue,
        category: doc.fields.category?.stringValue || "Uncategorized",
        success: doc.fields.success?.stringValue || "true",
      }));

      const today = new Date().toISOString().split("T")[0];
      const pastDates = entries.map((e) => e.date).filter((d) => d !== today);
      const lastDate = pastDates.length ? new Date(Math.max(...pastDates.map((d) => new Date(d)))) : null;

      const total = entries.length;
      const difficultyCounts = { easy: 0, medium: 0, hard: 0 };
      const categoryMap = {};
      const successCount = entries.filter((e) => e.success === "true").length;

      entries.forEach((e) => {
        const d = e.difficulty.toLowerCase();
        const cat = e.category;
        if (difficultyCounts[d] !== undefined) difficultyCounts[d]++;
        if (!categoryMap[cat]) categoryMap[cat] = 0;
        categoryMap[cat]++;
      });

      setStats({
        total,
        daysSince: lastDate ? Math.floor((Date.now() - lastDate.getTime()) / (1000 * 60 * 60 * 24)) : "N/A",
        easy: difficultyCounts.easy,
        medium: difficultyCounts.medium,
        hard: difficultyCounts.hard,
        successRate: total > 0 ? Math.round((successCount / total) * 100) : "N/A",
        categoryMap,
      });
    } catch (err) {
      console.error(err);
      setError("Error fetching stats.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await fetch("https://us-central1-portfolio-mfdev.cloudfunctions.net/submitLeetcode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json();
      if (res.ok) {
        setMessage(json.message);
        fetchStats();
        setForm({ number: "", question: "", difficulty: "", category: "", secret: form.secret });
      } else {
        throw new Error(json.error || "Submission failed");
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="widget-block">
      <h3>🧠 LeetCode Tracker</h3>

      {stats ? (
        <div className="leetcode-stats">
          <p>📅 Days since last problem: {stats.daysSince}</p>
          <p>🔢 Problems solved: {stats.total}</p>
          <p>🟢 Easy: {stats.easy} | 🟡 Medium: {stats.medium} | 🔴 Hard: {stats.hard}</p>
          <p>✅ Success rate: {stats.successRate}%</p>
          <p>📚 Categories:</p>
          <ul>
            {Object.entries(stats.categoryMap).map(([cat, count]) => (
              <li key={cat}>{cat}: {count}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading stats…</p>
      )}

      <form className="leetcode-form" onSubmit={handleSubmit}>
        <input name="secret" placeholder="🔒 Secret passphrase" value={form.secret} onChange={handleChange} required />
        <input name="number" placeholder="🔢 Problem #" value={form.number} onChange={handleChange} required />
        {!autoFill && (
          <>
            <input name="question" placeholder="🧩 Title" value={form.question} onChange={handleChange} required />
            <select name="difficulty" value={form.difficulty} onChange={handleChange} required>
              <option value="">📈 Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <input name="category" placeholder="📚 Category" value={form.category} onChange={handleChange} required />
          </>
        )}
        <button type="submit">➕ Add / Update</button>
      </form>

      {message && <p className="success">{message}</p>}
      {error && <p className="widget-error">{error}</p>}
    </div>
  );
};

export default LeetCode;
