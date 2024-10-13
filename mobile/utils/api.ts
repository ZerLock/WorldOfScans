import axios from "axios";
import { parseChapters } from "./parser";
import { Chapters } from "@/types/Chapters";

function sanitizeMangaName(manga: string): string {
    return manga.replaceAll('%20', '-').replaceAll(' ', '-').toLowerCase();
}

export const fetchMangaData = async (manga: string): Promise<Chapters> => {
    const url = `https://anime-sama.fr/catalogue/${sanitizeMangaName(manga)}/scan/vf/episodes.js?filever=615193`;

    try {
        const response = await axios.get(url);
        return parseChapters(response.data);
    } catch (error: any) {
        throw new Error('Erreur lors de la récupération des données.');
    }
};
