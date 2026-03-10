import { Controller, Get, Post, Param, Query, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { NovelsService } from './novels.service';

@Controller('api/novels')
export class NovelsController {
  constructor(private readonly novelsService: NovelsService) {}

  @Get()
  findAll(@Query('genre') genre?: string) {
    return this.novelsService.findAll(genre);
  }

  @Get('ranking')
  findRanking() {
    return this.novelsService.findRanking();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    const novel = this.novelsService.findOne(id);
    if (!novel) {
      throw new NotFoundException(`Novel with id ${id} not found`);
    }
    return novel;
  }

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

  @Post(':id/generate')
  generateEpisode(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.novelsService.generateEpisode(id);
    } catch {
      throw new NotFoundException(`Novel with id ${id} not found`);
    }
  }
}
