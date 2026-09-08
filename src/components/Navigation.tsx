"use client";

import { Menu, Moon, Sun, Terminal, X } from "lucide-react";
import { useState, useEffect } from "react";

const links = [
  ["WORK", "work"],
  ["EXPERIENCE", "experience"],
  ["ABOUT", "about"],
  ["RESUME", "resume"],
  ["CONTACT", "contact"],
];

export function Navigation({ onOpenTerminal }: { onOpenTerminal?: () => void }) {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <header className="site-nav">
      <a href="#top" className="brand" aria-label="Ariel Nazareno home">
        <span>AN</span>
        <strong>ARIEL NAZARENO</strong>
      </a>
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? "Close navigation" : "Open navigation"}>
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      <nav className={open ? "nav-links open" : "nav-links"}>
        {links.map(([label, id]) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        {onOpenTerminal && (
          <button className="nav-btn" onClick={onOpenTerminal} title="Open Terminal CLI">
            <Terminal size={13} /> CLI
          </button>
        )}
        <button className="nav-btn" onClick={toggleTheme} title="Toggle Day/Night Mode">
          {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />} {theme === "dark" ? "DAY" : "NIGHT"}
        </button>
      </nav>
    </header>
  );
}