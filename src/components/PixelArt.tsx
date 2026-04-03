import type { CSSProperties } from "react";

/* ── Section Header — clean, left-aligned ── */
export function SectionHeader({
  label,
  title,
}: {
  label: string;
  title: string;
}) {
  return (
    <div style={{ marginBottom: 48 }}>
      <div className="section-label">{label}</div>
      <h2 className="section-title">{title}</h2>
    </div>
  );
}

/* ── Thin accent divider ── */
export function Divider({
  style,
  color,
}: {
  style?: CSSProperties;
  color?: string;
}) {
  return (
    <div
      style={{
        height: 1,
        background: color || "var(--border-color)",
        width: "100%",
        ...style,
      }}
    />
  );
}
