import { Controller, Get, Post, Delete, Param, Query, Body, Headers, ParseIntPipe, NotFoundException, BadRequestException } from '@nestjs/common';
import { NovelsService } from './novels.service';
import { DailyEpisodeService } from './daily-episode.service';

@Controller('api/novels')
export class NovelsController {
  constructor(
    private readonly novelsService: NovelsService,
    private readonly dailyEpisodeService: DailyEpisodeService,
  ) {}

  @Get()
  findAll(@Query('genre') genre?: string) {
    return this.novelsService.findAll(genre);
  }

  @Get('ranking')
  findRanking(@Query('genre') genre?: string) {
    return this.novelsService.findRanking(genre);
  }

  // === 검색 API ===

  @Get('search')
  search(@Query('q') query: string) {
    if (!query || !query.trim()) {
      return { novels: [], totalResults: 0 };
    }
    return this.novelsService.search(query);
  }

  // === 일일 연재 스케줄 API ===

  @Get('schedule/status')
  getScheduleStatus() {
    return this.dailyEpisodeService.getScheduleStatus();
  }

  @Get('schedule/log')
  getPublishLog() {
    return this.dailyEpisodeService.getPublishLog();
  }

  @Post('schedule/publish-now')
  publishNow() {
    return this.dailyEpisodeService.publishAllEpisodes();
  }

  // === 사용자 프로필 API ===

  @Get('user/profile')
  getUserProfile(@Headers('x-user-id') userId: string) {
    if (!userId) throw new BadRequestException('User ID required');
    return this.novelsService.getUserProfile(userId);
  }

  @Post('user/genre-preferences')
  setGenrePreferences(
    @Headers('x-user-id') userId: string,
    @Body('genres') genres: string[],
  ) {
    if (!userId) throw new BadRequestException('User ID required');
    return this.novelsService.setGenrePreferences(userId, genres || []);
  }

  // === Novel CRUD ===

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    const novel = this.novelsService.findOne(id);
    if (!novel) {
      throw new NotFoundException(`Novel with id ${id} not found`);
    }
    return novel;
  }

  // === 좋아요 / 관심 토글 ===

  @Post(':id/like')
  toggleLike(
    @Param('id', ParseIntPipe) id: number,
    @Headers('x-user-id') userId: string,
  ) {
    if (!userId) throw new BadRequestException('User ID required');
    try {
      return this.novelsService.toggleLike(userId, id);
    } catch {
      throw new NotFoundException(`Novel with id ${id} not found`);
    }
  }

  @Post(':id/interest')
  toggleInterest(
    @Param('id', ParseIntPipe) id: number,
    @Headers('x-user-id') userId: string,
  ) {
    if (!userId) throw new BadRequestException('User ID required');
    try {
      return this.novelsService.toggleInterest(userId, id);
    } catch {
      throw new NotFoundException(`Novel with id ${id} not found`);
    }
  }

  @Get(':id/user-status')
  getUserNovelStatus(
    @Param('id', ParseIntPipe) id: number,
    @Headers('x-user-id') userId: string,
  ) {
    if (!userId) return { liked: false, interested: false };
    return this.novelsService.getUserNovelStatus(userId, id);
  }

  // === 에피소드 API ===

  @Get(':id/episodes')
  findEpisodes(@Param('id', ParseIntPipe) id: number) {
    const novel = this.novelsService.findOne(id);
    if (!novel) {
      throw new NotFoundException(`Novel with id ${id} not found`);
    }
    return this.novelsService.findEpisodes(id);
  }

  @Get(':id/episodes/:episodeId')
  findEpisode(
    @Param('id', ParseIntPipe) id: number,
    @Param('episodeId', ParseIntPipe) episodeId: number,
  ) {
    const episode = this.novelsService.findEpisode(id, episodeId);
    if (!episode) {
      throw new NotFoundException(`Episode not found`);
    }
    return episode;
  }

  // === 북마크 ===

  @Post(':id/episodes/:episodeId/bookmark')
  toggleBookmark(
    @Param('id', ParseIntPipe) id: number,
    @Param('episodeId', ParseIntPipe) episodeId: number,
    @Headers('x-user-id') userId: string,
  ) {
    if (!userId) throw new BadRequestException('User ID required');
    return this.novelsService.toggleBookmark(userId, id, episodeId);
  }

  @Get(':id/episodes/:episodeId/user-status')
  getUserEpisodeStatus(
    @Param('id', ParseIntPipe) id: number,
    @Param('episodeId', ParseIntPipe) episodeId: number,
    @Headers('x-user-id') userId: string,
  ) {
    if (!userId) return { bookmarked: false };
    return this.novelsService.getUserEpisodeStatus(userId, id, episodeId);
  }

  // === 읽기 기록 ===

  @Post(':id/episodes/:episodeId/read')
  markAsRead(
    @Param('id', ParseIntPipe) id: number,
    @Param('episodeId', ParseIntPipe) episodeId: number,
    @Headers('x-user-id') userId: string,
  ) {
    if (!userId) return { success: false };
    this.novelsService.addReadingHistory(userId, id, episodeId);
    return { success: true };
  }

  // === 댓글 API ===

  @Get(':id/episodes/:episodeId/comments')
  getComments(
    @Param('episodeId', ParseIntPipe) episodeId: number,
  ) {
    return this.novelsService.getComments(episodeId);
  }

  @Post(':id/episodes/:episodeId/comments')
  addComment(
    @Param('id', ParseIntPipe) id: number,
    @Param('episodeId', ParseIntPipe) episodeId: number,
    @Body('userId') userId: string,
    @Body('nickname') nickname: string,
    @Body('content') content: string,
  ) {
    if (!userId || !nickname || !content) {
      throw new BadRequestException('userId, nickname, content are required');
    }
    return this.novelsService.addComment(id, episodeId, userId, nickname, content);
  }

  @Delete(':id/episodes/:episodeId/comments/:commentId')
  deleteComment(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Headers('x-user-id') userId: string,
  ) {
    if (!userId) throw new BadRequestException('User ID required');
    const result = this.novelsService.deleteComment(commentId, userId);
    if (!result) throw new NotFoundException('Comment not found or not authorized');
    return { success: true };
  }

  @Post(':id/episodes/:episodeId/comments/:commentId/like')
  likeComment(@Param('commentId', ParseIntPipe) commentId: number) {
    const result = this.novelsService.likeComment(commentId);
    if (!result) throw new NotFoundException('Comment not found');
    return result;
  }

  // === 에피소드 생성 ===

  @Post(':id/generate')
  generateEpisode(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.novelsService.generateEpisode(id);
    } catch {
      throw new NotFoundException(`Novel with id ${id} not found`);
    }
  }
}
