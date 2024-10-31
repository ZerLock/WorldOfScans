"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MangaController = void 0;
const common_1 = require("@nestjs/common");
const manga_service_1 = require("./manga.service");
let MangaController = class MangaController {
    constructor(mangaService) {
        this.mangaService = mangaService;
    }
    async getMangaEpisodesFromAnimeSama(mangaName) {
        return await this.mangaService.fetchEpisodesFromAnimeSama(mangaName);
    }
    async getPagesOfMangaByChapter(mangaName, chapter, nbPages) {
        return await this.mangaService.fetchAllPagesByChapter(mangaName, chapter, nbPages);
    }
};
exports.MangaController = MangaController;
__decorate([
    (0, common_1.Get)(':mangaName/episodes'),
    __param(0, (0, common_1.Param)('mangaName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MangaController.prototype, "getMangaEpisodesFromAnimeSama", null);
__decorate([
    (0, common_1.Get)(':mangaName/chapter/:chapter/pages/:nbPages'),
    __param(0, (0, common_1.Param)('mangaName')),
    __param(1, (0, common_1.Param)('chapter')),
    __param(2, (0, common_1.Param)('nbPages')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], MangaController.prototype, "getPagesOfMangaByChapter", null);
exports.MangaController = MangaController = __decorate([
    (0, common_1.Controller)('manga'),
    __metadata("design:paramtypes", [manga_service_1.MangaService])
], MangaController);
//# sourceMappingURL=manga.controller.js.map