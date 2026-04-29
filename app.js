const { useState, useEffect, useRef } = React;

const ROLES = [
  "Financial Inclusion Advocate",
  "Fintech Builder",
  "Bridge Between Finance & Tech",
  "Systems Thinker",
];

function useTypewriter(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
    }

    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx]);

  return display;
}

function FadeIn({ children, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, []);
  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(16px)",
      transition: "opacity 0.6s ease, transform 0.6s ease",
    }}>
      {children}
    </div>
  );
}

function Pill({ label }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "4px 12px",
      border: "1px solid #333",
      borderRadius: "999px",
      fontSize: "0.75rem",
      color: "#888",
      letterSpacing: "0.06em",
      textTransform: "uppercase",
    }}>
      {label}
    </span>
  );
}

function LinkButton({ href, children }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-block",
        padding: "10px 20px",
        border: `1px solid ${hovered ? "#fff" : "#444"}`,
        borderRadius: "6px",
        color: hovered ? "#fff" : "#aaa",
        textDecoration: "none",
        fontSize: "0.85rem",
        letterSpacing: "0.04em",
        transition: "all 0.2s ease",
        background: hovered ? "rgba(255,255,255,0.05)" : "transparent",
      }}
    >
      {children}
    </a>
  );
}

function App() {
  const typed = useTypewriter(ROLES);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
    }}>
      <div style={{ maxWidth: "640px", width: "100%" }}>

        <FadeIn delay={0}>
          <div style={{ marginBottom: "1rem", display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <Pill label="Finance" />
            <Pill label="Technology" />
            <Pill label="Inclusion" />
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          <h1 style={{
            fontSize: "clamp(2rem, 6vw, 3.5rem)",
            fontWeight: 300,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: "0.5rem",
          }}>
            Rod Christopher Barit
          </h1>
        </FadeIn>

        <FadeIn delay={300}>
          <p style={{
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            color: "#4d9eff",
            fontWeight: 400,
            marginBottom: "2rem",
            minHeight: "2em",
          }}>
            {typed}
            <span style={{ animation: "blink 1s step-end infinite", marginLeft: "2px" }}>|</span>
          </p>
        </FadeIn>

        <FadeIn delay={500}>
          <p style={{
            lineHeight: 1.8,
            color: "#999",
            fontSize: "1rem",
            marginBottom: "2.5rem",
            maxWidth: "520px",
          }}>
            I work at the intersection of <span style={{ color: "#f0f0f0" }}>finance and technology</span> to
            promote <span style={{ color: "#f0f0f0" }}>financial inclusion</span> — building systems and
            solutions that make financial services accessible to everyone.
          </p>
        </FadeIn>

        <FadeIn delay={700}>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <LinkButton href="mailto:rodbarit@gmail.com">Email</LinkButton>
            <LinkButton href="https://linkedin.com/in/rodbarit">LinkedIn</LinkButton>
            <LinkButton href="https://github.com/rodbarit">GitHub</LinkButton>
          </div>
        </FadeIn>

      </div>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
