"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchUserProfile, getNickname, setNickname as saveNickname, type UserProfile } from "@/lib/api";

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

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

type Tab = "likes" | "interests" | "bookmarks" | "history";

export default function MyPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("likes");
  const [nickname, setNicknameState] = useState("");
  const [editingNickname, setEditingNickname] = useState(false);
  const [nicknameInput, setNicknameInput] = useState("");

  useEffect(() => {
    setNicknameState(getNickname());
    loadProfile();
  }, []);

  async function loadProfile() {
    setLoading(true);
    try {
      const data = await fetchUserProfile();
      setProfile(data);
    } catch {
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }

  function handleSaveNickname() {
    if (nicknameInput.trim()) {
      saveNickname(nicknameInput.trim());
      setNicknameState(nicknameInput.trim());
    }
    setEditingNickname(false);
  }

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "likes", label: "좋아요", count: profile?.likedNovels.length || 0 },
    { key: "interests", label: "관심작품", count: profile?.interestedNovels.length || 0 },
    { key: "bookmarks", label: "북마크", count: profile?.bookmarks.length || 0 },
    { key: "history", label: "열람기록", count: profile?.readingHistory.length || 0 },
  ];

  return (
    <main className="max-w-[1200px] mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-white border border-border rounded-xl p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-white text-xl font-bold">
            {nickname.charAt(0) || "U"}
          </div>
          <div className="flex-1">
            {editingNickname ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={nicknameInput}
                  onChange={(e) => setNicknameInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSaveNickname()}
                  className="px-3 py-1 text-sm border border-border rounded-lg outline-none focus:border-primary"
                  placeholder="닉네임 입력"
                  autoFocus
                />
                <button
                  onClick={handleSaveNickname}
                  className="px-3 py-1 text-xs bg-primary text-white rounded-lg"
                >
                  저장
                </button>
                <button
                  onClick={() => setEditingNickname(false)}
                  className="px-3 py-1 text-xs text-text-secondary"
                >
                  취소
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-foreground">{nickname}</h1>
                <button
                  onClick={() => {
                    setNicknameInput(nickname);
                    setEditingNickname(true);
                  }}
                  className="text-xs text-text-secondary hover:text-primary"
                >
                  수정
                </button>
              </div>
            )}
            <p className="text-sm text-text-secondary mt-1">
              좋아요 {profile?.likedNovels.length || 0} | 관심 {profile?.interestedNovels.length || 0} | 북마크 {profile?.bookmarks.length || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm rounded-full whitespace-nowrap transition-colors ${
              activeTab === tab.key
                ? "bg-primary text-white"
                : "bg-bg-gray text-text-light hover:bg-gray-200"
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-24 bg-bg-gray animate-pulse rounded-lg" />
          ))}
        </div>
      ) : (
        <>
          {/* Liked Novels */}
          {activeTab === "likes" && (
            <div>
              {profile && profile.likedNovels.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {profile.likedNovels.map((novel) => (
                    <Link
                      key={novel.id}
                      href={`/novel/${novel.id}`}
                      className="flex gap-3 p-4 bg-white border border-border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="w-16 h-22 rounded overflow-hidden shrink-0">
                        {novel.coverImage ? (
                          <img src={novel.coverImage} alt={novel.title} className="w-full h-full object-cover" />
                        ) : (
                          <CoverPlaceholder title={novel.title} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-foreground truncate">{novel.title}</h3>
                        <p className="text-xs text-text-secondary">{novel.author}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-red-400">♥ {novel.likes}</span>
                          <span className="text-xs text-yellow-500">★ {novel.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <EmptyState message="좋아요한 작품이 없습니다" sub="작품 페이지에서 ♥를 눌러보세요" />
              )}
            </div>
          )}

          {/* Interested Novels */}
          {activeTab === "interests" && (
            <div>
              {profile && profile.interestedNovels.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {profile.interestedNovels.map((novel) => (
                    <Link
                      key={novel.id}
                      href={`/novel/${novel.id}`}
                      className="flex gap-3 p-4 bg-white border border-border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="w-16 h-22 rounded overflow-hidden shrink-0">
                        <CoverPlaceholder title={novel.title} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-foreground truncate">{novel.title}</h3>
                        <p className="text-xs text-text-secondary">{novel.author} | {novel.genre}</p>
                        <p className="text-xs text-text-light mt-1">총 {novel.totalEpisodes}화</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <EmptyState message="관심 등록한 작품이 없습니다" sub="작품 페이지에서 관심등록을 눌러보세요" />
              )}
            </div>
          )}

          {/* Bookmarks */}
          {activeTab === "bookmarks" && (
            <div>
              {profile && profile.bookmarks.length > 0 ? (
                <div className="space-y-2">
                  {profile.bookmarks.map((b, i) => (
                    <Link
                      key={i}
                      href={`/novel/${b.novel.id}/episode/${b.episode.id}`}
                      className="flex items-center gap-4 p-4 bg-white border border-border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="w-10 h-14 rounded overflow-hidden shrink-0">
                        <CoverPlaceholder title={b.novel.title} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-foreground truncate">{b.novel.title}</h3>
                        <p className="text-xs text-text-secondary">{b.episode.title}</p>
                      </div>
                      <span className="text-xs text-primary shrink-0">이어읽기</span>
                    </Link>
                  ))}
                </div>
              ) : (
                <EmptyState message="북마크한 에피소드가 없습니다" sub="읽기 화면에서 북마크 버튼을 눌러보세요" />
              )}
            </div>
          )}

          {/* Reading History */}
          {activeTab === "history" && (
            <div>
              {profile && profile.readingHistory.length > 0 ? (
                <div className="space-y-2">
                  {profile.readingHistory.map((h, i) => (
                    <Link
                      key={i}
                      href={`/novel/${h.novel.id}/episode/${h.episode.id}`}
                      className="flex items-center gap-4 p-4 bg-white border border-border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="w-10 h-14 rounded overflow-hidden shrink-0">
                        <CoverPlaceholder title={h.novel.title} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-foreground truncate">{h.novel.title}</h3>
                        <p className="text-xs text-text-secondary">{h.episode.title}</p>
                      </div>
                      <span className="text-xs text-text-secondary shrink-0">{formatDate(h.readAt)}</span>
                    </Link>
                  ))}
                </div>
              ) : (
                <EmptyState message="열람 기록이 없습니다" sub="에피소드를 읽으면 자동으로 기록됩니다" />
              )}
            </div>
          )}
        </>
      )}
    </main>
  );
}

function EmptyState({ message, sub }: { message: string; sub: string }) {
  return (
    <div className="text-center py-16">
      <p className="text-lg text-text-secondary mb-2">{message}</p>
      <p className="text-sm text-text-light">{sub}</p>
      <Link href="/" className="inline-block mt-4 px-6 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary-dark transition-colors">
        작품 둘러보기
      </Link>
    </div>
  );
}
