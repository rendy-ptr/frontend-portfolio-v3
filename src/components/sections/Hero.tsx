import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { useTranslation } from "react-i18next";
import { personal } from "../../data/portfolio.tsx";
import { DownloadIcon } from "../ui/download.tsx";
import { ArrowRightIcon } from "../ui/arrow-right.tsx";

const roles = [
  "Full Stack Developer",
  "Machine Learning Engineer",
  "Problem Solver",
  "Tech Explorer",
];

const ease = [0.16, 1, 0.3, 1] as const;

const stagger = (i: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.08 + i * 0.12, duration: 0.6, ease },
});

export default function Hero() {
  const { t } = useTranslation();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const current = roles[roleIndex];
    if (charIdx < current.length) {
      const timer = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      }, 65);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setCharIdx(0);
        setDisplayed("");
        setRoleIndex((i) => (i + 1) % roles.length);
      }, 2400);
      return () => clearTimeout(timer);
    }
  }, [charIdx, roleIndex]);

  const stats = [
    { value: "1+", label: t("hero.stats.yearsExp"), color: "var(--accent)" },
    { value: "20+", label: t("hero.stats.projects"), color: "var(--info)" },
    { value: "10+", label: t("hero.stats.clients"), color: "var(--warm)" },
  ];

  return (
    <section
      id="hero"
      className="flex items-center relative overflow-hidden"
      style={{
        background: "var(--bg)",
        minHeight: "100vh",
        paddingTop: "clamp(80px, 12vw, 120px)",
        paddingBottom: "var(--section-gap)",
      }}
    >
      <div className="container relative z-10">
        <div
          className="hero-grid grid items-center gap-16"
          style={{ gridTemplateColumns: "1fr auto" }}
        >
          <div>
            {personal.availableForWork && (
              <motion.div {...stagger(0)} className="mb-6">
                <span
                  className="inline-flex items-center gap-2"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-sm)",
                    fontWeight: 500,
                    padding: "6px 16px",
                    background: "var(--success-soft)",
                    color: "var(--success)",
                    borderRadius: 20,
                    border: "1px solid",
                    borderColor:
                      "color-mix(in srgb, var(--success) 20%, transparent)",
                  }}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      background: "var(--success)",
                      borderRadius: "50%",
                      animation: "pulse-dot 2s ease-in-out infinite",
                      display: "inline-block",
                    }}
                  />
                  {t("hero.available") || "Available for Work"}
                </span>
              </motion.div>
            )}

            <motion.div {...stagger(1)}>
              <div
                className="mb-2"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-base)",
                  fontWeight: 500,
                  color: "var(--text-muted)",
                }}
              >
                {t("hero.greeting")}
              </div>
              <h1
                className="mb-3"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-hero)",
                  fontWeight: 800,
                  color: "var(--text)",
                  letterSpacing: "-0.035em",
                  lineHeight: 1.05,
                }}
              >
                {personal.name}
              </h1>
            </motion.div>

            <motion.div {...stagger(2)} className="mb-5">
              <div
                className="inline-flex items-center gap-1"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-lg)",
                  fontWeight: 600,
                  color: "var(--accent)",
                  minHeight: "1.5em",
                }}
              >
                {displayed}
                <span
                  style={{
                    display: "inline-block",
                    width: 2,
                    height: "1.1em",
                    background: "var(--accent)",
                    animation: "blink 0.8s steps(1) infinite",
                    verticalAlign: "text-bottom",
                  }}
                />
              </div>
            </motion.div>

            <motion.p
              {...stagger(3)}
              className="mb-8"
              style={{
                fontSize: "var(--text-base)",
                lineHeight: 1.75,
                color: "var(--text-muted)",
                maxWidth: "50ch",
              }}
            >
              {t("hero.tagline")}
            </motion.p>

            <motion.div {...stagger(4)} className="flex gap-3 flex-wrap mb-12">
              <Link to="contact" smooth duration={600} offset={-72}>
                <button className="btn-primary">
                  <ArrowRightIcon size={16} /> {t("hero.contactBtn")}
                </button>
              </Link>
              <a href={personal.cv} download>
                <button className="btn-outline">
                  <DownloadIcon size={16} /> {t("hero.downloadCV")}
                </button>
              </a>
            </motion.div>

            <motion.div {...stagger(5)}>
              <div
                className="flex items-center gap-8"
                style={{
                  borderTop: "1px solid var(--border-color)",
                  paddingTop: 24,
                }}
              >
                {stats.map((s, i) => (
                  <div key={i}>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "var(--text-xl)",
                        fontWeight: 800,
                        color: s.color,
                        lineHeight: 1,
                        marginBottom: 4,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {s.value}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "var(--text-xs)",
                        fontWeight: 500,
                        color: "var(--text-subtle)",
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — avatar */}
          <motion.div
            className="hero-avatar"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.7, ease }}
          >
            <div
              style={{
                width: 260,
                height: 260,
                borderRadius: "50%",
                overflow: "hidden",
                border: "3px solid var(--border-color)",
                boxShadow: "var(--shadow-lg)",
              }}
            >
              <img
                src={personal.avatar}
                alt={personal.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
