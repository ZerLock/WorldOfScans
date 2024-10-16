import consts from "./consts";

const utils = {
    keys: {
        chapterKeeperKey: (manga: string): string => {
            return consts.CHAPTER_KEEPER_KEY.replace('$MANGA', manga);
        },
        mangaSavedKey: (manga: string): string => {
            return consts.MANGA_SAVED_KEY.replace('$MANGA', manga);
        },
        mangaFinishedKey: (manga: string): string => {
            return consts.MANGA_FINISHIED_KEY.replace('$MANGA', manga);
        }
    },
    numberToArray: (nb: number): number[] => {
        return Array.from({ length: nb }, (_, i) => i + 1);
    },
    getFromLocalStorageKeys: (globalKey: string): string[] => {
        const res: string[] = [];

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.endsWith(globalKey.replace('$MANGA-', ''))) {
                res.push(key.split('-')[0]);
            }
        }

        return res;
    },
    getSavedMangas: (): string[] => {
        return utils.getFromLocalStorageKeys(consts.MANGA_SAVED_KEY);
    },
    getFinishedMangas: (): string[] => {
        return utils.getFromLocalStorageKeys(consts.MANGA_FINISHIED_KEY);
    },
};

export default utils;
