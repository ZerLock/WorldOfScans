import { MangaService } from "./manga.service";
export declare class MangaController {
    private readonly mangaService;
    constructor(mangaService: MangaService);
    getMangaEpisodesFromAnimeSama(mangaName: string): Promise<any>;
    getPagesOfMangaByChapter(mangaName: string, chapter: number, nbPages: number): Promise<any[]>;
}
