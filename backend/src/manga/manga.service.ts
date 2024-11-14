import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class MangaService {

    private readonly pageBaseUrl = 'https://anime-sama.fr/s2/scans/$MANGA/$CHAPTER/$PAGE_NUMBER.jpg';

    private sanitizeStringForUrl(str: string): string {
        return str.replaceAll(' ', '-').replaceAll('%20', '-').toLowerCase();
    }

    async fetchEpisodesFromAnimeSama(mangaName: string) {
        const url = `https://anime-sama.fr/catalogue/${this.sanitizeStringForUrl(mangaName)}/scan/vf/episodes.js`;

        try {
            const response = await axios.get(url);
            return response.data;
        } catch (e: any) {
            throw new NotFoundException(`manga ${mangaName} not found`);
        }
    }

    private numberToArray(nb: number) {
        return Array.from({ length: nb }, (_, i) => i + 1);
    }

    private capitalize(str: string) {
        return str.split(' ').map((word) => String(word).charAt(0).toUpperCase() + String(word).slice(1)).join(' ');
    }

    private sanitizeFromUrl(str: string) {
        return this.capitalize(str.replaceAll('-', ' '));
    }

    private pageUrl(manga: string, chapter: number, page: number): string {
        return this.pageBaseUrl
            .replace('$MANGA', manga)
            .replace('$CHAPTER', chapter.toString())
            .replace('$PAGE_NUMBER', page.toString());
    }

    async fetchAllPagesByChapter(mangaName: string, chapter: number, nbPages: number) {
        try {
            const imagesPromises = this.numberToArray(nbPages).map((index) => {
                const url = this.pageUrl(this.sanitizeFromUrl(mangaName), chapter, index);
                console.log('index:', index, 'url:', url);
                return axios.get(url, { responseType: 'arraybuffer' });
            });

            const responses = await Promise.all(imagesPromises);
            const images = responses.map((res) => res.data);

            return images;
        } catch (e: any) {
            console.log(e);
            throw new InternalServerErrorException(`Error while fetching manga=${mangaName} chapter=${chapter} pages`);
        }
    }
}
