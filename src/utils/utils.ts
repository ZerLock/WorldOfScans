import { MIN_RESEARCH, MAX_RESEARCH, DEFAULT_CHAPTER_PAGE, ANIMESAMA_IMG_URL } from "./consts";

export function pageUrl(manga: string, chapter: number, pageNumber: number): string {
    return ANIMESAMA_IMG_URL
        .replace('$MANGA', manga)
        .replace('$CHAPTER', chapter.toString())
        .replace('$PAGE_NUMBER', pageNumber.toString());
}

export const numberToArray = (nb: number): number[] => {
    return Array.from({ length: nb }, (_, i) => i + 1);
}

export const validateImage = (imageUrl: string) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = imageUrl;

        img.onload = () => resolve(imageUrl);
        img.onerror = () => reject(imageUrl);
    });
}

export const urlSpacesUnparser = (url: string): string => {
    return url.replaceAll('%20', ' ');
}

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
