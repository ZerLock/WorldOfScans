const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors());

function sanitizeMangaName(mangaName) {
    return mangaName.replaceAll('%20', '-').replaceAll(' ', '-').toLowerCase();
}

app.get('/manga/:mangaName/chapters', async (req, res) => {
    let mangaName = req.params.mangaName;
    if (mangaName === "one-piece") mangaName = "one-piece/scan_noir-et-blanc";
    const url = `https://anime-sama.fr/catalogue/${sanitizeMangaName(mangaName)}/scan/vf/episodes.js`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
    }
});

module.exports = app;
