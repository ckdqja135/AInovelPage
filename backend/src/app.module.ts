import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NovelsModule } from './novels/novels.module';

@Module({
  imports: [ScheduleModule.forRoot(), NovelsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
