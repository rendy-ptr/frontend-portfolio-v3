import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiX,
  FiGithub,
  FiExternalLink,
  FiStar,
} from "react-icons/fi";
import { projects as initialProjects } from "../../../data/portfolio.tsx";

type Project = (typeof initialProjects)[number];

const ease = [0.16, 1, 0.3, 1] as const;
const empty: Omit<Project, "id"> = {
  title: "",
  description: "",
  image: "",
  tech: [],
  github: "",
  live: "",
  featured: false,
  color: "#7C3AED",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "9px 12px",
  border: "1px solid var(--border-color)",
  borderRadius: 8,
  background: "var(--surface)",
  color: "var(--text)",
  fontFamily: "var(--font-body)",
  fontSize: "var(--text-sm)",
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "var(--text-xs)",
  fontWeight: 600,
  color: "var(--text-muted)",
  textTransform: "uppercase" as const,
  letterSpacing: "0.04em",
  display: "block",
  marginBottom: 6,
};

export default function ProjectsManager() {
  const { t } = useTranslation();
  const [items, setItems] = useState<Project[]>(
    initialProjects.map((p, i) => ({ ...p, id: p.id ?? i + 1 })),
  );
  const [panelOpen, setPanelOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<Omit<Project, "id">>(empty);
  const [techInput, setTechInput] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const openAdd = () => {
    setEditing(null);
    setForm(empty);
    setTechInput("");
    setPanelOpen(true);
  };

  const openEdit = (p: Project) => {
    setEditing(p);
    setForm({ ...p });
    setTechInput(p.tech.join(", "));
    setPanelOpen(true);
  };

  const closePanel = () => setPanelOpen(false);

  const save = () => {
    const techArr = techInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    if (editing) {
      setItems((prev) =>
        prev.map((p) =>
          p.id === editing.id ? { ...editing, ...form, tech: techArr } : p,
        ),
      );
    } else {
      setItems((prev) => [...prev, { ...form, tech: techArr, id: Date.now() }]);
    }
    closePanel();
  };

  const confirmDelete = (id: number) => setDeleteId(id);
  const doDelete = () => {
    if (deleteId !== null) {
      setItems((prev) => prev.filter((p) => p.id !== deleteId));
      setDeleteId(null);
    }
  };

  return (
    <div style={{ padding: "32px 32px 48px" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
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
            {t("dashboard.projects.title")}
          </h1>
          <p style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
            {items.length} projects · {items.filter((p) => p.featured).length}{" "}
            featured
          </p>
        </div>
        <button className="btn-primary" onClick={openAdd}>
          <FiPlus size={16} /> {t("dashboard.projects.addBtn")}
        </button>
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--surface-alt)" }}>
              {["Title", "Tech", "Featured", "Links", "Actions"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "12px 18px",
                    textAlign: "left" as const,
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-xs)",
                    fontWeight: 600,
                    color: "var(--text-muted)",
                    textTransform: "uppercase" as const,
                    letterSpacing: "0.05em",
                    borderBottom: "1px solid var(--border-color)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((p, i) => (
              <motion.tr
                key={p.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                style={{
                  borderBottom:
                    i < items.length - 1
                      ? "1px solid var(--border-color)"
                      : "none",
                }}
              >
                <td style={{ padding: "14px 18px" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      fontSize: "var(--text-sm)",
                      color: "var(--text)",
                    }}
                  >
                    {p.title}
                  </span>
                </td>
                <td style={{ padding: "14px 18px" }}>
                  <div className="flex flex-wrap gap-1">
                    {p.tech.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="tag"
                        style={{ fontSize: "var(--text-xs)" }}
                      >
                        {t}
                      </span>
                    ))}
                    {p.tech.length > 3 && (
                      <span
                        className="tag"
                        style={{ fontSize: "var(--text-xs)" }}
                      >
                        +{p.tech.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td style={{ padding: "14px 18px" }}>
                  {p.featured ? (
                    <span
                      className="inline-flex items-center gap-1"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "var(--text-xs)",
                        fontWeight: 600,
                        color: "var(--accent-text)",
                        background: "var(--accent-soft)",
                        padding: "3px 10px",
                        borderRadius: 5,
                      }}
                    >
                      <FiStar size={11} /> {t("dashboard.projects.featured")}
                    </span>
                  ) : (
                    <span
                      style={{
                        fontSize: "var(--text-xs)",
                        color: "var(--text-subtle)",
                      }}
                    >
                      —
                    </span>
                  )}
                </td>
                <td style={{ padding: "14px 18px" }}>
                  <div
                    className="flex gap-2.5"
                    style={{ color: "var(--text-subtle)" }}
                  >
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "inherit", transition: "color 150ms" }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.color =
                          "var(--accent)")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.color =
                          "var(--text-subtle)")
                      }
                    >
                      <FiGithub size={15} />
                    </a>
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "inherit", transition: "color 150ms" }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.color =
                          "var(--accent)")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.color =
                          "var(--text-subtle)")
                      }
                    >
                      <FiExternalLink size={15} />
                    </a>
                  </div>
                </td>
                <td style={{ padding: "14px 18px" }}>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(p)}
                      className="btn-ghost"
                      style={{
                        padding: "5px 10px",
                        fontSize: "var(--text-xs)",
                      }}
                    >
                      <FiEdit2 size={13} /> {t("dashboard.projects.editBtn")}
                    </button>
                    <button
                      onClick={() => confirmDelete(p.id)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        padding: "5px 10px",
                        fontSize: "var(--text-xs)",
                        fontFamily: "var(--font-display)",
                        fontWeight: 500,
                        color: "oklch(52% 0.18 25)",
                        background: "transparent",
                        border: "none",
                        borderRadius: 7,
                        cursor: "pointer",
                        transition: "background 150ms ease",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.background =
                          "oklch(96% 0.02 25)")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.background =
                          "transparent")
                      }
                    >
                      <FiTrash2 size={13} /> {t("dashboard.projects.deleteBtn")}
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete confirm */}
      <AnimatePresence>
        {deleteId !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center"
            style={{
              position: "fixed",
              inset: 0,
              background: "oklch(0% 0 0 / 0.4)",
              zIndex: 100,
            }}
            onClick={() => setDeleteId(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 12 }}
              className="card"
              style={{ padding: "28px 32px", maxWidth: 360, width: "100%" }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "var(--text-base)",
                  color: "var(--text)",
                  marginBottom: 8,
                }}
              >
                {t("dashboard.projects.deleteConfirmTitle")}
              </h3>
              <p
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--text-muted)",
                  marginBottom: 20,
                }}
              >
                {t("dashboard.projects.deleteConfirmBody")}
              </p>
              <div className="flex gap-3">
                <button
                  className="btn-outline"
                  onClick={() => setDeleteId(null)}
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  {t("dashboard.projects.cancelBtn")}
                </button>
                <button
                  onClick={doDelete}
                  className="btn-primary"
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    background: "oklch(52% 0.18 25)",
                  }}
                >
                  {t("dashboard.projects.deleteBtn")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit/Add slide panel */}
      <AnimatePresence>
        {panelOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: "fixed",
                inset: 0,
                background: "oklch(0% 0 0 / 0.3)",
                zIndex: 90,
              }}
              onClick={closePanel}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease }}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                width: 440,
                background: "var(--surface)",
                borderLeft: "1px solid var(--border-color)",
                zIndex: 95,
                display: "flex",
                flexDirection: "column",
                boxShadow: "var(--shadow-lg)",
              }}
            >
              {/* Panel header */}
              <div
                className="flex items-center justify-between"
                style={{
                  padding: "20px 24px",
                  borderBottom: "1px solid var(--border-color)",
                  flexShrink: 0,
                }}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "var(--text-base)",
                    color: "var(--text)",
                  }}
                >
                  {editing
                    ? t("dashboard.projects.editTitle")
                    : t("dashboard.projects.addTitle")}
                </h2>
                <button
                  onClick={closePanel}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--text-muted)",
                    display: "flex",
                  }}
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Form */}
              <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
                <div className="flex flex-col gap-5">
                  {[
                    {
                      id: "title",
                      label: t("dashboard.projects.fields.title"),
                      type: "text",
                      placeholder: t(
                        "dashboard.projects.fields.titlePlaceholder",
                      ),
                    },
                    {
                      id: "github",
                      label: t("dashboard.projects.fields.github"),
                      type: "url",
                      placeholder: "https://github.com/...",
                    },
                    {
                      id: "live",
                      label: t("dashboard.projects.fields.live"),
                      type: "url",
                      placeholder: "https://...",
                    },
                    {
                      id: "image",
                      label: t("dashboard.projects.fields.image"),
                      type: "url",
                      placeholder: "https://...",
                    },
                  ].map((f) => (
                    <div key={f.id}>
                      <label style={labelStyle}>{f.label}</label>
                      <input
                        type={f.type}
                        value={
                          (form as Record<string, unknown>)[f.id] as string
                        }
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            [f.id]: e.target.value,
                          }))
                        }
                        placeholder={f.placeholder}
                        style={inputStyle}
                        onFocus={(e) => {
                          e.target.style.borderColor = "var(--accent)";
                          e.target.style.boxShadow =
                            "0 0 0 3px var(--accent-soft)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "var(--border-color)";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>
                  ))}

                  <div>
                    <label style={labelStyle}>
                      {t("dashboard.projects.fields.description")}
                    </label>
                    <textarea
                      rows={3}
                      value={form.description}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      style={{ ...inputStyle, resize: "vertical" as const }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "var(--accent)";
                        e.target.style.boxShadow =
                          "0 0 0 3px var(--accent-soft)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "var(--border-color)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>
                      {t("dashboard.projects.fields.tech")}
                    </label>
                    <input
                      type="text"
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      placeholder={t(
                        "dashboard.projects.fields.techPlaceholder",
                      )}
                      style={inputStyle}
                      onFocus={(e) => {
                        e.target.style.borderColor = "var(--accent)";
                        e.target.style.boxShadow =
                          "0 0 0 3px var(--accent-soft)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "var(--border-color)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          featured: e.target.checked,
                        }))
                      }
                      style={{
                        width: 16,
                        height: 16,
                        accentColor: "var(--accent)",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "var(--text-sm)",
                        fontWeight: 500,
                        color: "var(--text)",
                      }}
                    >
                      {t("dashboard.projects.fields.featured")}
                    </span>
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div
                className="flex gap-3"
                style={{
                  padding: "16px 24px",
                  borderTop: "1px solid var(--border-color)",
                  flexShrink: 0,
                }}
              >
                <button
                  className="btn-outline"
                  onClick={closePanel}
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  {t("dashboard.projects.cancelBtn")}
                </button>
                <button
                  className="btn-primary"
                  onClick={save}
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  {editing
                    ? t("dashboard.projects.saveBtn")
                    : t("dashboard.projects.addTitle")}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
