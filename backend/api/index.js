const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors());

function sanitizeMangaName(mangaName) {
    return mangaName.replaceAll('%20', '-').replaceAll(' ', '-').toLowerCase();
}

app.get('/manga/:mangaName', async (req, res) => {
    console.log('new request from ', (req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress));
    const mangaName = req.params.mangaName;
    const url = `https://anime-sama.fr/catalogue/${sanitizeMangaName(mangaName)}/scan/vf/episodes.js?filever=615193`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
    }
});

module.exports = app;
