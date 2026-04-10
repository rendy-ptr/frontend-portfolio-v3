import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { CheckIcon } from "./ui/check";
import { LanguagesIcon } from "./ui/languages";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "id", label: "Indonesia" },
];

export function LangDropdown() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGUAGES.find((l) => l.code === i18n.language) ?? LANGUAGES[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
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
          transition: "color 150ms ease, background 150ms ease",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.color = "var(--accent)";
          (e.currentTarget as HTMLElement).style.background = "var(--surface-alt)";
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
            transition={{ duration: 0.15 }}
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
                  onClick={() => { i18n.changeLanguage(lang.code); setOpen(false); }}
                  className="w-full flex items-center gap-3 cursor-pointer"
                  style={{
                    padding: "10px 14px",
                    background: isActive ? "var(--accent-soft)" : "transparent",
                    color: isActive ? "var(--accent)" : "var(--text-muted)",
                    border: "none",
                    borderBottom: "1px solid var(--border-color)",
                    textAlign: "left" as const,
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-sm)",
                    fontWeight: isActive ? 600 : 400,
                    transition: "background 150ms ease",
                    cursor: "pointer",
                    width: "100%",
                  }}
                  onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "var(--surface-alt)"; }}
                  onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <span
                    className="flex items-center justify-center"
                    style={{
                      width: 22, height: 22, borderRadius: "50%",
                      background: isActive ? "var(--accent)" : "var(--border-color)",
                      color: isActive ? "var(--surface)" : "var(--text-muted)",
                      fontFamily: "var(--font-display)",
                      fontSize: "0.65rem", fontWeight: 700, flexShrink: 0,
                    }}
                  >
                    {lang.code.toUpperCase()}
                  </span>
                  <span>{lang.label}</span>
                  {isActive && <span className="ml-auto" style={{ color: "var(--accent)" }}><CheckIcon size={16} /></span>}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
