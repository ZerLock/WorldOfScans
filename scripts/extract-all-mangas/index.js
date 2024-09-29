// const fs = require('fs');
// const cheerio = require('cheerio');
// const puppeteer = require('puppeteer');

// const filePath = './list.html';

// fs.readFile(filePath, 'utf8', (err, html) => {
//     if (err) {
//         console.error('Erreur lors de la lecture du fichier:', err);
//         return;
//     }

//     const $ = cheerio.load(html);

//     const linksArray = [];

//     $('a').each((i, link) => {
//         var href = $(link).attr('href');
//         if (href && href.startsWith('https://anime-sama.fr/catalogue/')) {
//             const parentDiv = $(link).closest('div').parent();

//             const parentClass = parentDiv.attr('class');
//             if (parentClass && parentClass.includes('Scans')) {
//                 if (!href.endsWith('/')) {
//                     href += '/';
//                 }
//                 href += 'scan/vf';
//                 linksArray.push(href);
//             }

//         }
//     });

//     const extractFirstImageSrc = async (link, browser) => {
//         return true;
//         try {
//             const page = await browser.newPage();
//             await page.goto(link, { waitUntil: 'networkidle2' });

//             const firstImageSrc = await page.evaluate(() => {
//                 const scansDiv = document.querySelector('#scansPlacement');
//                 if (scansDiv) {
//                     const firstImg = scansDiv.querySelector('img');
//                     return firstImg ? firstImg.src : null;
//                 }
//                 return null;
//             });

//             await page.close();
//             return firstImageSrc;
//         } catch (error) {
//             return false;
//         }
//     };

//     const validateLinks = async () => {
//         const validLinks = [];
//         const browser = await puppeteer.launch();

//         const scansPageRegex = /https:\/\/anime-sama\.fr\/s2\/scans\/([^\/]+)\/[^\/]+\/[^\/]+\.jpg/;

//         for (const link of linksArray) {
//             const imageSrc = await extractFirstImageSrc(link, browser);
//             if (imageSrc) {
//                 //const match = imageSrc.match(scansPageRegex);
//                 //if (match) {
//                     console.log(`Lien valide: ${link}`);
//                     validLinks.push(link);
//                 //} else {
//                 //    console.error(`Lien invalide: ${link}`);
//                 //}
//             } else {
//                 console.error(`Lien invalide: ${link}`);
//             }
//         }

//         const jsonOutputPath = 'extracted.json';
//         fs.writeFile(jsonOutputPath, JSON.stringify(validLinks, null, 2), 'utf8', (err) => {
//             if (err) {
//                 console.log(`Erreur lors de l'écriture du fichier JSON:`, err);
//             } else {
//                 console.log(`Liens extraits et stockés dans ${jsonOutputPath}`);
//             }
//         });
//     };

//     validateLinks();
// });

const fs = require('fs');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const axios = require('axios');

const filePath = './list.html'; // Remplace avec le chemin de ton fichier

// Lire le fichier HTML
fs.readFile(filePath, 'utf8', async (err, html) => {
    if (err) {
        console.error('Erreur lors de la lecture du fichier:', err);
        return;
    }

    // Charger le HTML avec Cheerio
    const $ = cheerio.load(html);

    // Initialiser un tableau pour stocker les noms des mangas valides
    const validMangaNames = [];

    // Extraire tous les liens qui commencent par "https://www.anime-sama.fr/catalogue"
    $('a').each((i, link) => {
        let href = $(link).attr('href');
        if (href && href.startsWith('https://anime-sama.fr/catalogue')) {
            // Trouver le parent du parent du lien
            const parentDiv = $(link).closest('div').parent(); // Remonte deux niveaux de div

            // Vérifier si la classe du parent du parent contient "Scans"
            const parentClass = parentDiv.attr('class');
            if (parentClass && parentClass.includes('Scans')) {
                // Extraire le nom du manga en format snake_case à partir du lien
                const mangaNameSnakeCase = href.split('/catalogue/')[1].split('/')[0];

                // Ajouter au tableau pour traitement ultérieur
                validMangaNames.push(mangaNameSnakeCase);
            }
        }
    });

    // Fonction pour tester différents formats du nom du manga
    const testMangaNameFormats = async (browser, mangaName) => {
        const formats = generateMangaNameFormats(mangaName);
        const baseUrl = "https://anime-sama.fr/s2/scans/";

        for (const format of formats) {
            const urlToTest = `${baseUrl}${format}/1/1.jpg`;

            const isValid = await testLinkValidity(browser, urlToTest);
            if (isValid) {
                return format; // Retourne le premier format valide
            }
        }

        return null; // Aucun format valide trouvé
    };

    // Fonction pour générer différents formats de nom à partir de snake_case
    const generateMangaNameFormats = (mangaName) => {
        const words = mangaName.split('-');

        // Pascal Case
        const pascalCase = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

        // Camel Case
        const camelCase = words[0].toLowerCase() + words.slice(1).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');

        // Pascal Case avec mots de liaison (petits mots en minuscules)
        const linkingWords = ['and', 'or', 'the', 'of'];
        const pascalWithLinkingWords = words.map(word => {
            return linkingWords.includes(word.toLowerCase()) ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join(' ');

        // Pascal Case avec espaces encodés "%20"
        const pascalWithEncodedSpaces = pascalCase.split(' ').join('%20');

        // Premier mot avec majuscule uniquement
        const firstWordCapitalized = words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase() + ' ' + words.slice(1).join(' ').toLowerCase();

        // Nom sans aucune modification (snake_case original)
        const originalFormat = mangaName;

        // Liste des formats à tester
        return [pascalCase, camelCase, pascalWithLinkingWords, pascalWithEncodedSpaces, firstWordCapitalized, originalFormat];
    };

    // Fonction pour tester la validité du lien
    const testLinkValidity = async (browser, url) => {
        try {
            // const page = await browser.newPage();
            // await page.goto(url, { waitUntil: 'networkidle2' }); // Attendre que la page soit complètement chargée

            // // Vérifie si la page est bien chargée en détectant une image
            // const imageExists = await page.evaluate(() => {
            //     const img = document.querySelector('img');
            //     return img ? true : false;
            // });

            // await page.close();
            // return imageExists; // Retourne true si une image est trouvée
            const response = await axios.get(url);
            return response.status === 200;
        } catch (error) {
            console.error(`Erreur lors de la requête vers ${url}:`, error.message);
            return false;
        }
    };

    // Vérifier chaque nom de manga et ne garder que ceux qui ont un format valide
    const validateMangaNames = async () => {
        const validMangaFormats = [];
        const browser = await puppeteer.launch(); // Lancer un navigateur Puppeteer

        for (const mangaName of validMangaNames) {
            const validFormat = await testMangaNameFormats(browser, mangaName);
            if (validFormat) {
                console.log(`Nom valide trouvé: ${validFormat}`);
                validMangaFormats.push(validFormat); // Stocke le nom du manga dans le format valide
            } else {
                console.log(`Aucun format valide trouvé pour ${mangaName}`);
            }
        }

        await browser.close(); // Fermer le navigateur Puppeteer

        // Sauvegarder les noms valides dans un fichier JSON
        const jsonFilePath = 'extracted.json';
        fs.writeFile(jsonFilePath, JSON.stringify(validMangaFormats, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Erreur lors de l\'écriture du fichier JSON:', err);
            } else {
                console.log(`Noms de mangas valides sauvegardés dans ${jsonFilePath}`);
            }
        });
    };

    // Lancer la validation des noms de mangas
    validateMangaNames();
});
