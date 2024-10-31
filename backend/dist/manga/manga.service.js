"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MangaService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let MangaService = class MangaService {
    constructor() {
        this.pageBaseUrl = 'https://anime-sama.fr/s2/scans/$MANGA/$CHAPTER/$PAGE_NUMBER.jpg';
    }
    sanitizeStringForUrl(str) {
        return str.replaceAll(' ', '-').replaceAll('%20', '-').toLowerCase();
    }
    async fetchEpisodesFromAnimeSama(mangaName) {
        const url = `https://anime-sama.fr/catalogue/${this.sanitizeStringForUrl(mangaName)}/scan/vf/episodes.js`;
        try {
            const response = await axios_1.default.get(url);
            return response.data;
        }
        catch (e) {
            throw new common_1.NotFoundException(`manga ${mangaName} not found`);
        }
    }
    async fetchPage(mangaName, chapter, page) {
    }
    numberToArray(nb) {
        return Array.from({ length: nb }, (_, i) => i + 1);
    }
    capitalize(str) {
        return str.split(' ').map((word) => String(word).charAt(0).toUpperCase() + String(word).slice(1)).join(' ');
    }
    sanitizeFromUrl(str) {
        return this.capitalize(str.replaceAll('-', ' '));
    }
    async fetchAllPagesByChapter(mangaName, chapter, nbPages) {
        try {
            const imagesPromises = this.numberToArray(nbPages).map((index) => {
                const url = this.pageBaseUrl
                    .replace('$MANGA', this.sanitizeFromUrl(mangaName))
                    .replace('$CHAPTER', chapter.toString())
                    .replace('$PAGE_NUMBER', (index + 1).toString());
                return axios_1.default.get(url, { responseType: 'arraybuffer' });
            });
            const responses = await Promise.all(imagesPromises);
            const images = responses.map((res) => res.data);
            return images;
        }
        catch (e) {
            console.log(e);
            throw new common_1.InternalServerErrorException(`Error while fetching manga=${mangaName} chapter=${chapter} pages`);
        }
    }
};
exports.MangaService = MangaService;
exports.MangaService = MangaService = __decorate([
    (0, common_1.Injectable)()
], MangaService);
//# sourceMappingURL=manga.service.js.map