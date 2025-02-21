import { Engine } from "./Engine";
import axios from "axios";

interface Chapters {
  [key: string]: string[];
}

interface CacheChapters {
  date: Date;
  chapters: Chapters;
}

interface Mangas {
  [key: string]: CacheChapters;
}

export class AnimeSamaEngine implements Engine {
  private readonly pageBaseUrl: string =
    "https://anime-sama.fr/s2/scans/$MANGA/$CHAPTER/$PAGE_NUMBER.jpg";
  private readonly coverBaseUrl: string =
    "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/$MANGA.jpg";

  private readonly serverBaseUrl = "https://wos-animesama-engine.vercel.app";

  private mangas: Mangas = {};

  private capitalizeWords(text: string): string {
    return text.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  private encoreToUrl(value: string): string {
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
    return this.coverBaseUrl.replace("$MANGA", this.encoreToUrl(manga));
  }

  getPageUrl(manga: string, chapter: number, page: number): string {
    return this.pageBaseUrl
      .replace("$MANGA", this.capitalizeWords(manga))
      .replace("$CHAPTER", chapter.toString())
      .replace("$PAGE_NUMBER", page.toString());
  }

  private parseMangaDataToChapters(data: string): Chapters {
    const response: Chapters = {};

    const lines: string[] = data.split("\n");

    let currentEpisode: number | null = null;
    let currentURLs: string[] = [];

    lines.forEach((line: string) => {
      line = line.trim();

      if (line.startsWith("var eps")) {
        if (currentEpisode !== null) {
          response[currentEpisode] = currentURLs;
        }

        const episodeMatch = line.match(/eps(\d+)/);
        if (episodeMatch) {
          currentEpisode = parseInt(episodeMatch[1]);
        }
        currentURLs = [];
      } else if (line.startsWith("'https://")) {
        const url: string = line.replace(/['",]/g, "");
        currentURLs.push(url);
      }
    });

    if (currentEpisode !== null) {
      response[currentEpisode] = currentURLs;
    }

    return response;
  }

  private isCacheValid(date: Date): boolean {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const oneDayMs = 24 * 60 * 60 * 1000;

    return diffMs < oneDayMs;
  }

  private async fetchMangaData(manga: string): Promise<Chapters | null> {
    const cache = this.mangas[manga];
    if (cache && this.isCacheValid(cache.date)) {
      return cache.chapters;
    }

    try {
      const response = await axios.get(
        `${this.serverBaseUrl}/manga/${manga}/chapters`
      );
      const chapters = this.parseMangaDataToChapters(response.data);
      this.mangas[manga] = { date: new Date(), chapters };
      return chapters;
    } catch (err) {
      console.error(
        `An error occured while fetching manga data : ${JSON.stringify(err)}`
      );
      return null;
    }
  }

  async getNbChapters(manga: string): Promise<number> {
    const chapters = await this.fetchMangaData(manga);
    return Object.keys(chapters || []).length;
  }

  async getNbPagesInChapter(manga: string, chapter: number): Promise<number> {
    const chapters = await this.fetchMangaData(manga);
    return !!chapters ? chapters[chapter].length : 0;
  }
}
