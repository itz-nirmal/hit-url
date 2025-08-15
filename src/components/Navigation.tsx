"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className = "" }: NavigationProps) {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/signup", label: "Sign Up" },
    { href: "/login", label: "Log In" },
    { href: "/about-me", label: "About Me" },
  ];

  return (
    <div
      className={`absolute top-8 right-8 z-20 flex flex-row space-x-6 ${className}`}
    >
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`text-white/90 hover:text-[rgb(0,251,205)] transition-colors duration-300 font-bold text-lg font-mono tracking-wide uppercase relative cursor-pointer ${
              isActive ? "text-[rgb(0,251,205)]" : ""
            }`}
          >
            {link.label}
            {isActive && (
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[rgb(0,251,205)] rounded-full"></div>
            )}
          </Link>
        );
      })}
    </div>
  );
}
