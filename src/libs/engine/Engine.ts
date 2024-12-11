/**
 * @brief Manga search engine of World of Scans
 */
export interface Engine {
    /**
     * @brief Get cover url to display
     *
     * @param manga manga name
     * @returns url
     */
    getCoverUrl(manga: string): string;

    /**
     * @brief Get page url to display
     *
     * @param manga manga name
     * @param chapter chapter number
     * @param page page number
     * @returns url
     */
    getPageUrl(manga: string, chapter: number, page: number): string;

    /**
     * @brief Get number of chapters a manga hold
     *
     * @param manga manga name
     * @returns number of chapters
     */
    getNbChapters(manga: string): Promise<number>;

    /**
     * @brief Get number of pages in a chapter
     *
     * @param manga manga name
     * @param chapter chapter number
     * @returns number of pages in a chapter (0 if chapter does not exists)
     */
    getNbPagesInChapter(manga: string, chapter: number): Promise<number>;
}
