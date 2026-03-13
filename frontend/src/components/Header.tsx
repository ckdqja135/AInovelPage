"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { searchNovels, type Novel } from "@/lib/api";

const NAV_ITEMS = [
  { label: "홈", href: "/" },
  { label: "MY", href: "/my" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Novel[]>([]);
  const [searching, setSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Close search on click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  function handleSearchChange(value: string) {
    setSearchQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!value.trim()) {
      setSearchResults([]);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      setSearching(true);
      try {
        const data = await searchNovels(value);
        setSearchResults(data.novels);
      } catch {
        setSearchResults([]);
      } finally {
        setSearching(false);
      }
    }, 300);
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between h-14">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
            <path d="M4 3C4 2.44772 4.44772 2 5 2H9C9.55228 2 10 2.44772 10 3V21C10 21.5523 9.55228 22 9 22H5C4.44772 22 4 21.5523 4 21V3Z" fill="currentColor" />
            <path d="M12 3C12 2.44772 12.4477 2 13 2H17C17.5523 2 18 2.44772 18 3V21C18 21.5523 17.5523 22 17 22H13C12.4477 22 12 21.5523 12 21V3Z" fill="currentColor" opacity="0.6" />
          </svg>
          <span className="text-lg font-bold text-foreground">
            AI <span className="text-primary">웹소설</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-4 text-sm font-medium transition-colors ${
                  isActive ? "text-primary" : "text-text-light hover:text-foreground"
                }`}
              >
                {item.label}
                {isActive && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />}
              </Link>
            );
          })}
        </nav>

        {/* Right area */}
        <div className="hidden md:flex items-center gap-2" ref={searchRef}>
          {/* Search */}
          {searchOpen ? (
            <div className="relative">
              <form onSubmit={handleSearchSubmit}>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="소설 제목, 작가, 태그 검색..."
                  className="w-64 px-3 py-1.5 text-sm border border-primary rounded-full outline-none focus:ring-2 focus:ring-primary/20"
                />
              </form>
              {/* Dropdown results */}
              {searchQuery.trim() && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-lg shadow-lg max-h-80 overflow-y-auto z-50">
                  {searching ? (
                    <div className="px-4 py-3 text-sm text-text-secondary">검색 중...</div>
                  ) : searchResults.length > 0 ? (
                    searchResults.slice(0, 8).map((novel) => (
                      <Link
                        key={novel.id}
                        href={`/novel/${novel.id}`}
                        onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-bg-gray transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{novel.title}</p>
                          <p className="text-xs text-text-secondary">{novel.author} | {novel.genre}</p>
                        </div>
                        <span className="text-xs text-yellow-500 shrink-0">★ {novel.rating.toFixed(1)}</span>
                      </Link>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-text-secondary">검색 결과가 없습니다</div>
                  )}
                  {searchResults.length > 8 && (
                    <Link
                      href={`/search?q=${encodeURIComponent(searchQuery)}`}
                      onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                      className="block px-4 py-2 text-sm text-primary text-center border-t border-border hover:bg-bg-gray"
                    >
                      전체 {searchResults.length}건 보기
                    </Link>
                  )}
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-text-light hover:text-foreground transition-colors"
              aria-label="검색"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 12l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>

        {/* Mobile hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-foreground"
            aria-label="검색"
          >
            <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
              <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 12l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <button
            className="p-2 text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="메뉴"
          >
            {menuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile search bar */}
      {searchOpen && (
        <div className="md:hidden border-t border-border bg-white px-4 py-2" ref={searchRef}>
          <form onSubmit={handleSearchSubmit}>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="소설 제목, 작가, 태그 검색..."
              className="w-full px-3 py-2 text-sm border border-border rounded-lg outline-none focus:border-primary"
            />
          </form>
          {searchQuery.trim() && (
            <div className="mt-2 bg-white border border-border rounded-lg max-h-64 overflow-y-auto">
              {searching ? (
                <div className="px-4 py-3 text-sm text-text-secondary">검색 중...</div>
              ) : searchResults.length > 0 ? (
                searchResults.slice(0, 5).map((novel) => (
                  <Link
                    key={novel.id}
                    href={`/novel/${novel.id}`}
                    onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-bg-gray"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{novel.title}</p>
                      <p className="text-xs text-text-secondary">{novel.author}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-text-secondary">검색 결과가 없습니다</div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-white">
          <nav className="flex flex-col">
            {NAV_ITEMS.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-3 text-sm border-b border-border ${
                    isActive ? "text-primary font-medium bg-green-50" : "text-text-light"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
