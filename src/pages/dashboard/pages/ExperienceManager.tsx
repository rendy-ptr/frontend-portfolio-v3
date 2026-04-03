import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FiPlus, FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import { experiences as initialExps } from "../../../data/portfolio.tsx";

type Exp = (typeof initialExps)[number];

const ease = [0.16, 1, 0.3, 1] as const;
const emptyExp: Omit<Exp, "id"> = {
  company: "",
  role: "",
  period: "",
  type: "",
  description: "",
  tech: [],
  color: "",
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

export default function ExperienceManager() {
  const { t } = useTranslation();
  const [items, setItems] = useState<Exp[]>(initialExps);
  const [panelOpen, setPanelOpen] = useState(false);
  const [editing, setEditing] = useState<Exp | null>(null);
  const [form, setForm] = useState<Omit<Exp, "id">>(emptyExp);
  const [techInput, setTechInput] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyExp);
    setTechInput("");
    setPanelOpen(true);
  };
  const openEdit = (e: Exp) => {
    setEditing(e);
    setForm({ ...e });
    setTechInput(e.tech.join(", "));
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
        prev.map((e) =>
          e.id === editing.id ? { ...editing, ...form, tech: techArr } : e,
        ),
      );
    } else {
      setItems((prev) => [...prev, { ...form, tech: techArr, id: Date.now() }]);
    }
    closePanel();
  };
  const doDelete = () => {
    if (deleteId !== null) {
      setItems((prev) => prev.filter((e) => e.id !== deleteId));
      setDeleteId(null);
    }
  };

  return (
    <div style={{ padding: "32px 32px 48px" }}>
      <div className="flex items-center justify-between mb-8">
        {" "}
        {/* Header */}
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
            {t("dashboard.experience.title")}
          </h1>
          <p style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
            {items.length} entries
          </p>
        </div>
        <button className="btn-primary" onClick={openAdd}>
          <FiPlus size={16} /> {t("dashboard.experience.addBtn")}
        </button>
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--surface-alt)" }}>
              {["Role", "Company", "Period", "Type", "Actions"].map((h) => (
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
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((exp, i) => (
              <motion.tr
                key={exp.id}
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
                    {exp.role}
                  </span>
                </td>
                <td style={{ padding: "14px 18px" }}>
                  <span
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "var(--accent)",
                      fontFamily: "var(--font-display)",
                      fontWeight: 500,
                    }}
                  >
                    {exp.company}
                  </span>
                </td>
                <td style={{ padding: "14px 18px" }}>
                  <span className="tag">{exp.period}</span>
                </td>
                <td style={{ padding: "14px 18px" }}>
                  <span className="tag">{exp.type}</span>
                </td>
                <td style={{ padding: "14px 18px" }}>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(exp)}
                      className="btn-ghost"
                      style={{
                        padding: "5px 10px",
                        fontSize: "var(--text-xs)",
                      }}
                    >
                      <FiEdit2 size={13} /> {t("dashboard.experience.editBtn")}
                    </button>
                    <button
                      onClick={() => setDeleteId(exp.id)}
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
                      <FiTrash2 size={13} />{" "}
                      {t("dashboard.experience.deleteBtn")}
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
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
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
                {t("dashboard.experience.deleteConfirmTitle")}
              </h3>
              <p
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--text-muted)",
                  marginBottom: 20,
                }}
              >
                {t("dashboard.experience.deleteConfirmBody")}
              </p>
              <div className="flex gap-3">
                <button
                  className="btn-outline"
                  onClick={() => setDeleteId(null)}
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  {t("dashboard.experience.cancelBtn")}
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
                  {t("dashboard.experience.deleteBtn")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide panel */}
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
                    ? t("dashboard.experience.editTitle")
                    : t("dashboard.experience.addTitle")}
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
              <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
                <div className="flex flex-col gap-5">
                  {[
                    {
                      id: "role",
                      label: t("dashboard.experience.fields.role"),
                      placeholder: t(
                        "dashboard.experience.fields.rolePlaceholder",
                      ),
                    },
                    {
                      id: "company",
                      label: t("dashboard.experience.fields.company"),
                      placeholder: t(
                        "dashboard.experience.fields.companyPlaceholder",
                      ),
                    },
                    {
                      id: "period",
                      label: t("dashboard.experience.fields.period"),
                      placeholder: t(
                        "dashboard.experience.fields.periodPlaceholder",
                      ),
                    },
                    {
                      id: "type",
                      label: t("dashboard.experience.fields.type"),
                      placeholder: t(
                        "dashboard.experience.fields.typePlaceholder",
                      ),
                    },
                  ].map((f) => (
                    <div key={f.id}>
                      <label style={labelStyle}>{f.label}</label>
                      <input
                        type="text"
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
                      {t("dashboard.experience.fields.description")}
                    </label>
                    <textarea
                      rows={4}
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
                      {t("dashboard.experience.fields.tech")}
                    </label>
                    <input
                      type="text"
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      placeholder={t(
                        "dashboard.experience.fields.techPlaceholder",
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
                </div>
              </div>
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
                  {t("dashboard.experience.cancelBtn")}
                </button>
                <button
                  className="btn-primary"
                  onClick={save}
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  {editing
                    ? t("dashboard.experience.saveBtn")
                    : t("dashboard.experience.addBtn")}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
