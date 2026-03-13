"use client";

import Link from "next/link";
import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  fetchNovel,
  fetchEpisode,
  fetchEpisodes,
  fetchComments,
  addComment,
  deleteComment,
  likeComment as likeCommentAPI,
  toggleBookmark,
  fetchUserEpisodeStatus,
  markAsRead,
  getReadingSettings,
  saveReadingSettings,
  getUserId,
  getNickname,
  type Novel,
  type Episode,
  type Comment,
  type ReadingSettings,
} from "@/lib/api";

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "방금 전";
  if (mins < 60) return `${mins}분 전`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}시간 전`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}일 전`;
  return formatDate(dateStr);
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

  // Bookmark
  const [bookmarked, setBookmarked] = useState(false);

  // Reading settings
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<ReadingSettings>(getReadingSettings());
  const settingsRef = useRef<HTMLDivElement>(null);

  // Comments
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [showComments, setShowComments] = useState(true);

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

  // Close settings on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setShowSettings(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
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

      // Load comments
      try {
        const commentsData = await fetchComments(novelId, episodeId);
        setComments(commentsData);
      } catch { /* ignore */ }

      // Load bookmark status
      try {
        const status = await fetchUserEpisodeStatus(novelId, episodeId);
        setBookmarked(status.bookmarked);
      } catch { /* ignore */ }

      // Mark as read
      try {
        await markAsRead(novelId, episodeId);
      } catch { /* ignore */ }
    } catch {
      // handle error
    } finally {
      setLoading(false);
    }
  }

  const currentIndex = episodes.findIndex((ep) => ep.id === episodeId);
  const prevEpisode = currentIndex > 0 ? episodes[currentIndex - 1] : null;
  const nextEpisode = currentIndex < episodes.length - 1 ? episodes[currentIndex + 1] : null;

  const goToPrev = useCallback(() => {
    if (prevEpisode) router.push(`/novel/${novelId}/episode/${prevEpisode.id}`);
  }, [prevEpisode, novelId, router]);

  const goToNext = useCallback(() => {
    if (nextEpisode) router.push(`/novel/${novelId}/episode/${nextEpisode.id}`);
  }, [nextEpisode, novelId, router]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goToPrev, goToNext]);

  async function handleBookmark() {
    try {
      const result = await toggleBookmark(novelId, episodeId);
      setBookmarked(result.bookmarked);
    } catch { /* ignore */ }
  }

  function updateSettings(partial: Partial<ReadingSettings>) {
    const newSettings = { ...settings, ...partial };
    setSettings(newSettings);
    saveReadingSettings(newSettings);
  }

  async function handleSubmitComment() {
    if (!commentText.trim() || submittingComment) return;
    setSubmittingComment(true);
    try {
      const newComment = await addComment(novelId, episodeId, commentText.trim());
      setComments([newComment, ...comments]);
      setCommentText("");
    } catch { /* ignore */ }
    setSubmittingComment(false);
  }

  async function handleDeleteComment(commentId: number) {
    try {
      await deleteComment(novelId, episodeId, commentId);
      setComments(comments.filter((c) => c.id !== commentId));
    } catch { /* ignore */ }
  }

  async function handleLikeComment(commentId: number) {
    try {
      const result = await likeCommentAPI(novelId, episodeId, commentId);
      setComments(comments.map((c) => (c.id === commentId ? { ...c, likes: result.likes } : c)));
    } catch { /* ignore */ }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const bgColors = [
    { label: "흰색", value: "#ffffff" },
    { label: "크림", value: "#FFF8E7" },
    { label: "연녹", value: "#E8F5E9" },
    { label: "회색", value: "#ECEFF1" },
    { label: "다크", value: "#263238" },
  ];

  const isDark = settings.backgroundColor === "#263238";

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
          <p className="text-text-secondary text-lg mb-4">에피소드를 찾을 수 없습니다</p>
          <Link href={`/novel/${novelId}`} className="text-primary text-sm">작품 페이지로 돌아가기</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: settings.backgroundColor }}>
      {/* Reader Header */}
      <div className="sticky top-14 z-40 bg-white border-b border-border">
        <div className="max-w-[720px] mx-auto px-4 flex items-center justify-between h-12">
          <Link href={`/novel/${novelId}`} className="text-sm text-text-light hover:text-foreground truncate max-w-[200px]">
            {novel?.title || "작품"}
          </Link>

          {/* Episode nav */}
          <div className="flex items-center gap-2">
            <button onClick={goToPrev} disabled={!prevEpisode}
              className={`p-1.5 rounded transition-colors ${prevEpisode ? "text-foreground hover:bg-bg-gray" : "text-gray-300 cursor-not-allowed"}`}
              aria-label="이전 화"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowEpisodeList(!showEpisodeList)}
                className="text-sm font-medium text-foreground px-2 py-1 hover:bg-bg-gray rounded"
              >
                {episode.episodeNumber}화
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="inline ml-1">
                  <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              {showEpisodeList && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-48 bg-white border border-border rounded-lg shadow-lg max-h-64 overflow-y-auto">
                  {episodes.map((ep) => (
                    <Link key={ep.id} href={`/novel/${novelId}/episode/${ep.id}`}
                      onClick={() => setShowEpisodeList(false)}
                      className={`block px-3 py-2 text-sm hover:bg-bg-gray ${ep.id === episodeId ? "text-primary font-medium bg-green-50" : "text-foreground"}`}
                    >
                      {ep.episodeNumber}화 - {ep.title || `에피소드 ${ep.episodeNumber}`}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <button onClick={goToNext} disabled={!nextEpisode}
              className={`p-1.5 rounded transition-colors ${nextEpisode ? "text-foreground hover:bg-bg-gray" : "text-gray-300 cursor-not-allowed"}`}
              aria-label="다음 화"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button onClick={handleBookmark}
              className={`p-1.5 transition-colors ${bookmarked ? "text-primary" : "text-text-light hover:text-foreground"}`}
              aria-label="북마크"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill={bookmarked ? "currentColor" : "none"}>
                <path d="M4 2h10v14l-5-3-5 3V2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="relative" ref={settingsRef}>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`text-xs px-2 py-1 rounded transition-colors ${showSettings ? "bg-primary text-white" : "text-text-light hover:text-foreground hover:bg-bg-gray"}`}
              >
                보기설정
              </button>
              {showSettings && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-white border border-border rounded-lg shadow-lg p-4 z-50">
                  <h4 className="text-sm font-bold text-foreground mb-3">보기 설정</h4>

                  {/* Font size */}
                  <div className="mb-4">
                    <label className="text-xs text-text-secondary mb-1 block">글자 크기: {settings.fontSize}px</label>
                    <input type="range" min="12" max="24" value={settings.fontSize}
                      onChange={(e) => updateSettings({ fontSize: Number(e.target.value) })}
                      className="w-full accent-primary"
                    />
                  </div>

                  {/* Line height */}
                  <div className="mb-4">
                    <label className="text-xs text-text-secondary mb-1 block">줄 간격: {settings.lineHeight.toFixed(1)}</label>
                    <input type="range" min="1.2" max="3.0" step="0.1" value={settings.lineHeight}
                      onChange={(e) => updateSettings({ lineHeight: Number(e.target.value) })}
                      className="w-full accent-primary"
                    />
                  </div>

                  {/* Background color */}
                  <div className="mb-2">
                    <label className="text-xs text-text-secondary mb-2 block">배경색</label>
                    <div className="flex gap-2">
                      {bgColors.map((bg) => (
                        <button key={bg.value}
                          onClick={() => updateSettings({ backgroundColor: bg.value })}
                          className={`w-8 h-8 rounded-full border-2 transition-colors ${settings.backgroundColor === bg.value ? "border-primary" : "border-gray-200"}`}
                          style={{ backgroundColor: bg.value }}
                          title={bg.label}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reading Area */}
      <div className="relative">
        {prevEpisode && (
          <button onClick={goToPrev}
            className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-white border border-border shadow hover:bg-bg-gray transition-colors z-30"
            aria-label="이전 화"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12 4L6 10l6 6" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        {nextEpisode && (
          <button onClick={goToNext}
            className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-white border border-border shadow hover:bg-bg-gray transition-colors z-30"
            aria-label="다음 화"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M8 4l6 6-6 6" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        {/* Content */}
        <article className="max-w-[720px] mx-auto px-4 py-10 md:py-16">
          <header className="mb-8 pb-6 border-b" style={{ borderColor: isDark ? "#455A64" : "#e5e5e5" }}>
            <h1 className="text-xl md:text-2xl font-bold mb-2" style={{ color: isDark ? "#ECEFF1" : "#333" }}>
              {episode.title || `${episode.episodeNumber}화`}
            </h1>
            <p className="text-sm" style={{ color: isDark ? "#90A4AE" : "#999" }}>
              {formatDate(episode.createdAt)}
            </p>
          </header>

          <div style={{ lineHeight: settings.lineHeight, fontSize: `${settings.fontSize}px`, fontFamily: settings.fontFamily }}>
            {episode.content
              ? episode.content.split("\n").map((paragraph, idx) =>
                  paragraph.trim() ? (
                    <p key={idx} className="mb-4 leading-relaxed" style={{ color: isDark ? "#CFD8DC" : "#333" }}>
                      {paragraph}
                    </p>
                  ) : (
                    <br key={idx} />
                  )
                )
              : <p style={{ color: isDark ? "#78909C" : "#999" }}>내용이 없습니다.</p>
            }
          </div>

          {/* Bottom nav */}
          <div className="mt-12 pt-6 border-t flex items-center justify-between" style={{ borderColor: isDark ? "#455A64" : "#e5e5e5" }}>
            {prevEpisode ? (
              <Link href={`/novel/${novelId}/episode/${prevEpisode.id}`}
                className="flex items-center gap-2 text-sm transition-colors hover:text-primary"
                style={{ color: isDark ? "#90A4AE" : "#666" }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                이전 화
              </Link>
            ) : <div />}
            <Link href={`/novel/${novelId}`} className="text-sm transition-colors hover:text-primary" style={{ color: isDark ? "#90A4AE" : "#666" }}>
              목록
            </Link>
            {nextEpisode ? (
              <Link href={`/novel/${novelId}/episode/${nextEpisode.id}`}
                className="flex items-center gap-2 text-sm transition-colors hover:text-primary"
                style={{ color: isDark ? "#90A4AE" : "#666" }}
              >
                다음 화
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            ) : <div />}
          </div>

          {/* Comments Section */}
          <section className="mt-8 pt-6 border-t" style={{ borderColor: isDark ? "#455A64" : "#e5e5e5" }}>
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-2 mb-4"
            >
              <h3 className="text-lg font-bold" style={{ color: isDark ? "#ECEFF1" : "#333" }}>
                댓글 ({comments.length})
              </h3>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                className={`transition-transform ${showComments ? "rotate-180" : ""}`}
              >
                <path d="M3 5l3 3 3-3" stroke={isDark ? "#90A4AE" : "#666"} strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            {showComments && (
              <>
                {/* Comment Input */}
                <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: isDark ? "#37474F" : "#f5f5f5" }}>
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="댓글을 입력하세요..."
                    rows={3}
                    className="w-full px-3 py-2 text-sm rounded-lg border outline-none resize-none"
                    style={{
                      backgroundColor: isDark ? "#263238" : "#fff",
                      color: isDark ? "#CFD8DC" : "#333",
                      borderColor: isDark ? "#455A64" : "#e5e5e5",
                    }}
                  />
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs" style={{ color: isDark ? "#78909C" : "#999" }}>
                      {getNickname()}
                    </span>
                    <button
                      onClick={handleSubmitComment}
                      disabled={!commentText.trim() || submittingComment}
                      className="px-4 py-1.5 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
                    >
                      {submittingComment ? "등록 중..." : "댓글 등록"}
                    </button>
                  </div>
                </div>

                {/* Comment List */}
                {comments.length > 0 ? (
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="pb-4 border-b" style={{ borderColor: isDark ? "#455A64" : "#e5e5e5" }}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium" style={{ color: isDark ? "#ECEFF1" : "#333" }}>
                              {comment.nickname}
                            </span>
                            <span className="text-xs" style={{ color: isDark ? "#78909C" : "#999" }}>
                              {timeAgo(comment.createdAt)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleLikeComment(comment.id)}
                              className="flex items-center gap-1 text-xs transition-colors hover:text-primary"
                              style={{ color: isDark ? "#78909C" : "#999" }}
                            >
                              ♥ {comment.likes}
                            </button>
                            {comment.userId === getUserId() && (
                              <button
                                onClick={() => handleDeleteComment(comment.id)}
                                className="text-xs transition-colors hover:text-red-500"
                                style={{ color: isDark ? "#78909C" : "#999" }}
                              >
                                삭제
                              </button>
                            )}
                          </div>
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: isDark ? "#B0BEC5" : "#666" }}>
                          {comment.content}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-8 text-sm" style={{ color: isDark ? "#78909C" : "#999" }}>
                    아직 댓글이 없습니다. 첫 댓글을 남겨보세요!
                  </p>
                )}
              </>
            )}
          </section>
        </article>
      </div>

      {/* Mobile bottom nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border z-40">
        <div className="flex items-center justify-between px-4 h-12">
          <button onClick={goToPrev} disabled={!prevEpisode}
            className={`flex items-center gap-1 text-sm ${prevEpisode ? "text-foreground" : "text-gray-300"}`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            이전
          </button>
          <Link href={`/novel/${novelId}`} className="text-sm text-text-light">목록</Link>
          <button onClick={goToNext} disabled={!nextEpisode}
            className={`flex items-center gap-1 text-sm ${nextEpisode ? "text-foreground" : "text-gray-300"}`}
          >
            다음
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* TOP button */}
      {showTopBtn && (
        <button onClick={scrollToTop}
          className="fixed bottom-16 lg:bottom-8 right-4 w-10 h-10 bg-white border border-border rounded-full shadow flex items-center justify-center text-xs font-bold text-text-light hover:bg-bg-gray transition-colors z-40"
          aria-label="맨 위로"
        >
          TOP
        </button>
      )}
    </main>
  );
}
