"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  fetchNovel,
  fetchEpisodes,
  fetchRanking,
  fetchUserNovelStatus,
  toggleLike,
  toggleInterest,
  type Novel,
  type Episode,
  type RankingItem,
} from "@/lib/api";

function formatViews(n: number): string {
  if (n >= 10000) return (n / 10000).toFixed(1) + "만";
  if (n >= 1000) return (n / 1000).toFixed(1) + "천";
  return String(n);
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

function CoverPlaceholder({ title, large }: { title: string; large?: boolean }) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center">
      <span className={`text-white font-medium text-center px-2 ${large ? "text-lg" : "text-xs"}`}>
        {title}
      </span>
    </div>
  );
}

export default function NovelDetailPage() {
  const params = useParams();
  const novelId = Number(params.id);

  const [novel, setNovel] = useState<Novel | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [ranking, setRanking] = useState<RankingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<"latest" | "first">("latest");
  const [descExpanded, setDescExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [interested, setInterested] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [interestCount, setInterestCount] = useState(0);

  useEffect(() => {
    loadData();
  }, [novelId]);

  async function loadData() {
    setLoading(true);
    try {
      const [novelData, episodesData, rankingData] = await Promise.all([
        fetchNovel(novelId).catch(() => null),
        fetchEpisodes(novelId).catch(() => []),
        fetchRanking().catch(() => []),
      ]);
      setNovel(novelData);
      setEpisodes(episodesData);
      setRanking(rankingData.slice(0, 5));
      if (novelData) {
        setLikeCount(novelData.likes);
        setInterestCount(novelData.interests);
        // Fetch user status
        try {
          const status = await fetchUserNovelStatus(novelId);
          setLiked(status.liked);
          setInterested(status.interested);
        } catch { /* ignore */ }
      }
    } catch {
      // handle error
    } finally {
      setLoading(false);
    }
  }

  async function handleLike() {
    try {
      const result = await toggleLike(novelId);
      setLiked(result.liked);
      setLikeCount(result.totalLikes);
    } catch { /* ignore */ }
  }

  async function handleInterest() {
    try {
      const result = await toggleInterest(novelId);
      setInterested(result.interested);
      setInterestCount(result.totalInterests);
    } catch { /* ignore */ }
  }

  const sortedEpisodes = sortOrder === "first" ? [...episodes].reverse() : episodes;

  if (loading) {
    return (
      <main className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="flex gap-6">
            <div className="w-48 h-64 bg-gray-200 rounded-lg" />
            <div className="flex-1 space-y-3">
              <div className="h-6 bg-gray-200 rounded w-1/3" />
              <div className="h-4 bg-gray-200 rounded w-1/4" />
              <div className="h-20 bg-gray-200 rounded w-full" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!novel) {
    return (
      <main className="max-w-[1200px] mx-auto px-4 py-16 text-center">
        <p className="text-text-secondary text-lg">작품을 찾을 수 없습니다</p>
        <Link href="/" className="text-primary text-sm mt-4 inline-block">홈으로 돌아가기</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg-gray">
      {/* Novel Info Header */}
      <section className="bg-white border-b border-border">
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Cover */}
            <div className="w-40 h-56 md:w-48 md:h-64 rounded-lg overflow-hidden shadow-lg shrink-0 mx-auto md:mx-0">
              {novel.coverImage ? (
                <img src={novel.coverImage} alt={novel.title} className="w-full h-full object-cover" />
              ) : (
                <CoverPlaceholder title={novel.title} large />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                <span className="px-2 py-0.5 bg-primary text-white text-xs rounded">{novel.genre}</span>
                <span className="text-xs text-text-secondary">{novel.status}</span>
              </div>

              <h1 className="text-2xl font-bold text-foreground mb-1">{novel.title}</h1>
              <p className="text-sm text-text-light mb-4">{novel.author} | 총 {novel.totalEpisodes}화</p>

              {/* Stats with interactive buttons */}
              <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                <div className="text-center">
                  <p className="text-lg font-bold text-yellow-500">★ {novel.rating?.toFixed(1) || "0.0"}</p>
                  <p className="text-xs text-text-secondary">평점</p>
                </div>
                <button onClick={handleLike} className="text-center group">
                  <p className={`text-lg font-bold transition-colors ${liked ? "text-red-500" : "text-red-300 group-hover:text-red-400"}`}>
                    {liked ? "♥" : "♡"} {formatViews(likeCount)}
                  </p>
                  <p className="text-xs text-text-secondary">좋아요</p>
                </button>
                <button onClick={handleInterest} className="text-center group">
                  <p className={`text-lg font-bold transition-colors ${interested ? "text-primary" : "text-text-light group-hover:text-primary"}`}>
                    {interested ? "★" : "☆"} {formatViews(interestCount)}
                  </p>
                  <p className="text-xs text-text-secondary">관심</p>
                </button>
                <div className="text-center">
                  <p className="text-lg font-bold text-text-light">💬 {formatViews(novel.comments || 0)}</p>
                  <p className="text-xs text-text-secondary">댓글</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-4">
                <p className={`text-sm text-text-light leading-relaxed ${!descExpanded ? "line-clamp-3" : ""}`}>
                  {novel.description}
                </p>
                {novel.description && novel.description.length > 100 && (
                  <button onClick={() => setDescExpanded(!descExpanded)} className="text-xs text-primary mt-1">
                    {descExpanded ? "접기" : "더보기"}
                  </button>
                )}
              </div>

              {/* Tags */}
              {novel.tags && novel.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
                  {novel.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/search?q=${encodeURIComponent(tag)}`}
                      className="px-2 py-0.5 text-xs border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}

              {/* CTA */}
              {episodes.length > 0 && (
                <Link
                  href={`/novel/${novel.id}/episode/${episodes[episodes.length - 1].id}`}
                  className="inline-block px-8 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors"
                >
                  첫회보기
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content Area */}
      <div className="max-w-[1200px] mx-auto px-4 py-6 flex gap-6">
        {/* Episode List */}
        <div className="flex-1">
          <div className="bg-white rounded-lg border border-border">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <h3 className="text-sm font-bold text-foreground">회차 목록 ({episodes.length})</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setSortOrder("latest")}
                  className={`text-xs px-2 py-1 rounded ${sortOrder === "latest" ? "bg-primary text-white" : "text-text-secondary hover:text-foreground"}`}
                >
                  최신순
                </button>
                <button
                  onClick={() => setSortOrder("first")}
                  className={`text-xs px-2 py-1 rounded ${sortOrder === "first" ? "bg-primary text-white" : "text-text-secondary hover:text-foreground"}`}
                >
                  1회부터
                </button>
              </div>
            </div>

            {sortedEpisodes.length > 0 ? (
              <ul>
                {sortedEpisodes.map((ep) => (
                  <li key={ep.id} className="border-b border-border last:border-0">
                    <Link
                      href={`/novel/${novel.id}/episode/${ep.id}`}
                      className="flex items-center px-4 py-3 hover:bg-bg-gray transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          {ep.isNew && (
                            <span className="px-1.5 py-0.5 bg-red-500 text-white text-[10px] rounded font-bold">UP</span>
                          )}
                          <span className="text-sm text-foreground truncate">{ep.title || `${ep.episodeNumber}화`}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 shrink-0 ml-4">
                        <span className="text-xs text-yellow-500">★ {ep.rating?.toFixed(1) || "0.0"}</span>
                        <span className="text-xs text-text-secondary">💬 {ep.comments || 0}</span>
                        <span className="text-xs text-text-secondary">{formatViews(ep.views || 0)}</span>
                        <span className="text-xs text-text-secondary hidden sm:inline">{formatDate(ep.createdAt)}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="py-12 text-center text-text-secondary text-sm">아직 연재된 회차가 없습니다</div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block w-72 shrink-0 space-y-6">
          <div className="bg-white rounded-lg border border-border">
            <div className="px-4 py-3 border-b border-border">
              <h3 className="text-sm font-bold text-foreground">장르 일간 랭킹</h3>
            </div>
            <ul>
              {ranking.map((item) => (
                <li key={item.id} className="border-b border-border last:border-0">
                  <Link href={`/novel/${item.id}`} className="flex items-center gap-3 px-4 py-2.5 hover:bg-bg-gray transition-colors">
                    <span className={`text-sm font-bold w-5 text-center ${item.rank <= 3 ? item.rank === 1 ? "text-yellow-500" : item.rank === 2 ? "text-gray-400" : "text-amber-700" : "text-text-secondary"}`}>
                      {item.rank}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground truncate">{item.title}</p>
                      <p className="text-xs text-text-secondary">{item.author}</p>
                    </div>
                  </Link>
                </li>
              ))}
              {ranking.length === 0 && (
                <li className="px-4 py-6 text-center text-xs text-text-secondary">랭킹 데이터 없음</li>
              )}
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}
