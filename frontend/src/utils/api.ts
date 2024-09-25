import axios from 'axios';
import { Chapters } from '../types/Chapters';
import { parseChapters } from './parser';

export const fetchMangaData = async (mangaName: string): Promise<Chapters> => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/manga/${mangaName}`);
        return parseChapters(response.data);
    } catch (error) {
        throw new Error('Erreur lors de la récupération des données.');
    }
};
