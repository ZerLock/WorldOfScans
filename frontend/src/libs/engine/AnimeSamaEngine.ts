import { Engine } from "./Engine";

interface CacheChapters {
  date: Date;
  chapters: number;
}

interface Mangas {
  [key: string]: CacheChapters;
}

export class AnimeSamaEngine implements Engine {
  private readonly pageBaseUrl: string =
    "https://anime-sama.fr/s2/scans/$MANGA/$CHAPTER/$PAGE_NUMBER.jpg";
  private readonly coverBaseUrl: string =
    "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/$MANGA.jpg";

  private mangas: Mangas = {};

  private encodeToUrl(value: string): string {
    return value
      .replaceAll(" ", "-")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replaceAll("#", "")
      .replaceAll(",", "")
      .replaceAll("'", "")
      .replaceAll("’", "")
      .replaceAll(":", "")
      .replaceAll("?", "")
      .replaceAll("!", "")
      .replaceAll("°", "")
      .toLowerCase();
  }

  getCoverUrl(manga: string): string {
    return this.coverBaseUrl.replace("$MANGA", this.encodeToUrl(manga));
  }

  getPageUrl(manga: string, chapter: number, page: number): string {
    return this.pageBaseUrl
      .replace("$MANGA", manga)
      .replace("$CHAPTER", chapter.toString())
      .replace("$PAGE_NUMBER", page.toString());
  }

  private isCacheValid(date: Date): boolean {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const oneDayMs = 24 * 60 * 60 * 1000;

    return diffMs < oneDayMs;
  }

  private async isChapterValid(
    manga: string,
    chapter: number
  ): Promise<boolean> {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = this.getPageUrl(manga, chapter, 1);

      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  }

  async getNbChapters(manga: string): Promise<number> {
    const cache = this.mangas[manga];
    if (cache && this.isCacheValid(cache.date)) {
      return cache.chapters;
    }

    let low = 1;
    let high = 1300;
    let lastValid: number | null = null;

    while (low <= high) {
      const middle = Math.floor((low + high) / 2);
      if (await this.isChapterValid(manga, middle)) {
        lastValid = middle;
        low = middle + 1;
      } else {
        high = middle - 1;
      }
    }

    if (lastValid === null) {
      return 1;
    }

    this.mangas[manga] = { date: new Date(), chapters: lastValid };
    return lastValid;
  }

  async getNbPagesInChapter(manga: string, chapter: number): Promise<number> {
    return 0;
  }

  getNbPagesInChapterSync(manga: string, chapter: number): number {
    return 0;
  }
}
