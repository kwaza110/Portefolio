import { useEffect, useRef,useState } from "react";
import "./LandingPage.css";
import { AnimatePresence, motion } from "framer-motion";

const CONFIG = {
  name: "RAMBELOSON ANGELO",
  role: "<FullStack Dev/>",
  tagline: "About me ",
  description:
    `I am a junior fullstack developer, with a strong preference for front-end development. I specialize in building modern, high-performance, and responsive web applications.
    I work on both the front-end and back-end, which allows me to understand and manage a project end to end, but I particularly enjoy creating intuitive, clean, and user-focused interfaces.`,
  ctaLabel: "Competence",
  nav: [
    { label: "Home", href: "#home" },
    { label: "Competence", href: "#competence" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
};


export default function AuroraPortfolio() {
  const canvasRef = useRef(null);
  const [activeSection, setActiveSection] = useState("Home");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const isMobile = window.innerWidth < 768;
  const projects = [
    {
      id: 1,
      title: "O'chat - IA Chat",
      category: "AI / Fullstack",
      image:
        "https://images.unsplash.com/photo-1776715139499-136701c5c351?q=80&w=685&auto=format&fit=crop",
      description:
        "Chat application powered by AI. Built with Svelte, Node.js and API integration for real-time responses with mistral .",
      size: "large",
      animation: "from-left",
    },
    {
      id: 2,
      title: "CinéDelice",
      category: "Frontend / API",
      image:
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=1469&auto=format&fit=crop",
      description:
        "Recipe-based discovery platform linked to movies, TV series, anime, and manga. Users can explore themed recipes inspired by different universes through external APIs and a modern interactive UI..",
      size: "small",
      animation: "from-top",
    },
    {
      id: 3,
      title: "Game UI",
      category: "Game Dev / UI",
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1469&auto=format&fit=crop",
      description:
        "User interface design for Unity game project, focused on immersive and clean UX.",
      size: "tall",
      animation: "from-right",
    },
    {
      id: 4,
      title: "API Dashboard",
      category: "Backend / Tools",
      image:
        "https://images.unsplash.com/photo-1777400547618-2fb8571fb11c?q=80&w=687&auto=format&fit=crop",
      description:
        "Dashboard to visualize API data with charts and real-time updates.",
      size: "square",
      animation: "from-bottom",
    },
  ];

  const closeModal = () => {
    setIsClosing(true);

    setTimeout(() => {
      setSelectedProject(null);
      setIsClosing(false);
    }, 300);
  };

  useEffect(() => {
  const check = () => setIsMobile(window.innerWidth < 768);
  check();
  window.addEventListener("resize", check);

  return () => window.removeEventListener("resize", check);
}, []);

  useEffect(() => {
  if (selectedProject) {
    document.body.classList.add("modal-open");
  } else {
    document.body.classList.remove("modal-open");
  }
}, [selectedProject]);

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 80,
      scale: 0.98,
      filter: "blur(5px)",
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
    },
    exit: {
      opacity: 0,
      y: -80,
      scale: 0.98,
      filter: "blur(5px)",
    },
  };

  const pageTransition = {
    duration: 0.5,
    ease: "easeInOut",
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let frame = 0;
    let raf;
    let width, height;

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener("resize", resize);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ribbons = [
  { color: "rgba(59, 130, 246, 0.6)", speed: 0.003, amp: 0.08, xBase: 0.75, yBase: 0.85, pointsCount: 16 },
  { color: "rgba(14, 165, 233, 0.55)", speed: 0.004, amp: 0.12, xBase: 0.70, yBase: 0.65, pointsCount: 16 },
  { color: "rgba(34, 211, 238, 0.5)", speed: 0.002, amp: 0.15, xBase: 0.60, yBase: 0.45, pointsCount: 20 },
  { color: "rgba(30, 64, 175, 0.35)", speed: 0.005, amp: 0.20, xBase: 0.45, yBase: 0.55, pointsCount: 12 },
];

   const draw = () => {
  ctx.clearRect(0, 0, width, height);

  // 🌑 BACKGROUND BASE (TOUJOURS)
  ctx.fillStyle = "#0a0a12";
  ctx.fillRect(0, 0, width, height);

  if (isMobile) {
    // 🔷 rectangles légers PAR-DESSUS

    const cols = 5;
    const rows = 8;

    const w = width / cols;
    const h = height / rows;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {

        const t = frame * 0.02;

        const offset =
          Math.sin(t + x * 0.8 + y * 0.5) * 6;

        ctx.fillStyle = "rgba(99, 102, 241, 0.08)";

        ctx.fillRect(
          x * w + offset,
          y * h,
          w - 2,
          h - 2
        );
      }
    }

    // 🌫 overlay gradient pour garder ton style
    const gradient = ctx.createRadialGradient(
      width * 0.3,
      height * 0.2,
      0,
      width * 0.5,
      height * 0.5,
      width
    );

    gradient.addColorStop(0, "rgba(236,72,153,0.15)");
    gradient.addColorStop(1, "transparent");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

  } else {
    // 🌈 TON AURORA ORIGINAL (desktop)
    ctx.filter = "blur(90px)";

    ribbons.forEach((r, i) => {
      const t = frame * r.speed;
      const points = [];

      for (let s = 0; s <= r.pointsCount; s++) {
        const yRatio = s / r.pointsCount;
        const y = height - (yRatio * height * 0.9);

        const wobble =
          Math.sin(yRatio * 2.0 + t + i) * (width * r.amp) +
          Math.sin(yRatio * 0.8 - t * 1.2 + i * 2) * (width * r.amp * 0.3);

        const x = (r.xBase + (1 - yRatio) * 0.2) * width + wobble;

        points.push([x, y]);
      }

      ctx.beginPath();
      ctx.moveTo(points[0][0], points[0][1]);

      for (let p = 1; p < points.length - 2; p++) {
        const xc = (points[p][0] + points[p + 1][0]) / 2;
        const yc = (points[p][1] + points[p + 1][1]) / 2;
        ctx.quadraticCurveTo(points[p][0], points[p][1], xc, yc);
      }

      ctx.lineTo(width * 1.3, points[points.length - 1][1]);
      ctx.lineTo(width * 1.3, height * 1.3);
      ctx.closePath();

      ctx.fillStyle = r.color;
      ctx.fill();
    });

    ctx.filter = "none";
  }

  if (!prefersReducedMotion) frame++;
  raf = requestAnimationFrame(draw);
};
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="page-wrapper">

      <canvas ref={canvasRef} className="bg-canvas" aria-hidden="true" />

      <div className="overlay-gradient" />
      <div className="overlay-radial" />

      <div className="layout">
        {/* NAVBAR */}
        <header className="header">
          <nav className="nav">
            {CONFIG.nav.map((item) => (
              <a key={item.label} href={item.href} className="nav-link"  onClick={() => setActiveSection(item.label)} >
                {item.label}
              </a>
            ))}
          </nav>
        </header>

       <main className="hero-main">

          <AnimatePresence mode="wait">

            {activeSection === "Home" && (
              <motion.div
                key="home"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
                className="hero-container"
              >
                <h1 className="hero-title">
                  <span className="hero-name">{CONFIG.name}</span>
                  <span className="hero-role">{CONFIG.role}</span>
                </h1>

                <p className="hero-tagline">{CONFIG.tagline}</p>

                <p className="hero-description">{CONFIG.description}</p>

                <div className="hero-cta-wrapper">
                  <a
                    href="#Showmore"
                    className="hero-cta"
                    onClick={() => {
                      setActiveSection("About");
                    }}
                  >
                    READ MORE
                  </a>
                </div>
              </motion.div>
            )}

            {activeSection === "Competence" && (
              <motion.div
                key="competence"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
                className="competence-container"
              >
                <div className="competence-container">
                  <div className="section-header">
                    <h1 className="section-title">
                      TECH STACK
                      <span className="section-subtitle-tech">My Skills</span>
                    </h1>
                    <h2 className="section-subtitle">
                      Technologies and tools I use to build modern web applications.
                    </h2>

                  </div>

                  <div className="skills-category">
                    <h3 className="category-title">Front-End</h3>

                    <div className="skills-grid ">
                      {[
                        "HTML / CSS",
                        "JavaScript",
                        "TypeScript",
                        "React",
                        "Svelte",
                      ].map((skill) => (
                        <div key={skill} className="skill-card ">
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="skills-category">
                    <h3 className="category-title">Back-End</h3>

                    <div className="skills-grid">
                      {[
                        "Node.js",
                        "Express",
                      ].map((skill) => (
                        <div key={skill} className="skill-card">
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="skills-category">
                    <h3 className="category-title">Database</h3>

                    <div className="skills-grid">
                      {["MongoDB","SQL","Postgres","prisma"].map((skill) => (
                        <div key={skill} className="skill-card">
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="skills-category">
                    <h3 className="category-title">Versioning & Tools</h3>

                    <div className="skills-grid">
                      {[
                        "Git",
                        "GitHub",
                        "VS Code",
                      ].map((skill) => (
                        <div key={skill} className="skill-card">
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                              </motion.div>
            )}

          {activeSection === "Projects" && (
            <motion.div
              key="projects"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
              className="projects-container"
            >
              <h2 className="hero-name">Projects</h2>

              <div className="projects-grid">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className={`project-card ${project.size} ${project.animation}`}
                    onClick={() => {
                    setSelectedProject(project);
                    setIsClosing(false);
                  }}
                  >
                    <img src={project.image} alt={project.title} />
                    <div className="project-overlay">
                      <h3>{project.title}</h3>
                    </div>
                  </div>
                ))}
              </div>

              {/* MODAL */}
              {selectedProject && (
                <div
                  className={`project-modal ${isClosing ? "closing" : ""}`}
                  onClick={closeModal}
                >
                  <div
                    className={`project-modal-content ${isClosing ? "closing" : ""}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img
                      src={selectedProject.image}
                      className="modal-image"
                    />

                    <div className="modal-overlay">
                      <h2>{selectedProject.title}</h2>
                      <p>{selectedProject.description}</p>

                      <button className="project-close" onClick={closeModal}>
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

         {activeSection === "Contact" && (
            <motion.div
              key="contact"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
              className="contact-container"
            >
              <h2 className="hero-name">Contact</h2>

              <p className="contact-subtitle">
                Let’s build something together
              </p>

              <div className="contact-grid">

                <a href="mailto:angelo.kwz@icloud.com" className="contact-card">
                  <span className="value">angelo.kwz@icloud.com</span>
                </a>

                <a
                  href="https://github.com/kwaza110"
                  target="_blank"
                  className="contact-card"
                >
                  <span className="label">GitHub</span>
                  <span className="value">/kwaza110</span>
                </a>

                <a
                  href="www.linkedin.com/in/angelo-rambeloson-254b192b1"
                  target="_blank"
                  className="contact-card"
                >
                  <span className="label">LinkedIn</span>
                  <span className="value">/in/angelorambeloson</span>
                </a>

              </div>
            </motion.div>
          )}

      {activeSection === "About" && (
              <motion.div
                key="about"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
                className="about-container"
              >
                <div className="about-header">
                  <h2 className="hero-name">About me</h2>
                  <p className="about-text">
                    Junior Fullstack Developer focused on front-end development, passionate about building clean and modern interfaces. Based in Toulouse.
                  </p>
                </div>

                <div className="about-grid">

                  {/* EDUCATION */}
                  <div className="about-block">
                    <h3 className="section-subtitle">Education</h3>

                    <div className="timeline">
                      <div className="timeline-item">
                        <span className="year">2025-26</span>
                        <div className="timeline-content">
                          <h4>CDA - O’Clock</h4>
                          <p>Concepteur Développeur d’Applications (RNCP niveau 6)</p>
                        </div>
                      </div>

                      <div className="timeline-item">
                        <span className="year">2022-23</span>
                        <div className="timeline-content">
                          <h4>L2 Informatique</h4>
                          <p>IUT Paul Sabatier</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* LANGUAGES */}
                  <div className="about-block">
                    <h3 className="section-subtitle">Languages</h3>

                    <div className="timeline">
                      <div className="timeline-item">
                        <span className="year">FR</span>
                        <div className="timeline-content">
                          <h4>Français</h4>
                          <p>Native</p>
                        </div>
                      </div>

                      <div className="timeline-item">
                        <span className="year">EN</span>
                        <div className="timeline-content">
                          <h4>English</h4>
                          <p>B1</p>
                        </div>
                      </div>

                      <div className="timeline-item">
                        <span className="year">MG</span>
                        <div className="timeline-content">
                          <h4>Malagasy</h4>
                          <p>Native</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PASSIONS */}
                  <div className="about-block">
                    <h3 className="section-subtitle">Passions</h3>

                    <div className="timeline">
                      <div className="timeline-item">
                        <span className="year">01</span>
                        <div className="timeline-content">
                          <h4>Music</h4>
                        </div>
                      </div>

                      <div className="timeline-item">
                        <span className="year">02</span>
                        <div className="timeline-content">
                          <h4>Parkour</h4>
                          <p>Sport</p>
                        </div>
                      </div>

                      <div className="timeline-item">
                        <span className="year">03</span>
                        <div className="timeline-content">
                          <h4>Unity</h4>
                          <p>Game Dev</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}