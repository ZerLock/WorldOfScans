import { Chapters } from "../types/Chapters";

export const parseChapters = (dataString: string): Chapters => {
    const episodesDict: Chapters = {};

    const lines: string[] = dataString.split('\n');

    let currentEpisode: number | null = null;
    let currentURLs: string[] = [];

    lines.forEach((line: string) => {
        line = line.trim();

        if (line.startsWith('var eps')) {
            if (currentEpisode !== null) {
                episodesDict[currentEpisode] = currentURLs;
            }

            const episodeMatch = line.match(/eps(\d+)/);
            if (episodeMatch) {
                currentEpisode = parseInt(episodeMatch[1]);
            }
            currentURLs = [];
        } else if (line.startsWith("'https://")) {
            const url: string = line.replace(/['",]/g, '');
            currentURLs.push(url);
        }
    });

    if (currentEpisode !== null) {
        episodesDict[currentEpisode] = currentURLs;
    }

    return episodesDict;
}
