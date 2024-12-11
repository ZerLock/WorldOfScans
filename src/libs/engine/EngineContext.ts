import { Engine } from "./Engine";

export class EngineContext {
    private static engine: Engine;

    constructor(engine: Engine) {
        EngineContext.engine = engine;
    }

    static setEngine(value: Engine): void {
        EngineContext.engine = value;
    }

    static getCoverUrl(manga: string): string {
        return EngineContext.engine.getCoverUrl(manga);
    }

    static getPageUrl(manga: string, chapter: number, page: number): string {
        return EngineContext.engine.getPageUrl(manga, chapter, page);
    }

    static async getNbChapters(manga: string): Promise<number> {
        return EngineContext.engine.getNbChapters(manga);
    }

    static async getNbPagesInChapter(manga: string, chapter: number): Promise<number> {
        return EngineContext.engine.getNbPagesInChapter(manga, chapter);
    }
}
