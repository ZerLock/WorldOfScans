import { Controller, Get, Param } from "@nestjs/common";
import { MangaService } from "./manga.service";

@Controller('manga')
export class MangaController {
    constructor(private readonly mangaService: MangaService) {}

    @Get(':mangaName/episodes')
    async getMangaEpisodesFromAnimeSama(@Param('mangaName') mangaName: string) {
        return await this.mangaService.fetchEpisodesFromAnimeSama(mangaName);
    }

    @Get(':mangaName/chapter/:chapter/pages/:nbPages')
    async getPagesOfMangaByChapter(@Param('mangaName') mangaName: string, @Param('chapter') chapter: number, @Param('nbPages') nbPages: number) {
        return await this.mangaService.fetchAllPagesByChapter(mangaName, chapter, nbPages);
    }
}
