/* global React */
const { useState, useEffect, useRef } = React;

// ============================================================
// Typing effect
// ============================================================
function Typer({ words, speed = 75, hold = 1400 }) {
  const [text, setText] = useState("");
  const [wi, setWi] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const target = words[wi % words.length];
    let t;
    if (!del && text === target) {
      t = setTimeout(() => setDel(true), hold);
    } else if (del && text === "") {
      setDel(false);
      setWi(wi + 1);
    } else {
      t = setTimeout(() => {
        setText(del ? target.slice(0, text.length - 1) : target.slice(0, text.length + 1));
      }, del ? speed * 0.6 : speed);
    }
    return () => clearTimeout(t);
  }, [text, del, wi, words, speed, hold]);

  return <span className="typer">{text}</span>;
}

// ============================================================
// Animated counter
// ============================================================
function Counter({ to, suffix = "", duration = 1400 }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(to * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration]);

  return <span ref={ref}>{n}{suffix && <span className="unit">{suffix}</span>}</span>;
}

// ============================================================
// HEADER
// ============================================================
function Header() {
  return (
    <header className="site-header">
      <div className="container inner">
        <a href="#top" className="brand">
          <img src="assets/lios-logo.png" alt="Lios" />
        </a>
        <nav className="nav">
          <a href="#services"><span className="lt-wrap">Services</span></a>
          <a href="#approach"><span className="lt-wrap">Approach</span></a>
          <a href="#tech"><span className="lt-wrap">Tech</span></a>
          <a href="#founder"><span className="lt-wrap">About</span></a>
          <a href="#blog"><span className="lt-wrap">Blog</span></a>
          <a href="#contact" className="nav-cta">Get in touch</a>
        </nav>
      </div>
    </header>
  );
}

// ============================================================
// HERO
// ============================================================
function Hero() {
  const words = [
    "Lightning Web Components.",
    "Salesforce integrations.",
    "reusable UI systems.",
    "modern web tooling.",
  ];
  return (
    <section className="hero" id="top" data-screen-label="01 Hero">
      <div className="grid-bg"></div>
      <div className="container">
        <div className="badge">
          <span className="live"></span>
          <span>Available — Q3 2026 onwards</span>
        </div>
        <h1>
          Build better Salesforce<br />
          experiences with <span className="accent">care</span>.
        </h1>
        <p className="sub">
          Lios is a founder-led studio building modern Salesforce solutions in collaboration with trusted designers, developers, and consultants — Lightning Web Components, integrations, and reusable UI systems engineered to last.
        </p>
        <p className="sub" style={{marginTop: "-0.5rem"}}>
          Currently shipping <Typer words={words} />
        </p>
        <div className="cta-row">
          <a href="#contact" className="btn btn-primary">
            Start a conversation
            <span className="arrow">→</span>
          </a>
          <a href="#services" className="btn btn-ghost">
            See what we do
          </a>
        </div>

        <div className="hero-stats" style={{width: "100%", marginTop: "clamp(3.5rem, 7vw, 5.5rem)"}}>
          <div className="cell">
            <div className="num"><Counter to={8} suffix="yrs" /></div>
            <div className="label">// salesforce experience</div>
          </div>
          <div className="cell">
            <div className="num"><Counter to={5} suffix="certs" /></div>
            <div className="label">// salesforce certified</div>
          </div>
          <div className="cell">
            <div className="num"><Counter to={40} suffix="+" /></div>
            <div className="label">// lwc components shipped</div>
          </div>
          <div className="cell">
            <div className="num"><Counter to={100} suffix="%" /></div>
            <div className="label">// remote · international</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SERVICES
// ============================================================
const SERVICES = [
  {
    num: "01",
    title: "Salesforce Development",
    summary: "Custom Salesforce solutions built for maintainability and scale — Apex, Flow, and platform features designed to evolve with your business.",
    bullets: ["Apex & triggers", "Sales / Service Cloud", "Permission architecture", "Test coverage that earns its keep"],
    glyph: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M3 12l9 4 9-4"/><path d="M3 17l9 4 9-4"/>
      </svg>
    ),
  },
  {
    num: "02",
    title: "Lightning Web Components",
    summary: "Reusable, modern UI components for internal platforms and customer-facing experiences — design-system first, accessibility built-in.",
    bullets: ["Reusable LWC libraries", "Composable patterns", "Design tokens & theming", "Storybook-style demos"],
    glyph: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    num: "03",
    title: "Frontend Engineering",
    summary: "Clean frontend architecture with TypeScript, Astro, and component-driven systems. Sites and apps that load fast and stay readable.",
    bullets: ["TypeScript + Astro", "Component-first systems", "Performance budgets", "Type-safe content layers"],
    glyph: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
  {
    num: "04",
    title: "Integrations & Automation",
    summary: "Connect Salesforce to the rest of your stack. REST integrations, workflow automation, and process design that holds up in production.",
    bullets: ["REST & event-driven APIs", "Flow automation", "GitHub Actions pipelines", "B2C Commerce / Demandware"],
    glyph: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/>
      </svg>
    ),
  },
];

function Services() {
  return (
    <section id="services" data-screen-label="02 Services">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow"><span className="num">[ 01 ]</span> services</span>
          <h2>What we build, and how.</h2>
          <p className="lede">
            Four practice areas, treated as one craft. Hover any card for the working detail.
          </p>
        </div>

        <div className="services-grid reveal-stagger from-sides">
          {SERVICES.map((s) => (
            <article className="svc" key={s.num} tabIndex={0}>
              <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <span className="num">/ {s.num}</span>
                <span className="glyph">{s.glyph}</span>
              </div>
              <div>
                <h3>{s.title}</h3>
                <p className="summary" style={{marginTop: "0.6rem"}}>{s.summary}</p>
                <div className="details">
                  <div>
                    <ul>
                      {s.bullets.map((b) => <li key={b}>{b}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// APPROACH
// ============================================================
const APPROACH = [
  {
    marker: "// principle 01",
    title: "Practical engineering",
    body: "We optimise for software that is reliable, maintainable, and straightforward to evolve. Clever code costs more than it saves; clear code keeps shipping.",
  },
  {
    marker: "// principle 02",
    title: "Reusable systems",
    body: "Shared components, consistent patterns, and small surface areas. Build once, use many times, and reduce the cost of every next feature.",
  },
  {
    marker: "// principle 03",
    title: "Modern tooling",
    body: "Version control, automated deployments, reproducible builds, and a frontend stack worth keeping. Tooling should support the work, not perform it.",
  },
];

function Approach() {
  return (
    <section id="approach" className="approach" data-screen-label="03 Approach">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow"><span className="num">[ 02 ]</span> approach</span>
          <h2>Quiet engineering, built to last.</h2>
          <p className="lede">
            Three principles that shape every project — from a single LWC up to a multi-cloud rollout.
          </p>
        </div>

        <div className="approach-grid reveal-stagger">
          {APPROACH.map((p) => (
            <div className="approach-item" key={p.title}>
              <span className="marker">{p.marker}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TECHNOLOGIES (tabs)
// ============================================================
const TECH = {
  all: [],
  salesforce: [
    { name: "Salesforce Platform", level: "core" },
    { name: "LWC", level: "core" },
    { name: "Apex", level: "core" },
    { name: "Sales Cloud", level: "production" },
    { name: "Service Cloud", level: "production" },
    { name: "B2C Commerce", level: "production" },
    { name: "Agentforce", level: "certified" },
    { name: "Visualforce", level: "certified" },
  ],
  frontend: [
    { name: "TypeScript", level: "core" },
    { name: "JavaScript", level: "core" },
    { name: "Astro", level: "production" },
    { name: "React", level: "production" },
    { name: "Tailwind CSS", level: "production" },
  ],
  backend: [
    { name: "Node.js", level: "production" },
    { name: "REST APIs", level: "core" },
    { name: "GraphQL", level: "production" },
  ],
  tooling: [
    { name: "CI/CD", level: "core" },
    { name: "Vitest / Jest", level: "production" },
  ],
};
TECH.all = [...TECH.salesforce, ...TECH.frontend, ...TECH.backend, ...TECH.tooling];

function Technologies() {
  const [tab, setTab] = useState("all");
  const items = TECH[tab];

  return (
    <section id="tech" data-screen-label="04 Technologies">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow"><span className="num">[ 03 ]</span> technologies</span>
          <h2>The stack we reach for.</h2>
          <p className="lede">
            Tools used day to day — chosen for fit, longevity, and the team that has to maintain them after us.
          </p>
        </div>

        <div className="tech-tabs">
          {[
            ["all", "All"],
            ["salesforce", "Salesforce"],
            ["frontend", "Frontend"],
            ["backend", "Backend & APIs"],
            ["tooling", "Tooling"],
          ].map(([k, label]) => (
            <button
              key={k}
              className={`tech-tab ${tab === k ? "active" : ""}`}
              onClick={() => setTab(k)}
            >
              {label.toLowerCase()} <span style={{opacity: 0.6}}>({TECH[k].length})</span>
            </button>
          ))}
        </div>

        <div className="tech-list" key={tab}>
          {items.map((t, i) => (
            <div className="tech-item" key={t.name} style={{animationDelay: `${i * 30}ms`}}>
              <span className="name">{t.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FOUNDER
// ============================================================
const CERTS = [
  { code: "JS", name: "Salesforce Certified JavaScript Developer", year: "2024" },
  { code: "PD1", name: "Salesforce Certified Platform Developer I", year: "2021" },
  { code: "PD2", name: "Salesforce Certified Platform Developer II", year: "2022" },
  { code: "B2C", name: "Salesforce Certified B2C Commerce Developer", year: "2023" },
  { code: "AGF", name: "Salesforce Certified Agentforce Specialist", year: "2025" },
];

function Founder() {
  return (
    <section id="founder" data-screen-label="05 Founder">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow"><span className="num">[ 04 ]</span> founder</span>
          <h2>Founder-led, built with a trusted network.</h2>
          <p className="lede">
            Lios is led by Lili Stoyanova and works in close collaboration with a small network of independent designers, developers, and Salesforce consultants — brought in by project, never by org chart.
          </p>
        </div>

        <div className="founder reveal-stagger">
          <div className="founder-card">
            <div>
              <div className="name">Lili Stoyanova</div>
              <div className="role">// Senior Salesforce Developer · Founder</div>
            </div>
            <p className="bio">
              Eight years building maintainable business applications, integrations, and UI systems across remote international teams.
              Lili leads the engineering and partners with a small, recurring network of collaborators — designers, fellow developers, and Salesforce specialists — to staff each project to fit.
            </p>
            <div style={{display: "flex", gap: "0.5rem", flexWrap: "wrap"}}>
              <a href="https://www.linkedin.com/in/lili-stoyanova/" className="btn btn-ghost" style={{padding: "0.55rem 0.9rem", fontSize: "0.85rem"}}>
                LinkedIn <span className="arrow">↗</span>
              </a>
              <a href="mailto:hello@lios.dev" className="btn btn-ghost" style={{padding: "0.55rem 0.9rem", fontSize: "0.85rem"}}>
                hello@lios.dev
              </a>
            </div>
          </div>

          <div>
            <div style={{display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "1.25rem"}}>
              <h3 style={{fontSize: "1.25rem", fontWeight: 600}}>Salesforce Certifications</h3>
              <span className="eyebrow" style={{margin: 0}}><span className="num">5</span>&nbsp;/&nbsp;current</span>
            </div>
            <div className="cert-list">
              {CERTS.map((c, i) => (
                <div className="cert" key={c.code}>
                  <div className="badge">{c.code}</div>
                  <div>
                    <div className="title">{c.name}</div>
                    <span className="meta">// issued {c.year} · trailhead verified</span>
                  </div>
                  <span className="verified">verified</span>
                </div>
              ))}
            </div>
            <p style={{marginTop: "1.25rem", fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--fg-muted)"}}>
              Also working with: Java · JavaScript · Salesforce Commerce Cloud (Demandware)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// BLOG TEASER
// ============================================================
const POSTS = [
  { date: "2026-04-22", title: "Reusable LWC composition patterns that actually compose" },
  { date: "2026-03-08", title: "Type-safe Apex callouts with a TypeScript client" },
  { date: "2026-01-30", title: "From Velocity to Astro: a deliberate frontend stack" },
];

function Blog() {
  return (
    <section id="blog" data-screen-label="06 Blog">
      <div className="container">
        <div className="blog-teaser reveal">
          <div>
            <span className="eyebrow" style={{color: "oklch(75% 0.012 270)"}}>
              <span className="num" style={{color: "var(--brand-300)"}}>[ 05 ]</span> blog
            </span>
            <h2 style={{marginTop: "1rem"}}>Engineering notes,<br />written in the open.</h2>
            <p className="lede">
              Articles on Salesforce development, frontend architecture, reusable components,
              and the modern web tooling worth keeping around.
            </p>
            <a href="https://blog.lios.dev" className="btn btn-light">
              Visit the blog <span className="arrow">↗</span>
            </a>
          </div>
          <div className="post-list">
            {POSTS.map((p) => (
              <a className="post" href="https://blog.lios.dev" key={p.title}>
                <span className="date">{p.date}</span>
                <span className="title">{p.title}</span>
                <span className="arrow">→</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CONTACT
// ============================================================
function Contact() {
  return (
    <section id="contact" data-screen-label="07 Contact">
      <div className="container">
        <div className="contact reveal-stagger">
          <div>
            <span className="eyebrow"><span className="num">[ 06 ]</span> contact</span>
            <h2 style={{marginTop: "1.25rem"}}>Let's build<br /> something <em>reliable</em>.</h2>
            <p className="lede">
              For collaboration, consulting, or technical discussions — drop a line.
              We read every email and reply within two working days.
            </p>

            <div className="channels">
              <a className="channel" href="mailto:hello@lios.dev">
                <span className="ic">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>
                  </svg>
                </span>
                <div>
                  <div className="label">// email</div>
                  <div className="value">hello@lios.dev</div>
                </div>
                <span className="ext">→</span>
              </a>
              <a className="channel" href="https://www.linkedin.com/in/lili-stoyanova/">
                <span className="ic">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                  </svg>
                </span>
                <div>
                  <div className="label">// professional</div>
                  <div className="value">linkedin.com/in/lili-stoyanova</div>
                </div>
                <span className="ext">↗</span>
              </a>
            </div>
          </div>

          <div className="contact-card">
            <div className="terminal-bar">
              <span className="dot"></span><span className="dot"></span><span className="dot"></span>
              <span className="ttl">~/lios — engagement.json</span>
            </div>
            <pre>{`{
  "studio":      "Lios",
  "founder":     "Lili Stoyanova",
  "location":    "remote · CET",
  "engagement":  ["fractional", "project", "advisory"],
  "stack":       {
    "platform":  "Salesforce",
    "frontend":  ["LWC", "Astro", "TypeScript"],
    "backend":   ["Apex", "Node.js", "Java"]
  },
  `}<span className="k">"reply_within"</span>: <span className="s">"2 working days"</span>,{`
  `}<span className="k">"reach"</span>: <span className="s">"hello@lios.dev"</span>{`
}

`}<span className="c">// last updated · may 2026</span>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <a href="#top" className="brand">
            <img src="assets/lios-logo.png" alt="Lios" style={{height: 36}} />
          </a>
          <div className="links">
            <a href="#services">services</a>
            <a href="#approach">approach</a>
            <a href="#tech">tech</a>
            <a href="#founder">about</a>
            <a href="https://blog.lios.dev">blog</a>
            <a href="#contact">contact</a>
          </div>
          <div className="small">© 2026 Lios — Salesforce Development & Modern Web Engineering</div>
        </div>
        <div className="mega" aria-hidden="true">
          lios<span className="accent">.</span>
        </div>
      </div>
    </footer>
  );
}

// Export to window
Object.assign(window, { Header, Hero, Services, Approach, Technologies, Founder, Blog, Contact, Footer });
