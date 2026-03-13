import { Module } from '@nestjs/common';
import { NovelsController } from './novels.controller';
import { NovelsService } from './novels.service';
import { DailyEpisodeService } from './daily-episode.service';

@Module({
  controllers: [NovelsController],
  providers: [NovelsService, DailyEpisodeService],
})
export class NovelsModule {}
