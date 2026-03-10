"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  fetchNovel,
  fetchEpisode,
  fetchEpisodes,
  type Novel,
  type Episode,
} from "@/lib/api";

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

export default function ReaderPage() {
  const params = useParams();
  const router = useRouter();
  const novelId = Number(params.id);
  const episodeId = Number(params.episodeId);

  const [novel, setNovel] = useState<Novel | null>(null);
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [showEpisodeList, setShowEpisodeList] = useState(false);

  useEffect(() => {
    loadData();
    window.scrollTo(0, 0);
  }, [novelId, episodeId]);

  useEffect(() => {
    function handleScroll() {
      setShowTopBtn(window.scrollY > 300);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [novelData, episodeData, episodesData] = await Promise.all([
        fetchNovel(novelId).catch(() => null),
        fetchEpisode(novelId, episodeId).catch(() => null),
        fetchEpisodes(novelId).catch(() => []),
      ]);
      setNovel(novelData);
      setEpisode(episodeData);
      setEpisodes(episodesData);
    } catch {
      // handle error
    } finally {
      setLoading(false);
    }
  }

  const currentIndex = episodes.findIndex((ep) => ep.id === episodeId);
  const prevEpisode = currentIndex > 0 ? episodes[currentIndex - 1] : null;
  const nextEpisode =
    currentIndex < episodes.length - 1 ? episodes[currentIndex + 1] : null;

  const goToPrev = useCallback(() => {
    if (prevEpisode) {
      router.push(`/novel/${novelId}/episode/${prevEpisode.id}`);
    }
  }, [prevEpisode, novelId, router]);

  const goToNext = useCallback(() => {
    if (nextEpisode) {
      router.push(`/novel/${novelId}/episode/${nextEpisode.id}`);
    }
  }, [nextEpisode, novelId, router]);

  // Keyboard navigation
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goToPrev, goToNext]);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-[720px] mx-auto px-4 py-16">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="space-y-3 mt-8">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded" />
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!episode) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-text-secondary text-lg mb-4">
            에피소드를 찾을 수 없습니다
          </p>
          <Link href={`/novel/${novelId}`} className="text-primary text-sm">
            작품 페이지로 돌아가기
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Reader Header */}
      <div className="sticky top-14 z-40 bg-white border-b border-border">
        <div className="max-w-[720px] mx-auto px-4 flex items-center justify-between h-12">
          {/* Left: novel title */}
          <Link
            href={`/novel/${novelId}`}
            className="text-sm text-text-light hover:text-foreground truncate max-w-[200px]"
          >
            {novel?.title || "작품"}
          </Link>

          {/* Center: episode nav */}
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrev}
              disabled={!prevEpisode}
              className={`p-1.5 rounded transition-colors ${
                prevEpisode
                  ? "text-foreground hover:bg-bg-gray"
                  : "text-gray-300 cursor-not-allowed"
              }`}
              aria-label="이전 화"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M10 3L5 8l5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Episode dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowEpisodeList(!showEpisodeList)}
                className="text-sm font-medium text-foreground px-2 py-1 hover:bg-bg-gray rounded"
              >
                {episode.episodeNumber}화
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className="inline ml-1"
                >
                  <path
                    d="M3 5l3 3 3-3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              {showEpisodeList && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-48 bg-white border border-border rounded-lg shadow-lg max-h-64 overflow-y-auto">
                  {episodes.map((ep) => (
                    <Link
                      key={ep.id}
                      href={`/novel/${novelId}/episode/${ep.id}`}
                      onClick={() => setShowEpisodeList(false)}
                      className={`block px-3 py-2 text-sm hover:bg-bg-gray ${
                        ep.id === episodeId
                          ? "text-primary font-medium bg-green-50"
                          : "text-foreground"
                      }`}
                    >
                      {ep.episodeNumber}화 - {ep.title || `에피소드 ${ep.episodeNumber}`}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={goToNext}
              disabled={!nextEpisode}
              className={`p-1.5 rounded transition-colors ${
                nextEpisode
                  ? "text-foreground hover:bg-bg-gray"
                  : "text-gray-300 cursor-not-allowed"
              }`}
              aria-label="다음 화"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 3l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-2">
            <button
              className="p-1.5 text-text-light hover:text-foreground transition-colors"
              aria-label="북마크"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M4 2h10v14l-5-3-5 3V2z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className="text-xs text-text-light hover:text-foreground px-2 py-1 rounded hover:bg-bg-gray transition-colors">
              보기설정
            </button>
          </div>
        </div>
      </div>

      {/* Reading Area */}
      <div className="relative">
        {/* Desktop side arrows */}
        {prevEpisode && (
          <button
            onClick={goToPrev}
            className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-white border border-border shadow hover:bg-bg-gray transition-colors z-30"
            aria-label="이전 화"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M12 4L6 10l6 6"
                stroke="#666"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        {nextEpisode && (
          <button
            onClick={goToNext}
            className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-white border border-border shadow hover:bg-bg-gray transition-colors z-30"
            aria-label="다음 화"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M8 4l6 6-6 6"
                stroke="#666"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        {/* Content */}
        <article className="max-w-[720px] mx-auto px-4 py-10 md:py-16">
          <header className="mb-8 pb-6 border-b border-border">
            <h1 className="text-xl md:text-2xl font-bold text-foreground mb-2">
              {episode.title || `${episode.episodeNumber}화`}
            </h1>
            <p className="text-sm text-text-secondary">
              {formatDate(episode.createdAt)}
            </p>
          </header>

          <div
            className="prose prose-gray max-w-none"
            style={{ lineHeight: "1.9", fontSize: "16px" }}
          >
            {episode.content
              ? episode.content.split("\n").map((paragraph, idx) =>
                  paragraph.trim() ? (
                    <p key={idx} className="mb-4 text-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  ) : (
                    <br key={idx} />
                  )
                )
              : (
                <p className="text-text-secondary">내용이 없습니다.</p>
              )}
          </div>

          {/* Bottom nav */}
          <div className="mt-12 pt-6 border-t border-border flex items-center justify-between">
            {prevEpisode ? (
              <Link
                href={`/novel/${novelId}/episode/${prevEpisode.id}`}
                className="flex items-center gap-2 text-sm text-text-light hover:text-primary transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M10 3L5 8l5 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                이전 화
              </Link>
            ) : (
              <div />
            )}
            <Link
              href={`/novel/${novelId}`}
              className="text-sm text-text-light hover:text-primary transition-colors"
            >
              목록
            </Link>
            {nextEpisode ? (
              <Link
                href={`/novel/${novelId}/episode/${nextEpisode.id}`}
                className="flex items-center gap-2 text-sm text-text-light hover:text-primary transition-colors"
              >
                다음 화
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M6 3l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </article>
      </div>

      {/* Mobile bottom nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border z-40">
        <div className="flex items-center justify-between px-4 h-12">
          <button
            onClick={goToPrev}
            disabled={!prevEpisode}
            className={`flex items-center gap-1 text-sm ${
              prevEpisode ? "text-foreground" : "text-gray-300"
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 3L5 8l5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            이전
          </button>
          <Link
            href={`/novel/${novelId}`}
            className="text-sm text-text-light"
          >
            목록
          </Link>
          <button
            onClick={goToNext}
            disabled={!nextEpisode}
            className={`flex items-center gap-1 text-sm ${
              nextEpisode ? "text-foreground" : "text-gray-300"
            }`}
          >
            다음
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 3l5 5-5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* TOP button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-16 lg:bottom-8 right-4 w-10 h-10 bg-white border border-border rounded-full shadow flex items-center justify-center text-xs font-bold text-text-light hover:bg-bg-gray transition-colors z-40"
          aria-label="맨 위로"
        >
          TOP
        </button>
      )}
    </main>
  );
}
