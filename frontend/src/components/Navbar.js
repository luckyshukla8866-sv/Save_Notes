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
        <div className="navbar-pill">
          {/* Logo — Craft-style bold blocky */}
          <Link href="/" className="navbar-brand">
            NOTEVAULT
          </Link>

          {/* Desktop Links — Centered */}
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
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="navbar-actions">
            <Link href="/access" className="navbar-login">
              Log in
            </Link>
            <Link href="/create" className="navbar-cta">
              Try NoteVault Free
            </Link>

            <button
              className="navbar-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation"
            >
              <span className={`hamburger ${mobileOpen ? "open" : ""}`}>
                <span></span>
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
                style={{ marginTop: 12 }}
              >
                <Link
                  href="/create"
                  className="mobile-cta"
                  onClick={() => setMobileOpen(false)}
                >
                  Try NoteVault Free
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        /* ── Navbar — fixed transparent at top ── */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          justify-content: center;
          padding: 16px 24px;
          transition: padding 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .navbar.navbar--scrolled {
          padding: 10px 24px;
        }

        /* ── Dark floating pill (Craft.do style) ── */
        .navbar .navbar-pill {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          width: 100%;
          max-width: 860px;
          height: 50px;
          padding: 0 5px 0 22px;
          background: rgba(28, 28, 30, 0.75);
          backdrop-filter: blur(24px) saturate(1.8);
          -webkit-backdrop-filter: blur(24px) saturate(1.8);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 9999px;
          box-shadow: 0 2px 16px rgba(0, 0, 0, 0.10);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .navbar.navbar--scrolled .navbar-pill {
          background: rgba(20, 20, 22, 0.88);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.18);
        }

        /* ── Logo — Craft-style bold uppercase ── */
        .navbar .navbar-brand {
          font-family: var(--font-sans);
          font-size: 0.82rem;
          font-weight: 900;
          color: #ffffff !important;
          letter-spacing: 0.16em;
          text-decoration: none;
          flex-shrink: 0;
          padding: 4px 0;
        }

        /* ── Desktop links ── */
        .navbar .navbar-links {
          display: flex;
          align-items: center;
          gap: 0;
        }

        .navbar .navbar-link {
          padding: 6px 13px;
          border-radius: 9999px;
          font-size: 0.84rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.6) !important;
          text-decoration: none;
          transition: color 0.25s ease;
          font-family: var(--font-sans);
          white-space: nowrap;
        }

        .navbar .navbar-link:hover {
          color: rgba(255, 255, 255, 0.95) !important;
        }

        .navbar .navbar-link.navbar-link--active {
          color: #ffffff !important;
          font-weight: 500;
        }

        /* ── Right actions ── */
        .navbar .navbar-actions {
          display: flex;
          align-items: center;
          gap: 2px;
          flex-shrink: 0;
        }

        .navbar .navbar-login {
          padding: 6px 14px;
          font-size: 0.84rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.6) !important;
          text-decoration: none;
          transition: color 0.25s ease;
          font-family: var(--font-sans);
          white-space: nowrap;
        }

        .navbar .navbar-login:hover {
          color: #ffffff !important;
        }

        /* ── CTA button — White pill (Craft.do style) ── */
        .navbar .navbar-cta {
          display: inline-flex;
          align-items: center;
          padding: 8px 18px;
          background: #ffffff;
          color: #1a1a1a !important;
          border-radius: 9999px;
          font-size: 0.82rem;
          font-weight: 600;
          text-decoration: none;
          font-family: var(--font-sans);
          border: none;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: nowrap;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        }

        .navbar .navbar-cta:hover {
          background: #f0f0f0;
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
        }

        /* ── Mobile toggle ── */
        .navbar .navbar-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          margin-right: 8px;
        }

        .navbar .hamburger {
          display: flex;
          flex-direction: column;
          gap: 5px;
          width: 20px;
        }

        .navbar .hamburger span {
          display: block;
          height: 1.5px;
          background: rgba(255, 255, 255, 0.7);
          border-radius: 2px;
          transition: all 250ms ease;
        }

        .navbar .hamburger.open span:nth-child(1) {
          transform: translateY(6.5px) rotate(45deg);
          background: #fff;
        }
        .navbar .hamburger.open span:nth-child(2) {
          opacity: 0;
        }
        .navbar .hamburger.open span:nth-child(3) {
          transform: translateY(-6.5px) rotate(-45deg);
          background: #fff;
        }

        /* ── Mobile overlay ── */
        .mobile-overlay {
          position: fixed;
          inset: 0;
          z-index: 99;
          background: rgba(10, 10, 10, 0.96);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          padding: 100px 24px 24px;
        }

        .mobile-overlay .mobile-menu {
          max-width: 400px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .mobile-overlay .mobile-link {
          display: block;
          padding: 16px 20px;
          font-size: 1.05rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.6) !important;
          text-decoration: none;
          border-radius: 12px;
          transition: all 0.2s ease;
          font-family: var(--font-sans);
        }

        .mobile-overlay .mobile-link:hover,
        .mobile-overlay .mobile-link.mobile-link--active {
          color: #ffffff !important;
          background: rgba(255, 255, 255, 0.06);
        }

        .mobile-overlay .mobile-cta {
          display: block;
          text-align: center;
          padding: 16px 24px;
          background: #ffffff;
          color: #000000 !important;
          font-weight: 600;
          font-size: 0.95rem;
          border-radius: 9999px;
          text-decoration: none;
          font-family: var(--font-sans);
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .navbar { padding: 10px 16px; }
          .navbar .navbar-pill {
            max-width: 100%;
            height: 48px;
            padding: 0 8px 0 18px;
          }
          .navbar .navbar-links { display: none; }
          .navbar .navbar-login { display: none; }
          .navbar .navbar-cta { display: none; }
          .navbar .navbar-toggle { display: block; }
        }
      `}</style>
    </>
  );
}
