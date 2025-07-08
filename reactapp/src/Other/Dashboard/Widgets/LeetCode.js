import React, { useState, useEffect } from "react";
import "./Widgets.css";

const LeetCode = () => {
  const [stats, setStats] = useState(null);
  const [form, setForm] = useState({ number: "", question: "", difficulty: "", secret: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
      }));

      const today = new Date().toISOString().split("T")[0];
      const pastDates = entries.map(e => e.date).filter(d => d !== today);
      const lastDate = pastDates.length ? new Date(Math.max(...pastDates.map(d => new Date(d)))) : null;

      const stats = {
        total: entries.length,
        daysSince: lastDate ? Math.floor((Date.now() - lastDate.getTime()) / (1000 * 60 * 60 * 24)) : "N/A",
        easy: entries.filter(e => e.difficulty === "easy").length,
        medium: entries.filter(e => e.difficulty === "medium").length,
        hard: entries.filter(e => e.difficulty === "hard").length,
      };

      setStats(stats);
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
      const res = await fetch("https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/submitLeetcode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json();
      if (res.ok) {
        setMessage(json.message);
        fetchStats(); // refresh stats
        setForm({ number: "", question: "", difficulty: "", secret: form.secret });
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
        </div>
      ) : (
        <p>Loading stats…</p>
      )}

      <form className="leetcode-form" onSubmit={handleSubmit}>
        <input name="secret" placeholder="🔒 Secret passphrase" value={form.secret} onChange={handleChange} required />
        <input name="number" placeholder="🔢 Problem #" value={form.number} onChange={handleChange} required />
        <input name="question" placeholder="🧩 Title" value={form.question} onChange={handleChange} required />
        <select name="difficulty" value={form.difficulty} onChange={handleChange} required>
          <option value="">📈 Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button type="submit">➕ Add / Update</button>
      </form>

      {message && <p className="success">{message}</p>}
      {error && <p className="widget-error">{error}</p>}
    </div>
  );
};

export default LeetCode;
