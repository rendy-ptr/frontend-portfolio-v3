import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { experiences } from "../../data/portfolio.tsx";
import { SectionHeader } from "../PixelArt";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function Experience() {
  const { t } = useTranslation();
  return (
    <section
      id="experience"
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
            label={t("experience.sectionLabel")}
            title={t("experience.title")}
          />

          <div className="flex flex-col gap-0">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                {...fadeUp}
                transition={{ delay: i * 0.1, duration: 0.5, ease }}
                className="flex gap-6"
              >
                <div className="flex-shrink-0 flex flex-col items-center pt-1">
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      border: "2px solid var(--accent)",
                      background: i === 0 ? "var(--accent)" : "var(--bg)",
                      flexShrink: 0,
                    }}
                  />
                  {i < experiences.length - 1 && (
                    <div
                      style={{
                        width: 1,
                        flex: 1,
                        background: "var(--border-color)",
                      }}
                    />
                  )}
                </div>

                <div className="flex-1 pb-8" style={{ paddingTop: 0 }}>
                  <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                    <div>
                      <h3
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "var(--text-base)",
                          fontWeight: 600,
                          color: "var(--text)",
                          lineHeight: 1.3,
                          marginBottom: 2,
                        }}
                      >
                        {exp.role}
                      </h3>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "var(--text-sm)",
                          fontWeight: 500,
                          color: "var(--accent)",
                        }}
                      >
                        {exp.company}
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <span className="tag" style={{ fontWeight: 500 }}>
                        {t(exp.period)}
                      </span>
                      <span className="tag">{t(exp.type)}</span>
                    </div>
                  </div>

                  <p
                    className="mb-4"
                    style={{
                      fontSize: "var(--text-sm)",
                      lineHeight: 1.75,
                      color: "var(--text-muted)",
                      maxWidth: "65ch",
                    }}
                  >
                    {t(exp.description)}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tech) => (
                      <span
                        key={tech}
                        className="tag"
                        style={{
                          color: "var(--accent-text)",
                          borderColor:
                            "color-mix(in srgb, var(--accent) 20%, transparent)",
                          background: "var(--accent-soft)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
