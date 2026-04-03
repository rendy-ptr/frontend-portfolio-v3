import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { skillCategories } from "../../data/portfolio.tsx";
import { SectionHeader } from "../PixelArt";
import { TerminalIcon } from "../ui/terminal.tsx";
import { DatabaseBackupIcon } from "../ui/database-backup.tsx";
import { WrenchIcon } from "../ui/wrench.tsx";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function Skills() {
  const { t } = useTranslation();

  const categoryMeta = [
    { icon: <TerminalIcon size={20} />, desc: t("skills.categoryMeta.frontend") },
    { icon: <DatabaseBackupIcon size={20} />, desc: t("skills.categoryMeta.backend") },
    { icon: <WrenchIcon size={20} />, desc: t("skills.categoryMeta.tools") },
  ];

  return (
    <section
      id="skills"
      className="relative overflow-hidden"
      style={{
        background: "var(--surface-alt)",
        paddingTop: "var(--section-gap)",
        paddingBottom: "var(--section-gap)",
      }}
    >
      <div className="container">
        <motion.div {...fadeUp} transition={{ duration: 0.5, ease }}>
          <SectionHeader
            label={t("skills.sectionLabel")}
            title={t("skills.title")}
          />

          <div
            className="skills-grid grid gap-5"
            style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
          >
            {skillCategories.map((cat, ci) => {
              const meta = categoryMeta[ci];
              return (
                <motion.div
                  key={cat.category}
                  {...fadeUp}
                  transition={{ delay: ci * 0.12, duration: 0.5, ease }}
                  className="card"
                  style={{
                    padding: 0,
                    overflow: "hidden",
                    transition:
                      "transform var(--transition-base), box-shadow var(--transition-base)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(-3px)";
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
                  <div
                    style={{
                      padding: "24px 24px 20px",
                      borderBottom: "1px solid var(--border-color)",
                    }}
                  >
                    <div
                      className="flex items-center justify-center mb-4"
                      style={{
                        width: 44,
                        height: 44,
                        background: "var(--accent-soft)",
                        color: "var(--accent)",
                        borderRadius: 12,
                      }}
                    >
                      {meta.icon}
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "var(--text-base)",
                        fontWeight: 700,
                        color: "var(--text)",
                        marginBottom: 4,
                      }}
                    >
                      {cat.category}
                    </h3>
                    <p
                      style={{
                        fontSize: "var(--text-xs)",
                        color: "var(--text-subtle)",
                        lineHeight: 1.5,
                      }}
                    >
                      {meta.desc}
                    </p>
                  </div>

                  <ul
                    style={{
                      listStyle: "none",
                      padding: "16px 24px 24px",
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: 0,
                    }}
                  >
                    {cat.skills.map((skill, si) => (
                      <li
                        key={skill.name}
                        className="flex items-center justify-between"
                        style={{
                          padding: "10px 0",
                          borderBottom:
                            si < cat.skills.length - 1
                              ? "1px solid var(--border-color)"
                              : "none",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "var(--text-sm)",
                            fontWeight: 500,
                            color: "var(--text)",
                          }}
                        >
                          {skill.name}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "var(--text-xs)",
                            fontWeight: 600,
                            color: "var(--accent)",
                            background: "var(--accent-soft)",
                            padding: "2px 8px",
                            borderRadius: 4,
                          }}
                        >
                          {skill.level >= 80
                            ? t("skills.levelLabels.advanced")
                            : skill.level >= 60
                              ? t("skills.levelLabels.intermediate")
                              : t("skills.levelLabels.beginner")}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
