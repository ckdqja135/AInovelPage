import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NovelsService } from './novels.service';
import { Episode } from './novel.interface';

export interface ScheduleLog {
  novelId: number;
  novelTitle: string;
  episodeNumber: number;
  episodeId: number;
  publishedAt: string;
}

@Injectable()
export class DailyEpisodeService implements OnModuleInit {
  private readonly logger = new Logger(DailyEpisodeService.name);
  private publishLog: ScheduleLog[] = [];

  constructor(private readonly novelsService: NovelsService) {}

  onModuleInit() {
    const novels = this.novelsService.findAll();
    this.logger.log(`Daily episode scheduler initialized - ${novels.length} novels registered`);
    this.logger.log('All novels will receive a new episode daily at midnight');
  }

  /**
   * 매일 자정(00:00)에 실행 - 모든 소설에 새 에피소드를 자동 연재
   */
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  handleDailyEpisode() {
    this.publishAllEpisodes();
  }

  /**
   * 모든 소설에 에피소드를 발행하고 로그를 기록
   */
  publishAllEpisodes(): Episode[] {
    const novels = this.novelsService.findAll();
    if (novels.length === 0) {
      this.logger.warn('No novels available for episode generation');
      throw new Error('No novels available');
    }

    const publishedEpisodes: Episode[] = [];
    const now = new Date().toISOString();

    this.logger.log(`Starting daily episode generation for ${novels.length} novels...`);

    for (const novel of novels) {
      try {
        const episode = this.novelsService.generateEpisode(novel.id);
        publishedEpisodes.push(episode);

        this.publishLog.push({
          novelId: novel.id,
          novelTitle: novel.title,
          episodeNumber: episode.episodeNumber,
          episodeId: episode.id,
          publishedAt: now,
        });

        this.logger.log(
          `  ✓ "${novel.title}" - ${episode.episodeNumber}화 published`,
        );
      } catch (error) {
        this.logger.error(`  ✗ "${novel.title}" - failed: ${error}`);
      }
    }

    this.logger.log(
      `Daily generation complete: ${publishedEpisodes.length}/${novels.length} episodes published`,
    );

    return publishedEpisodes;
  }

  /**
   * 특정 소설에 에피소드 발행
   */
  publishEpisodeForNovel(novelId: number): Episode {
    const novel = this.novelsService.findOne(novelId);
    if (!novel) {
      throw new Error(`Novel with id ${novelId} not found`);
    }

    const episode = this.novelsService.generateEpisode(novelId);

    this.publishLog.push({
      novelId: novel.id,
      novelTitle: novel.title,
      episodeNumber: episode.episodeNumber,
      episodeId: episode.id,
      publishedAt: new Date().toISOString(),
    });

    this.logger.log(`Manual publish: "${novel.title}" - ${episode.episodeNumber}화`);
    return episode;
  }

  /**
   * 스케줄 상태 조회
   */
  getScheduleStatus() {
    const novels = this.novelsService.findAll();

    // 각 소설의 현재 에피소드 수 정보
    const novelStatus = novels.map((novel) => {
      const episodes = this.novelsService.findEpisodes(novel.id);
      const latestEpisode = episodes.length > 0 ? episodes[0] : null;
      return {
        novelId: novel.id,
        title: novel.title,
        genre: novel.genre,
        currentEpisodes: episodes.length,
        totalEpisodes: novel.totalEpisodes,
        latestEpisodeDate: latestEpisode?.createdAt || null,
      };
    });

    return {
      schedule: 'daily at midnight (00:00)',
      mode: 'all novels receive a new episode each day',
      totalNovels: novels.length,
      novelStatus,
      recentPublications: this.publishLog.slice(-30).reverse(),
    };
  }

  /**
   * 발행 로그 조회
   */
  getPublishLog(): ScheduleLog[] {
    return [...this.publishLog].reverse();
  }
}
