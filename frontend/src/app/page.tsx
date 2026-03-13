"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { type Novel, type RankingItem } from "@/lib/api";

const GENRE_TABS = ["통합랭킹", "로맨스", "판타지", "무협", "SF", "미스터리"];

function formatViews(n: number): string {
  if (n >= 10000) return (n / 10000).toFixed(1) + "만";
  if (n >= 1000) return (n / 1000).toFixed(1) + "천";
  return String(n);
}

function RankBadge({ rank }: { rank: number }) {
  const colors: Record<number, string> = {
    1: "text-yellow-500",
    2: "text-gray-400",
    3: "text-amber-700",
  };
  return (
    <span
      className={`text-lg font-bold w-7 text-center shrink-0 ${
        colors[rank] || "text-text-secondary"
      }`}
    >
      {rank}
    </span>
  );
}

// Placeholder cover
function CoverPlaceholder({ title }: { title: string }) {
  const colors = [
    "from-emerald-400 to-teal-600",
    "from-blue-400 to-indigo-600",
    "from-purple-400 to-pink-600",
    "from-orange-400 to-red-600",
    "from-cyan-400 to-blue-600",
  ];
  const colorIndex =
    title.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % colors.length;
  return (
    <div
      className={`w-full h-full bg-gradient-to-br ${colors[colorIndex]} flex items-center justify-center`}
    >
      <span className="text-white text-xs font-medium text-center px-1 line-clamp-2">
        {title}
      </span>
    </div>
  );
}

interface ScheduleInfo {
  schedule: string;
  mode: string;
  totalNovels: number;
  novelStatus: {
    novelId: number;
    title: string;
    genre: string;
    currentEpisodes: number;
    totalEpisodes: number;
    latestEpisodeDate: string | null;
  }[];
  recentPublications: {
    novelId: number;
    novelTitle: string;
    episodeNumber: number;
    episodeId: number;
    publishedAt: string;
  }[];
}

async function fetchData(genre?: string) {
  const query = genre ? `?genre=${encodeURIComponent(genre)}` : "";
  try {
    const [novelsRes, rankingRes] = await Promise.all([
      fetch(`http://localhost:4000/api/novels${query}`),
      fetch(`http://localhost:4000/api/novels/ranking${query}`),
    ]);
    const novels = novelsRes.ok ? await novelsRes.json() : [];
    const ranking = rankingRes.ok ? await rankingRes.json() : [];
    return { novels, ranking };
  } catch (e) {
    console.error("API fetch failed:", e);
    return { novels: [], ranking: [] };
  }
}

async function fetchSchedule(): Promise<ScheduleInfo | null> {
  try {
    const res = await fetch("http://localhost:4000/api/novels/schedule/status");
    if (res.ok) return res.json();
    return null;
  } catch {
    return null;
  }
}

export default function HomePage() {
  const [novels, setNovels] = useState<Novel[]>([]);
  const [ranking, setRanking] = useState<RankingItem[]>([]);
  const [activeGenre, setActiveGenre] = useState("통합랭킹");
  const [loading, setLoading] = useState(true);
  const [schedule, setSchedule] = useState<ScheduleInfo | null>(null);
  const [publishing, setPublishing] = useState(false);

  const loadData = useCallback(async (genre: string) => {
    setLoading(true);
    const genreParam = genre === "통합랭킹" ? undefined : genre;
    const data = await fetchData(genreParam);
    setNovels(data.novels);
    setRanking(data.ranking);
    setLoading(false);
  }, []);

  const loadSchedule = useCallback(async () => {
    const data = await fetchSchedule();
    setSchedule(data);
  }, []);

  useEffect(() => {
    loadData(activeGenre);
    loadSchedule();
  }, [activeGenre, loadData, loadSchedule]);

  const handlePublishNow = async () => {
    if (publishing) return;
    setPublishing(true);
    try {
      const res = await fetch("http://localhost:4000/api/novels/schedule/publish-now", {
        method: "POST",
      });
      if (res.ok) {
        await loadData(activeGenre);
        await loadSchedule();
      }
    } catch (e) {
      console.error("Publish failed:", e);
    } finally {
      setPublishing(false);
    }
  };

  // Use ranking data if available, otherwise generate from novels
  const displayItems: RankingItem[] =
    ranking.length > 0
      ? ranking
      : novels.slice(0, 15).map((n, i) => ({
          rank: i + 1,
          rankChange: 'same',
          id: n.id,
          title: n.title,
          author: n.author,
          genre: n.genre,
          coverImage: n.coverImage,
          rating: n.rating,
          interests: n.interests,
          totalEpisodes: n.totalEpisodes,
        }));

  const featured = novels[0];

  return (
    <main className="min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white">
        <div className="max-w-[1200px] mx-auto px-4 py-10 md:py-16">
          {featured ? (
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-32 h-44 md:w-40 md:h-56 rounded-lg overflow-hidden shadow-2xl shrink-0">
                {featured.coverImage ? (
                  <img
                    src={featured.coverImage}
                    alt={featured.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <CoverPlaceholder title={featured.title} />
                )}
              </div>
              <div className="text-center md:text-left">
                <span className="inline-block px-2 py-0.5 bg-primary text-white text-xs rounded mb-2">
                  AI 추천
                </span>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  {featured.title}
                </h1>
                <p className="text-sm text-gray-300 mb-1">
                  {featured.author} | {featured.genre}
                </p>
                <p className="text-sm text-gray-400 line-clamp-2 max-w-lg mb-4">
                  {featured.description}
                </p>
                <Link
                  href={`/novel/${featured.id}`}
                  className="inline-block px-6 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-lg transition-colors"
                >
                  작품 보기
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                AI 웹소설 플랫폼
              </h1>
              <p className="text-gray-400">
                AI가 만들어가는 새로운 이야기의 세계
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Daily Episode Schedule Section */}
      {schedule && (
        <section className="max-w-[1200px] mx-auto px-4 pt-8 pb-4">
          <div className="bg-gradient-to-r from-primary/5 to-emerald-50 border border-primary/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  일일 자동 연재
                </h2>
                <p className="text-xs text-text-secondary mt-1">
                  매일 자정, 모든 소설에 새로운 에피소드가 자동으로 연재됩니다
                </p>
              </div>
              <button
                onClick={handlePublishNow}
                disabled={publishing}
                className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {publishing ? "연재 중..." : "지금 연재하기"}
              </button>
            </div>

            {/* Recent Publications */}
            {schedule.recentPublications.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-text-light mb-2">최근 연재 기록</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {schedule.recentPublications.slice(0, 6).map((pub) => (
                    <Link
                      key={`${pub.novelId}-${pub.episodeId}`}
                      href={`/novel/${pub.novelId}`}
                      className="flex items-center gap-2 p-2 bg-white rounded-lg hover:shadow-sm transition-shadow"
                    >
                      <span className="text-xs px-1.5 py-0.5 bg-primary/10 text-primary rounded font-medium">
                        NEW
                      </span>
                      <span className="text-sm text-foreground truncate flex-1">
                        {pub.novelTitle}
                      </span>
                      <span className="text-xs text-text-secondary shrink-0">
                        {pub.episodeNumber}화
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Novel Status Overview */}
            <div className="mt-4 pt-4 border-t border-primary/10">
              <div className="flex items-center gap-4 text-xs text-text-secondary">
                <span>등록 작품: <strong className="text-foreground">{schedule.totalNovels}개</strong></span>
                <span>연재 주기: <strong className="text-foreground">매일 자정</strong></span>
                <span>총 연재 기록: <strong className="text-foreground">{schedule.recentPublications.length}회</strong></span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Ranking Section */}
      <section className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">
            웹소설 통합 랭킹
          </h2>
        </div>

        {/* Genre Tabs */}
        <div className="flex gap-1 mb-6 overflow-x-auto pb-2">
          {GENRE_TABS.map((genre) => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              className={`px-4 py-2 text-sm rounded-full whitespace-nowrap transition-colors ${
                activeGenre === genre
                  ? "bg-primary text-white"
                  : "bg-bg-gray text-text-light hover:bg-gray-200"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-lg bg-bg-gray animate-pulse"
              >
                <div className="w-7 h-5 bg-gray-200 rounded" />
                <div className="w-14 h-18 bg-gray-200 rounded" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : displayItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-1">
            {displayItems.map((item) => (
              <Link
                key={item.id}
                href={`/novel/${item.id}`}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-bg-gray transition-colors group"
              >
                <RankBadge rank={item.rank} />
                <div className="w-14 h-[72px] rounded overflow-hidden shrink-0 bg-gray-100">
                  {item.coverImage ? (
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <CoverPlaceholder title={item.title} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-text-secondary mt-0.5">
                    {item.author}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-1.5 py-0.5 bg-bg-gray text-text-secondary rounded">
                      {item.genre}
                    </span>
                    <span className="text-xs text-yellow-500">
                      ★ {item.rating?.toFixed(1) || "0.0"}
                    </span>
                    <span className="text-xs text-text-secondary">
                      관심 {formatViews(item.interests || 0)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-text-secondary">
            <p className="text-lg mb-2">아직 등록된 작품이 없습니다</p>
            <p className="text-sm">새로운 AI 웹소설이 곧 연재됩니다</p>
          </div>
        )}
      </section>
    </main>
  );
}
