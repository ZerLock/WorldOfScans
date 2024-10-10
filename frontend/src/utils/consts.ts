import MANGAS_JSON from '../resources/mangas.json';
export const MANGAS = MANGAS_JSON;

export const APP_NAME = 'World of Scans';

export const SERVER_BASE_URL = 'https://wos-backend.vercel.app';

export const MAX_PAGES = 100;
export const MAX_RESEARCH = 2_000;
export const MIN_RESEARCH = 1;
export const DEFAULT_CHAPTER_PAGE = 1;

export const ANIMESAMA_IMG_URL = 'https://anime-sama.fr/s2/scans/$MANGA/$CHAPTER/$PAGE_NUMBER.jpg';
export const ANIMESAMA_COVER_URL = 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/$MANGA.jpg'

export const CHAPTER_KEEPER_KEY = '$MANGA-CHAPTER-KEEPER';
export const MANGA_SAVED_KEY = '$MANGA-SAVED';
export const SHOW_ONLY_SAVED_KEY = 'SHOW_ONLY_SAVED';
