import { Controller, Get, Param } from "@nestjs/common";
import { MangaService } from "./manga.service";

@Controller('manga')
export class MangaController {
    constructor(private readonly mangaService: MangaService) {}

    @Get(':mangaName/chapters')
    async getMangaChaptersInformations(@Param('mangaName') manga: string) {
        return await this.mangaService.fetchMangaCaptersInformations(manga);
    }
}
