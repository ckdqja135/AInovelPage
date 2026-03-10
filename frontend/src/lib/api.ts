const BASE_URL = "http://localhost:4000";

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

async function fetchAPI<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

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

export async function fetchEpisode(
  novelId: number,
  episodeId: number
): Promise<Episode> {
  return fetchAPI<Episode>(`/api/novels/${novelId}/episodes/${episodeId}`);
}

export async function generateEpisode(
  novelId: number
): Promise<{ message: string; episode: Episode }> {
  const res = await fetch(`${BASE_URL}/api/novels/${novelId}/generate`, {
    method: "POST",
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
