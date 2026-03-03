"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { IconShieldCheck } from "@tabler/icons-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* ── Footer Grid ── */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link href="/" className="footer-logo-link">
                NoteVault
              </Link>
              <p className="footer-tagline">
                Privacy-first temporary note sharing. No accounts, no tracking,
                no data stored beyond expiry.
              </p>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">Navigate</h4>
              <Link href="/" className="footer-link">Home</Link>
              <Link href="/create" className="footer-link">Create Note</Link>
              <Link href="/access" className="footer-link">Access Note</Link>
              <Link href="/privacy" className="footer-link">Privacy</Link>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">Security</h4>
              <span className="footer-info">
                <IconShieldCheck size={14} /> End-to-end encrypted
              </span>
              <span className="footer-info">
                <IconShieldCheck size={14} /> Auto-expiring notes
              </span>
              <span className="footer-info">
                <IconShieldCheck size={14} /> Zero knowledge architecture
              </span>
            </div>
          </div>

          <div className="footer-divider" />

          <div className="footer-bottom">
            <p className="footer-copyright">
              © {currentYear} NoteVault. All rights reserved.
            </p>
            <p className="footer-built">
              Built with privacy by design.
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .footer {
          position: relative;
          z-index: 10;
        }

        .footer-main {
          padding: 56px 0 28px;
          border-top: 1px solid var(--border-subtle);
          background: var(--bg-secondary);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 48px;
          margin-bottom: 48px;
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .footer-logo-link {
          font-family: var(--font-sans);
          font-size: 1.3rem;
          font-weight: 800;
          text-decoration: none;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          width: fit-content;
        }

        .footer-tagline {
          color: var(--text-muted);
          font-size: var(--text-small);
          line-height: 1.7;
          max-width: 320px;
        }

        .footer-col {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-col-title {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--text-secondary);
          margin-bottom: 4px;
        }

        .footer-link {
          color: var(--text-muted);
          text-decoration: none;
          font-size: var(--text-small);
          transition: color 0.2s ease;
        }

        .footer-link:hover {
          color: var(--text-primary);
        }

        .footer-info {
          color: var(--text-muted);
          font-size: 0.82rem;
          line-height: 1.5;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .footer-info svg {
          color: #16a34a;
          opacity: 0.6;
          flex-shrink: 0;
        }

        .footer-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border-light), transparent);
          margin-bottom: 24px;
        }

        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .footer-copyright {
          color: var(--text-muted);
          font-size: var(--text-caption);
        }

        .footer-built {
          color: var(--text-muted);
          font-size: var(--text-caption);
          opacity: 0.6;
        }

        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr; gap: 32px; }
          .footer-bottom { flex-direction: column; gap: 8px; text-align: center; }
        }
      `}</style>
    </footer>
  );
}
