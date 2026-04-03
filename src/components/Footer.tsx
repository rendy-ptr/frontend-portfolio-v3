import { useTranslation } from "react-i18next";
import { Link } from "react-scroll";
import { ArrowUpIcon } from "./ui/arrow-up";

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--border-color)",
      }}
    >
      <div
        className="container flex items-center justify-between flex-wrap gap-4"
        style={{ paddingTop: 24, paddingBottom: 24 }}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-sm)",
            fontWeight: 400,
            color: "var(--text-subtle)",
          }}
        >
          {t("footer.builtWith")} © {year}
        </div>

        <Link to="hero" smooth duration={800}>
          <button
            className="btn-ghost"
            style={{
              fontSize: "var(--text-xs)",
              padding: "8px 14px",
            }}
          >
            <ArrowUpIcon size={14} /> {t("footer.backToTop") || "Back to top"}
          </button>
        </Link>
      </div>
    </footer>
  );
}
