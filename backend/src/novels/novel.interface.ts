export interface Novel {
  id: number;
  title: string;
  author: string;
  genre: string;
  tags: string[];
  description: string;
  coverImage: string;
  rating: number;
  likes: number;
  interests: number;
  comments: number;
  totalEpisodes: number;
  status: string;
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
}

export interface RankingNovel extends Novel {
  rank: number;
  rankChange: 'up' | 'down' | 'new' | 'same';
}
