"use client";

import { useState, useEffect, Suspense } from "react";
import { getNote } from "@/lib/api";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconKey, IconLockOpen, IconCopy, IconCheck, IconRefresh,
  IconArrowLeft, IconAlertCircle, IconClockHour4,
} from "@tabler/icons-react";

const CODE_REGEX = /^[a-z0-9_-]+$/;
const MIN_CODE_LENGTH = 8;

function AccessNoteContent() {
  const searchParams = useSearchParams();
  const [code, setCode] = useState("");
  const [status, setStatus] = useState(null);
  const [note, setNote] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => { const c = searchParams.get("code"); if (c) setCode(c); }, [searchParams]);

  useEffect(() => {
    if (!note || timeLeft === null || timeLeft <= 0) return;
    const interval = setInterval(() => setTimeLeft((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(interval);
  }, [note, timeLeft]);

  function formatTimeLeft(seconds) {
    if (seconds <= 0) return "Expired";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    const parts = [];
    if (h > 0) parts.push(`${h}h`);
    if (m > 0) parts.push(`${m}m`);
    parts.push(`${s}s`);
    return parts.join(" ");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const normalizedCode = code.trim().toLowerCase();
    if (!normalizedCode) { setErrorMsg("Access code is required."); setStatus("error"); return; }
    if (normalizedCode.length < MIN_CODE_LENGTH) { setErrorMsg(`Minimum ${MIN_CODE_LENGTH} characters.`); setStatus("error"); return; }
    if (!CODE_REGEX.test(normalizedCode)) { setErrorMsg("Invalid access code format."); setStatus("error"); return; }
    setStatus("loading"); setErrorMsg("");
    const [res] = await Promise.all([getNote(normalizedCode), new Promise(r => setTimeout(r, 600))]);
    if (res.success) { setStatus("success"); setNote(res.data); setTimeLeft(res.data.remaining_seconds); }
    else { setStatus("error"); setErrorMsg(res.error?.message || "Note not found or has expired."); }
  }

  function handleCopyContent() {
    if (note?.content) { navigator.clipboard.writeText(note.content); setCopied(true); setTimeout(() => setCopied(false), 2000); }
  }

  function handleReset() {
    setCode(""); setStatus(null); setNote(null); setErrorMsg(""); setCopied(false); setTimeLeft(null);
  }

  // ── Note Display ──
  if (status === "success" && note) {
    return (
      <div className="page-wrapper">
        <div className="page-glow" />
        <div className="container container--narrow">
          <motion.div className="glass-card glass-card--static" style={{ padding: "44px 36px" }}
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
              <div>
                <motion.h1 className="heading-md" style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                  <IconLockOpen size={22} color="#4ade80" /> Decrypted Note
                </motion.h1>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                  style={{ display: "inline-flex", background: "var(--bg-input)", padding: "4px 12px", borderRadius: "var(--radius-xs)", border: "1px solid var(--border-subtle)" }}>
                  <code style={{ color: "var(--accent-secondary)", fontFamily: "var(--font-mono)", fontSize: "0.82rem" }}>
                    ID: {code.trim().toLowerCase()}
                  </code>
                </motion.div>
              </div>
              <motion.div className={`badge ${timeLeft > 3600 ? "badge--cyan" : ""}`}
                style={{
                  ...(timeLeft < 300 ? { borderColor: "rgba(239,68,68,0.3)", color: "#f87171", background: "rgba(239,68,68,0.08)" } : {})
                }}
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
                <IconClockHour4 size={14} /> {formatTimeLeft(timeLeft)}
              </motion.div>
            </div>

            <motion.div className="note-content-display" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              {note.content}
            </motion.div>

            <motion.div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20, flexWrap: "wrap", gap: 12 }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <button className={`copy-btn ${copied ? "copied" : ""}`} onClick={handleCopyContent}>
                {copied ? <><IconCheck size={15} /> Copied!</> : <><IconCopy size={15} /> Copy</>}
              </button>
              <span className="text-muted">Destructs: {new Date(note.expires_at).toLocaleString()}</span>
            </motion.div>

            <motion.div style={{ marginTop: 28, paddingTop: 20, borderTop: "1px solid var(--border-subtle)", display: "flex", gap: 12 }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <button className="btn btn--secondary" onClick={handleReset}>
                <IconArrowLeft size={18} /> Close
              </button>
            </motion.div>
          </motion.div>
        </div>
        <style jsx>{`
          .page-glow {
            position: fixed;
            width: 500px;
            height: 500px;
            background: radial-gradient(circle, rgba(74, 222, 128, 0.05), transparent 70%);
            top: 20%;
            left: 50%;
            transform: translateX(-50%);
            pointer-events: none;
            z-index: 0;
          }
        `}</style>
      </div>
    );
  }

  // ── Form ──
  return (
    <div className="page-wrapper">
      <div className="page-glow" />
      <div className="container container--narrow">
        <motion.div className="glass-card glass-card--static" style={{ padding: "44px 36px" }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <p className="section-label" style={{ justifyContent: "center" }}>Decryption</p>
            <h1 className="heading-display" style={{ marginBottom: 10 }}>
              <span className="text-gradient">Access a Note</span>
            </h1>
            <p className="text-secondary" style={{ fontSize: "0.95rem" }}>Enter a valid access code to retrieve the temporary note.</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="access_code_input" className="form-label">Access Code</label>
              <input id="access_code_input" type="text" className="form-input mono"
                placeholder="Enter access code..." value={code}
                onChange={(e) => setCode(e.target.value)}
                autoComplete="off" spellCheck="false" autoFocus disabled={status === "loading"} />
            </div>

            <AnimatePresence mode="wait">
              {status === "error" && errorMsg && (
                <motion.div key="error" className="status-error"
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: "auto", marginBottom: 20 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}>
                  <IconAlertCircle size={20} /> {errorMsg}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {status === "loading" ? (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="skeleton-box">
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                      <span className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }}></span>
                      <span style={{ fontWeight: 600, fontSize: "0.82rem", letterSpacing: "0.06em", color: "var(--accent-secondary)", textTransform: "uppercase" }}>
                        Decrypting...
                      </span>
                    </div>
                    <div className="skel-line" style={{ width: "100%" }}></div>
                    <div className="skel-line" style={{ width: "100%", animationDelay: "0.2s" }}></div>
                    <div className="skel-line" style={{ width: "80%", animationDelay: "0.4s" }}></div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="submit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <button type="submit" className="btn btn--primary btn--large" style={{ width: "100%" }}>
                    <IconKey size={18} /> Authorize & Decrypt
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>

      <style jsx>{`
        .page-glow {
          position: fixed;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.06), transparent 70%);
          top: 20%;
          left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
          z-index: 0;
        }
        .skeleton-box {
          padding: 22px;
          background: var(--bg-input);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-light);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .skel-line {
          height: 8px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 4px;
          animation: pulse-glow 1.5s infinite;
        }
      `}</style>
    </div>
  );
}

export default function AccessNotePage() {
  return (
    <Suspense fallback={
      <div className="page-wrapper">
        <div className="container container--narrow">
          <div className="glass-card" style={{ textAlign: "center", padding: "60px 24px" }}>
            <span className="spinner" style={{ margin: "0 auto", width: 32, height: 32, display: "block" }}></span>
          </div>
        </div>
      </div>
    }>
      <AccessNoteContent />
    </Suspense>
  );
}
