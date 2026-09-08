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
  { number: "01", category: "AUTOMATION / SAP / MASTER DATA", title: "SAP MASTER DATA MAPPER", overview: "A master data mapping application designed to support Plant and Storage Location (SLoc) assignment workflows, Base UoM mapping, and migration-related data preparation based on predefined mapping rules and master data requirements.", technologies: ["Python", "Pandas", "Excel", "Data Processing", "SAP Master Data"], status: "PUBLIC PROJECT", href: "https://github.com/yel-x/sap-masterdata-pro", liveDemo: "https://sap-masterdata.vercel.app/", visual: "mapper", caseStudy: { problem: "Master data preparation required repeatable mapping workflows for product, Plant, SLoc, Base UoM, and migration-template output.", solution: "The application organizes four focused workflows: Plant Mapper, Storage Location Mapper, Base UoM Mapper, and Migrate Mapper.", features: ["Existing vs Missing Plants per Product", "Storage Location mapping from Plant records", "Base UoM mapping against a reference table", "M, MARA, MARC, MARD and MBEW template generation"] } },
  { number: "02", category: "DASHBOARD / REPORTING / ERP SUPPORT", title: "ERP TASK MONITORING DASHBOARD", overview: "A Google Sheets-based ERP support dashboard designed to monitor ticket status, weekly workload, assignee performance, department distribution, ticket priority, active ticket aging, SLA performance, and SAP / APPTech escalation tracking.", technologies: ["Google Sheets", "Google Forms", "Spreadsheet Formulas", "Data Visualization", "Dashboard Design", "ERP Support Reporting"], status: "INTERNAL PROJECT", visual: "dashboard", caseStudy: { problem: "ERP support activities needed a centralized way to monitor ticket volume, workload, status, priorities, aging, assignee performance and SLA performance.", solution: "Designed and implemented a Google Sheets-based ERP support dashboard with filters, calculations, charts and reporting views.", features: ["Weekly ticket monitoring", "Ticket status tracking", "Department analysis", "Assignee performance", "Priority analysis", "Active ticket aging", "SLA monitoring", "SAP / APPTech escalation tracking", "Interactive filtering"] } },
  { number: "03", category: "SAP / MASTER DATA / DATA PROCESSING", title: "SAP MATERIAL MASTER DATA TOOLS", overview: "A collection of SAP Material Master Data tools designed to support controlled master-data preparation, extension, validation, and export workflows.", technologies: ["Python", "Pandas", "Excel", "SAP Data", "Data Validation", "Data Processing"], status: "CONFIDENTIAL / INTERNAL", href: "https://github.com/yel-x/sap-masterdata", liveDemo: "https://sap-masterdata-pro.vercel.app/", visual: "materials", caseStudy: { problem: "Controlled master-data preparation needs a predictable path from protected access and target scope selection to export.", solution: "The tools follow a defined workflow: Security PIN, target scope, XLSX/CSV upload, column header name, and data export.", features: ["Plant (WERKS) target scope", "Storage Loc (LGORT) target scope", "Valuation Class (BKLAS) target scope", "Unit Conversion (MARM) target scope"] } },
  { number: "04", category: "ITSM / HELPDESK / WEB APPLICATION", title: "MARY GRACE ITSM", overview: "A helpdesk and ticketing system built from scratch as a technical exercise for the Mary Grace ERP / IT Support environment. It explores ticket creation, assignment, status tracking, ticket management, and basic SLA monitoring.", technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"], status: "EXERCISE / PROTOTYPE", href: "https://github.com/yel-x/mary-grace-itsm", visual: "itsm", caseStudy: { problem: "A technical exercise needed to explore a focused helpdesk and ticket lifecycle experience.", solution: "A front-end prototype models ticket creation, assignment, status tracking, ticket management, and basic SLA monitoring.", features: ["Ticket creation", "Assignment workflow", "Status tracking", "Ticket management", "Basic SLA monitoring"] } },
];

export const experience = [
  { date: "CURRENT", role: "ERP Technical Support Specialist", company: "Mary Grace", detail: "Product, supplier, GL, and cost center master data; SAP S/4HANA Public Edition configuration; access management; data migration; and related SAP support. Participates in SAP integration with MGIOS, SIS, MOS, and POS. Tools include SAP S/4HANA Public Edition and Adobe LiveCycle for PO.", current: true },
  { date: "MAY 2025 — APR 2026", role: "SAP Security Consultant", company: "Cuatrix Consulting Services Company Limited", detail: "SAP Security support, role development, access management, user maintenance, and cross-functional collaboration across S/4HANA implementation work." },
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