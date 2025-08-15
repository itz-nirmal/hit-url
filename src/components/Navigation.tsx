"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className = "" }: NavigationProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/signup", label: "Sign Up" },
    { href: "/login", label: "Log In" },
    { href: "/about-me", label: "About Me" },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="absolute top-6 right-6 z-30 md:hidden bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-white hover:text-[rgb(0,251,205)] hover:bg-white/10 transition-all duration-300"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-25 md:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="absolute top-20 right-6 bg-black/80 backdrop-blur-md border border-white/20 rounded-lg p-6 min-w-[180px] shadow-xl">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-4 px-4 mb-2 last:mb-0 rounded-lg text-white/90 hover:text-[rgb(0,251,205)] hover:bg-white/10 transition-colors duration-300 font-bold text-base font-mono tracking-wide uppercase relative cursor-pointer ${
                    isActive ? "text-[rgb(0,251,205)] bg-white/5" : ""
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <div className="absolute -bottom-1 left-4 right-4 h-0.5 bg-[rgb(0,251,205)] rounded-full"></div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Desktop Navigation */}
      <div
        className={`absolute top-4 right-4 sm:top-8 sm:right-8 z-20 hidden md:flex flex-row space-x-8 lg:space-x-10 ${className}`}
      >
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg text-white/90 hover:text-[rgb(0,251,205)] hover:bg-white/10 transition-all duration-300 font-bold text-lg font-mono tracking-wide uppercase relative cursor-pointer ${
                isActive ? "text-[rgb(0,251,205)] bg-white/5" : ""
              }`}
            >
              {link.label}
              {isActive && (
                <div className="absolute -bottom-1 left-2 right-2 h-0.5 bg-[rgb(0,251,205)] rounded-full"></div>
              )}
            </Link>
          );
        })}
      </div>
    </>
  );
}
