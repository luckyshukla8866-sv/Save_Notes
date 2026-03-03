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
} from "@tabler/icons-react";

/* ── Animation Variants ── */
const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

/* ── Feature Data ── */
const features = [
  {
    icon: <IconClockHour4 size={26} stroke={1.5} />,
    title: "TTL Hardware Deletion",
    desc: "MongoDB TTL indexes destroy records at the storage block level. No tombstoning, no soft deletes.",
  },
  {
    icon: <IconKey size={26} stroke={1.5} />,
    title: "Stateless Routing",
    desc: "We don't maintain sessions. Your custom access codes act as one-time ephemeral routers directly to memory.",
  },
  {
    icon: <IconGhost size={26} stroke={1.5} />,
    title: "Shadow Mode Validation",
    desc: "Our API returns identical error structures for invalid and expired notes — preventing timing side-channel attacks.",
  },
  {
    icon: <IconShieldCheck size={26} stroke={1.5} />,
    title: "CORS & Header Hardening",
    desc: "Strict Content-Security-Policy headers block unauthorized iframe embeds, XSS vectors, and MIME-sniffing.",
  },
  {
    icon: <IconServer size={26} stroke={1.5} />,
    title: "Distributed Rate Control",
    desc: "Aggressive leaky-bucket IP rate-limiting prevents credential stuffing and brute-force discovery.",
  },
  {
    icon: <IconBolt size={26} stroke={1.5} />,
    title: "Async FastAPI Core",
    desc: "Non-blocking event loop guarantees sub-50ms API response times under load, routing data instantly.",
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

export default function HomePage() {
  return (
    <>
      {/* ========== HERO SECTION ========== */}
      <section className="hero">
        {/* Decorative cloud/wave shapes */}
        <div className="hero-clouds">
          <svg className="cloud cloud-1" viewBox="0 0 200 120" fill="white" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="70" cy="80" rx="70" ry="40" opacity="0.6" />
            <ellipse cx="120" cy="60" rx="55" ry="35" opacity="0.7" />
            <ellipse cx="50" cy="60" rx="45" ry="30" opacity="0.5" />
          </svg>
          <svg className="cloud cloud-2" viewBox="0 0 200 120" fill="white" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="80" cy="80" rx="60" ry="35" opacity="0.5" />
            <ellipse cx="130" cy="65" rx="50" ry="30" opacity="0.6" />
            <ellipse cx="60" cy="55" rx="40" ry="28" opacity="0.4" />
          </svg>
          <svg className="cloud cloud-3" viewBox="0 0 180 100" fill="white" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="90" cy="60" rx="65" ry="35" opacity="0.45" />
            <ellipse cx="50" cy="50" rx="40" ry="25" opacity="0.55" />
            <ellipse cx="140" cy="55" rx="40" ry="28" opacity="0.4" />
          </svg>
        </div>

        {/* Decorative torn/wave paper shapes */}
        <svg className="hero-wave-left" viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-50 0 C100 50, 200 100, 180 200 C160 300, 50 350, 100 500 L-50 500Z" fill="rgba(255,255,255,0.25)" />
          <path d="M-80 50 C80 80, 170 150, 150 250 C130 350, 20 380, 70 500 L-80 500Z" fill="rgba(255,255,255,0.15)" />
        </svg>
        <svg className="hero-wave-right" viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M450 0 C300 80, 200 120, 230 220 C260 320, 380 350, 320 500 L450 500Z" fill="rgba(255,255,255,0.2)" />
          <path d="M480 30 C340 100, 250 170, 270 270 C290 370, 400 400, 350 500 L480 500Z" fill="rgba(255,255,255,0.12)" />
        </svg>

        {/* Decorative dashed lines */}
        <svg className="hero-dashes" viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 150 Q 300 100, 400 200 T 700 180" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="8 6" fill="none" />
          <path d="M800 100 Q 900 180, 1000 130 T 1100 200" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeDasharray="6 8" fill="none" />
          <path d="M200 350 Q 400 300, 500 380 T 800 340" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="10 6" fill="none" />
        </svg>

        <div className="container" style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
          <motion.h1
            className="heading-hero"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Your space for notes,{" "}
            <br className="hero-break" />
            tasks, and big ideas
          </motion.h1>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="/create" className="btn btn--primary btn--large">
              Try NoteVault Free
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
                Engineered for <em>Zero Trust</em>
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
            {features.map(({ icon, title, desc }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="glass-card feature-card"
              >
                <div className="feature-icon">{icon}</div>
                <h3 className="heading-md" style={{ marginBottom: 8 }}>{title}</h3>
                <p className="text-secondary" style={{ fontSize: "0.92rem", lineHeight: 1.65 }}>{desc}</p>
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
                <em>complete privacy</em>
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
            {[
              {
                step: "01",
                title: "Write your note",
                desc: "Compose any text content you want to share securely. No character format restrictions.",
              },
              {
                step: "02",
                title: "Set an access code",
                desc: "Choose a custom, memorable code. This becomes the only key to your encrypted payload.",
              },
              {
                step: "03",
                title: "Share & forget",
                desc: "Send the code to your recipient. The note auto-destructs after your chosen TTL expires.",
              },
            ].map(({ step, title, desc }) => (
              <motion.div key={step} variants={fadeUp} className="step-card">
                <span className="step-number">{step}</span>
                <h3 className="heading-md" style={{ marginBottom: 8 }}>{title}</h3>
                <p className="text-secondary" style={{ fontSize: "0.92rem", lineHeight: 1.65 }}>{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="cta-section">
        <div className="container">
          <SectionReveal>
            <div style={{ textAlign: "center" }}>
              <motion.h2 variants={childVariants} className="heading-display" style={{ marginBottom: 16 }}>
                <em>Drop data. Walk away.</em>
              </motion.h2>
              <motion.p
                variants={childVariants}
                className="text-secondary"
                style={{ fontSize: "1.15rem", maxWidth: 480, margin: "0 auto 40px", lineHeight: 1.7 }}
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
          background: linear-gradient(180deg, #a8d8f0 0%, #c8e6f8 30%, #dbeefb 70%, #eef6fd 100%);
          padding: 140px 0 0;
          position: relative;
          overflow: hidden;
          min-height: 70vh;
        }

        /* Subtle sky texture overlay */
        .hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.35), transparent 60%),
            radial-gradient(ellipse at 70% 50%, rgba(255,255,255,0.2), transparent 50%);
          pointer-events: none;
        }

        /* ── Decorative Clouds ── */
        .hero-clouds {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .cloud {
          position: absolute;
          filter: blur(1px);
        }

        .cloud-1 {
          width: 220px;
          top: 10%;
          left: 5%;
          animation: floatCloud 20s ease-in-out infinite;
        }

        .cloud-2 {
          width: 180px;
          top: 5%;
          right: 8%;
          animation: floatCloud 25s ease-in-out infinite reverse;
        }

        .cloud-3 {
          width: 150px;
          top: 35%;
          right: 15%;
          animation: floatCloud 22s ease-in-out infinite 3s;
        }

        @keyframes floatCloud {
          0%, 100% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(15px) translateY(-8px); }
        }

        /* ── Decorative torn paper/wave shapes ── */
        .hero-wave-left {
          position: absolute;
          left: -40px;
          top: 0;
          height: 100%;
          width: 350px;
          z-index: 1;
          opacity: 0.7;
        }

        .hero-wave-right {
          position: absolute;
          right: -40px;
          top: 0;
          height: 100%;
          width: 350px;
          z-index: 1;
          opacity: 0.7;
        }

        /* ── Decorative dashed lines ── */
        .hero-dashes {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          opacity: 0.6;
        }

        /* ── Hero Text ── */
        .hero-subtitle {
          color: var(--text-secondary);
          font-size: 1.15rem;
          max-width: 520px;
          margin: 24px auto 0;
          line-height: 1.75;
        }

        .hero-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 40px;
          padding-bottom: 80px;
        }

        /* ============ TRUST MARQUEE ============ */
        .trust-section {
          padding: 20px 0;
          overflow: hidden;
          border-bottom: 1px solid var(--border-subtle);
        }

        .trust-track {
          overflow: hidden;
          mask-image: linear-gradient(90deg, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(90deg, transparent, black 15%, black 85%, transparent);
        }

        .trust-marquee {
          display: flex;
          gap: 36px;
          animation: marquee 30s linear infinite;
          width: max-content;
        }

        .trust-item {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 0.78rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          white-space: nowrap;
          flex-shrink: 0;
        }

        .trust-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--text-muted);
          opacity: 0.5;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ============ FEATURES ============ */
        .features-section {
          background: var(--bg-secondary);
        }

        .feature-card {
          cursor: default;
          padding: 32px 28px;
        }

        .feature-card .feature-icon {
          color: var(--text-secondary);
        }

        /* ============ HOW IT WORKS ============ */
        .how-section {
          padding: var(--space-section) 0;
          background: var(--tint-lavender);
          border-radius: var(--radius-2xl);
          margin: 0 16px;
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-md);
        }

        .step-card {
          padding: 36px 28px;
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
        }

        .step-number {
          font-family: var(--font-display);
          font-size: 3rem;
          font-weight: 400;
          line-height: 1;
          display: block;
          margin-bottom: 16px;
          color: var(--text-muted);
          opacity: 0.6;
        }

        /* ============ CTA ============ */
        .cta-section {
          padding: var(--space-section) 0;
          background: var(--tint-green);
          border-radius: var(--radius-2xl);
          margin: var(--space-xl) 16px;
        }

        /* ============ RESPONSIVE ============ */
        @media (max-width: 768px) {
          .hero {
            padding: 120px 0 0;
            min-height: auto;
          }

          .hero-break { display: none; }

          .hero-wave-left,
          .hero-wave-right {
            width: 150px;
            opacity: 0.4;
          }

          .steps-grid { grid-template-columns: 1fr; }

          .how-section,
          .cta-section {
            border-radius: var(--radius-lg);
          }
        }

        @media (min-width: 769px) {
          .hero-break { display: inline; }
        }
      `}</style>
    </>
  );
}
