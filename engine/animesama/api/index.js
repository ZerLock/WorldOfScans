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
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
    }
});

module.exports = app;
