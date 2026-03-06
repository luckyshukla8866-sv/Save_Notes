"use client";

import { motion } from "framer-motion";
import { IconShieldCheck, IconEyeOff, IconTrash, IconLock, IconClockHour4, IconServer } from "@tabler/icons-react";
import SectionReveal, { childVariants } from "@/components/SectionReveal";

const policies = [
    {
        icon: <IconEyeOff size={22} stroke={1.5} />,
        title: "Zero Knowledge",
        desc: "We never see, read, or process your note contents. Data is stored encrypted and routed by access code only.",
    },
    {
        icon: <IconTrash size={22} stroke={1.5} />,
        title: "Auto-Deletion",
        desc: "All notes are automatically destroyed by MongoDB TTL indexes after your chosen expiry period. No backups, no archives.",
    },
    {
        icon: <IconLock size={22} stroke={1.5} />,
        title: "No Accounts",
        desc: "We don't require authentication, emails, or personal data. No user profiles exist in our system.",
    },
    {
        icon: <IconClockHour4 size={22} stroke={1.5} />,
        title: "No Logging",
        desc: "We don't log IP addresses, user agents, or access patterns beyond what's needed for rate limiting.",
    },
    {
        icon: <IconServer size={22} stroke={1.5} />,
        title: "Minimal Infrastructure",
        desc: "Our API runs stateless containers. No persistent storage beyond the TTL-indexed database.",
    },
    {
        icon: <IconShieldCheck size={22} stroke={1.5} />,
        title: "Open Architecture",
        desc: "Our security model is transparent. We rely on well-known cryptographic primitives and industry-standard practices.",
    },
];

export default function PrivacyPage() {
    return (
        <div className="privacy-page">
            <div className="page-glow" />

            {/* Hero */}
            <section className="privacy-hero">
                <div className="container" style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
                    <motion.p
                        className="section-label"
                        style={{ justifyContent: "center" }}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                    >
                        Privacy Policy
                    </motion.p>
                    <motion.h1
                        className="heading-display"
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                    >
                        Your data is <span className="text-gradient">your data</span>
                    </motion.h1>
                    <motion.p
                        className="text-secondary"
                        style={{ fontSize: "1.1rem", maxWidth: 520, margin: "16px auto 0", lineHeight: 1.7 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                    >
                        NoteVault is built on a zero-trust, privacy-by-design architecture.
                        We can't read your notes, and we don't want to.
                    </motion.p>
                </div>
            </section>

            {/* Policies Grid */}
            <section className="section">
                <div className="container">
                    <motion.div
                        className="feature-grid"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-60px" }}
                        variants={{
                            hidden: { opacity: 0 },
                            show: { opacity: 1, transition: { staggerChildren: 0.08 } },
                        }}
                    >
                        {policies.map(({ icon, title, desc }) => (
                            <motion.div
                                key={title}
                                variants={{
                                    hidden: { opacity: 0, y: 24 },
                                    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
                                }}
                                className="glass-card"
                                style={{ padding: "32px 28px", cursor: "default" }}
                            >
                                <div className="feature-icon">{icon}</div>
                                <h3 className="heading-md" style={{ marginBottom: 8 }}>{title}</h3>
                                <p className="text-secondary" style={{ fontSize: "0.9rem", lineHeight: 1.7 }}>{desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Summary */}
            <section className="section" style={{ paddingTop: 0 }}>
                <div className="container container--narrow">
                    <SectionReveal>
                        <motion.div
                            variants={childVariants}
                            className="glass-card glass-card--static"
                            style={{ padding: "36px 32px", textAlign: "center" }}
                        >
                            <h2 className="heading-md" style={{ marginBottom: 12 }}>In short</h2>
                            <p className="text-secondary" style={{ fontSize: "0.95rem", lineHeight: 1.7 }}>
                                We collect the absolute minimum data necessary to deliver your note to its recipient.
                                Once the TTL expires, everything is permanently erased at the storage level.
                                No backups, no recovery, no trace.
                            </p>
                        </motion.div>
                    </SectionReveal>
                </div>
            </section>

            <style jsx>{`
        .privacy-page {
          position: relative;
        }
        .page-glow {
          position: fixed;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.06), transparent 70%);
          top: 10%;
          left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
          z-index: 0;
        }
        .privacy-hero {
          padding: 160px 0 40px;
          position: relative;
        }
      `}</style>
        </div>
    );
}
