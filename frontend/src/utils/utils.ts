import { MIN_RESEARCH, MAX_RESEARCH, DEFAULT_CHAPTER_PAGE, ANIMESAMA_IMG_URL, CHAPTER_KEEPER_KEY, MANGA_SAVED_KEY, ANIMESAMA_COVER_URL } from "./consts";

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

export const numberToArray = (nb: number): number[] => {
    return Array.from({ length: nb }, (_, i) => i + 1);
};

export const validateImage = (imageUrl: string) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = imageUrl;

        img.onload = () => resolve(imageUrl);
        img.onerror = () => reject(imageUrl);
    });
};

export const urlSpacesUnparser = (url: string): string => {
    return url.replaceAll('%20', ' ');
};

export const findMaximumImageAvailable = async (manga: string, chapter?: number): Promise<number> => {
    let min = MIN_RESEARCH;
    let max = MAX_RESEARCH;

    while (min < max) {
        let index = Math.floor((min + max + 1) / 2);

        // Moulable between count of chapters and count of pages in a chapter
        const imageUrl = chapter !== undefined
            ? pageUrl(manga, chapter, index)
            : pageUrl(manga, index, DEFAULT_CHAPTER_PAGE);
        try {
            await validateImage(imageUrl);
            min = index;
        } catch (e: any) {
            max = index - 1;
        }
    }

    return min;
};
