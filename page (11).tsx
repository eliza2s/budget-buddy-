"use client";

import { useState } from "react";

const projects = [
  {
    title: "Research Portal",
    tagline: "One place for all your academic work.",
    year: "2024",
    role: "Full-Stack Dev",
    description: "A collaborative platform for organizing and sharing academic research papers across departments.",
    tags: ["NEXT.JS", "TYPESCRIPT", "SUPABASE", "UI DESIGN"],
  },
  {
    title: "StudySync",
    tagline: "Study together, anywhere.",
    year: "2024",
    role: "Frontend Dev",
    description: "A real-time study group app with shared notes, Pomodoro timers, and accountability features.",
    tags: ["REACT", "FIREBASE", "TAILWIND"],
  },
  {
    title: "CampusMap",
    tagline: "Find your way around campus.",
    year: "2023",
    role: "Mobile Dev",
    description: "An interactive campus navigation app with live event overlays and accessibility routing.",
    tags: ["REACT NATIVE", "MAPKIT", "NODE.JS"],
  },
  {
    title: "Budget Buddy",
    tagline: "Spend smarter as a student.",
    year: "2023",
    role: "Solo Developer",
    description: "A student expense tracker with smart categorization and monthly spending insights.",
    tags: ["VUE", "CHART.JS", "EXPRESS"],
  },
  {
    title: "Lecturely",
    tagline: "Never miss a detail from lecture.",
    year: "2022",
    role: "AI / Backend",
    description: "Auto-generates structured notes from lecture recordings using AI transcription and summarization.",
    tags: ["PYTHON", "OPENAI API", "WHISPER"],
  },
];

const techStack = [
  {
    category: "Languages",
    items: [
      { name: "TypeScript", type: "Language", icon: "TS" },
      { name: "JavaScript", type: "Language", icon: "JS" },
      { name: "Python", type: "Language", icon: "Py" },
      { name: "HTML & CSS", type: "Markup / Style", icon: "</>" },
    ],
  },
  {
    category: "Frameworks & Libraries",
    items: [
      { name: "React", type: "UI Library", icon: "⚛" },
      { name: "Next.js", type: "Framework", icon: "▲" },
      { name: "Tailwind CSS", type: "Styling", icon: "~" },
      { name: "Node.js", type: "Runtime", icon: "⬡" },
      { name: "Express", type: "Backend", icon: "Ex" },
      { name: "Vue", type: "UI Framework", icon: "V" },
    ],
  },
  {
    category: "Tools & Platforms",
    items: [
      { name: "Figma", type: "Design", icon: "◈" },
      { name: "Git & GitHub", type: "Version Control", icon: "⑂" },
      { name: "Supabase", type: "Database", icon: "⚡" },
      { name: "Firebase", type: "Backend", icon: "🔥" },
      { name: "Vercel", type: "Deployment", icon: "▲" },
      { name: "VS Code", type: "Editor", icon: "{ }" },
    ],
  },
];

function slowScrollTo(id: string) {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    const navH = 57;
    const start = window.scrollY;
    const end = target.getBoundingClientRect().top + window.scrollY - navH;
    const distance = end - start;
    const duration = 1600;
    let startTime: number | null = null;
    const ease = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      window.scrollTo(0, start + distance * ease(p));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
}

export default function Home() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", background: "#fff", color: "#111" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,300&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .nav-link {
          font-size: 0.875rem; color: #555; text-decoration: none; transition: color 0.15s;
        }
        .nav-link:hover { color: #111; }

        .hero-title {
          font-size: clamp(3.2rem, 7.5vw, 6rem);
          font-weight: 700; line-height: 1.04; letter-spacing: -0.035em; color: #111;
        }

        .section-eyebrow {
          font-size: 0.68rem; letter-spacing: 0.15em;
          text-transform: uppercase; color: #aaa; font-weight: 500;
          margin-bottom: 0.85rem; display: block;
        }

        .section-heading {
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          font-weight: 700; letter-spacing: -0.03em; line-height: 1.08; color: #111;
        }

        .body-text { font-size: 0.9rem; line-height: 1.8; color: #555; }

        .proj-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1rem 0; border-bottom: 1px solid #e8e8e8;
          cursor: pointer; background: none;
          border-left: none; border-right: none; border-top: none;
          width: 100%; text-align: left; transition: opacity 0.18s;
        }
        .proj-row:first-of-type { border-top: 1px solid #e8e8e8; }
        .proj-row.dimmed { opacity: 0.25; }
        .proj-row-title { font-size: 0.95rem; font-weight: 400; letter-spacing: -0.01em; color: #111; pointer-events: none; }
        .proj-arrow {
          font-size: 1rem; color: #111; opacity: 0;
          transform: translateX(-5px); transition: opacity 0.18s, transform 0.18s; pointer-events: none;
        }
        .proj-row:hover .proj-arrow { opacity: 1; transform: translateX(0); }

        .content-grid {
          max-width: 1200px; margin: 0 auto;
          padding: 2.75rem 2.5rem 0;
          display: grid; grid-template-columns: 220px 1fr; gap: 3rem;
          border-top: 1px solid #f0f0f0;
        }

        .col-label {
          font-size: 0.72rem; letter-spacing: 0.12em;
          text-transform: uppercase; color: #bbb; font-weight: 500;
          padding-top: 0.2rem;
        }

        .tech-card {
          display: flex; flex-direction: column; gap: 0.45rem;
          padding: 1.1rem 1.25rem; border-radius: 10px;
          border: 1px solid #efefef; background: #fafafa;
          transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
          cursor: default;
        }
        .tech-card:hover {
          border-color: #d8d8d8;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.04);
        }
        .tech-icon {
          font-size: 0.75rem; font-weight: 700; letter-spacing: 0.05em;
          color: #999; font-family: monospace;
        }
        .tech-name { font-size: 0.82rem; font-weight: 500; color: #222; }
        .tech-type { font-size: 0.67rem; color: #bbb; letter-spacing: 0.03em; }

        .availability-dot {
          width: 7px; height: 7px; background: #22c55e;
          border-radius: 50%; display: inline-block; animation: blink 2s infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.35} }

        @media (max-width: 768px) {
          .hero-two-col { flex-direction: column !important; gap: 3rem !important; }
          .right-col { width: 100% !important; }
          .content-grid { grid-template-columns: 1fr !important; gap: 1rem !important; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1.35rem 2.5rem", borderBottom: "1px solid #f0f0f0",
        position: "sticky", top: 0, background: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(8px)", zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div style={{
            width: 28, height: 28, borderRadius: "50%",
            background: "linear-gradient(135deg, #d4b8f0, #b8d4f0)",
            fontSize: "0.62rem", display: "flex", alignItems: "center",
            justifyContent: "center", fontWeight: 700, color: "#6b21a8",
          }}>ES</div>
          <span style={{ fontSize: "0.95rem", fontWeight: 500, letterSpacing: "-0.02em" }}>eliza.</span>
        </div>
        <div style={{ display: "flex", gap: "2rem" }}>
          <a href="#about" className="nav-link" onClick={slowScrollTo("about")}>About</a>
          <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" className="nav-link">Works</a>
          <a href="#contact" className="nav-link" onClick={slowScrollTo("contact")}>Contact</a>
        </div>
      </nav>

      {/* ── HERO (full screen) ── */}
      <div style={{
        minHeight: "calc(100vh - 57px)",
        display: "flex", alignItems: "center",
        borderBottom: "1px solid #f0f0f0",
      }}>
        <div style={{ maxWidth: "1200px", width: "100%", margin: "0 auto", padding: "0 2.5rem" }}>
          <div className="hero-two-col" style={{ display: "flex", alignItems: "center", gap: "4rem" }}>

            {/* Left */}
            <div style={{ flex: 1 }}>
              <h1 className="hero-title">I&apos;m Eliza<br />Sharma.</h1>
              <p style={{ marginTop: "2rem", fontSize: "1rem", lineHeight: 1.7, color: "#555", maxWidth: "400px", fontWeight: 300 }}>
                I build thoughtful digital products and love turning ideas into
                clean, functional experiences.{" "}
                <span style={{ color: "#111", fontWeight: 400 }}>Available for internships &amp; roles.</span>
              </p>
              <div style={{ marginTop: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.78rem", color: "#777" }}>
                <span className="availability-dot" />
                Open to opportunities
              </div>
            </div>

            {/* Right — project list */}
            <div className="right-col" style={{ width: "360px", flexShrink: 0 }}>
              <p style={{ fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa", fontWeight: 500, marginBottom: "1.1rem" }}>
                Selected Projects
              </p>
              {projects.map((p, i) => (
                <button
                  key={i}
                  className={["proj-row", hoveredIndex !== null && hoveredIndex !== i ? "dimmed" : ""].join(" ")}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={slowScrollTo("works")}
                >
                  <span className="proj-row-title">{p.title}</span>
                  <span className="proj-arrow">→</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── ABOUT (≈75vh) ── */}
      <section id="about" style={{ minHeight: "75vh", paddingBottom: "5rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>

        {/* Big heading */}
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 2.5rem 3rem", width: "100%" }}>
          <span className="section-eyebrow">About Me</span>
          <h2 className="section-heading">
            Student. Builder.<br />
            <span style={{ color: "#ccc", fontWeight: 300 }}>Always learning.</span>
          </h2>
        </div>

        {/* Bio */}
        <div className="content-grid">
          <span className="col-label">Who I am</span>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <p className="body-text">
              I&apos;m Eliza Sharma — a computer science student with a deep interest in frontend
              development and product design. I care about the small details: the spacing, the
              transitions, the moments that make an interface feel genuinely alive.
            </p>
            <p className="body-text">
              I started coding in high school and haven&apos;t stopped since. Over the years I&apos;ve
              moved from tinkering with HTML pages to building full-stack applications used by real people.
              Every project teaches me something new about how people interact with software — and how
              much a little thoughtfulness can change the experience.
            </p>
            <p className="body-text">
              Outside of code, I enjoy reading about design systems, exploring open source tools,
              and occasionally sketching out product ideas that may or may not ever ship.
            </p>
          </div>
        </div>

        {/* Education */}
        <div className="content-grid" style={{ marginTop: "2.75rem" }}>
          <span className="col-label">Education</span>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {[
              {
                degree: "B.Tech in Computer Science",
                school: "Your University Name",
                period: "2022 – Present",
                detail: "Relevant coursework: Data Structures, Web Development, Human–Computer Interaction, Machine Learning, Database Systems.",
              },
              {
                degree: "Higher Secondary (Science)",
                school: "Your School Name",
                period: "Graduated 2022",
                detail: "Focused on Mathematics, Physics, and Computer Science.",
              },
            ].map((ed, i) => (
              <div key={i} style={{
                display: "flex", flexDirection: "column", gap: "0.3rem",
                paddingBottom: i === 0 ? "1.5rem" : "0",
                borderBottom: i === 0 ? "1px solid #f5f5f5" : "none",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1rem" }}>
                  <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "#111" }}>{ed.degree}</span>
                  <span style={{ fontSize: "0.72rem", color: "#bbb", whiteSpace: "nowrap" }}>{ed.period}</span>
                </div>
                <span style={{ fontSize: "0.78rem", color: "#999" }}>{ed.school}</span>
                <p style={{ fontSize: "0.82rem", lineHeight: 1.7, color: "#bbb", marginTop: "0.2rem" }}>{ed.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section id="stack" style={{ borderTop: "2px solid #f0f0f0", paddingBottom: "6rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 2.5rem 0" }}>
          <span className="section-eyebrow">Tech Stack</span>

          {techStack.map((group) => (
            <div key={group.category} style={{ marginBottom: "2.5rem" }}>
              <p style={{
                fontSize: "0.68rem", color: "#bbb", letterSpacing: "0.12em",
                textTransform: "uppercase", fontWeight: 500, marginBottom: "0.85rem",
              }}>
                {group.category}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {group.items.map((item) => (
                  <span key={item.name} style={{
                    fontSize: "0.82rem", fontWeight: 400, color: "#333",
                    padding: "0.4rem 1rem", borderRadius: "999px",
                    border: "1px solid #e8e8e8", background: "#fff",
                    letterSpacing: "0.01em",
                    transition: "border-color 0.15s, color 0.15s",
                  }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "#bbb";
                      (e.currentTarget as HTMLElement).style.color = "#000";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "#e8e8e8";
                      (e.currentTarget as HTMLElement).style.color = "#333";
                    }}
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WORKS (anchor for project list clicks) ── */}
      <div id="works" />

      {/* ── CONTACT ── */}
      <section id="contact" style={{ borderTop: "2px solid #f0f0f0", paddingBottom: "6rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 2.5rem 0" }}>
          <span className="section-eyebrow">Contact</span>
          <h2 className="section-heading" style={{ marginBottom: "2.5rem" }}>
            Let&apos;s work together.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "3rem", borderTop: "1px solid #f0f0f0", paddingTop: "2.5rem" }}>
            <span className="col-label">Get in touch</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              <p className="body-text" style={{ maxWidth: "400px" }}>
                Always happy to chat about projects, internships, collaborations, or just a good idea.
                My inbox is open.
              </p>
              <a
                href="mailto:eliza@example.com"
                style={{
                  width: "fit-content", fontSize: "1rem", fontWeight: 500, color: "#111",
                  textDecoration: "none", borderBottom: "1px solid #ccc",
                  paddingBottom: "2px", transition: "border-color 0.2s", marginTop: "0.25rem",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#111")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#ccc")}
              >
                eliza@example.com
              </a>
              <div style={{ display: "flex", gap: "1.5rem", marginTop: "0.5rem" }}>
                {[
                  { label: "LinkedIn", href: "#" },
                  { label: "GitHub", href: "https://github.com/your-username" },
                  { label: "Resume", href: "#" },
                ].map((l) => (
                  <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" style={{
                    fontSize: "0.78rem", color: "#aaa", textDecoration: "none", transition: "color 0.15s",
                  }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#111")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#aaa")}
                  >{l.label} ↗</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
