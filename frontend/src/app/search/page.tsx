"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { searchNovels, type Novel } from "@/lib/api";

function CoverPlaceholder({ title }: { title: string }) {
  const colors = [
    "from-emerald-400 to-teal-600",
    "from-blue-400 to-indigo-600",
    "from-purple-400 to-pink-600",
    "from-orange-400 to-red-600",
    "from-cyan-400 to-blue-600",
  ];
  const colorIndex = title.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % colors.length;
  return (
    <div className={`w-full h-full bg-gradient-to-br ${colors[colorIndex]} flex items-center justify-center`}>
      <span className="text-white text-xs font-medium text-center px-1 line-clamp-2">{title}</span>
    </div>
  );
}

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<Novel[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!query.trim()) return;
    setLoading(true);
    searchNovels(query)
      .then((data) => {
        setResults(data.novels);
        setTotal(data.totalResults);
      })
      .catch(() => {
        setResults([]);
        setTotal(0);
      })
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <main className="max-w-[1200px] mx-auto px-4 py-8">
      <h1 className="text-xl font-bold text-foreground mb-1">
        &quot;{query}&quot; 검색 결과
      </h1>
      <p className="text-sm text-text-secondary mb-6">총 {total}개의 작품</p>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex gap-4 p-4 bg-bg-gray rounded-lg animate-pulse">
              <div className="w-20 h-28 bg-gray-200 rounded" />
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-200 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((novel) => (
            <Link
              key={novel.id}
              href={`/novel/${novel.id}`}
              className="flex gap-4 p-4 bg-white border border-border rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="w-20 h-28 rounded overflow-hidden shrink-0 bg-gray-100">
                {novel.coverImage ? (
                  <img src={novel.coverImage} alt={novel.title} className="w-full h-full object-cover" />
                ) : (
                  <CoverPlaceholder title={novel.title} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-foreground truncate">{novel.title}</h3>
                <p className="text-xs text-text-secondary mt-0.5">{novel.author} | {novel.genre}</p>
                <p className="text-xs text-text-light mt-1 line-clamp-2">{novel.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-yellow-500">★ {novel.rating.toFixed(1)}</span>
                  <span className="text-xs text-text-secondary">총 {novel.totalEpisodes}화</span>
                </div>
                {novel.tags && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {novel.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-bg-gray text-text-secondary rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : query.trim() ? (
        <div className="text-center py-16">
          <p className="text-lg text-text-secondary mb-2">검색 결과가 없습니다</p>
          <p className="text-sm text-text-light">다른 키워드로 검색해보세요</p>
        </div>
      ) : null}
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="max-w-[1200px] mx-auto px-4 py-8"><p>로딩 중...</p></div>}>
      <SearchContent />
    </Suspense>
  );
}
