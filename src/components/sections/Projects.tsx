import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { projects } from "../../data/portfolio.tsx";
import { SectionHeader } from "../PixelArt";
import { GithubIcon } from "../ui/github.tsx";
import { ArrowUpRightIcon } from "../ui/arrow-up-right.tsx";
import { ChevronDownIcon } from "../ui/chevron-down.tsx";
import { ChevronUpIcon } from "../ui/chevron-up.tsx";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function Projects() {
  const { t } = useTranslation();
  const [showAll, setShowAll] = useState(false);

  const featured = projects.filter((p) => p.featured);
  const other = projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className="relative overflow-hidden"
      style={{
        background: "var(--bg)",
        paddingTop: "var(--section-gap)",
        paddingBottom: "var(--section-gap)",
      }}
    >
      <div className="container">
        <motion.div {...fadeUp} transition={{ duration: 0.5, ease }}>
          <SectionHeader
            label={t("projects.sectionLabel")}
            title={t("projects.title")}
          />

          <div
            className="projects-featured grid gap-6 mb-8"
            style={{ gridTemplateColumns: "1fr 1fr" }}
          >
            {featured.map((project, i) => (
              <motion.div
                key={project.id}
                {...fadeUp}
                transition={{ delay: i * 0.12, duration: 0.5, ease }}
                className="card overflow-hidden"
                style={{
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  transition:
                    "transform var(--transition-base), box-shadow var(--transition-base)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(-3px)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "var(--shadow-lg)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "var(--shadow-xs)";
                }}
              >
                {project.image && (
                  <div
                    className="overflow-hidden relative"
                    style={{
                      height: 200,
                      borderBottom: "1px solid var(--border-color)",
                    }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      style={{
                        transition: "transform 0.5s var(--ease-out-quart)",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.transform =
                          "scale(1.04)")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.transform =
                          "scale(1)")
                      }
                    />
                    <span
                      className="absolute top-3 left-3"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "var(--text-xs)",
                        fontWeight: 600,
                        padding: "4px 10px",
                        background:
                          "color-mix(in srgb, var(--bg) 88%, transparent)",
                        color: "var(--accent-text)",
                        borderRadius: 6,
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                        border: "1px solid var(--border-color)",
                      }}
                    >
                      {t("projects.featured") || "Featured"}
                    </span>
                    {project.isDevelopment && (
                      <span
                        className="absolute top-3 right-3"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "var(--text-xs)",
                          fontWeight: 600,
                          padding: "4px 10px",
                          background: "var(--warm-soft)",
                          color: "var(--warm)",
                          borderRadius: 6,
                          backdropFilter: "blur(8px)",
                          WebkitBackdropFilter: "blur(8px)",
                          border:
                            "1px solid color-mix(in srgb, var(--warm) 20%, transparent)",
                        }}
                      >
                        {t("projects.development") || "In Development"}
                      </span>
                    )}
                  </div>
                )}

                <div style={{ padding: "20px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                  {!project.image && (
                    <div className="flex gap-2 mb-3">
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "var(--text-xxs)",
                          fontWeight: 600,
                          padding: "2px 8px",
                          background: "var(--accent-soft)",
                          color: "var(--accent)",
                          borderRadius: 4,
                          textTransform: "uppercase",
                        }}
                      >
                        {t("projects.featured") || "Featured"}
                      </span>
                      {project.isDevelopment && (
                        <span
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "var(--text-xxs)",
                            fontWeight: 600,
                            padding: "2px 8px",
                            background: "var(--surface-alt)",
                            color: "var(--text-subtle)",
                            borderRadius: 4,
                            textTransform: "uppercase",
                          }}
                        >
                          {t("projects.development") || "In Development"}
                        </span>
                      )}
                    </div>
                  )}
                  <h3
                    className="mb-2"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "var(--text-base)",
                      fontWeight: 600,
                      color: "var(--text)",
                      lineHeight: 1.4,
                    }}
                  >
                    {t(project.title)}
                  </h3>
                  <p
                    className="mb-4"
                    style={{
                      fontSize: "var(--text-sm)",
                      lineHeight: 1.7,
                      color: "var(--text-muted)",
                    }}
                  >
                    {t(project.description)}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map((techItem) => (
                      <span key={techItem} className="tag">
                        {techItem}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2" style={{ marginTop: "auto" }}>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} source code`}
                    >
                      <button
                        className="btn-ghost"
                        style={{
                          padding: "6px 12px",
                          fontSize: "var(--text-xs)",
                        }}
                      >
                        <GithubIcon size={14} /> {t("projects.codeBtn") || "Code"}
                      </button>
                    </a>
                    {project.isLive ? (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.title} live demo`}
                      >
                        <button
                          className="btn-primary"
                          style={{
                            padding: "6px 12px",
                            fontSize: "var(--text-xs)",
                          }}
                        >
                          <ArrowUpRightIcon size={14} />{" "}
                          {t("projects.liveBtn") || "Live"}
                        </button>
                      </a>
                    ) : (
                      <button
                        className="btn-ghost"
                        disabled
                        style={{
                          padding: "6px 12px",
                          fontSize: "var(--text-xs)",
                          opacity: 0.6,
                          cursor: "not-allowed",
                        }}
                      >
                        {t("projects.comingSoon") || "Live Coming Soon"}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <AnimatePresence mode="popLayout">
            {showAll && (
              <motion.div
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease }}
                className="projects-other grid gap-4 mt-8"
                style={{ gridTemplateColumns: "1fr 1fr" }}
              >
                {other.map((project, i) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4, ease }}
                    className="card overflow-hidden"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      transition:
                        "transform var(--transition-base), box-shadow var(--transition-base)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform =
                        "translateY(-2px)";
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "var(--shadow-md)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform =
                        "translateY(0)";
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "var(--shadow-xs)";
                    }}
                  >
                    {project.image && (
                      <div
                        className="overflow-hidden relative"
                        style={{
                          height: 200,
                          borderBottom: "1px solid var(--border-color)",
                        }}
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          style={{
                            transition: "transform 0.5s var(--ease-out-quart)",
                          }}
                          onMouseEnter={(e) =>
                            ((e.currentTarget as HTMLElement).style.transform =
                              "scale(1.04)")
                          }
                          onMouseLeave={(e) =>
                            ((e.currentTarget as HTMLElement).style.transform =
                              "scale(1)")
                          }
                        />
                        {project.isDevelopment && (
                          <span
                            className="absolute top-3 right-3"
                            style={{
                              fontFamily: "var(--font-display)",
                              fontSize: "var(--text-xs)",
                              fontWeight: 600,
                              padding: "4px 10px",
                              background: "var(--warm-soft)",
                              color: "var(--warm)",
                              borderRadius: 6,
                              backdropFilter: "blur(8px)",
                              WebkitBackdropFilter: "blur(8px)",
                              border:
                                "1px solid color-mix(in srgb, var(--warm) 20%, transparent)",
                            }}
                          >
                            {t("projects.development") || "In Development"}
                          </span>
                        )}
                      </div>
                    )}

                    <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
                      {!project.image && project.isDevelopment && (
                        <div className="flex gap-2 mb-3">
                          <span
                            style={{
                              fontFamily: "var(--font-display)",
                              fontSize: "var(--text-xxs)",
                              fontWeight: 600,
                              padding: "2px 8px",
                              background: "var(--surface-alt)",
                              color: "var(--text-subtle)",
                              borderRadius: 4,
                              textTransform: "uppercase",
                            }}
                          >
                            {t("projects.development") || "In Development"}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between items-start mb-3">
                        <h3
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "var(--text-sm)",
                            fontWeight: 600,
                            color: "var(--text)",
                            lineHeight: 1.4,
                          }}
                        >
                          {t(project.title)}
                        </h3>
                      </div>
                      <p
                        className="mb-4"
                        style={{
                          fontSize: "var(--text-xs)",
                          lineHeight: 1.65,
                          color: "var(--text-muted)",
                        }}
                      >
                        {t(project.description)}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-4 other-project-tags">
                        {project.tech.map((techItem) => (
                          <span key={techItem} className="tag">
                            {techItem}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2" style={{ marginTop: "auto" }}>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${project.title} source code`}
                        >
                          <button
                            className="btn-ghost"
                            style={{
                              padding: "6px 12px",
                              fontSize: "var(--text-xs)",
                            }}
                          >
                            <GithubIcon size={14} />{" "}
                            {t("projects.codeBtn") || "Code"}
                          </button>
                        </a>
                        {project.isLive ? (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${project.title} live demo`}
                          >
                            <button
                              className="btn-primary"
                              style={{
                                padding: "6px 12px",
                                fontSize: "var(--text-xs)",
                              }}
                            >
                              <ArrowUpRightIcon size={14} />{" "}
                              {t("projects.liveBtn") || "Live"}
                            </button>
                          </a>
                        ) : (
                          <button
                            className="btn-ghost"
                            disabled
                            style={{
                              padding: "6px 12px",
                              fontSize: "var(--text-xs)",
                              opacity: 0.6,
                              cursor: "not-allowed",
                            }}
                          >
                            {t("projects.comingSoon") || "Live Coming Soon"}
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            layout
            className="flex justify-center mt-12"
            initial={false}
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn-outline group relative overflow-hidden px-10 py-4"
              style={{
                borderRadius: "100px",
                borderWidth: "1.5px",
              }}
            >
              <span className="relative z-10 flex items-center gap-3">
                {showAll ? (
                  <>
                    <ChevronUpIcon
                      className="transition-transform duration-300 group-hover:-translate-y-0.5"
                      size={20}
                    />
                    {t("projects.showLess") || "Show Less"}
                  </>
                ) : (
                  <>
                    <ChevronDownIcon
                      className="transition-transform duration-300 group-hover:translate-y-0.5"
                      size={20}
                    />
                    {t("projects.showMore") || "Show More Projects"}
                  </>
                )}
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
