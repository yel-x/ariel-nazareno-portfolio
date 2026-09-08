"use client";

import { ArrowDown, Check, Clipboard, Command, Copy, ExternalLink, GitBranch, Play, Search, Terminal, X } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const codeSample = `material_data = validate_master_data(raw_data)\nmapped_data = map_plant_sloc(material_data)\nsap_output = build_sap_output(mapped_data)`;

export function MasterDataPlayground() {
  const modules = ["PLANT MAPPER", "SLOC MAPPER", "BASE UOM MAPPER", "MIGRATE MAPPER"] as const;
  const [module, setModule] = useState<(typeof modules)[number]>("PLANT MAPPER");
  const [values, setValues] = useState({ material: "100001", plant: "01CA", sloc: "C001" });
  const [running, setRunning] = useState(false);
  const [complete, setComplete] = useState(false);
  const [copied, setCopied] = useState(false);

  function runMapping() {
    setRunning(true);
    setComplete(false);
    window.setTimeout(() => { setRunning(false); setComplete(true); }, 850);
  }

  async function copyCode() {
    if (navigator.clipboard) await navigator.clipboard.writeText(codeSample);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  const moduleOutput = { 
    "PLANT MAPPER": ["PRODUCT", values.material, "EXISTING PLANT", values.plant, "MISSING PLANTS IDENTIFIED"], 
    "SLOC MAPPER": ["PLANT", values.plant, "SLOC", values.sloc, "OUTPUT READY"], 
    "BASE UOM MAPPER": ["MATERIAL", values.material, "BASE UOM", "EA", "VALIDATION PASSED"], 
    "MIGRATE MAPPER": ["PRODUCT DATA", "MAPPING", "TEMPLATE GENERATION", "MIGRATION PACKAGE", "OUTPUT READY"] 
  }[module];

  return (
    <div className="feature-demo mapper-demo">
      <div className="demo-heading">
        <div>
          <span className="demo-kicker">PORTFOLIO DEMO / SAMPLE DATA</span>
          <h3>MASTER DATA MAPPING PLAYGROUND</h3>
        </div>
        <span className="demo-status">NO SAP CONNECTION</span>
      </div>
      <div className="mapper-workbench">
        <div className="mapper-inputs">
          <label>MODULE
            <select value={module} onChange={(e) => { setModule(e.target.value as (typeof modules)[number]); setComplete(false); }}>
              {modules.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          {(["material", "plant", "sloc"] as const).map((field) => (
            <label key={field}>
              {field === "sloc" ? "STORAGE LOCATION" : field.toUpperCase()}
              <input value={values[field]} onChange={(e) => { setValues({ ...values, [field]: e.target.value }); setComplete(false); }} />
            </label>
          ))}
          <button className="demo-button" type="button" onClick={runMapping} disabled={running}>
            <Play size={13} /> {running ? "RUNNING..." : "RUN MAPPING"}
          </button>
        </div>
        <div className="mapper-pipeline" aria-live="polite">
          {(["RAW DATA", "MAPPING RULES", "VALIDATION", "TRANSFORMATION", "SAP OUTPUT"] as const).map((step, index) => (
            <div className={`pipeline-step ${running && index === 2 ? "active" : complete && index === 4 ? "complete" : ""}`} key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <b>{step}</b>
              {index < 4 && <i />}
            </div>
          ))}
          <AnimatePresence>
            {complete && (
              <motion.div className="mapping-result visible" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <Check size={15} /> {moduleOutput[4]} <span>{moduleOutput[0]}: {moduleOutput[1]} / {moduleOutput[2]}: {moduleOutput[3]} / STATUS: READY</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="code-viewer">
        <div className="code-header">
          <span>representative_mapping.py</span>
          <button type="button" onClick={copyCode}>{copied ? <Check size={13} /> : <Copy size={13} />} {copied ? "COPIED" : "COPY"}</button>
        </div>
        <pre><code>{codeSample}</code></pre>
      </div>
    </div>
  );
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
  const resolved = filtered.filter((t) => t.status === "Resolved").length;
  const sla = filtered.length ? Math.round((filtered.filter((t) => t.sla).length / filtered.length) * 100) : 0;
  const statuses = ["Resolved", "In Progress", "Open", "On Hold"];
  const priorities = ["Critical", "High", "Medium", "Low"];

  return (
    <div className="feature-demo dashboard-demo">
      <div className="demo-heading">
        <div>
          <span className="demo-kicker">PORTFOLIO DEMO / SAMPLE DATA / INTERNAL PROJECT CONCEPT</span>
          <h3>ERP TASK MONITORING DASHBOARD</h3>
        </div>
        <span className="demo-status">SANITIZED VIEW</span>
      </div>
      <div className="dashboard-filters">
        {Object.entries(filters).map(([key, value]) => (
          <label key={key}>{key.toUpperCase()}
            <select value={value} onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}>
              <option>ALL</option>
              {[...new Set(tickets.map((t) => t[key as keyof Ticket] as string))].map((opt) => <option key={opt}>{opt}</option>)}
            </select>
          </label>
        ))}
      </div>
      <div className="kpi-grid">
        <Metric label="TOTAL TICKETS" value={filtered.length} />
        <Metric label="RESOLVED" value={resolved} />
        <Metric label="OPEN" value={filtered.filter((t) => t.status === "Open").length} />
        <Metric label="IN PROGRESS" value={filtered.filter((t) => t.status === "In Progress").length} />
        <Metric label="ON HOLD" value={filtered.filter((t) => t.status === "On Hold").length} />
        <Metric label="OVERALL SLA" value={`${sla}%`} />
      </div>
      <div className="dashboard-panels">
        <div>
          <div className="panel-label">TICKET STATUS BREAKDOWN</div>
          <div className="bar-list">
            {statuses.map((s) => (
              <div className="bar-row" key={s}>
                <span>{s}</span>
                <i><b style={{ width: `${filtered.length ? (filtered.filter((t) => t.status === s).length / filtered.length) * 100 : 0}%`, transition: "width 0.4s ease-out" }} /></i>
                <strong>{filtered.filter((t) => t.status === s).length}</strong>
              </div>
            ))}
          </div>
          <div className="panel-label dashboard-subpanel">TICKETS BY PRIORITY</div>
          <div className="bar-list">
            {priorities.map((p) => (
              <div className="bar-row" key={p}>
                <span>{p}</span>
                <i><b style={{ width: `${filtered.length ? (filtered.filter((t) => t.priority === p).length / filtered.length) * 100 : 0}%`, transition: "width 0.4s ease-out" }} /></i>
                <strong>{filtered.filter((t) => t.priority === p).length}</strong>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="panel-label">SAMPLE TICKET STREAM</div>
          <div className="ticket-table">
            {filtered.slice(0, 5).map((t, index) => (
              <div key={`${t.week}-${index}`}>
                <span>{t.week}</span><b>{t.department}</b><span>{t.assignee}</span><em className={`status-${t.status.toLowerCase().replace(" ", "-")}`}>{t.status}</em>
              </div>
            ))}
          </div>
          <div className="panel-label dashboard-subpanel">ASSIGNEE PERFORMANCE</div>
          <div className="assignee-list">
            {["A. Santos", "M. Cruz", "J. Reyes"].map((a) => (
              <span key={a}>{a}<b>{filtered.filter((t) => t.assignee === a && t.status === "Resolved").length} RESOLVED</b></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return <div className="kpi"><strong>{value}</strong><span>{label}</span></div>;
}

type Lifecycle = "NEW" | "ASSIGNED" | "IN PROGRESS" | "RESOLVED";

export function ItsmPrototype() {
  const [subject, setSubject] = useState("");
  const [ticket, setTicket] = useState<{ id: string; subject: string; status: Lifecycle } | null>(null);
  const [priority, setPriority] = useState("HIGH");
  const [nextId, setNextId] = useState(1);

  function createTicket(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!subject.trim()) return;
    setTicket({ id: `MG-${String(nextId).padStart(3, "0")}`, subject: subject.trim(), status: "NEW" });
    setNextId(nextId + 1);
    setSubject("");
  }

  const transition: Record<Lifecycle, { label: string; next?: Lifecycle }> = {
    NEW: { label: "ASSIGN", next: "ASSIGNED" },
    ASSIGNED: { label: "START WORK", next: "IN PROGRESS" },
    "IN PROGRESS": { label: "RESOLVE", next: "RESOLVED" },
    RESOLVED: { label: "RESOLVED" }
  };

  return (
    <div className="feature-demo itsm-demo">
      <div className="demo-heading">
        <div>
          <span className="demo-kicker">INTERACTIVE PROTOTYPE / FRONT-END SIMULATION</span>
          <h3>MARY GRACE ITSM</h3>
        </div>
        <span className="demo-status">EXERCISE ONLY</span>
      </div>
      <div className="itsm-grid">
        <form className="itsm-form" onSubmit={createTicket}>
          <label>SUBJECT<input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Describe a fictional issue" /></label>
          <label>CATEGORY<select defaultValue="ERP"><option>ERP</option><option>ACCESS</option><option>DATA</option></select></label>
          <label>PRIORITY<select value={priority} onChange={(e) => setPriority(e.target.value)}><option>HIGH</option><option>MEDIUM</option><option>LOW</option></select></label>
          <label>DESCRIPTION<textarea placeholder="Sample description" rows={3} /></label>
          <button className="demo-button" type="submit"><Play size={13} /> CREATE TICKET</button>
        </form>
        <div className="ticket-card" aria-live="polite">
          {ticket ? (
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}>
              <span className="demo-kicker">{ticket.id}</span>
              <h4>{ticket.subject}</h4>
              <div className="ticket-facts">
                <span>STATUS<strong>{ticket.status}</strong></span>
                <span>PRIORITY<strong>{priority}</strong></span>
                <span>ASSIGNEE<strong>{ticket.status === "NEW" ? "UNASSIGNED" : "A. SANTOS"}</strong></span>
                <span>SLA<strong>04:00</strong></span>
              </div>
              <div className="lifecycle">
                {(["NEW", "ASSIGNED", "IN PROGRESS", "RESOLVED"] as Lifecycle[]).map((s) => (
                  <span className={s === ticket.status ? "current" : ""} key={s}>{s}</span>
                ))}
              </div>
              <button className="demo-button" type="button" disabled={!transition[ticket.status].next} onClick={() => transition[ticket.status].next && setTicket({ ...ticket, status: transition[ticket.status].next as Lifecycle })}>
                {transition[ticket.status].label}
              </button>
            </motion.div>
          ) : (
            <div className="empty-state"><Clipboard size={24} /><span>CREATE A SAMPLE TICKET TO BEGIN</span></div>
          )}
        </div>
      </div>
    </div>
  );
}

// Interactive Terminal Mode Component
export function TerminalConsoleModal({ onClose }: { onClose: () => void }) {
  const [history, setHexHistory] = useState<string[]>([
    "ARIEL.OS [Version 2026.09]",
    "Type 'help' for available system commands.",
    ""
  ]);
  const [inputVal, setInputVal] = useState("");

  function handleCommand(e: FormEvent) {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    let response = "";

    if (cmd === "help") {
      response = "Available commands: whoami, skills, projects, contact, clear, exit";
    } else if (cmd === "whoami") {
      response = "Ariel Nazareno — ERP / SAP Technical Support Specialist";
    } else if (cmd === "skills") {
      response = "SAP S/4HANA, HANA, Fiori, Master Data, Python, Excel, Pandas, Next.js, TypeScript";
    } else if (cmd === "projects") {
      response = "1. SAP Master Data Mapper\n2. ERP Task Monitoring Dashboard\n3. SAP Material Data Tools\n4. Mary Grace ITSM";
    } else if (cmd === "contact") {
      response = "Email: nazarenoariel02@gmail.com | LinkedIn: ariel-nazareno";
    } else if (cmd === "clear") {
      setHexHistory([]);
      setInputVal("");
      return;
    } else if (cmd === "exit") {
      onClose();
      return;
    } else if (cmd !== "") {
      response = `Command not recognized: '${cmd}'. Type 'help' for options.`;
    }

    setHexHistory((prev) => [...prev, `ARIEL@PORTFOLIO:~$ ${inputVal}`, response].filter(Boolean));
    setInputVal("");
  }

  return (
    <div className="terminal-modal-backdrop" onClick={onClose}>
      <motion.div className="terminal-modal" onClick={(e) => e.stopPropagation()} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
        <div className="terminal-header">
          <span><Terminal size={13} style={{ display: "inline", marginRight: "6px" }} /> SYSTEM_TERMINAL / CLI_MODE</span>
          <button onClick={onClose} style={{ background: "none", border: 0, color: "#7bb7ff", cursor: "pointer" }}><X size={14} /></button>
        </div>
        <div className="terminal-body">
          {history.map((line, idx) => (
            <div key={idx} style={{ whiteSpace: "pre-wrap" }}>{line}</div>
          ))}
          <form onSubmit={handleCommand} className="terminal-input-row">
            <span>ARIEL@PORTFOLIO:~$</span>
            <input autoFocus value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
          </form>
        </div>
      </motion.div>
    </div>
  );
}

const commands = [
  { label: "Go to Projects", target: "work" },
  { label: "Go to Experience", target: "experience" },
  { label: "Go to About", target: "about" },
  { label: "Go to Skills", target: "skills" },
  { label: "Open Source", target: "open-source" },
  { label: "Download Resume", target: "resume", download: true },
  { label: "Open GitHub", href: "https://github.com/yel-x" },
  { label: "Contact Ariel", target: "contact" }
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const filtered = commands.filter((cmd) => cmd.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => { setActiveIndex(0); }, [query]);

  function execute(cmd: typeof commands[number]) {
    setOpen(false);
    setQuery("");
    if (cmd.href) window.open(cmd.href, "_blank", "noopener,noreferrer");
    else if (cmd.download) window.open("/resume.pdf", "_blank");
    else if (cmd.target) document.getElementById(cmd.target)?.scrollIntoView({ behavior: "smooth" });
  }

  function handlePaletteKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveIndex((i) => Math.min(i + 1, filtered.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setActiveIndex((i) => Math.max(i - 1, 0)); }
    if (e.key === "Enter" && filtered[activeIndex]) execute(filtered[activeIndex]);
  }

  return (
    <>
      <button className="palette-trigger" type="button" onClick={() => setOpen(true)} aria-label="Open command palette">
        <Command size={14} /> CTRL K
      </button>
      <AnimatePresence>
        {open && (
          <motion.div className="palette-backdrop" onClick={() => setOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
            <motion.div className="command-palette" role="dialog" aria-modal="true" aria-label="Portfolio command palette" onClick={(e) => e.stopPropagation()} initial={{ scale: 0.97, y: -8 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.97, y: -8 }} transition={{ duration: 0.15 }}>
              <div className="palette-search">
                <Search size={16} />
                <input autoFocus value={query} onKeyDown={handlePaletteKey} onChange={(e) => setQuery(e.target.value)} placeholder="Search portfolio..." />
                <button type="button" onClick={() => setOpen(false)} aria-label="Close command palette"><X size={16} /></button>
              </div>
              <div className="command-list">
                {filtered.map((cmd, index) => (
                  <button className={index === activeIndex ? "active" : ""} type="button" key={cmd.label} onClick={() => execute(cmd)}>
                    {cmd.label}<ExternalLink size={13} />
                  </button>
                ))}
                {!filtered.length && <span className="empty-state">NO COMMANDS FOUND</span>}
              </div>
              <div className="palette-hint">ESC CLOSE <span>ARROWS NAVIGATE / ENTER SELECT</span></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function GithubActivity() {
  const [repos, setRepos] = useState<{ name: string; html_url: string; updated_at: string; description?: string; language?: string }[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("https://api.github.com/users/yel-x/repos?sort=updated&per_page=100")
      .then((res) => res.ok ? res.json() : [])
      .then((data) => { if (Array.isArray(data)) setRepos(data); })
      .catch(() => setRepos([]))
      .finally(() => setLoaded(true));
  }, []);

  return (
    <section id="open-source" className="github-activity page-section" aria-label="Public GitHub activity">
      <div className="section-label"><GitBranch size={14} /> PUBLIC GITHUB ACTIVITY</div>
      <div className="github-heading">
        <h2>OPEN<br /><span>SOURCE.</span></h2>
        <p>Current public repository information loaded dynamically from GitHub. Every public project created or updated on GitHub will reflect here automatically.</p>
      </div>
      <div className="github-repos">
        {(loaded && repos.length ? repos : [
          { name: "ariel-nazareno-portfolio", html_url: "https://github.com/yel-x/ariel-nazareno-portfolio", updated_at: "", description: "Personal portfolio website", language: "TypeScript" },
          { name: "mary-grace-itsm", html_url: "https://github.com/yel-x/mary-grace-itsm", updated_at: "", description: "Ticketing system exercise", language: "TypeScript" },
          { name: "sap-masterdata-pro", html_url: "https://github.com/yel-x/sap-masterdata-pro", updated_at: "", description: "SAP master data mapping workflows", language: "Python" },
          { name: "sap-masterdata", html_url: "https://github.com/yel-x/sap-masterdata", updated_at: "", description: "Material master data tools", language: "Python" }
        ]).map((repo) => (
          <a href={repo.html_url} target="_blank" rel="noreferrer" key={repo.name}>
            <span>{repo.name}</span>
            <small>{repo.description || "Public repository"}</small>
            <small>{repo.language || "Language not specified"} {repo.updated_at ? ` / UPDATED ${new Date(repo.updated_at).toLocaleDateString()}` : " / PUBLIC REPOSITORY"}</small>
            <ExternalLink size={13} />
          </a>
        ))}
      </div>
    </section>
  );
}

export function TechnicalArchitecture() {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const layers = [
    ["SAP / ERP", "S/4HANA", "Fiori", "Master Data", "Access / Security"], 
    ["AUTOMATION", "Python", "Pandas", "Excel"], 
    ["WEB", "Next.js", "React", "TypeScript"], 
    ["DATA", "Validation", "Transformation", "Migration"]
  ];

  return (
    <section className="architecture page-section" aria-label="Technical architecture">
      <div className="section-label">10 / TECHNICAL ARCHITECTURE INSPECTION</div>
      <div className="architecture-flow">
        {layers.map((layer, index) => (
          <div key={layer[0]}>
            <div className={`architecture-layer ${activeLayer === index ? "active" : ""}`} onClick={() => setActiveLayer(activeLayer === index ? null : index)} style={{ cursor: "pointer" }}>
              <strong>{layer[0]}</strong>
              <div>{layer.slice(1).map((item) => <span key={item}>{item}</span>)}</div>
            </div>
            {index < layers.length - 1 && (
              <div className="architecture-connector" aria-hidden="true">
                <ArrowDown size={14} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export function CopyEmail() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    if (navigator.clipboard) await navigator.clipboard.writeText("nazarenoariel02@gmail.com");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <button className="copy-email" type="button" onClick={copy}>
      {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "COPIED" : "COPY"}
    </button>
  );
}