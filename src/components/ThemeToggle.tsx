import { useTheme } from "./Navbar";
import { SunIcon } from "./ui/sun";
import { MoonIcon } from "./ui/moon";

export function ThemeToggle() {
  const { dark, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      style={{
        width: 36, height: 36, background: "transparent", border: "none",
        color: "var(--text-muted)", borderRadius: 8, cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "color 150ms ease, background 150ms ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.color = "var(--accent)";
        (e.currentTarget as HTMLElement).style.background = "var(--surface-alt)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
        (e.currentTarget as HTMLElement).style.background = "transparent";
      }}
      title={dark ? "Light mode" : "Dark mode"}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? <SunIcon size={18} /> : <MoonIcon size={18} />}
    </button>
  );
}
