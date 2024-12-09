import { Module } from '@nestjs/common';
import { MangaModule } from './manga/manga.module';

@Module({
  imports: [MangaModule],
})
export class AppModule {}
