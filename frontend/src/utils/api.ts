import axios from 'axios';
import { Chapters } from '../types/Chapters';
import { parseChapters } from './parser';
import { SERVER_BASE_URL } from './consts';

export const fetchMangaData = async (mangaName: string): Promise<Chapters> => {
    try {
        const response = await axios.get(`${SERVER_BASE_URL}/manga/${mangaName}`);
        return parseChapters(response.data);
    } catch (error) {
        throw new Error('Erreur lors de la récupération des données.');
    }
};
