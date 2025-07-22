import React from "react";
import "./Widgets.css";

const shortcuts = [
  {
    category: "Windows",
    entries: [
      { keys: "Win + L", desc: "Lock PC" },
      { keys: "Win + D", desc: "Minimize all Windows" },
      { keys: "Alt + Tab", desc: "Switch between apps" },
      { keys: "Win + Tab", desc: "View desktops & windows" },
      { keys: "Ctrl + Win + ←/→", desc: "Switch desktops left/right" },
      { keys: "Win + Ctrl + D", desc: "Create new desktop" },
      { keys: "Win + Ctrl + F4", desc: "Close current desktop" },
      { keys: "Win + ↑/↓/←/→", desc: "Snap window (tiling)" },
      { keys: "Win + Shift + ←/→", desc: "Move window between monitors" },
    ],
  },
  {
    category: "Chrome",
    entries: [
      { keys: "Ctrl + Tab", desc: "Next tab" },
      { keys: "Ctrl + Shift + Tab", desc: "Previous tab" },
      { keys: "Ctrl + W", desc: "Close Tab" },
      { keys: "Ctrl + Shift + T", desc: "Reopen closed tab" },
      { keys: "Ctrl + T", desc: "New Tab" },
    ],
  },
  {
    category: "VS Code",
    entries: [
      { keys: "Shift + Alt + ↑/↓", desc: "Duplicate line" },
      { keys: "Ctrl + Shift + K", desc: "Delete line" },
      { keys: "Ctrl + `", desc: "Toggle terminal" },
      { keys: "Ctrl + B", desc: "Toggle sidebar" },
    ],
  },
  {
    category: "Text Editing",
    entries: [
      { keys: "Alt + ↑/↓", desc: "Move line up/down" },
      { keys: "Ctrl + L", desc: "Highlight entire line" },
      { keys: "Ctrl + Shift + ↑/↓/←/→", desc: "Highlight text" },
      { keys: "Ctrl + Tab", desc: "Move between words" },
      { keys: "Shift + Alt + ↑/↓", desc: "Duplicate line" },
    ],
  },
];

function Shortcuts() {
  return (
    <div className="widget">
      <h2>Shortcuts</h2>
      <div className="widget-content">
        {shortcuts.map((section, idx) => (
          <div key={idx}>
            <h3>{section.category}</h3>
            <ul className="widget-list">
              {section.entries.map((entry, i) => (
                <li key={i}>
                  <strong>{entry.keys}</strong>: {entry.desc}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shortcuts;
