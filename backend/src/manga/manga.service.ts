import { Injectable, InternalServerErrorException } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class MangaService {

    private sanitizeMangaName(manga: string): string {
        return manga
            .replaceAll('%20', '-')
            .replaceAll(' ', '-')
            .toLowerCase();
    }

    async fetchMangaCaptersInformations(manga: string): Promise<any> {
        const url = `https://anime-sama.fr/catalogue/${this.sanitizeMangaName(manga)}/scan/vf/episodes.js`;

        try {
            const response = await axios.get(url);
            return response.data;
        } catch (e) {
            throw new InternalServerErrorException('Erreur lors de la récupération des données');
        }
    }
}
