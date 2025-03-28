const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors());

function sanitizeMangaName(mangaName) {
    return mangaName.replaceAll('%20', '-').replaceAll(' ', '-').toLowerCase();
}

const BLACK_AND_WHITE = ['one-piece'];

function typeOfScans(mangaName) {
    return BLACK_AND_WHITE.includes(mangaName) ? 'scan_noir-et-blanc' : 'scan';
}

app.get('/manga/:mangaName/chapters', async (req, res) => {
    const mangaName = req.params.mangaName;
    const url = `https://anime-sama.fr/catalogue/${sanitizeMangaName(mangaName)}/${typeOfScans(mangaName)}/vf/episodes.js`;

    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
                'Accept': 'application/json, text/plain, */*',
                'Accept-Encoding': 'gzip, deflate, br',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
    }
});

async function isValidChapter(manga, chapter) {
    try {
        const url = `https://anime-sama.fr/s2/scans/${manga}/${chapter}/1.jpg`;
        const res = await axios.get(url);
        return res.status !== 404 && res.status !== 403;
    } catch (e) {
        return false;
    }
}

app.get('/v2/manga/:mangaName/chapters', async (req, res) => {
    const mangaName = req.params.mangaName;

    let low = 1;
    let high = 1300;
    let lastValid = null;

    while (low <= high) {
        const middle = Math.floor((low + high) / 2);
        if (await isValidChapter(mangaName, middle)) {
            lastValid = middle;
            low = middle + 1;
        } else {
            high = middle - 1;
        }
    }

    res.json({ count: lastValid || 0 });
});

module.exports = app;
