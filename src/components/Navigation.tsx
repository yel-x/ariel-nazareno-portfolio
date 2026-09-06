"use client";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [["WORK", "work"], ["EXPERIENCE", "experience"], ["ABOUT", "about"], ["RESUME", "resume"], ["CONTACT", "contact"]];

export function Navigation() {
  const [open, setOpen] = useState(false);
  return <header className="site-nav"><a href="#top" className="brand" aria-label="Ariel Nazareno home"><span>AN</span><strong>ARIEL NAZARENO</strong></a><button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open}>{open ? <X size={20} /> : <Menu size={20} />}</button><nav className={open ? "nav-links open" : "nav-links"}>{links.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}</nav></header>;
}