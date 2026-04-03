import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FiExternalLink } from "react-icons/fi";
import { LangDropdown } from "../../components/LangDropdown";
import { ThemeToggle } from "../../components/ThemeToggle";
import { MenuIcon } from "@/components/ui/menu";
import { XIcon } from "@/components/ui/x";
import { getDashboardNav } from "@/constants/dashboard";
import { LogoutIcon } from "@/components/ui/logout";
import { ArrowUpRightIcon } from "@/components/ui/arrow-up-right";

export default function DashboardLayout() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const nav = getDashboardNav(t);

  const sidebarW = sidebarOpen ? 240 : 64;

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "var(--bg)",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* ── Sidebar ── */}
      <motion.aside
        animate={{ width: sidebarW }}
        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
        style={{
          width: sidebarW,
          background: "var(--surface)",
          borderRight: "1px solid var(--border-color)",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 50,
          overflow: "hidden",
        }}
      >
        {/* Logo + toggle */}
        <div
          className="flex items-center"
          style={{
            padding: sidebarOpen ? "20px 20px 20px 24px" : "20px 10px",
            borderBottom: "1px solid var(--border-color)",
            minHeight: 64,
            flexShrink: 0,
            justifyContent: sidebarOpen ? "space-between" : "center",
          }}
        >
          <AnimatePresence>
            {sidebarOpen && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "var(--text-base)",
                  color: "var(--text)",
                  whiteSpace: "nowrap",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "1.3rem",
                    letterSpacing: "-0.04em",
                    color: "oklch(99% 0.003 165)",
                    display: "inline-block",
                  }}
                >
                  {import.meta.env.VITE_APP_NAME}
                  <span style={{ color: "var(--accent)" }}>.</span>
                  {import.meta.env.VITE_APP_NAME_EXTENSION}
                </span>
              </motion.span>
            )}
          </AnimatePresence>
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-muted)",
              padding: sidebarOpen ? 6 : "10px 0",
              width: sidebarOpen ? "auto" : "100%",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "color 150ms ease, background 150ms ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "var(--surface-alt)";
              (e.currentTarget as HTMLElement).style.color = "var(--text)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color =
                "var(--text-muted)";
            }}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <XIcon size={18} /> : <MenuIcon size={18} />}
          </button>
        </div>

        {/* Nav */}
        <nav
          className="flex flex-col gap-1"
          style={{ padding: "16px 10px", flex: 1, overflowY: "auto" }}
        >
          {nav.map((item, index: number) => (
            <NavLink
              key={`${item.path}-${index}`}
              to={item.path}
              end={item.path === "/dashboard"}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: sidebarOpen ? "10px 12px" : "10px 0",
                justifyContent: sidebarOpen ? "flex-start" : "center",
                borderRadius: 8,
                textDecoration: "none",
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-sm)",
                fontWeight: 500,
                color: isActive ? "var(--accent)" : "var(--text-muted)",
                background: isActive ? "var(--accent-soft)" : "transparent",
                transition: "color 150ms ease, background 150ms ease",
                whiteSpace: "nowrap",
              })}
            >
              <span style={{ flexShrink: 0 }}>{item.icon}</span>
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.12 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div
          style={{
            padding: "12px 10px",
            borderTop: "1px solid var(--border-color)",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: sidebarOpen ? "9px 12px" : "9px 0",
              justifyContent: sidebarOpen ? "flex-start" : "center",
              borderRadius: 8,
              textDecoration: "none",
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-sm)",
              fontWeight: 500,
              color: "var(--text-muted)",
              transition: "color 150ms ease, background 150ms ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "var(--surface-alt)";
              (e.currentTarget as HTMLElement).style.color = "var(--text)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "";
              (e.currentTarget as HTMLElement).style.color =
                "var(--text-muted)";
            }}
          >
            <ArrowUpRightIcon size={18} style={{ flexShrink: 0 }} />
            <AnimatePresence>
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.12 }}
                >
                  {t("dashboard.viewSite")}
                </motion.span>
              )}
            </AnimatePresence>
          </a>

          <button
            onClick={() => navigate("/login")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: sidebarOpen ? "9px 12px" : "9px 0",
              justifyContent: sidebarOpen ? "flex-start" : "center",
              borderRadius: 8,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-sm)",
              fontWeight: 500,
              color: "oklch(52% 0.18 25)",
              transition: "background 150ms ease",
              width: "100%",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "oklch(96% 0.02 25)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "";
            }}
          >
            <LogoutIcon size={18} style={{ flexShrink: 0 }} />
            <AnimatePresence>
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.12 }}
                >
                  {t("dashboard.signOut")}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>

      {/* ── Main area ── */}
      <div
        style={{
          flex: 1,
          marginLeft: sidebarW,
          transition: "margin-left 0.22s ease",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* Top header */}
        <div
          className="flex items-center justify-end"
          style={{
            height: 64,
            padding: "0 24px",
            borderBottom: "1px solid var(--border-color)",
            background: "var(--surface)",
            flexShrink: 0,
            gap: 8,
          }}
        >
          <LangDropdown />
          <ThemeToggle />
        </div>

        {/* Page content */}
        <div style={{ flex: 1 }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
