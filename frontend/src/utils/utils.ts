import consts from "./consts";
import { getArray } from "./storage";

const utils = {
  keys: {
    chapterKeeperKey: (manga: string): string => {
      return consts.CHAPTER_KEEPER_KEY.replace("$MANGA", manga);
    },
    mangaSavedKey: (manga: string): string => {
      return consts.MANGA_SAVED_KEY.replace("$MANGA", manga);
    },
  },
  numberToArray: (nb: number): number[] => {
    return Array.from({ length: nb }, (_, i) => i + 1);
  },
  getFromLocalStorageKeys: (globalKey: string): string[] => {
    const res: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.endsWith(globalKey.replace("$MANGA-", ""))) {
        res.push(key.split("-")[0]);
      }
    }

    return res;
  },
  getSavedMangas: (): string[] => {
    return utils.getFromLocalStorageKeys(consts.MANGA_SAVED_KEY);
  },
  getLastChapter: (manga: string): number => {
    const data = localStorage.getItem(utils.keys.chapterKeeperKey(manga));
    return data ? parseInt(data) : 1;
  },
  getHistory: (): string[] => {
    return getArray(consts.HISTORY_KEY);
  },
  getRandomItems: <Type>(arr: Type[], count = 24): Type[] => {
    return [...arr].sort(() => Math.random() - 0.5).slice(0, count);
  },
  getRandomScans: (): string[] => {
    return utils.getRandomItems(Object.keys(consts.MANGAS));
  },
  cover: {
    getMainColor: (img: HTMLImageElement): number[] => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        return [160, 160, 160];
      }

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;

      let r = 0,
        g = 0,
        b = 0;
      let pixelCount = 0;

      for (let i = 0; i < pixels.length; i += 4) {
        r += pixels[i];
        g += pixels[i + 1];
        b += pixels[i + 2];
        pixelCount++;
      }

      r = Math.floor(r / pixelCount);
      g = Math.floor(g / pixelCount);
      b = Math.floor(b / pixelCount);

      return [r, g, b];
    },
    addN: (num: string, n: number): string => {
      return `${Math.min(parseInt(num) + n, 255)}`;
    },
    getLighterColor: (color: string): string => {
      const [r, g, b] = color.split(", ");

      return `${utils.cover.addN(r, 30)}, ${utils.cover.addN(
        g,
        30
      )}, ${utils.cover.addN(b, 30)}`;
    },
  },
  chapters: {
    chapterNumber: (manga: string, chapter: number): number => {
      // Handle exceptions (with chapter 0 for example)
      switch (manga) {
        case "Jujutsu Kaisen":
          return chapter - 1;
        default:
          return chapter;
      }
    },
  },
};

export default utils;
