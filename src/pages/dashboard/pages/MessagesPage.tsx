import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FiTrash2, FiMail } from "react-icons/fi";

type Msg = {
  id: number;
  name: string;
  email: string;
  message: string;
  received: string;
  read: boolean;
};

const ease = [0.16, 1, 0.3, 1] as const;

const mockData: Msg[] = [
  {
    id: 1,
    name: "Sarah Chen",
    email: "sarah@example.com",
    message:
      "Hi! I saw your portfolio and would love to discuss a React project opportunity. Are you available for a quick call?",
    received: "2026-03-23 09:14",
    read: false,
  },
  {
    id: 2,
    name: "David Kim",
    email: "dkim@agency.io",
    message:
      "We're looking for a freelance full-stack dev for a 3-month engagement. Your work on NeoShop looks impressive.",
    received: "2026-03-22 15:30",
    read: false,
  },
  {
    id: 3,
    name: "Rina Puspita",
    email: "rina@startup.id",
    message:
      "Salam! Kami sedang membangun startup EdTech dan tertarik dengan profil Anda. Apakah Anda open to discuss?",
    received: "2026-03-21 11:05",
    read: true,
  },
];

export default function MessagesPage() {
  const { t } = useTranslation();
  const [msgs, setMsgs] = useState<Msg[]>(mockData);
  const [selected, setSelected] = useState<Msg | null>(null);

  const markRead = (id: number) =>
    setMsgs((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: true } : m)),
    );
  const del = (id: number) => {
    setMsgs((prev) => prev.filter((m) => m.id !== id));
    if (selected?.id === id) setSelected(null);
  };
  const open = (m: Msg) => {
    setSelected(m);
    markRead(m.id);
  };

  const unread = msgs.filter((m) => !m.read).length;

  return (
    <div style={{ padding: "32px 32px 48px" }}>
      <div className="mb-8">
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
          {t("dashboard.messages.title")}
        </h1>
        <p style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
          {msgs.length} messages
          {unread > 0 && (
            <>
              {" "}
              ·{" "}
              <span style={{ color: "var(--accent)", fontWeight: 600 }}>
                {unread} {t("dashboard.messages.unread")}
              </span>
            </>
          )}
        </p>
      </div>

      <div
        className="grid gap-5"
        style={{ gridTemplateColumns: selected ? "1fr 1.3fr" : "1fr" }}
      >
        {/* Message list */}
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          {msgs.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center gap-3"
              style={{ padding: "48px 24px", color: "var(--text-subtle)" }}
            >
              <FiMail size={32} />
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: "var(--text-sm)",
                }}
              >
                {t("dashboard.messages.empty")}
              </p>
            </div>
          ) : (
            msgs.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.06, duration: 0.3, ease }}
                className="cursor-pointer"
                onClick={() => open(m)}
                style={{
                  padding: "16px 20px",
                  borderBottom:
                    i < msgs.length - 1
                      ? "1px solid var(--border-color)"
                      : "none",
                  background:
                    selected?.id === m.id
                      ? "var(--accent-soft)"
                      : "transparent",
                  transition: "background 150ms ease",
                }}
                onMouseEnter={(e) => {
                  if (selected?.id !== m.id)
                    (e.currentTarget as HTMLElement).style.background =
                      "var(--surface-alt)";
                }}
                onMouseLeave={(e) => {
                  if (selected?.id !== m.id)
                    (e.currentTarget as HTMLElement).style.background =
                      "transparent";
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {!m.read && (
                      <div
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: "50%",
                          background: "var(--accent)",
                          flexShrink: 0,
                        }}
                      />
                    )}
                    <div className="min-w-0">
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: m.read ? 500 : 700,
                          fontSize: "var(--text-sm)",
                          color: "var(--text)",
                          marginBottom: 2,
                        }}
                      >
                        {m.name}
                      </div>
                      <div
                        style={{
                          fontSize: "var(--text-xs)",
                          color: "var(--text-muted)",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {m.message}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      style={{
                        fontSize: "var(--text-xs)",
                        color: "var(--text-subtle)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {m.received.split(" ")[0]}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        del(m.id);
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "var(--text-subtle)",
                        display: "flex",
                        padding: 4,
                        borderRadius: 6,
                        transition: "color 150ms, background 150ms",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color =
                          "oklch(52% 0.18 25)";
                        (e.currentTarget as HTMLElement).style.background =
                          "oklch(96% 0.02 25)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color =
                          "var(--text-subtle)";
                        (e.currentTarget as HTMLElement).style.background =
                          "transparent";
                      }}
                      aria-label={t("dashboard.messages.deleteAriaLabel")}
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Detail panel */}
        {selected && (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.28, ease }}
            className="card"
            style={{ padding: "24px 28px" }}
          >
            <div className="flex items-start gap-4 mb-6">
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{
                  width: 44,
                  height: 44,
                  background: "var(--accent-soft)",
                  color: "var(--accent)",
                  borderRadius: 12,
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "var(--text-base)",
                }}
              >
                {selected.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "var(--text-base)",
                    color: "var(--text)",
                    marginBottom: 3,
                  }}
                >
                  {selected.name}
                </div>
                <a
                  href={`mailto:${selected.email}`}
                  style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--accent)",
                    textDecoration: "none",
                  }}
                >
                  {selected.email}
                </a>
              </div>
              <div
                className="flex items-center gap-2"
                style={{ color: "var(--text-subtle)" }}
              >
                <FiMail size={15} />
                <span style={{ fontSize: "var(--text-xs)" }}>
                  {selected.received}
                </span>
              </div>
            </div>

            <div
              style={{
                padding: "18px 20px",
                background: "var(--surface-alt)",
                borderRadius: 10,
                fontSize: "var(--text-sm)",
                lineHeight: 1.75,
                color: "var(--text-muted)",
                marginBottom: 20,
              }}
            >
              {selected.message}
            </div>

            <a href={`mailto:${selected.email}`}>
              <button
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
              >
                <FiMail size={15} /> {t("dashboard.messages.replyBtn")}
              </button>
            </a>
          </motion.div>
        )}
      </div>
    </div>
  );
}
