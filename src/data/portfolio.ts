export const portraitWords = [
  "ERP", "SAP", "S/4HANA", "HANA", "SUPPORT", "TECHNICAL", "AUTOMATION", "DATA",
  "PYTHON", "EXCEL", "SYSTEMS", "SOLUTIONS", "FIORI", "SECURITY", "IAM", "MASTER DATA",
  "MIGRATION", "VALIDATION", "TROUBLESHOOTING", "CONFIGURATION", "ACCESS", "AUTHORIZATION",
  "ITSM", "INCIDENT", "PROCESS", "INTEGRATION", "API", "DATABASE", "ROLE MANAGEMENT",
];

export const capabilities = [
  { index: "01", title: "SAP / ERP", text: "Enterprise systems, S/4HANA support, master data, role management, and business process context." },
  { index: "02", title: "TECHNICAL SUPPORT", text: "Ticket handling, incident management, problem analysis, and clear communication across teams." },
  { index: "03", title: "AUTOMATION", text: "Python, Excel, data processing, APIs, and focused internal tools that remove repetitive work." },
  { index: "04", title: "DATA", text: "Validation, transformation, migration, UOM workflows, and structured Plant / SLoc data." },
];

export const projects = [
  { number: "01", category: "AUTOMATION", title: "SAP PLANT / SLOC AUTOMATION", overview: "A focused workflow for preparing and validating Plant and Storage Location data.", problem: "Manual preparation and validation of structured SAP data.", solution: "A tool concept for consistent Plant / SLoc generation and review.", technologies: "Python · Pandas · Excel · SAP data", result: "[ADD VERIFIED RESULT]" },
  { number: "02", category: "DATA QUALITY", title: "UOM CONVERSION VALIDATOR", overview: "A validation surface for unit-of-measure conversions and data exceptions.", problem: "Conversion issues can travel downstream when they are hard to spot early.", solution: "A clear validation workflow with actionable exceptions.", technologies: "Python · Excel · Data validation", result: "[ADD VERIFIED RESULT]" },
  { number: "03", category: "INTERNAL TOOLING", title: "ERP TASK MONITORING DASHBOARD", overview: "A compact view for tracking operational ERP tasks and their current state.", problem: "Distributed work is difficult to scan when updates live across channels.", solution: "A dashboard concept for status, ownership, and next actions.", technologies: "TypeScript · React · Data modeling", result: "[ADD VERIFIED RESULT]" },
  { number: "04", category: "MASTER DATA", title: "SAP MATERIAL MASTER DATA TOOLS", overview: "Utilities for preparing, checking, and transforming material master data.", problem: "Master data workflows need repeatable checks before they enter a system.", solution: "A set of practical tools for controlled data preparation.", technologies: "Python · Pandas · Excel", result: "[ADD VERIFIED RESULT]" },
];

export const experience = [
  { date: "CURRENT", role: "ERP Technical Support Specialist", company: "Mary Grace", detail: "[RESPONSIBILITIES] · [KEY ACHIEVEMENT] · [TOOLS / SYSTEMS]", current: true },
  { date: "MAY 2025 — [VERIFY]", role: "SAP Security Consultant", company: "Cuatrix Consulting Services Company Limited", detail: "SAP Security support, role development, access management, user maintenance, and cross-functional collaboration across S/4HANA implementation work." },
  { date: "JAN — APR 2025", role: "IT Consultant Intern", company: "Cuatrix Consulting Services Company Limited", detail: "SAP HANA database administration, database role design, access control, privilege allocation, and collaboration around system stability, security, and performance." },
  { date: "SEP 2021 — NOV 2023", role: "Service Crew", company: "Jollibee Calamba Shopping", detail: "Customer service, order processing, cash transactions, and POS systems in a fast-paced environment.", secondary: true },
];

export const skillGroups = [
  ["SAP / ERP", "SAP ERP", "SAP S/4HANA", "SAP HANA", "SAP Fiori", "ERP Support", "Master Data", "Role Management", "Access Management", "Security"],
  ["AUTOMATION", "Python", "Excel", "Pandas", "Data Processing", "APIs"],
  ["DATA", "Data Validation", "Data Transformation", "Migration", "UOM", "Plant / SLoc"],
  ["DEVELOPMENT", "TypeScript", "React", "Next.js", "HTML", "CSS", "Git", "GitHub"],
];

export const achievements = [
  "Certified in SAP — internal to Procter & Gamble; structured SAP training in the global SAP environment.",
  "SAP Access Management Specialist Certification.",
  "S/4HANA Developers Certification.",
  "ABAP Developers Certification.",
  "GeoStars Program Participant — Grab Philippines and City College of Calamba geo-mapping workshop.",
  "1st Place, Academic Quiz Bee — City College of Calamba.",
];