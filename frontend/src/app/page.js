"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SectionReveal, { childVariants } from "@/components/SectionReveal";
import {
  IconShieldCheck,
  IconClockHour4,
  IconKey,
  IconGhost,
  IconServer,
  IconBolt,
  IconArrowRight,
  IconLock,
  IconSparkles,
} from "@tabler/icons-react";

/* ── Animation Variants ── */
const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
};

/* ── Feature Data ── */
const features = [
  {
    icon: <IconClockHour4 size={22} stroke={1.5} />,
    title: "TTL Hardware Deletion",
    desc: "MongoDB TTL indexes destroy records at the storage block level. No tombstoning, no soft deletes.",
    accent: "#8b5cf6",
  },
  {
    icon: <IconKey size={22} stroke={1.5} />,
    title: "Stateless Routing",
    desc: "We don't maintain sessions. Your custom access codes act as one-time ephemeral routers directly to memory.",
    accent: "#6366f1",
  },
  {
    icon: <IconGhost size={22} stroke={1.5} />,
    title: "Shadow Mode Validation",
    desc: "Our API returns identical error structures for invalid and expired notes — preventing timing side-channel attacks.",
    accent: "#3b82f6",
  },
  {
    icon: <IconShieldCheck size={22} stroke={1.5} />,
    title: "CORS & Header Hardening",
    desc: "Strict Content-Security-Policy headers block unauthorized iframe embeds, XSS vectors, and MIME-sniffing.",
    accent: "#8b5cf6",
  },
  {
    icon: <IconServer size={22} stroke={1.5} />,
    title: "Distributed Rate Control",
    desc: "Aggressive leaky-bucket IP rate-limiting prevents credential stuffing and brute-force discovery.",
    accent: "#6366f1",
  },
  {
    icon: <IconBolt size={22} stroke={1.5} />,
    title: "Async FastAPI Core",
    desc: "Non-blocking event loop guarantees sub-50ms API response times under load, routing data instantly.",
    accent: "#3b82f6",
  },
];

/* ── Trust Items ── */
const trustItems = [
  "End-to-End Encrypted",
  "Zero-Knowledge Architecture",
  "Auto-Expiring Notes",
  "No Accounts Required",
  "No IP Logging",
  "CORS Hardened",
  "Rate Limited",
  "Privacy First",
];

/* ── Steps Data ── */
const steps = [
  {
    step: "01",
    title: "Write your note",
    desc: "Compose any text content you want to share securely. No character format restrictions.",
    icon: <IconSparkles size={20} stroke={1.5} />,
  },
  {
    step: "02",
    title: "Set an access code",
    desc: "Choose a custom, memorable code. This becomes the only key to your encrypted payload.",
    icon: <IconKey size={20} stroke={1.5} />,
  },
  {
    step: "03",
    title: "Share & forget",
    desc: "Send the code to your recipient. The note auto-destructs after your chosen TTL expires.",
    icon: <IconLock size={20} stroke={1.5} />,
  },
];

export default function HomePage() {
  return (
    <>
      {/* ========== HERO SECTION ========== */}
      <section className="hero">
        {/* Gradient mesh backgrounds */}
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />
        <div className="hero-glow hero-glow-3" />

        {/* Grid pattern overlay */}
        <div className="hero-grid" />

        <div className="container" style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="hero-badge-dot" />
            Privacy-first note sharing
          </motion.div>

          <motion.h1
            className="heading-hero"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            Secure notes that{" "}
            <br className="hero-break" />
            <span className="text-gradient">self-destruct</span>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            Drop sensitive data into the vault with a custom access code.
            <br className="hero-break" />
            It auto-destructs after the TTL you set. Zero accounts. Zero traces.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="/create" className="btn btn--primary btn--large">
              Start Creating
              <IconArrowRight size={18} />
            </Link>
            <Link href="/access" className="btn btn--secondary btn--large">
              Access a Note
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========== TRUST MARQUEE ========== */}
      <section className="trust-section">
        <div className="trust-track">
          <div className="trust-marquee">
            {[...trustItems, ...trustItems].map((item, i) => (
              <span key={i} className="trust-item">
                <span className="trust-dot" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FEATURES ========== */}
      <section className="section features-section">
        <div className="container">
          <SectionReveal>
            <div className="section-header">
              <motion.p variants={childVariants} className="section-label">
                Security
              </motion.p>
              <motion.h2 variants={childVariants} className="heading-display">
                Engineered for{" "}
                <span className="text-gradient">Zero Trust</span>
              </motion.h2>
              <motion.p variants={childVariants}>
                Every component is designed to minimize data retention and maximize transfer security.
              </motion.p>
            </div>
          </SectionReveal>

          <motion.div
            className="feature-grid"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            {features.map(({ icon, title, desc, accent }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="glass-card feature-card"
              >
                <div className="feature-icon" style={{ "--feature-accent": accent }}>
                  {icon}
                </div>
                <h3 className="heading-md" style={{ marginBottom: 8 }}>{title}</h3>
                <p className="text-secondary" style={{ fontSize: "0.9rem", lineHeight: 1.7 }}>{desc}</p>
                {/* Bottom glow line */}
                <div className="feature-card-glow" style={{ "--feature-accent": accent }} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section className="how-section">
        <div className="container">
          <SectionReveal>
            <div className="section-header">
              <motion.p variants={childVariants} className="section-label">
                How It Works
              </motion.p>
              <motion.h2 variants={childVariants} className="heading-display">
                Three steps to{" "}
                <span className="text-gradient">complete privacy</span>
              </motion.h2>
            </div>
          </SectionReveal>

          <motion.div
            className="steps-grid"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            {steps.map(({ step, title, desc, icon }, i) => (
              <motion.div key={step} variants={fadeUp} className="step-card">
                <div className="step-header">
                  <div className="step-icon">{icon}</div>
                  <span className="step-number">{step}</span>
                </div>
                <h3 className="heading-md" style={{ marginBottom: 8 }}>{title}</h3>
                <p className="text-secondary" style={{ fontSize: "0.9rem", lineHeight: 1.7 }}>{desc}</p>
                {/* Connector line (except last) */}
                {i < steps.length - 1 && <div className="step-connector" />}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="cta-section">
        <div className="cta-glow" />
        <div className="container">
          <SectionReveal>
            <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
              <motion.h2 variants={childVariants} className="heading-display" style={{ marginBottom: 16 }}>
                Ready to{" "}
                <span className="text-gradient">drop data</span>?
              </motion.h2>
              <motion.p
                variants={childVariants}
                className="text-secondary"
                style={{ fontSize: "1.1rem", maxWidth: 480, margin: "0 auto 40px", lineHeight: 1.7 }}
              >
                NoteVault requires zero onboarding. No email verification. No passwords to remember.
              </motion.p>
              <motion.div variants={childVariants} style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/create" className="btn btn--primary btn--large">
                  Get Started Free
                  <IconArrowRight size={18} />
                </Link>
                <Link href="/access" className="btn btn--secondary btn--large">
                  Access a Note
                </Link>
              </motion.div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Page Styles ── */}
      <style jsx>{`
        /* ============ HERO ============ */
        .hero {
          position: relative;
          overflow: hidden;
          padding: 160px 0 100px;
          min-height: 85vh;
          display: flex;
          align-items: center;
          background: var(--bg-primary);
        }

        /* Gradient mesh blobs */
        .hero-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
        }

        .hero-glow-1 {
          width: 600px;
          height: 600px;
          background: rgba(139, 92, 246, 0.12);
          top: -200px;
          left: -100px;
          animation: floatSlow 15s ease-in-out infinite;
        }

        .hero-glow-2 {
          width: 500px;
          height: 500px;
          background: rgba(99, 102, 241, 0.08);
          top: -100px;
          right: -150px;
          animation: floatSlow 20s ease-in-out infinite reverse;
        }

        .hero-glow-3 {
          width: 400px;
          height: 400px;
          background: rgba(59, 130, 246, 0.06);
          bottom: -100px;
          left: 30%;
          animation: floatSlow 18s ease-in-out infinite 4s;
        }

        @keyframes floatSlow {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -20px); }
        }

        /* Subtle grid pattern */
        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse 60% 50% at 50% 0%, black, transparent);
          -webkit-mask-image: radial-gradient(ellipse 60% 50% at 50% 0%, black, transparent);
        }

        /* Hero badge */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 18px;
          border-radius: 9999px;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          color: var(--accent-tertiary);
          background: rgba(139, 92, 246, 0.08);
          border: 1px solid rgba(139, 92, 246, 0.15);
          margin-bottom: 32px;
        }

        .hero-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 8px rgba(74, 222, 128, 0.4);
          animation: pulse-dot 2s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .hero-subtitle {
          color: var(--text-secondary);
          font-size: 1.15rem;
          max-width: 540px;
          margin: 24px auto 0;
          line-height: 1.75;
        }

        .hero-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 44px;
        }

        /* ============ TRUST MARQUEE ============ */
        .trust-section {
          padding: 24px 0;
          overflow: hidden;
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
          background: var(--bg-secondary);
        }

        .trust-track {
          overflow: hidden;
          mask-image: linear-gradient(90deg, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(90deg, transparent, black 15%, black 85%, transparent);
        }

        .trust-marquee {
          display: flex;
          gap: 40px;
          animation: marquee 35s linear infinite;
          width: max-content;
        }

        .trust-item {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 0.76rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          white-space: nowrap;
          flex-shrink: 0;
        }

        .trust-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--accent-primary);
          opacity: 0.5;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ============ FEATURES ============ */
        .features-section {
          background: var(--bg-primary);
          position: relative;
        }

        .feature-card {
          cursor: default;
          padding: 32px 28px;
          position: relative;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .feature-card:hover {
          border-color: rgba(139, 92, 246, 0.15);
        }

        .feature-card .feature-icon {
          color: var(--accent-secondary);
          background: rgba(139, 92, 246, 0.08);
          border-color: rgba(139, 92, 246, 0.12);
        }

        .feature-card-glow {
          position: absolute;
          bottom: 0;
          left: 20%;
          right: 20%;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--feature-accent, #8b5cf6), transparent);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .feature-card:hover .feature-card-glow {
          opacity: 0.4;
        }

        /* ============ HOW IT WORKS ============ */
        .how-section {
          padding: var(--space-section) 0;
          background: var(--bg-secondary);
          position: relative;
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-md);
        }

        .step-card {
          padding: 36px 28px;
          background: var(--bg-card);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-card);
          position: relative;
          backdrop-filter: blur(8px);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .step-card:hover {
          border-color: rgba(139, 92, 246, 0.2);
          transform: translateY(-4px);
          box-shadow: var(--shadow-card-hover);
        }

        .step-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .step-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: rgba(139, 92, 246, 0.08);
          border: 1px solid rgba(139, 92, 246, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-secondary);
        }

        .step-number {
          font-family: var(--font-sans);
          font-size: 2.5rem;
          font-weight: 800;
          line-height: 1;
          color: rgba(255, 255, 255, 0.04);
          letter-spacing: -0.04em;
        }

        .step-connector {
          display: none;
        }

        /* ============ CTA ============ */
        .cta-section {
          padding: var(--space-section) 0;
          position: relative;
          overflow: hidden;
          background: var(--bg-primary);
        }

        .cta-glow {
          position: absolute;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.1), transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        /* ============ RESPONSIVE ============ */
        @media (max-width: 768px) {
          .hero {
            padding: 130px 0 80px;
            min-height: auto;
          }

          .hero-break { display: none; }

          .hero-subtitle {
            font-size: 1rem;
          }

          .steps-grid { grid-template-columns: 1fr; }
        }

        @media (min-width: 769px) {
          .hero-break { display: inline; }
        }
      `}</style>
    </>
  );
}
