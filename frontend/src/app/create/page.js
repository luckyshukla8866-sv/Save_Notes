"use client";

import { useState } from "react";
import { createNote } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { IconLock, IconCheck, IconCopy, IconRefresh, IconArrowRight, IconAlertCircle } from "@tabler/icons-react";

const CODE_REGEX = /^[a-z0-9_-]+$/;
const EXPIRY_OPTIONS = [
  { value: 1, label: "1 Hour" },
  { value: 6, label: "6 Hours" },
  { value: 24, label: "24 Hours" },
  { value: 168, label: "7 Days" },
];
const MAX_NOTE_SIZE = 51200;
const MIN_CODE_LENGTH = 8;
const MAX_CODE_LENGTH = 32;

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
};
const childVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 30 } },
};

export default function CreateNotePage() {
  const [form, setForm] = useState({ access_code: "", content: "", expiry_hours: 24 });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [result, setResult] = useState(null);
  const [apiError, setApiError] = useState("");
  const [copied, setCopied] = useState(false);

  const contentBytes = new TextEncoder().encode(form.content).length;
  const progressPercent = Math.min((contentBytes / MAX_NOTE_SIZE) * 100, 100);

  function validate() {
    const errs = {};
    const code = form.access_code.trim().toLowerCase();
    if (!code) errs.access_code = "Access code is required.";
    else if (code.length < MIN_CODE_LENGTH) errs.access_code = `Minimum ${MIN_CODE_LENGTH} characters.`;
    else if (code.length > MAX_CODE_LENGTH) errs.access_code = `Maximum ${MAX_CODE_LENGTH} characters.`;
    else if (!CODE_REGEX.test(code)) errs.access_code = "Only lowercase letters, numbers, underscores, and hyphens.";
    if (!form.content.trim()) errs.content = "Note content is required.";
    else if (contentBytes > MAX_NOTE_SIZE) errs.content = "Content exceeds limit.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    setApiError("");
    const res = await createNote({
      access_code: form.access_code.trim().toLowerCase(),
      content: form.content.trim(),
      expiry_hours: form.expiry_hours,
    });
    if (res.success) { setStatus("success"); setResult(res.data); }
    else { setStatus("error"); setApiError(res.error?.message || res.error?.details?.[0]?.message || "Failed to create note."); }
  }

  function handleCopy() {
    navigator.clipboard.writeText(result.access_code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleReset() {
    setForm({ access_code: "", content: "", expiry_hours: 24 });
    setErrors({}); setStatus(null); setResult(null); setApiError(""); setCopied(false);
  }

  // ── Success View ──
  if (status === "success" && result) {
    return (
      <div className="page-wrapper">
        <div className="container container--narrow">
          <motion.div
            className="glass-card"
            style={{ textAlign: "center", padding: "60px 40px" }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <motion.div
              className="success-icon"
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
            >
              <IconCheck size={36} color="#16a34a" stroke={2.5} />
            </motion.div>

            <motion.h1 className="heading-display" style={{ marginBottom: 12 }}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              Note <em>Secured</em>
            </motion.h1>

            <motion.p className="text-secondary" style={{ marginBottom: 32, fontSize: "1.05rem" }}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              Share the access code below. It will self-destruct after {form.expiry_hours} hour{form.expiry_hours > 1 && "s"}.
            </motion.p>

            <motion.div className="code-display"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <div className="code-text">{result.access_code}</div>
              <button onClick={handleCopy} className="code-copy-btn">
                {copied ? <IconCheck size={18} color="#16a34a" /> : <IconCopy size={18} />}
              </button>
            </motion.div>

            <motion.div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginTop: 40 }}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <button className="btn btn--secondary" onClick={handleReset}>
                <IconRefresh size={18} /> New Note
              </button>
              <a href="/access" className="btn btn--primary">
                Access Gateway <IconArrowRight size={18} />
              </a>
            </motion.div>
          </motion.div>
        </div>
        <style jsx>{`
          .success-icon {
            width: 72px; height: 72px; border-radius: 50%;
            background: rgba(22, 163, 74, 0.08);
            display: flex; align-items: center; justify-content: center;
            margin: 0 auto 24px;
            border: 1.5px solid rgba(22, 163, 74, 0.2);
          }
          .code-display {
            background: var(--bg-input);
            border: 1.5px solid var(--border-light);
            border-radius: var(--radius-md);
            padding: 20px 24px;
            display: flex; align-items: center; justify-content: space-between; gap: 16px;
          }
          .code-text {
            font-family: var(--font-mono); font-size: 1.2rem;
            letter-spacing: 0.05em; color: var(--text-primary);
            overflow: hidden; text-overflow: ellipsis;
          }
          .code-copy-btn {
            flex-shrink: 0; background: var(--bg-secondary);
            color: var(--text-primary); border: 1.5px solid var(--border-light);
            padding: 10px; border-radius: var(--radius-sm); cursor: pointer;
            display: flex; align-items: center; justify-content: center;
            transition: all 0.2s ease;
          }
          .code-copy-btn:hover {
            background: var(--bg-input); border-color: var(--border-medium);
          }
        `}</style>
      </div>
    );
  }

  // ── Form View ──
  return (
    <div className="page-wrapper" style={{ background: "var(--tint-slate)" }}>
      <div className="container container--narrow">
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ padding: "48px 40px" }}
        >
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p className="section-label" style={{ justifyContent: "center" }}>Secure Transfer</p>
            <h1 className="heading-display" style={{ marginBottom: 12 }}>
              <em>Create a Note</em>
            </h1>
            <p className="text-secondary">
              Securely drop data into the vault. It destroys itself upon expiry.
            </p>
          </div>

          <motion.form onSubmit={handleSubmit} noValidate variants={formVariants} initial="hidden" animate="show">
            <motion.div className="form-group" variants={childVariants}>
              <label htmlFor="access_code" className="form-label" style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Access Code</span>
                <span className="text-muted" style={{ fontWeight: 400 }}>{form.access_code.length}/{MAX_CODE_LENGTH}</span>
              </label>
              <input id="access_code" type="text"
                className={`form-input mono ${errors.access_code ? "input-error" : ""}`}
                placeholder="e.g. gamma-protocol-7" value={form.access_code}
                onChange={(e) => setForm({ ...form, access_code: e.target.value })}
                maxLength={MAX_CODE_LENGTH} autoComplete="off" spellCheck="false" />
              <AnimatePresence>
                {errors.access_code && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="form-error">
                    <IconAlertCircle size={14} /> {errors.access_code}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div className="form-group" variants={childVariants}>
              <label htmlFor="content" className="form-label" style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Note Content</span>
                <span className="text-muted" style={{ fontWeight: 400, color: progressPercent > 90 ? "#dc2626" : undefined }}>
                  {(contentBytes / 1024).toFixed(1)} / {MAX_NOTE_SIZE / 1024} KB
                </span>
              </label>
              <textarea id="content"
                className={`form-textarea ${errors.content ? "input-error" : ""}`}
                placeholder="Enter your note content here..."
                value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
              <AnimatePresence>
                {errors.content && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="form-error">
                    <IconAlertCircle size={14} /> {errors.content}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div className="form-group" variants={childVariants}>
              <label htmlFor="expiry_hours" className="form-label">Time To Live</label>
              <select id="expiry_hours" className="form-select" value={form.expiry_hours}
                onChange={(e) => setForm({ ...form, expiry_hours: Number(e.target.value) })}>
                {EXPIRY_OPTIONS.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </motion.div>

            <AnimatePresence>
              {status === "error" && apiError && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                  className="status-error" style={{ marginBottom: 28 }}>
                  <IconAlertCircle size={20} /> {apiError}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div variants={childVariants} style={{ marginTop: 16 }}>
              <button type="submit" className="btn btn--primary btn--large" disabled={status === "loading"} style={{ width: "100%" }}>
                {status === "loading" ? (<><span className="spinner"></span> Encrypting...</>) :
                  (<><IconLock size={18} /> Lock & Transfer</>)}
              </button>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
}
