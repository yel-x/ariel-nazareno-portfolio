"use client";

import { Check, Clipboard, Command, Copy, ExternalLink, GitBranch, Play, Search, X } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";

const codeSample = `material_data = validate_master_data(raw_data)\nmapped_data = map_plant_sloc(material_data)\nsap_output = build_sap_output(mapped_data)`;

export function MasterDataPlayground() {
  const [values, setValues] = useState({ material: "100001", plant: "01CA", sloc: "C001" });
  const [running, setRunning] = useState(false);
  const [complete, setComplete] = useState(false);
  const [copied, setCopied] = useState(false);

  function runMapping() {
    setRunning(true);
    setComplete(false);
    window.setTimeout(() => { setRunning(false); setComplete(true); }, 950);
  }

  async function copyCode() {
    await navigator.clipboard?.writeText(codeSample);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return <div className="feature-demo mapper-demo">
    <div className="demo-heading"><div><span className="demo-kicker">PORTFOLIO DEMO / SAMPLE DATA</span><h3>MASTER DATA MAPPING PLAYGROUND</h3></div><span className="demo-status">NO SAP CONNECTION</span></div>
    <div className="mapper-workbench">
      <div className="mapper-inputs">
        {(["material", "plant", "sloc"] as const).map((field) => <label key={field}>{field === "sloc" ? "STORAGE LOCATION" : field.toUpperCase()}<input value={values[field]} onChange={(event) => { setValues({ ...values, [field]: event.target.value }); setComplete(false); }} /></label>)}
        <button className="demo-button" type="button" onClick={runMapping} disabled={running}><Play size={13} /> {running ? "RUNNING..." : "RUN MAPPING"}</button>
      </div>
      <div className="mapper-pipeline" aria-live="polite">
        {(["RAW DATA", "MAPPING RULES", "VALIDATION", "TRANSFORMATION", "SAP OUTPUT"] as const).map((step, index) => <div className={`pipeline-step ${running && index === 2 ? "active" : complete && index === 4 ? "complete" : ""}`} key={step}><span>{String(index + 1).padStart(2, "0")}</span><b>{step}</b>{index < 4 && <i />}</div>)}
        <div className={`mapping-result ${complete ? "visible" : ""}`}><Check size={15} /> VALIDATION PASSED <span>MATERIAL: {values.material} / PLANT: {values.plant} / SLOC: {values.sloc} / STATUS: READY</span></div>
      </div>
    </div>
    <div className="code-viewer"><div className="code-header"><span>representative_mapping.py</span><button type="button" onClick={copyCode}>{copied ? <Check size={13} /> : <Copy size={13} />} {copied ? "COPIED" : "COPY"}</button></div><pre><code>{codeSample}</code></pre></div>
  </div>;
}

type Ticket = { week: string; assignee: string; status: string; priority: string; department: string; sla: boolean };
const tickets: Ticket[] = [
  { week: "WEEK 01", assignee: "A. Santos", status: "Resolved", priority: "High", department: "SAP", sla: true },
  { week: "WEEK 01", assignee: "M. Cruz", status: "In Progress", priority: "Medium", department: "Access", sla: true },
  { week: "WEEK 02", assignee: "J. Reyes", status: "Resolved", priority: "Critical", department: "SAP", sla: false },
  { week: "WEEK 02", assignee: "A. Santos", status: "Open", priority: "Low", department: "Data", sla: true },
  { week: "WEEK 03", assignee: "M. Cruz", status: "Resolved", priority: "High", department: "ERP", sla: true },
  { week: "WEEK 03", assignee: "J. Reyes", status: "On Hold", priority: "Medium", department: "Access", sla: false },
  { week: "WEEK 04", assignee: "A. Santos", status: "Resolved", priority: "Critical", department: "ERP", sla: true },
  { week: "WEEK 04", assignee: "M. Cruz", status: "In Progress", priority: "High", department: "Data", sla: true },
];

export function TaskDashboardDemo() {
  const [filters, setFilters] = useState({ week: "ALL", assignee: "ALL", status: "ALL", priority: "ALL" });
  const filtered = useMemo(() => tickets.filter((ticket) => Object.entries(filters).every(([key, value]) => value === "ALL" || ticket[key as keyof Ticket] === value)), [filters]);
  const resolved = filtered.filter((ticket) => ticket.status === "Resolved").length;
  const sla = filtered.length ? Math.round((filtered.filter((ticket) => ticket.sla).length / filtered.length) * 100) : 0;
  const statuses = ["Resolved", "In Progress", "Open", "On Hold"];
  return <div className="feature-demo dashboard-demo">
    <div className="demo-heading"><div><span className="demo-kicker">PORTFOLIO DEMO / SAMPLE DATA / INTERNAL PROJECT CONCEPT</span><h3>ERP TASK MONITORING DASHBOARD</h3></div><span className="demo-status">SANITIZED VIEW</span></div>
    <div className="dashboard-filters">{Object.entries(filters).map(([key, value]) => <label key={key}>{key.toUpperCase()}<select value={value} onChange={(event) => setFilters({ ...filters, [key]: event.target.value })}><option>ALL</option>{[...new Set(tickets.map((ticket) => ticket[key as keyof Ticket] as string))].map((option) => <option key={option}>{option}</option>)}</select></label>)}</div>
    <div className="kpi-grid"><Metric label="TOTAL TICKETS" value={filtered.length} /><Metric label="RESOLVED" value={resolved} /><Metric label="OPEN" value={filtered.filter((ticket) => ticket.status === "Open").length} /><Metric label="IN PROGRESS" value={filtered.filter((ticket) => ticket.status === "In Progress").length} /><Metric label="ON HOLD" value={filtered.filter((ticket) => ticket.status === "On Hold").length} /><Metric label="OVERALL SLA" value={`${sla}%`} /></div>
    <div className="dashboard-panels"><div><div className="panel-label">TICKET STATUS BREAKDOWN</div><div className="bar-list">{statuses.map((status) => <div className="bar-row" key={status}><span>{status}</span><i><b style={{ width: `${filtered.length ? (filtered.filter((ticket) => ticket.status === status).length / filtered.length) * 100 : 0}%` }} /></i><strong>{filtered.filter((ticket) => ticket.status === status).length}</strong></div>)}</div></div><div><div className="panel-label">SAMPLE TICKET STREAM</div><div className="ticket-table">{filtered.slice(0, 5).map((ticket, index) => <div key={`${ticket.week}-${index}`}><span>{ticket.week}</span><b>{ticket.department}</b><span>{ticket.assignee}</span><em className={`status-${ticket.status.toLowerCase().replace(" ", "-")}`}>{ticket.status}</em></div>)}</div></div></div>
  </div>;
}

function Metric({ label, value }: { label: string; value: string | number }) { return <div className="kpi"><strong>{value}</strong><span>{label}</span></div>; }

type Lifecycle = "NEW" | "ASSIGNED" | "IN PROGRESS" | "RESOLVED";
export function ItsmPrototype() {
  const [subject, setSubject] = useState("");
  const [ticket, setTicket] = useState<{ id: string; subject: string; status: Lifecycle } | null>(null);
  const [nextId, setNextId] = useState(1);
  function createTicket(event: FormEvent<HTMLFormElement>) { event.preventDefault(); if (!subject.trim()) return; setTicket({ id: `MG-${String(nextId).padStart(3, "0")}`, subject: subject.trim(), status: "NEW" }); setNextId(nextId + 1); setSubject(""); }
  const transition: Record<Lifecycle, { label: string; next?: Lifecycle }> = { NEW: { label: "ASSIGN", next: "ASSIGNED" }, ASSIGNED: { label: "START WORK", next: "IN PROGRESS" }, "IN PROGRESS": { label: "RESOLVE", next: "RESOLVED" }, RESOLVED: { label: "RESOLVED" } };
  return <div className="feature-demo itsm-demo"><div className="demo-heading"><div><span className="demo-kicker">INTERACTIVE PROTOTYPE / FRONT-END SIMULATION</span><h3>MARY GRACE ITSM</h3></div><span className="demo-status">EXERCISE ONLY</span></div><div className="itsm-grid"><form className="itsm-form" onSubmit={createTicket}><label>SUBJECT<input value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="Describe a fictional issue" /></label><label>CATEGORY<select defaultValue="ERP"><option>ERP</option><option>ACCESS</option><option>DATA</option></select></label><label>PRIORITY<select defaultValue="HIGH"><option>HIGH</option><option>MEDIUM</option><option>LOW</option></select></label><label>DESCRIPTION<textarea placeholder="Sample description" rows={3} /></label><button className="demo-button" type="submit"><Play size={13} /> CREATE TICKET</button></form><div className="ticket-card" aria-live="polite">{ticket ? <><span className="demo-kicker">{ticket.id}</span><h4>{ticket.subject}</h4><div className="ticket-facts"><span>STATUS<strong>{ticket.status}</strong></span><span>PRIORITY<strong>HIGH</strong></span><span>ASSIGNEE<strong>{ticket.status === "NEW" ? "UNASSIGNED" : "A. SANTOS"}</strong></span><span>SLA<strong>04:00</strong></span></div><div className="lifecycle">{(["NEW", "ASSIGNED", "IN PROGRESS", "RESOLVED"] as Lifecycle[]).map((status) => <span className={status === ticket.status ? "current" : ""} key={status}>{status}</span>)}</div><button className="demo-button" type="button" disabled={!transition[ticket.status].next} onClick={() => transition[ticket.status].next && setTicket({ ...ticket, status: transition[ticket.status].next as Lifecycle })}>{transition[ticket.status].label}</button></> : <div className="empty-state"><Clipboard size={24} /><span>CREATE A SAMPLE TICKET TO BEGIN</span></div>}</div></div></div>;
}

const commands = [{ label: "Go to Projects", target: "work" }, { label: "Go to Experience", target: "experience" }, { label: "Go to About", target: "about" }, { label: "Download Resume", target: "resume", download: true }, { label: "Open GitHub", href: "https://github.com/yel-x" }, { label: "Contact Ariel", target: "contact" }, { label: "SAP Master Data Mapper", target: "mapper-demo" }, { label: "ERP Dashboard", target: "dashboard-demo" }, { label: "Mary Grace ITSM", target: "itsm-demo" }];
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  useEffect(() => { const handler = (event: KeyboardEvent) => { if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setOpen(true); } if (event.key === "Escape") setOpen(false); }; window.addEventListener("keydown", handler); return () => window.removeEventListener("keydown", handler); }, []);
  function execute(command: typeof commands[number]) { setOpen(false); setQuery(""); if (command.href) window.open(command.href, "_blank", "noopener,noreferrer"); else if (command.download) window.open("/resume.pdf", "_blank"); else if (command.target) document.getElementById(command.target)?.scrollIntoView({ behavior: "smooth" }); }
  const filtered = commands.filter((command) => command.label.toLowerCase().includes(query.toLowerCase()));
  return <>{<button className="palette-trigger" type="button" onClick={() => setOpen(true)} aria-label="Open command palette"><Command size={14} /> CTRL K</button>}{open && <div className="palette-backdrop" onClick={() => setOpen(false)}><div className="command-palette" role="dialog" aria-modal="true" aria-label="Portfolio command palette" onClick={(event) => event.stopPropagation()}><div className="palette-search"><Search size={16} /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search portfolio..." /><button type="button" onClick={() => setOpen(false)} aria-label="Close command palette"><X size={16} /></button></div><div className="command-list">{filtered.map((command) => <button type="button" key={command.label} onClick={() => execute(command)}>{command.label}<ExternalLink size={13} /></button>)}{!filtered.length && <span className="empty-state">NO COMMANDS FOUND</span>}</div><div className="palette-hint">ESC CLOSE <span>CTRL / CMD + K</span></div></div></div>}</>;
}

export function GithubActivity() {
  const [repos, setRepos] = useState<{ name: string; html_url: string; updated_at: string }[]>([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { fetch("https://api.github.com/users/yel-x/repos?sort=updated&per_page=5").then((response) => response.ok ? response.json() : []).then((data) => setRepos(data)).catch(() => setRepos([])).finally(() => setLoaded(true)); }, []);
  return <section className="github-activity page-section" aria-label="Public GitHub activity"><div className="section-label"><GitBranch size={14} /> PUBLIC GITHUB ACTIVITY</div><div className="github-heading"><h2>OPEN<br /><span>SOURCE.</span></h2><p>Public repository activity loaded from GitHub without credentials. Private work and internal URLs stay out of this portfolio.</p></div><div className="github-repos">{(loaded && repos.length ? repos : [{ name: "sap-masterdata-pro", html_url: "https://github.com/yel-x/sap-masterdata-pro", updated_at: "" }, { name: "sap-masterdata", html_url: "https://github.com/yel-x/sap-masterdata", updated_at: "" }, { name: "mary-grace-itsm", html_url: "https://github.com/yel-x/mary-grace-itsm", updated_at: "" }]).map((repo) => <a href={repo.html_url} target="_blank" rel="noreferrer" key={repo.name}><span>{repo.name}</span><small>{repo.updated_at ? `UPDATED ${new Date(repo.updated_at).toLocaleDateString()}` : "PUBLIC REPOSITORY"}</small><ExternalLink size={13} /></a>)}</div></section>;
}

export function CopyEmail() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    if (navigator.clipboard) await navigator.clipboard.writeText("nazarenoariel02@gmail.com");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return <button className="copy-email" type="button" onClick={copy}>{copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "COPIED" : "COPY"}</button>;
}
