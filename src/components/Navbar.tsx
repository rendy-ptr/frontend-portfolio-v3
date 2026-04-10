import { useState, useEffect, useRef } from "react";
import { Link } from "react-scroll";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { SunIcon } from "./ui/sun";
import { MoonIcon } from "./ui/moon";
import { LanguagesIcon } from "./ui/languages";
import { useTheme } from "../context/ThemeContext";
import i18n from "@/i18n";
import { CheckIcon } from "./ui/check";
import { MenuIcon } from "./ui/menu";
import { XIcon } from "./ui/x";

function NavLink({
  label,
  to,
  active,
  onClick,
}: {
  label: string;
  to: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link to={to} smooth duration={600} offset={-72} spy onClick={onClick}>
      <span
        className="nav-link"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-sm)",
          fontWeight: active ? 600 : 500,
          padding: "6px 12px",
          cursor: "pointer",
          color: active ? "var(--accent)" : "var(--text-muted)",
          background: active ? "var(--accent-soft)" : "transparent",
          borderRadius: 6,
          transition: `color var(--transition-fast), background-color var(--transition-fast)`,
          display: "block",
          letterSpacing: "0.01em",
        }}
        onMouseEnter={(e) => {
          if (!active) {
            (e.currentTarget as HTMLElement).style.color = "var(--text)";
            (e.currentTarget as HTMLElement).style.background =
              "var(--surface-alt)";
          }
        }}
        onMouseLeave={(e) => {
          if (!active) {
            (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
            (e.currentTarget as HTMLElement).style.background = "transparent";
          }
        }}
      >
        {label}
      </span>
    </Link>
  );
}

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "id", label: "Indonesia" },
];

function LangDropdown() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current =
    LANGUAGES.find((l) => l.code === i18n.language) ?? LANGUAGES[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 cursor-pointer"
        style={{
          height: 36,
          padding: "0 10px",
          background: "transparent",
          border: "none",
          color: open ? "var(--accent)" : "var(--text-muted)",
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-xs)",
          fontWeight: 500,
          borderRadius: 6,
          transition: `color var(--transition-fast), background-color var(--transition-fast)`,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.color = "var(--accent)";
          (e.currentTarget as HTMLElement).style.background =
            "var(--surface-alt)";
        }}
        onMouseLeave={(e) => {
          if (!open) {
            (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
            (e.currentTarget as HTMLElement).style.background = "transparent";
          }
        }}
        title="Switch language"
      >
        <LanguagesIcon size={18} />
        <span>{current.code.toUpperCase()}</span>
      </button>


      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{
              duration: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute right-0 overflow-hidden z-50"
            style={{
              top: "calc(100% + 8px)",
              minWidth: 160,
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              borderRadius: 10,
              boxShadow: "var(--shadow-lg)",
            }}
          >
            {LANGUAGES.map((lang) => {
              const isActive = i18n.language === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    i18n.changeLanguage(lang.code);
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-3 cursor-pointer"
                  style={{
                    padding: "10px 14px",
                    background: isActive ? "var(--accent-soft)" : "transparent",
                    color: isActive ? "var(--accent)" : "var(--text-muted)",
                    border: "none",
                    borderBottom: "1px solid var(--border-color)",
                    textAlign: "left",
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-sm)",
                    fontWeight: isActive ? 600 : 400,
                    transition: `background-color var(--transition-fast)`,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive)
                      (e.currentTarget as HTMLElement).style.background =
                        "var(--surface-alt)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive)
                      (e.currentTarget as HTMLElement).style.background =
                        "transparent";
                  }}
                >
                  <span
                    className="flex items-center justify-center"
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: isActive
                        ? "var(--accent)"
                        : "var(--border-color)",
                      color: isActive ? "var(--surface)" : "var(--text-muted)",
                      fontFamily: "var(--font-display)",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: "0.02em",
                      flexShrink: 0,
                    }}
                  >
                    {lang.code.toUpperCase()}
                  </span>
                  <span>{lang.label}</span>
                  {isActive && (
                    <span
                      className="ml-auto"
                      style={{ color: "var(--accent)" }}
                    >
                      <CheckIcon size={16} />
                    </span>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const NAV_LINKS = [
  { key: "nav.home", to: "hero" },
  { key: "nav.about", to: "about" },
  { key: "nav.experience", to: "experience" },
  { key: "nav.skills", to: "skills" },
  { key: "nav.projects", to: "projects" },
  { key: "nav.certificates", to: "certificate" },
  { key: "nav.contact", to: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { dark, toggle } = useTheme();
  const { t } = useTranslation();


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = NAV_LINKS.map((l) => document.getElementById(l.to));
      const scrollY = window.scrollY + 100;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(NAV_LINKS[i].to);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled
          ? "color-mix(in srgb, var(--bg) 85%, transparent)"
          : "var(--bg)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled
          ? "1px solid var(--border-color)"
          : "1px solid transparent",
        transition: `background-color var(--duration-slow) var(--ease-out-quart), border-color var(--duration-slow) var(--ease-out-quart), backdrop-filter var(--duration-slow) var(--ease-out-quart)`,
      }}
    >
      <div
        className="container flex items-center justify-between"
        style={{ height: 64 }}
      >
        <Link
          to="hero"
          smooth
          duration={600}
          className="cursor-pointer select-none"
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "1.15rem",
              letterSpacing: "-0.02em",
              color: "var(--text)",
            }}
          >
            {import.meta.env.VITE_APP_NAME}
            <span style={{ color: "var(--accent)" }}>.</span>
            {import.meta.env.VITE_APP_NAME_EXTENSION}
          </span>
        </Link>

        <ul className="nav-desktop flex list-none gap-0.5 items-center">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                label={t(link.key)}
                to={link.to}
                active={activeSection === link.to}
              />
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <LangDropdown />

          <button
            onClick={toggle}
            className="flex items-center justify-center cursor-pointer"
            style={{
              width: 36,
              height: 36,
              background: "transparent",
              border: "none",
              color: "var(--text-muted)",
              borderRadius: 8,
              transition: `color var(--transition-fast), background-color var(--transition-fast)`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--accent)";
              (e.currentTarget as HTMLElement).style.background =
                "var(--surface-alt)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color =
                "var(--text-muted)";
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
            title={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {dark ? <SunIcon size={18} /> : <MoonIcon size={18} />}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="nav-hamburger hidden items-center justify-center cursor-pointer"
            style={{
              width: 36,
              height: 36,
              background: "transparent",
              border: "none",
              color: "var(--text)",
              borderRadius: 8,
            }}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div
              className="px-6 py-4 flex flex-col gap-1"
              style={{
                background: "var(--bg)",
                borderTop: "1px solid var(--border-color)",
              }}
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  smooth
                  duration={600}
                  offset={-72}
                  onClick={() => setMenuOpen(false)}
                >
                  <div
                    className="py-3 px-4 cursor-pointer"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "var(--text-sm)",
                      fontWeight: activeSection === link.to ? 600 : 400,
                      borderRadius: 8,
                      background:
                        activeSection === link.to
                          ? "var(--accent-soft)"
                          : "transparent",
                      color:
                        activeSection === link.to
                          ? "var(--accent)"
                          : "var(--text-muted)",
                      transition: `background-color var(--transition-fast), color var(--transition-fast)`,
                    }}
                  >
                    {t(link.key)}
                  </div>
                </Link>
              ))}

              <div
                className="flex gap-2 mt-3 pt-3"
                style={{ borderTop: "1px solid var(--border-color)" }}
              >
                {LANGUAGES.map((lang) => {
                  const isActive = i18n.language === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => {
                        i18n.changeLanguage(lang.code);
                      }}
                      className="flex items-center gap-1.5 cursor-pointer"
                      style={{
                        padding: "8px 14px",
                        fontFamily: "var(--font-display)",
                        fontSize: "var(--text-sm)",
                        fontWeight: isActive ? 600 : 400,
                        background: isActive
                          ? "var(--accent-soft)"
                          : "var(--surface-alt)",
                        border: "1px solid",
                        borderColor: isActive
                          ? "var(--accent)"
                          : "var(--border-color)",
                        color: isActive ? "var(--accent)" : "var(--text-muted)",
                        borderRadius: 8,
                        transition: `all var(--transition-fast)`,
                      }}
                    >
                      <span
                        className="flex items-center justify-center"
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          background: isActive
                            ? "var(--accent)"
                            : "var(--border-color)",
                          color: isActive
                            ? "var(--surface)"
                            : "var(--text-muted)",
                          fontFamily: "var(--font-display)",
                          fontSize: "0.6rem",
                          fontWeight: 700,
                        }}
                      >
                        {lang.code.toUpperCase()}
                      </span>
                      <span>{lang.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
