"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const links = [
    { href: "/", label: "Home" },
    { href: "/create", label: "Create" },
    { href: "/access", label: "Access" },
    { href: "/privacy", label: "Privacy" },
  ];

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.1 }}
      >
        <div className="navbar-inner">
          {/* Logo */}
          <Link href="/" className="navbar-brand">
            <span className="navbar-brand-icon">N</span>
            <span className="navbar-brand-text">NoteVault</span>
          </Link>

          {/* Desktop Links */}
          <div className="navbar-links">
            {links.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`navbar-link ${isActive ? "navbar-link--active" : ""}`}
                >
                  {label}
                  {isActive && (
                    <motion.span
                      className="navbar-link-indicator"
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="navbar-actions">
            <Link href="/create" className="navbar-cta">
              <span className="navbar-cta-glow" />
              Get Started
            </Link>

            <button
              className="navbar-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation"
            >
              <span className={`hamburger ${mobileOpen ? "open" : ""}`}>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="mobile-menu"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {links.map(({ href, label }, i) => {
                const isActive = pathname === href;
                return (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <Link
                      href={href}
                      className={`mobile-link ${isActive ? "mobile-link--active" : ""}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                style={{ marginTop: 16 }}
              >
                <Link
                  href="/create"
                  className="mobile-cta"
                  onClick={() => setMobileOpen(false)}
                >
                  Get Started Free
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        /* ── Navbar ── */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          justify-content: center;
          padding: 16px 24px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .navbar.navbar--scrolled {
          padding: 10px 24px;
        }

        /* ── Inner container ── */
        .navbar .navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 920px;
          height: 52px;
          padding: 0 6px 0 16px;
          background: rgba(12, 12, 15, 0.6);
          backdrop-filter: blur(20px) saturate(1.5);
          -webkit-backdrop-filter: blur(20px) saturate(1.5);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.03);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .navbar.navbar--scrolled .navbar-inner {
          background: rgba(9, 9, 11, 0.92);
          border-color: rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.04);
        }

        /* ── Brand ── */
        .navbar .navbar-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }

        .navbar .navbar-brand-icon {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: linear-gradient(135deg, #8b5cf6, #6366f1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.78rem;
          font-weight: 800;
          color: white;
          letter-spacing: -0.02em;
          box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3);
        }

        .navbar .navbar-brand-text {
          font-size: 0.88rem;
          font-weight: 700;
          color: #fafafa;
          letter-spacing: -0.02em;
        }

        /* ── Desktop links ── */
        .navbar .navbar-links {
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .navbar .navbar-link {
          position: relative;
          padding: 7px 14px;
          border-radius: 10px;
          font-size: 0.84rem;
          font-weight: 450;
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          transition: color 0.2s ease;
          font-family: var(--font-sans);
          white-space: nowrap;
        }

        .navbar .navbar-link:hover {
          color: rgba(255, 255, 255, 0.85);
        }

        .navbar .navbar-link.navbar-link--active {
          color: #fafafa;
        }

        .navbar .navbar-link-indicator {
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          z-index: -1;
        }

        /* ── Right actions ── */
        .navbar .navbar-actions {
          display: flex;
          align-items: center;
          gap: 4px;
          flex-shrink: 0;
        }

        /* ── CTA — Gradient pill ── */
        .navbar .navbar-cta {
          position: relative;
          display: inline-flex;
          align-items: center;
          padding: 8px 18px;
          background: linear-gradient(135deg, #8b5cf6, #6366f1);
          color: #ffffff;
          border-radius: 10px;
          font-size: 0.82rem;
          font-weight: 600;
          text-decoration: none;
          font-family: var(--font-sans);
          border: none;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: nowrap;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(139, 92, 246, 0.25), inset 0 1px 0 rgba(255,255,255,0.15);
        }

        .navbar .navbar-cta:hover {
          filter: brightness(1.15);
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(139, 92, 246, 0.35), inset 0 1px 0 rgba(255,255,255,0.2);
        }

        .navbar .navbar-cta-glow {
          position: absolute;
          inset: -1px;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.4), transparent, rgba(99, 102, 241, 0.4));
          border-radius: inherit;
          filter: blur(8px);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }

        .navbar .navbar-cta:hover .navbar-cta-glow {
          opacity: 1;
        }

        /* ── Mobile toggle ── */
        .navbar .navbar-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 10px;
          margin-right: 4px;
        }

        .navbar .hamburger {
          display: flex;
          flex-direction: column;
          gap: 6px;
          width: 20px;
        }

        .navbar .hamburger span {
          display: block;
          height: 1.5px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 2px;
          transition: all 250ms ease;
          transform-origin: center;
        }

        .navbar .hamburger.open span:nth-child(1) {
          transform: translateY(3.75px) rotate(45deg);
          background: #fff;
        }
        .navbar .hamburger.open span:nth-child(2) {
          transform: translateY(-3.75px) rotate(-45deg);
          background: #fff;
        }

        /* ── Mobile overlay ── */
        .mobile-overlay {
          position: fixed;
          inset: 0;
          z-index: 99;
          background: rgba(9, 9, 11, 0.97);
          backdrop-filter: blur(32px);
          -webkit-backdrop-filter: blur(32px);
          padding: 100px 24px 24px;
        }

        .mobile-overlay .mobile-menu {
          max-width: 400px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .mobile-overlay .mobile-link {
          display: block;
          padding: 16px 20px;
          font-size: 1.1rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          border-radius: 12px;
          transition: all 0.2s ease;
          font-family: var(--font-sans);
        }

        .mobile-overlay .mobile-link:hover,
        .mobile-overlay .mobile-link.mobile-link--active {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.05);
        }

        .mobile-overlay .mobile-cta {
          display: block;
          text-align: center;
          padding: 16px 24px;
          background: linear-gradient(135deg, #8b5cf6, #6366f1);
          color: #ffffff;
          font-weight: 600;
          font-size: 0.95rem;
          border-radius: 14px;
          text-decoration: none;
          font-family: var(--font-sans);
          box-shadow: 0 4px 16px rgba(139, 92, 246, 0.3);
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .navbar { padding: 10px 16px; }
          .navbar .navbar-inner {
            max-width: 100%;
            height: 48px;
            padding: 0 6px 0 14px;
          }
          .navbar .navbar-links { display: none; }
          .navbar .navbar-cta { display: none; }
          .navbar .navbar-toggle { display: block; }
        }
      `}</style>
    </>
  );
}
