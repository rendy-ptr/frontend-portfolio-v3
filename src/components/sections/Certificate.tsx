import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { certificates } from "../../data/portfolio.tsx";
import { SectionHeader } from "../PixelArt";
import { ArrowUpRightIcon } from "@/components/ui/arrow-up-right";


const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function Certificate() {
  const { t } = useTranslation();
  return (
    <section
      id="certificate"
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
            label={t("certificate.sectionLabel")}
            title={t("certificate.title")}
          />

          <div
            className="certs-grid grid gap-4"
            style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
          >
            {certificates.map((cert, i) => (
              <motion.div
                key={cert.id}
                {...fadeUp}
                transition={{ delay: i * 0.08, duration: 0.5, ease }}
                className="card cursor-default"
                style={{
                  padding: "20px 22px",
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
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width: 40,
                      height: 40,
                      background: "var(--accent-soft)",
                      color: "var(--accent)",
                      borderRadius: 10,
                    }}
                  >
                    <cert.icon size={20} />
                  </span>
                  <span
                    className="tag"
                    style={{
                      color: "var(--accent-text)",
                      background: "var(--accent-soft)",
                      borderColor: "transparent",
                      fontWeight: 500,
                      marginLeft: "auto",
                    }}
                  >
                    {t(cert.date)}
                  </span>
                </div>

                <h3
                  className="mb-1.5"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-sm)",
                    fontWeight: 600,
                    color: "var(--text)",
                    lineHeight: 1.45,
                  }}
                >
                  {t(cert.title)}
                </h3>
                <div
                  className="mb-3"
                  style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--text-muted)",
                  }}
                >
                  {cert.issuer}
                </div>

                <div
                  className="flex items-center justify-between pt-3"
                  style={{ borderTop: "1px solid var(--border-color)" }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "var(--text-xs)",
                      fontWeight: 500,
                      color: "var(--text-subtle)",
                    }}
                  >
                    #{cert.credentialId}
                  </span>
                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: "var(--text-subtle)",
                        transition: "color var(--transition-fast)",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.color =
                          "var(--accent)")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.color =
                          "var(--text-subtle)")
                      }
                      aria-label={`View ${cert.title}`}
                    >
                      <ArrowUpRightIcon size={14} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
