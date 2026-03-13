const BASE_URL = "";

export interface Novel {
  id: number;
  title: string;
  author: string;
  genre: string;
  description: string;
  coverImage?: string;
  rating: number;
  views: number;
  likes: number;
  interests: number;
  comments: number;
  status: string;
  tags: string[];
  totalEpisodes: number;
  createdAt: string;
  updatedAt: string;
}

export interface Episode {
  id: number;
  novelId: number;
  episodeNumber: number;
  title: string;
  content: string;
  rating: number;
  comments: number;
  views: number;
  createdAt: string;
  isNew?: boolean;
}

export interface RankingItem {
  rank: number;
  rankChange: string;
  id: number;
  title: string;
  author: string;
  genre: string;
  coverImage?: string;
  rating: number;
  interests: number;
  totalEpisodes: number;
}

export interface Comment {
  id: number;
  episodeId: number;
  novelId: number;
  userId: string;
  nickname: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface UserProfile {
  userId: string;
  likedNovels: Novel[];
  interestedNovels: Novel[];
  bookmarks: { novel: Novel; episode: Episode }[];
  readingHistory: { novel: Novel; episode: Episode; readAt: string }[];
  genrePreferences: string[];
}

// === User ID 관리 ===

export function getUserId(): string {
  if (typeof window === "undefined") return "";
  let userId = localStorage.getItem("userId");
  if (!userId) {
    userId = "user-" + Math.random().toString(36).substring(2, 11);
    localStorage.setItem("userId", userId);
  }
  return userId;
}

export function getNickname(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("nickname") || "익명 독자";
}

export function setNickname(name: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("nickname", name);
  }
}

// === Reading Settings ===

export interface ReadingSettings {
  fontSize: number;
  lineHeight: number;
  backgroundColor: string;
  fontFamily: string;
}

const DEFAULT_SETTINGS: ReadingSettings = {
  fontSize: 16,
  lineHeight: 1.9,
  backgroundColor: "#ffffff",
  fontFamily: "'Noto Sans KR', sans-serif",
};

export function getReadingSettings(): ReadingSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  const saved = localStorage.getItem("readingSettings");
  if (saved) {
    try { return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) }; } catch { /* ignore */ }
  }
  return DEFAULT_SETTINGS;
}

export function saveReadingSettings(settings: ReadingSettings) {
  if (typeof window !== "undefined") {
    localStorage.setItem("readingSettings", JSON.stringify(settings));
  }
}

// === Genre Preferences ===

export function getGenrePreferences(): string[] {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem("genrePreferences");
  if (saved) {
    try { return JSON.parse(saved); } catch { /* ignore */ }
  }
  return [];
}

export function saveGenrePreferences(genres: string[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem("genrePreferences", JSON.stringify(genres));
  }
}

// === API Helpers ===

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const userId = getUserId();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(userId ? { "x-user-id": userId } : {}),
    ...(options?.headers as Record<string, string> || {}),
  };
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    cache: "no-store",
    ...options,
    headers,
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

// === Novel API ===

export async function fetchNovels(genre?: string): Promise<Novel[]> {
  const query = genre ? `?genre=${encodeURIComponent(genre)}` : "";
  return fetchAPI<Novel[]>(`/api/novels${query}`);
}

export async function fetchNovel(id: number): Promise<Novel> {
  return fetchAPI<Novel>(`/api/novels/${id}`);
}

export async function fetchRanking(genre?: string): Promise<RankingItem[]> {
  const query = genre ? `?genre=${encodeURIComponent(genre)}` : "";
  return fetchAPI<RankingItem[]>(`/api/novels/ranking${query}`);
}

export async function fetchEpisodes(novelId: number): Promise<Episode[]> {
  return fetchAPI<Episode[]>(`/api/novels/${novelId}/episodes`);
}

export async function fetchEpisode(novelId: number, episodeId: number): Promise<Episode> {
  return fetchAPI<Episode>(`/api/novels/${novelId}/episodes/${episodeId}`);
}

export async function generateEpisode(novelId: number): Promise<Episode> {
  return fetchAPI<Episode>(`/api/novels/${novelId}/generate`, { method: "POST" });
}

// === Search API ===

export async function searchNovels(query: string): Promise<{ novels: Novel[]; totalResults: number }> {
  return fetchAPI(`/api/novels/search?q=${encodeURIComponent(query)}`);
}

// === Like / Interest API ===

export async function toggleLike(novelId: number): Promise<{ liked: boolean; totalLikes: number }> {
  return fetchAPI(`/api/novels/${novelId}/like`, { method: "POST" });
}

export async function toggleInterest(novelId: number): Promise<{ interested: boolean; totalInterests: number }> {
  return fetchAPI(`/api/novels/${novelId}/interest`, { method: "POST" });
}

export async function fetchUserNovelStatus(novelId: number): Promise<{ liked: boolean; interested: boolean }> {
  return fetchAPI(`/api/novels/${novelId}/user-status`);
}

// === Bookmark API ===

export async function toggleBookmark(novelId: number, episodeId: number): Promise<{ bookmarked: boolean }> {
  return fetchAPI(`/api/novels/${novelId}/episodes/${episodeId}/bookmark`, { method: "POST" });
}

export async function fetchUserEpisodeStatus(novelId: number, episodeId: number): Promise<{ bookmarked: boolean }> {
  return fetchAPI(`/api/novels/${novelId}/episodes/${episodeId}/user-status`);
}

// === Reading History API ===

export async function markAsRead(novelId: number, episodeId: number): Promise<void> {
  await fetchAPI(`/api/novels/${novelId}/episodes/${episodeId}/read`, { method: "POST" });
}

// === Comment API ===

export async function fetchComments(novelId: number, episodeId: number): Promise<Comment[]> {
  return fetchAPI(`/api/novels/${novelId}/episodes/${episodeId}/comments`);
}

export async function addComment(novelId: number, episodeId: number, content: string): Promise<Comment> {
  return fetchAPI(`/api/novels/${novelId}/episodes/${episodeId}/comments`, {
    method: "POST",
    body: JSON.stringify({
      userId: getUserId(),
      nickname: getNickname(),
      content,
    }),
  });
}

export async function deleteComment(novelId: number, episodeId: number, commentId: number): Promise<void> {
  await fetchAPI(`/api/novels/${novelId}/episodes/${episodeId}/comments/${commentId}`, {
    method: "DELETE",
  });
}

export async function likeComment(novelId: number, episodeId: number, commentId: number): Promise<{ likes: number }> {
  return fetchAPI(`/api/novels/${novelId}/episodes/${episodeId}/comments/${commentId}/like`, {
    method: "POST",
  });
}

// === User Profile API ===

export async function fetchUserProfile(): Promise<UserProfile> {
  return fetchAPI("/api/novels/user/profile");
}

export async function setGenrePreferencesRemote(genres: string[]): Promise<void> {
  await fetchAPI("/api/novels/user/genre-preferences", {
    method: "POST",
    body: JSON.stringify({ genres }),
  });
}

// === Schedule API ===

export interface ScheduleStatus {
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

export async function fetchScheduleStatus(): Promise<ScheduleStatus> {
  return fetchAPI<ScheduleStatus>("/api/novels/schedule/status");
}

export async function publishNow(): Promise<Episode[]> {
  return fetchAPI<Episode[]>("/api/novels/schedule/publish-now", { method: "POST" });
}
