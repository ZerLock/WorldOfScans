export declare class MangaService {
    private readonly pageBaseUrl;
    private sanitizeStringForUrl;
    fetchEpisodesFromAnimeSama(mangaName: string): Promise<any>;
    private fetchPage;
    private numberToArray;
    private capitalize;
    private sanitizeFromUrl;
    fetchAllPagesByChapter(mangaName: string, chapter: number, nbPages: number): Promise<any[]>;
}
