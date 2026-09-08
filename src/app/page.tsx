"use client";

import { ArrowUpRight, BarChart3, Braces, Database, Download, ExternalLink, FileText, Network, ShieldCheck, TerminalSquare, Wrench, X } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { TypographicPortrait } from "@/components/TypographicPortrait";
import { CommandPalette, CopyEmail, GithubActivity, ItsmPrototype, MasterDataPlayground, TaskDashboardDemo, TechnicalArchitecture, TerminalConsoleModal } from "@/components/InteractiveFeatures";
import { achievements, capabilities, experience, projects, skillGroups } from "@/data/portfolio";

// Strictly Typed Variants para sa Framer Motion
const reveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: [0.16, 1, 0.3, 1] 
    } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 }
  }
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.96, y: 10, transition: { duration: 0.18, ease: "easeIn" } }
};

const icons = [<ShieldCheck key="a" />, <Wrench key="b" />, <Braces key="c" />, <Database key="d" />];

export default function Home() {
  const [activeCaseStudy, setActiveCaseStudy] = useState<(typeof projects)[number] | null>(null);
  const [booting, setBooting] = useState(true);
  const [bootProgress, setBootProgress] = useState(0);
  const [showTerminal, setShowTerminal] = useState(false);

  // Fast 500ms System Boot Sequence
  useEffect(() => {
    const timer = setInterval(() => {
      setBootProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setBooting(false), 100);
          return 100;
        }
        return prev + 25;
      });
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const projectVisuals = {
    mapper: (
      <div className="project-visual mapper-visual" role="img" aria-label="Plant Mapper, SLoc Mapper, Base UoM Mapper, and Migrate Mapper workflow">
        <div className="mapper-flow">
          <span>PLANT MAPPER</span>
          <i>↓</i>
          <span>SLOC MAPPER</span>
          <i>↓</i>
          <span>BASE UOM MAPPER</span>
          <i>↓</i>
          <span>MIGRATE MAPPER</span>
        </div>
        <small className="visual-stamp">PLANT / SLOC / UOM / MIGRATION</small>
      </div>
    ),
    dashboard: (
      <div className="project-visual dashboard-visual">
        <Image src="/dashboard.png" alt="ERP Task Monitoring Dashboard preview showing ticket status, workload, departments, priorities, and SLA reporting" width={1904} height={880} style={{ width: "100%", height: "auto", display: "block" }} />
      </div>
    ),
    materials: (
      <div className="project-visual materials-visual" role="img" aria-label="SAP Material Master Data Tools security, scope, upload, preparation, and export workflow">
        <div className="process-node">SECURITY PIN</div>
        <div className="process-flow">
          <span>TARGET SCOPE</span>
          <i />
          <span>UPLOAD</span>
          <i />
          <span>MAP / PREPARE</span>
          <i />
          <span>EXPORT</span>
        </div>
        <small className="visual-stamp">PLANT / SLOC / VALUATION / UOM</small>
      </div>
    ),
    itsm: (
      <div className="project-visual itsm-visual" role="img" aria-label="Mary Grace ITSM project visualization">
        <div className="ticket-shell">
          <small>TICKET LIFECYCLE / 001</small>
          <div className="ticket-flow">
            <span>NEW</span>
            <i />
            <span>ASSIGNED</span>
            <i />
            <span>IN PROGRESS</span>
            <i />
            <span>RESOLVED</span>
          </div>
          <div className="ticket-meta">
            <b>SLA</b>
            <b>PRIORITY</b>
            <b>ASSIGNEE</b>
            <b>STATUS</b>
          </div>
        </div>
      </div>
    ),
  };

  if (booting) {
    return (
      <div className="boot-screen">
        <div className="boot-log">
          <div>INITIALIZING ARIEL.OS [SYSTEM_PROFILE]...</div>
          <div>SAP S/4HANA PUBLIC EDITION .......... ONLINE</div>
          <div>MASTER DATA AUTOMATION PIPELINE .... READY</div>
          <div className="boot-bar">
            <div className="boot-progress" style={{ width: `${bootProgress}%` }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <main id="top">
      <Navigation onOpenTerminal={() => setShowTerminal(true)} />
      <CommandPalette />

      <AnimatePresence>
        {showTerminal && <TerminalConsoleModal onClose={() => setShowTerminal(false)} />}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="hero page-section">
        <motion.div className="hero-copy" initial="hidden" animate="show" variants={staggerContainer}>
          <motion.div variants={reveal} className="eyebrow">
            <span className="marker" /> 01 / PROFESSIONAL PROFILE
          </motion.div>
          <motion.p variants={reveal} className="hero-name">ARIEL NAZARENO</motion.p>
          <motion.h1 variants={reveal}>
            ERP<br />
            <em>TECHNICAL</em><br />
            SUPPORT<br />
            <span>SPECIALIST</span>
          </motion.h1>
          <motion.p variants={reveal} className="hero-lede">
            I solve ERP problems, automate processes, and build practical technology solutions.
          </motion.p>
          <motion.div variants={reveal} className="hero-actions">
            <a className="button button-primary" href="#work">
              VIEW MY WORK <ArrowUpRight size={16} />
            </a>
            <a className="button button-ghost" href="/resume.pdf" download>
              DOWNLOAD RESUME <Download size={16} />
            </a>
          </motion.div>
          <motion.div variants={reveal} className="hero-meta">
            <span>SAP</span>
            <span>ERP</span>
            <span>AUTOMATION</span>
            <span>DATA</span>
          </motion.div>
        </motion.div>
        <div className="hero-art">
          <TypographicPortrait />
          <div className="portrait-caption">
            <span>THE TECHNOLOGY<br />BEHIND THE WORK</span>
            <span>LOCAL / 001</span>
          </div>
        </div>
      </section>

      {/* Signal Strip */}
      <section className="signal-strip">
        <div><span className="live-dot" /> SYSTEM / PROFILE</div>
        <div>SAP S/4HANA <b>ACTIVE</b></div>
        <div>ERP SUPPORT <b>ACTIVE</b></div>
        <div>AUTOMATION <b>ACTIVE</b></div>
        <div>DATA PIPELINE <b>READY</b></div>
      </section>

      {/* About Section */}
      <motion.section id="about" className="intro page-section" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={reveal}>
        <div className="section-label">02 / ABOUT</div>
        <div className="intro-content">
          <h2>SYSTEMS.<br />PROBLEMS.<br /><span>SOLUTIONS.</span></h2>
          <div>
            <p className="large-copy">An ERP / SAP Technical Support Specialist focused on enterprise systems, technical support, automation, data, and practical solutions for business problems.</p>
            <p className="muted">Where enterprise systems meet practical solutions. This portfolio is an evolving record of the tools, experiences, and thinking behind the work.</p>
          </div>
        </div>
      </motion.section>

      {/* Capabilities Section */}
      <section className="capabilities page-section">
        <div className="section-label">03 / WHAT I DO</div>
        <motion.div className="capability-grid" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
          {capabilities.map((item, index) => (
            <motion.article key={item.index} variants={reveal}>
              <div className="capability-top">
                <span>{item.index}</span>
                {icons[index]}
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* Work / Selected Work Section */}
      <section id="work" className="work page-section">
        <div className="section-heading">
          <div className="section-label"><Network size={14} /> 04 / SELECTED WORK</div>
          <h2>CASE STUDIES<br /><span>IN PROGRESS.</span></h2>
          <p>Practical systems work, represented with sanitized examples and verified outcomes only.</p>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <article className="project" key={project.number}>
              <div className="project-index">{project.number}</div>
              <div className="project-main">
                <div className="project-visual-frame">{projectVisuals[project.visual as keyof typeof projectVisuals]}</div>
                <div className="project-category">{project.category}</div>
                <div className="project-title-row">
                  <h3>{project.title}</h3>
                  <span className="project-status">{project.status}</span>
                </div>
                <p className="project-overview">{project.overview}</p>
                <div className="project-tech">
                  {project.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>

                {project.visual === "mapper" && <div id="mapper-demo"><MasterDataPlayground /></div>}
                {project.visual === "dashboard" && <div id="dashboard-demo"><TaskDashboardDemo /></div>}
                {project.visual === "materials" && <div id="materials-demo" />}
                {project.visual === "itsm" && <div id="itsm-demo"><ItsmPrototype /></div>}

                <div className="project-footer">
                  <span className="project-action">
                    <button className="text-link case-study-button" onClick={() => setActiveCaseStudy(project)}>
                      View Case Study <BarChart3 size={14} />
                    </button>
                    {project.href && (
                      <a className="text-link" href={project.href} target="_blank" rel="noopener noreferrer">
                        View on GitHub <ExternalLink size={14} />
                      </a>
                    )}
                    {project.liveDemo && (
                      <a className="text-link" href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                        View Live Demo <ExternalLink size={14} />
                      </a>
                    )}
                  </span>
                  <span className="project-kind">{project.href ? "PUBLIC REPOSITORY" : "SANITIZED PREVIEW"}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Case Study Modal with AnimatePresence */}
      <AnimatePresence>
        {activeCaseStudy?.caseStudy && (
          <motion.div className="case-study-backdrop" role="presentation" onClick={() => setActiveCaseStudy(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.article className="case-study-modal" role="dialog" aria-modal="true" aria-labelledby="case-study-title" onClick={(event) => event.stopPropagation()} variants={modalVariants} initial="hidden" animate="show" exit="exit">
              <button className="case-study-close" onClick={() => setActiveCaseStudy(null)} aria-label="Close case study">
                <X size={18} />
              </button>
              <div className="section-label">{activeCaseStudy.status}</div>
              <h2 id="case-study-title">{activeCaseStudy.title}</h2>
              <div className="case-study-preview">{projectVisuals[activeCaseStudy.visual as keyof typeof projectVisuals]}</div>
              <div className="case-study-copy">
                <div><b>OVERVIEW</b><p>{activeCaseStudy.overview}</p></div>
                <div><b>PROBLEM</b><p>{activeCaseStudy.caseStudy.problem}</p></div>
                <div><b>SOLUTION</b><p>{activeCaseStudy.caseStudy.solution}</p></div>
                <div>
                  <b>WORKFLOW / KEY FEATURES</b>
                  <ul>
                    {activeCaseStudy.caseStudy.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="case-study-links">
                  {activeCaseStudy.liveDemo && (
                    <a className="text-link" href={activeCaseStudy.liveDemo} target="_blank" rel="noopener noreferrer">
                      View Live Demo <ExternalLink size={14} />
                    </a>
                  )}
                  {activeCaseStudy.href && (
                    <a className="text-link" href={activeCaseStudy.href} target="_blank" rel="noopener noreferrer">
                      View on GitHub <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Experience Section */}
      <section id="experience" className="experience page-section">
        <div className="section-label">05 / EXPERIENCE</div>
        <div className="timeline-heading">
          <h2>THE WORK<br /><span>SO FAR.</span></h2>
          <p>Experience presented with the information currently verified. Mary Grace is the current role.</p>
        </div>
        <motion.div className="timeline" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={staggerContainer}>
          {experience.map((item) => (
            <motion.article className={`timeline-item ${item.current ? "current" : ""} ${item.secondary ? "secondary" : ""}`} key={`${item.role}-${item.company}`} variants={reveal}>
              <div className="timeline-date">{item.date}</div>
              <div className="timeline-line"><span /></div>
              <div>
                <div className="timeline-role">{item.role}</div>
                <div className="timeline-company">{item.company}</div>
                <p>{item.detail}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills page-section">
        <div className="section-label">06 / SKILLS</div>
        <motion.div className="skills-grid" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
          {skillGroups.map(([title, ...skills]) => (
            <motion.div className="skill-group" key={title} variants={reveal}>
              <h3>{title}</h3>
              <div>
                {skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Achievements Section */}
      <section className="achievements page-section">
        <div className="section-label">07 / ACHIEVEMENTS</div>
        <div className="achievement-layout">
          <h2>PROOF OF<br /><span>PROGRESS.</span></h2>
          <motion.div className="achievement-list" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
            {achievements.map((achievement, index) => (
              <motion.div key={achievement} variants={reveal}>
                <span>0{index + 1}</span>
                <p>{achievement}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="resume page-section">
        <div className="resume-panel">
          <div className="section-label">08 / RESUME</div>
          <FileText size={28} strokeWidth={1.2} />
          <h2>THE FULL<br /><span>PICTURE.</span></h2>
          <p>A concise record of experience, education, competencies, and certifications.</p>
          <div className="resume-actions">
            <a className="button button-primary" href="/resume.pdf" target="_blank">
              VIEW FULL RESUME <ExternalLink size={16} />
            </a>
            <a className="button button-ghost" href="/resume.pdf" download>
              DOWNLOAD PDF <Download size={16} />
            </a>
          </div>
        </div>
      </section>

      <TechnicalArchitecture />

      {/* Contact Section */}
      <section id="contact" className="contact page-section">
        <div className="section-label">09 / CONTACT</div>
        <div className="contact-content">
          <h2>LET&apos;S SOLVE<br /><span>A PROBLEM.</span></h2>
          <p>For opportunities, collaboration, or a conversation about enterprise technology.</p>
          <div className="email-row">
            <a className="contact-email" href="mailto:nazarenoariel02@gmail.com">
              nazarenoariel02@gmail.com <ArrowUpRight size={20} />
            </a>
            <CopyEmail />
          </div>
          <div className="contact-links">
            <a href="https://www.linkedin.com/in/ariel-nazareno/" target="_blank" rel="noreferrer">
              LINKEDIN <ArrowUpRight size={15} />
            </a>
            <a href="https://github.com/yel-x" target="_blank" rel="noreferrer">
              GITHUB <ExternalLink size={15} />
            </a>
          </div>
        </div>
      </section>

      <GithubActivity />

      <footer className="footer">
        <div>
          <strong>ARIEL NAZARENO</strong>
          <span>ERP / SAP TECHNICAL SUPPORT SPECIALIST</span>
        </div>
        <div className="footer-tags">SAP · ERP · AUTOMATION · DATA</div>
        <div className="footer-bottom">
          <span>BUILT FROM SYSTEMS.</span>
          <span><TerminalSquare size={14} /> SYSTEM READY_</span>
        </div>
      </footer>
    </main>
  );
}