"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "홈", href: "/" },
  { label: "MY", href: "/my" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between h-14">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-primary"
          >
            <path
              d="M4 3C4 2.44772 4.44772 2 5 2H9C9.55228 2 10 2.44772 10 3V21C10 21.5523 9.55228 22 9 22H5C4.44772 22 4 21.5523 4 21V3Z"
              fill="currentColor"
            />
            <path
              d="M12 3C12 2.44772 12.4477 2 13 2H17C17.5523 2 18 2.44772 18 3V21C18 21.5523 17.5523 22 17 22H13C12.4477 22 12 21.5523 12 21V3Z"
              fill="currentColor"
              opacity="0.6"
            />
          </svg>
          <span className="text-lg font-bold text-foreground">
            AI <span className="text-primary">웹소설</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-4 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-text-light hover:text-foreground"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right area */}
        <div className="hidden md:flex items-center gap-3">
          <button className="px-3 py-1.5 text-xs border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-colors">
            선호장르
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴"
        >
          {menuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6l12 12M6 18L18 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 6h18M3 12h18M3 18h18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-white">
          <nav className="flex flex-col">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-3 text-sm border-b border-border ${
                    isActive
                      ? "text-primary font-medium bg-green-50"
                      : "text-text-light"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="px-4 py-3">
              <button className="px-3 py-1.5 text-xs border border-primary text-primary rounded-full">
                선호장르
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
