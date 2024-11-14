export declare class MangaService {
    private readonly pageBaseUrl;
    private sanitizeStringForUrl;
    fetchEpisodesFromAnimeSama(mangaName: string): Promise<any>;
    private numberToArray;
    private capitalize;
    private sanitizeFromUrl;
    private pageUrl;
    fetchAllPagesByChapter(mangaName: string, chapter: number, nbPages: number): Promise<any[]>;
}
