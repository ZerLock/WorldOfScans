const fs = require('fs');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const axios = require('axios');

const filePath = './list.html';

fs.readFile(filePath, 'utf8', async (err, html) => {
    if (err) {
        console.error('Erreur lors de la lecture du fichier:', err);
        return;
    }

    const $ = cheerio.load(html);

    const validMangaNames = [];

    $('a').each((i, link) => {
        let href = $(link).attr('href');
        if (href && href.startsWith('https://anime-sama.fr/catalogue')) {
            const parentDiv = $(link).closest('div').parent();

            const parentClass = parentDiv.attr('class');
            if (parentClass && parentClass.includes('Scans')) {
                // console.log($(link).closest('div').children().children().children().prev().text());
                const mangaNameSnakeCase = $(link).closest('div').children().children().children().prev().text();
                validMangaNames.push(mangaNameSnakeCase);
            }
        }
    });

    const testMangaNameFormats = async (browser, mangaName) => {
        const formats = generateMangaNameFormats(mangaName);
        const baseUrl = "https://anime-sama.fr/s2/scans/";

        for (const format of formats) {
            const urlToTest = `${baseUrl}${format}/1/1.jpg`;

            const isValid = await testLinkValidity(browser, urlToTest);
            if (isValid) {
                return format;
            }
        }

        return null;
    };

    const generateMangaNameFormats = (mangaName) => {
        const words = mangaName.split(' ');

        const pascalCase = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

        const camelCase = words[0].toLowerCase() + words.slice(1).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');

        const linkingWords = ['and', 'or', 'the', 'of'];
        const pascalWithLinkingWords = words.map(word => {
            return linkingWords.includes(word.toLowerCase()) ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join(' ');

        const pascalWithEncodedSpaces = pascalCase.split(' ').join('%20');

        const firstWordCapitalized = words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase() + ' ' + words.slice(1).join(' ').toLowerCase();

        const originalFormat = mangaName;

        return [pascalCase, camelCase, pascalWithLinkingWords, pascalWithEncodedSpaces, firstWordCapitalized, originalFormat];
    };

    const testLinkValidity = async (browser, url) => {
        try {
            const response = await axios.get(url);
            return response.status === 200;
        } catch (error) {
            //console.error(`Erreur lors de la requête vers ${url}:`, error.message);
            return false;
        }
    };

    const validateMangaNames = async () => {
        const validMangaFormats = [];
        const browser = await puppeteer.launch();

        for (const mangaName of validMangaNames) {
            const validFormat = await testMangaNameFormats(browser, mangaName);
            if (validFormat) {
                console.log(`Nom valide trouvé: ${validFormat}`);
                validMangaFormats.push(validFormat);
            } else {
                console.error(`Aucun format valide trouvé pour ${mangaName}`);
            }
        }

        await browser.close();

        const jsonFilePath = 'extracted.json';
        fs.writeFile(jsonFilePath, JSON.stringify(validMangaFormats, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Erreur lors de l\'écriture du fichier JSON:', err);
            } else {
                console.log(`Noms de mangas valides sauvegardés dans ${jsonFilePath}`);
            }
        });
    };

    validateMangaNames();
});
