import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  FiFolder,
  FiAward,
  FiTrendingUp,
  FiUser,
} from "react-icons/fi";
import {
  projects,
} from "../../../data/portfolio.tsx";
import { getDashboardStats } from "@/constants/dashboard.tsx";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (i: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.08, duration: 0.45, ease },
});


const recent = [
  {
    icon: <FiUser size={15} />,
    text: "New message from John Doe",
    time: "5 min ago",
    color: "var(--success)",
  },
  {
    icon: <FiFolder size={15} />,
    text: 'Project "NeoShop" updated',
    time: "1 hr ago",
    color: "var(--accent)",
  },
  {
    icon: <FiAward size={15} />,
    text: "AWS Certificate added",
    time: "3 hrs ago",
    color: "var(--warm)",
  },
  {
    icon: <FiTrendingUp size={15} />,
    text: "Portfolio viewed 24 times today",
    time: "Today",
    color: "var(--info)",
  },
];

export default function Overview() {
  const { t } = useTranslation();
  const stats = getDashboardStats(t);

  return (
    <div style={{ padding: "32px 32px 48px" }}>
      {/* Header */}
      <motion.div {...fadeUp(0)} className="mb-8">
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-2xl)",
            fontWeight: 700,
            color: "var(--text)",
            letterSpacing: "-0.025em",
            marginBottom: 4,
          }}
        >
          {t("dashboard.overview.title")}
        </h1>
        <p style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
          {t("dashboard.overview.subtitle")}
        </p>
      </motion.div>

      {/* Stats grid */}
      <div
        className="grid gap-4 mb-8"
        style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
      >
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            {...fadeUp(i + 1)}
            className="card"
            style={{ padding: "20px 22px" }}
          >
            <div className="flex items-center justify-between mb-4">
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-xs)",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.05em",
                }}
              >
                {s.label}
              </span>
              <div
                className="flex items-center justify-center"
                style={{
                  width: 36,
                  height: 36,
                  background: s.bg,
                  color: s.color,
                  borderRadius: 9,
                }}
              >
                {s.icon}
              </div>
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-3xl)",
                fontWeight: 800,
                color: s.color,
                lineHeight: 1,
                letterSpacing: "-0.03em",
              }}
            >
              {s.value}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent activity + mini project list */}
      <div className="grid gap-6" style={{ gridTemplateColumns: "1fr 1.4fr" }}>
        {/* Activity feed */}
        <motion.div
          {...fadeUp(5)}
          className="card"
          style={{ padding: 0, overflow: "hidden" }}
        >
          <div
            style={{
              padding: "18px 22px",
              borderBottom: "1px solid var(--border-color)",
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "var(--text-sm)",
              color: "var(--text)",
            }}
          >
            {t("dashboard.overview.recentActivity")}
          </div>
          <div>
            {recent.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3"
                style={{
                  padding: "14px 22px",
                  borderBottom:
                    i < recent.length - 1
                      ? "1px solid var(--border-color)"
                      : "none",
                }}
              >
                <div
                  className="flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    background: `color-mix(in srgb, ${item.color} 12%, transparent)`,
                    color: item.color,
                  }}
                >
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "var(--text)",
                      marginBottom: 2,
                    }}
                  >
                    {item.text}
                  </p>
                  <span
                    style={{
                      fontSize: "var(--text-xs)",
                      color: "var(--text-subtle)",
                    }}
                  >
                    {item.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Featured projects summary */}
        <motion.div
          {...fadeUp(6)}
          className="card"
          style={{ padding: 0, overflow: "hidden" }}
        >
          <div
            style={{
              padding: "18px 22px",
              borderBottom: "1px solid var(--border-color)",
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "var(--text-sm)",
              color: "var(--text)",
            }}
          >
            {t("dashboard.overview.projectsGlance")}
          </div>
          <div>
            {projects.slice(0, 4).map((p, i) => (
              <div
                key={p.id}
                className="flex items-center gap-4"
                style={{
                  padding: "12px 22px",
                  borderBottom:
                    i < 3 ? "1px solid var(--border-color)" : "none",
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: p.featured
                      ? "var(--accent)"
                      : "var(--border-color)",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    flex: 1,
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-sm)",
                    fontWeight: 500,
                    color: "var(--text)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {p.title}
                </span>
                {p.featured && (
                  <span
                    className="tag"
                    style={{
                      color: "var(--accent-text)",
                      background: "var(--accent-soft)",
                      borderColor: "transparent",
                      fontSize: "var(--text-xs)",
                    }}
                  >
                    {t("dashboard.overview.featured")}
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
