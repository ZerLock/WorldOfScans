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

module.exports = app;
