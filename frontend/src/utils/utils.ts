import { ANIMESAMA_IMG_URL, CHAPTER_KEEPER_KEY, MANGA_SAVED_KEY, ANIMESAMA_COVER_URL, MANGA_FINISHIED_KEY } from "./consts";

export const pageUrl = (manga: string, chapter: number, pageNumber: number): string => {
    return ANIMESAMA_IMG_URL
        .replace('$MANGA', manga)
        .replace('$CHAPTER', chapter.toString())
        .replace('$PAGE_NUMBER', pageNumber.toString());
};

export const chapterKeeperKey = (manga: string): string => {
    return CHAPTER_KEEPER_KEY
        .replace('$MANGA', manga);
};

export const managSaved = (manga: string) => {
    return MANGA_SAVED_KEY.replace('$MANGA', manga);
};

export const mangaFinished = (manga: string) => {
    return MANGA_FINISHIED_KEY.replace('$MANGA', manga);
};

const encodeMangaName = (manga: string) => {
    return manga.replaceAll(' ', '-');
};

export const coverUrl = (manga: string): string => {
    return ANIMESAMA_COVER_URL.replace('$MANGA', encodeMangaName(manga).toLowerCase());
};

export const getSavedManga = (): string[] => {
    const saved: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.endsWith(MANGA_SAVED_KEY.replace('$MANGA-', ''))) {
            saved.push(key.split('-')[0]);
        }
    }

    return saved;
};

export const getFinishedManga = (): string[] => {
    const finished: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.endsWith(MANGA_FINISHIED_KEY.replace('$MANGA-', ''))) {
            finished.push(key.split('-')[0]);
        }
    }

    return finished;
};

export const numberToArray = (nb: number): number[] => {
    return Array.from({ length: nb }, (_, i) => i + 1);
};


export const urlSpacesUnparser = (url: string): string => {
    return url.replaceAll('%20', ' ');
};
