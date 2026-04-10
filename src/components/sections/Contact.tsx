import { useState } from "react";
import { sendEmail } from "../../api/email";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { personal } from "../../data/portfolio.tsx";
import { SectionHeader } from "../PixelArt";
import { InstagramIcon } from "../ui/instagram";
import { LinkedinIcon } from "../ui/linkedin";
import { GithubIcon } from "../ui/github";
import { SendIcon } from "../ui/send";
import { MapPinIcon } from "../ui/map-pin";
import { DiscordIcon } from "../ui/discord";
import { MailCheckIcon } from "../ui/mail-check";
import { CheckIcon } from "../ui/check";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (loading) return;
    
    setLoading(true);
    setError(null);
    
    try {
      await sendEmail(form);
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      console.error(err);
      setError(t("contact.form.errorMsg") || "Gagal mengirim pesan. Silakan coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  const socials = [
    { icon: <GithubIcon size={18} />, href: personal.socials.github, label: "GitHub" },
    { icon: <LinkedinIcon size={18} />, href: personal.socials.linkedin, label: "LinkedIn" },
    { icon: <InstagramIcon size={18} />, href: personal.socials.instagram, label: "Instagram" },
    { icon: <DiscordIcon size={18} />, href: personal.socials.discord, label: "Discord" },
  ];

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    border: "1px solid var(--border-color)",
    borderRadius: 8,
    background: "var(--surface)",
    color: "var(--text)",
    fontFamily: "var(--font-body)",
    fontSize: "var(--text-sm)",
    outline: "none",
    transition: "border-color var(--transition-fast), box-shadow var(--transition-fast)",
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      style={{
        background: "var(--bg)",
        paddingTop: "var(--section-gap)",
        paddingBottom: "var(--section-gap)",
      }}
    >
      <div className="container">
        <motion.div {...fadeUp} transition={{ duration: 0.5, ease }}>
          <SectionHeader
            label={t("contact.sectionLabel")}
            title={t("contact.title")}
          />

          <div
            className="contact-grid grid gap-12 items-start"
            style={{ gridTemplateColumns: "5fr 7fr" }}
          >

            <motion.div {...fadeUp} transition={{ delay: 0.15, duration: 0.5, ease }}>
              <p
                className="mb-8"
                style={{
                  fontSize: "var(--text-base)",
                  lineHeight: 1.75,
                  color: "var(--text-muted)",
                }}
              >
                {t("contact.intro")}
              </p>

              <div className="flex flex-col gap-3 mb-8">
                {[
                  { icon: <MailCheckIcon size={18} />, label: t("contact.emailLabel"), value: personal.email },
                  { icon: <MapPinIcon size={18} />, label: t("contact.locationLabel"), value: personal.location },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4"
                    style={{ padding: "12px 0" }}
                  >
                    <div
                      className="flex items-center justify-center flex-shrink-0"
                      style={{
                        width: 40,
                        height: 40,
                        background: "var(--accent-soft)",
                        color: "var(--accent)",
                        borderRadius: 10,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "var(--text-xs)",
                          fontWeight: 600,
                          color: "var(--text-subtle)",
                          letterSpacing: "0.04em",
                          textTransform: "uppercase" as const,
                          marginBottom: 2,
                        }}
                      >
                        {item.label}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 600,
                          fontSize: "var(--text-sm)",
                          color: "var(--text)",
                        }}
                      >
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="mb-3"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-xs)",
                  fontWeight: 600,
                  color: "var(--text-subtle)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase" as const,
                }}
              >
                {t("contact.findMe")}
              </div>
              <div className="flex gap-2.5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                  >
                    <div
                      className="flex items-center justify-center cursor-pointer"
                      style={{
                        width: 42,
                        height: 42,
                        background: "var(--surface-alt)",
                        border: "1px solid var(--border-color)",
                        color: "var(--text-muted)",
                        borderRadius: 10,
                        transition:
                          "background var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast), transform var(--transition-fast)",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = "var(--accent)";
                        el.style.color = "oklch(99% 0.003 165)";
                        el.style.borderColor = "var(--accent)";
                        el.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = "var(--surface-alt)";
                        el.style.color = "var(--text-muted)";
                        el.style.borderColor = "var(--border-color)";
                        el.style.transform = "translateY(0)";
                      }}
                    >
                      {s.icon}
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>


            <motion.form
              onSubmit={handleSubmit}
              {...fadeUp}
              transition={{ delay: 0.25, duration: 0.5, ease }}
            >
              <div className="card" style={{ padding: 28 }}>
                <h3
                  className="mb-6"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-base)",
                    fontWeight: 600,
                    color: "var(--text)",
                  }}
                >
                  {t("contact.form.terminalLabel") || "Send a Message"}
                </h3>


                <div
                  className="grid gap-4 mb-4"
                  style={{ gridTemplateColumns: "1fr 1fr" }}
                >
                  {[
                    {
                      id: "name",
                      label: t("contact.form.nameLabel"),
                      type: "text",
                      placeholder: t("contact.form.namePlaceholder"),
                    },
                    {
                      id: "email",
                      label: t("contact.form.emailLabel"),
                      type: "email",
                      placeholder: t("contact.form.emailPlaceholder"),
                    },
                  ].map((field) => (
                    <div key={field.id}>
                      <label
                        htmlFor={field.id}
                        className="block mb-2"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "var(--text-xs)",
                          fontWeight: 600,
                          color: "var(--text-muted)",
                          letterSpacing: "0.04em",
                          textTransform: "uppercase" as const,
                        }}
                      >
                        {field.label}
                      </label>
                      <input
                        id={field.id}
                        type={field.type}
                        value={form[field.id as keyof typeof form]}
                        onChange={(e) =>
                          setForm({ ...form, [field.id]: e.target.value })
                        }
                        placeholder={field.placeholder}
                        required
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
                </div>


                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 text-xs font-medium"
                    style={{ color: "oklch(55% 0.22 25)" }}
                  >
                    {error}
                  </motion.div>
                )}

                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block mb-2"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "var(--text-xs)",
                      fontWeight: 600,
                      color: "var(--text-muted)",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase" as const,
                    }}
                  >
                    {t("contact.form.messageLabel")}
                  </label>
                  <textarea
                    id="message"
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder={t("contact.form.messagePlaceholder")}
                    required
                    rows={5}
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

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center"
                  style={
                    sent
                      ? {
                          background: "var(--success)",
                          borderColor: "var(--success)",
                        }
                      : loading 
                        ? { opacity: 0.7, cursor: "not-allowed" }
                        : {}
                  }
                >
                  <AnimatePresence mode="wait">
                    {loading ? (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="inline-flex items-center gap-2"
                      >
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {t("contact.form.sendingBtn") || "Sending..."}
                      </motion.span>
                    ) : sent ? (
                      <motion.span
                        key="sent"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="inline-flex items-center gap-2"
                      >
                        <CheckIcon size={16} /> {t("contact.form.sentBtn")}
                      </motion.span>
                    ) : (
                      <motion.span
                        key="send"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="inline-flex items-center gap-2"
                      >
                        <SendIcon size={16} /> {t("contact.form.sendBtn")}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
