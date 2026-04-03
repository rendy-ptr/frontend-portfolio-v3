import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft } from "react-icons/fi";
import { LangDropdown } from "../components/LangDropdown";
import { ThemeToggle } from "../components/ThemeToggle";

const ease = [0.16, 1, 0.3, 1] as const;

const DECORATIONS = [
  { size: 240, top: "-60px", left: "-60px", opacity: 0.12 },
  { size: 180, bottom: "40px", right: "-50px", opacity: 0.08 },
  { size: 100, top: "45%", left: "60%", opacity: 0.06 },
];

function Blob({
  size,
  opacity,
  style,
}: {
  size: number;
  opacity: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: "oklch(99% 0.003 165)",
        opacity,
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}

export default function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("admin@portfolio.dev");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    navigate("/dashboard");
  };

  const inputBase: React.CSSProperties = {
    width: "100%",
    padding: "11px 16px 11px 44px",
    border: "1px solid var(--border-color)",
    borderRadius: 10,
    background: "var(--bg)",
    color: "var(--text)",
    fontFamily: "var(--font-body)",
    fontSize: "var(--text-sm)",
    outline: "none",
    transition: "border-color 150ms ease, box-shadow 150ms ease",
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "var(--bg)",
        overflow: "hidden",
      }}
    >
      <div
        className="login-brand"
        style={{
          width: "45%",
          minWidth: 320,
          background:
            "linear-gradient(145deg, oklch(38% 0.1 165) 0%, oklch(28% 0.08 200) 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "48px 52px",
          position: "relative",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        {DECORATIONS.map((d, i) => (
          <Blob
            key={i}
            size={d.size}
            opacity={d.opacity}
            style={
              {
                top: d.top,
                left: d.left,
                bottom: (d as { bottom?: string }).bottom,
                right: (d as { right?: string }).right,
              } as React.CSSProperties
            }
          />
        ))}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage:
              "linear-gradient(oklch(99% 0.003 165 / 0.04) 1px, transparent 1px), linear-gradient(90deg, oklch(99% 0.003 165 / 0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "1.6rem",
              letterSpacing: "-0.04em",
              color: "oklch(99% 0.003 165)",
              display: "inline-block",
            }}
          >
            {import.meta.env.VITE_APP_NAME}
            <span style={{ color: "var(--accent)" }}>.</span>
            {import.meta.env.VITE_APP_NAME_EXTENSION}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              background: "oklch(99% 0.003 165 / 0.12)",
              borderRadius: 20,
              marginBottom: 24,
              border: "1px solid oklch(99% 0.003 165 / 0.15)",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "oklch(75% 0.18 165)",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-xs)",
                fontWeight: 600,
                color: "oklch(99% 0.003 165 / 0.7)",
                letterSpacing: "0.06em",
                textTransform: "uppercase" as const,
              }}
            >
              Admin Panel
            </span>
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "2.1rem",
              lineHeight: 1.15,
              letterSpacing: "-0.04em",
              color: "oklch(99% 0.003 165)",
              marginBottom: 16,
            }}
          >
            Manage your
            <br />
            <span style={{ color: "oklch(75% 0.18 165)" }}>portfolio</span>{" "}
            content.
          </h2>
          <p
            style={{
              fontSize: "var(--text-sm)",
              color: "oklch(99% 0.003 165 / 0.55)",
              lineHeight: 1.75,
              maxWidth: 300,
            }}
          >
            Projects, experience, and messages — all in one place. Simple, fast,
            and designed for you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          style={{ display: "flex", gap: 32 }}
        >
          {[
            { label: "Projects", value: "∞" },
            { label: "Experience", value: "∞" },
            { label: "Messages", value: "∞" },
          ].map((s) => (
            <div key={s.label}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.4rem",
                  color: "oklch(99% 0.003 165)",
                  letterSpacing: "-0.03em",
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: "var(--text-xs)",
                  color: "oklch(99% 0.003 165 / 0.45)",
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  marginTop: 2,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          background: "var(--surface)",
          minWidth: 0,
        }}
      >
        <div
          className="flex items-center justify-between"
          style={{
            padding: "20px 40px",
            borderBottom: "1px solid var(--border-color)",
            flexShrink: 0,
          }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-sm)",
              fontWeight: 500,
              color: "var(--text-subtle)",
              textDecoration: "none",
              transition: "color 150ms ease",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "var(--accent)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color =
                "var(--text-subtle)")
            }
          >
            <FiArrowLeft size={15} /> {t("login.backToPortfolio")}
          </Link>
          <div className="flex items-center gap-1">
            <LangDropdown />
            <ThemeToggle />
          </div>
        </div>

        <div
          className="flex items-center justify-center"
          style={{ flex: 1, padding: "40px" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            style={{ width: "100%", maxWidth: 400 }}
          >
            <div style={{ marginBottom: 36 }}>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-2xl)",
                  fontWeight: 800,
                  color: "var(--text)",
                  letterSpacing: "-0.03em",
                  marginBottom: 8,
                }}
              >
                {t("login.title")}
              </h1>
              <p
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--text-muted)",
                  lineHeight: 1.65,
                }}
              >
                {t("login.subtitle")}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label
                  htmlFor="email"
                  style={{
                    display: "block",
                    marginBottom: 7,
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-xs)",
                    fontWeight: 600,
                    color: "var(--text-muted)",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase" as const,
                  }}
                >
                  {t("login.email")}
                </label>
                <div style={{ position: "relative" }}>
                  <FiMail
                    size={15}
                    style={{
                      position: "absolute",
                      left: 14,
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "var(--text-subtle)",
                      pointerEvents: "none",
                    }}
                  />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@portfolio.dev"
                    style={inputBase}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--accent)";
                      e.target.style.boxShadow = "0 0 0 3px var(--accent-soft)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "var(--border-color)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  style={{
                    display: "block",
                    marginBottom: 7,
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-xs)",
                    fontWeight: 600,
                    color: "var(--text-muted)",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase" as const,
                  }}
                >
                  {t("login.password")}
                </label>
                <div style={{ position: "relative" }}>
                  <FiLock
                    size={15}
                    style={{
                      position: "absolute",
                      left: 14,
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "var(--text-subtle)",
                      pointerEvents: "none",
                    }}
                  />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    style={{ ...inputBase, paddingRight: 44 }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--accent)";
                      e.target.style.boxShadow = "0 0 0 3px var(--accent-soft)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "var(--border-color)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    style={{
                      position: "absolute",
                      right: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "var(--text-subtle)",
                      padding: 4,
                      display: "flex",
                    }}
                    aria-label={
                      showPassword
                        ? t("login.hidePassword")
                        : t("login.showPassword")
                    }
                  >
                    {showPassword ? (
                      <FiEyeOff size={15} />
                    ) : (
                      <FiEye size={15} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  marginTop: 4,
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: "12px 24px",
                  background: loading ? "oklch(55% 0.15 165)" : "var(--accent)",
                  color: "oklch(99% 0.003 165)",
                  border: "none",
                  borderRadius: 10,
                  cursor: loading ? "not-allowed" : "pointer",
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-sm)",
                  fontWeight: 600,
                  letterSpacing: "0.01em",
                  transition: "background 150ms ease, transform 80ms ease",
                  boxShadow: loading
                    ? "none"
                    : "0 4px 14px color-mix(in srgb, var(--accent) 30%, transparent)",
                }}
                onMouseEnter={(e) => {
                  if (!loading)
                    (e.currentTarget as HTMLElement).style.background =
                      "oklch(55% 0.15 165)";
                }}
                onMouseLeave={(e) => {
                  if (!loading)
                    (e.currentTarget as HTMLElement).style.background =
                      "var(--accent)";
                }}
                onMouseDown={(e) => {
                  if (!loading)
                    (e.currentTarget as HTMLElement).style.transform =
                      "scale(0.98)";
                }}
                onMouseUp={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                }}
              >
                {loading ? (
                  <>
                    <span
                      style={{
                        width: 14,
                        height: 14,
                        border: "2px solid oklch(99% 0.003 165 / 0.3)",
                        borderTop: "2px solid oklch(99% 0.003 165)",
                        borderRadius: "50%",
                        animation: "spin 0.6s linear infinite",
                        display: "inline-block",
                      }}
                    />
                    {t("login.submitting")}
                  </>
                ) : (
                  t("login.submit")
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) { .login-brand { display: none !important; } }
      `}</style>
    </div>
  );
}
