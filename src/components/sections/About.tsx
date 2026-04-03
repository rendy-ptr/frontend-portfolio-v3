import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SectionHeader } from "../PixelArt";
import { GraduationCapIcon } from "../ui/graduation-cap";
import { getGithubCommits } from "../../api/github.ts";
import { useEffect, useState } from "react";
import { GithubIcon } from "../ui/github.tsx";
import { getWakatimeStats } from "../../api/wakatime.ts";
import { ClockIcon } from "../ui/clock.tsx";
import { FolderCodeIcon } from "../ui/folder-code.tsx";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

interface GithubCommit {
  totalCommits: number;
}

interface TopLanguages {
  name: string;
  text: string;
  percent: number;
}

interface WakatimeStats {
  totalHours: string;
  topLanguage: string;
  topLanguages: TopLanguages[];
  bestDay: {
    date: string;
    text: string;
  };
}

export default function About() {
  const { t } = useTranslation();

  const [commits, setCommits] = useState<GithubCommit>({ totalCommits: 0 });
  const [wakatimeStats, setWakatimeStats] = useState<WakatimeStats>({
    totalHours: "",
    topLanguage: "",
    topLanguages: [],
    bestDay: {
      date: "",
      text: "",
    },
  });

  useEffect(() => {
    const fetchCommits = async () => {
      const githubData = await getGithubCommits();
      const wakatimeData = await getWakatimeStats();
      if (githubData) {
        setCommits(githubData);
      }
      if (wakatimeData) {
        setWakatimeStats(wakatimeData);
      }
    };
    fetchCommits();
  }, []);

  const funFacts = [
    {
      label: t("about.totalCommits"),
      value: commits.totalCommits,
      icon: <GithubIcon size={18} />,
    },
    {
      label: t("about.totalCodingHours"),
      value: wakatimeStats.totalHours,
      icon: <ClockIcon size={18} />,
    },
    {
      label: t("about.topLanguage"),
      value: wakatimeStats.topLanguage,
      icon: <FolderCodeIcon size={18} />,
    },
  ];

  return (
    <section
      id="about"
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
            label={t("about.sectionLabel")}
            title={t("about.title")}
          />

          <motion.p
            {...fadeUp}
            transition={{ delay: 0.1, duration: 0.5, ease }}
            className="mb-12"
            style={{
              fontSize: "var(--text-lg)",
              lineHeight: 1.8,
              color: "var(--text-muted)",
              maxWidth: "65ch",
            }}
          >
            {t("about.bio")}
          </motion.p>

          <div
            className="about-grid grid gap-8 items-start"
            style={{ gridTemplateColumns: "1fr 1fr" }}
          >
            <motion.div
              {...fadeUp}
              transition={{ delay: 0.2, duration: 0.5, ease }}
            >
              <div
                className="mb-4"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-xs)",
                  fontWeight: 600,
                  color: "var(--text-subtle)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase" as const,
                }}
              >
                {t("about.statisticTitle")}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {funFacts.map((fact, i) => (
                  <div
                    key={i}
                    className="card"
                    style={{ padding: "16px 18px" }}
                  >
                    <div
                      className="flex items-center justify-center mb-3"
                      style={{
                        width: 36,
                        height: 36,
                        background: "var(--accent-soft)",
                        color: "var(--accent)",
                        borderRadius: 8,
                      }}
                    >
                      {fact.icon}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "var(--text-xs)",
                        fontWeight: 600,
                        color: "var(--text-subtle)",
                        letterSpacing: "0.03em",
                        textTransform: "uppercase" as const,
                        marginBottom: 2,
                      }}
                    >
                      {fact.label}
                    </div>
                    <div
                      style={{
                        fontSize: "var(--text-sm)",
                        fontWeight: 500,
                        color: "var(--text)",
                      }}
                    >
                      {fact.value}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ delay: 0.3, duration: 0.5, ease }}
            >
              <div
                className="mb-4"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-xs)",
                  fontWeight: 600,
                  color: "var(--text-subtle)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase" as const,
                }}
              >
                {t("about.education.title")}
              </div>
              <div className="card" style={{ padding: "24px" }}>
                <div className="flex items-start gap-4">
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width: 48,
                      height: 48,
                      background: "var(--accent-soft)",
                      color: "var(--accent)",
                      borderRadius: 12,
                    }}
                  >
                    <GraduationCapIcon size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 600,
                        fontSize: "var(--text-base)",
                        color: "var(--text)",
                        lineHeight: 1.4,
                        marginBottom: 6,
                      }}
                    >
                      {t("about.education.degree")}
                    </div>
                    <div
                      style={{
                        fontSize: "var(--text-sm)",
                        color: "var(--text-muted)",
                        marginBottom: 8,
                      }}
                    >
                      {t("about.education.institution")}
                    </div>
                    <span
                      className="tag"
                      style={{
                        color: "var(--accent)",
                        background: "var(--accent-soft)",
                        borderColor: "transparent",
                      }}
                    >
                      {t("about.education.year")}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
