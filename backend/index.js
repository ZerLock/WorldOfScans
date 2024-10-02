const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(cors());

function sanitizeMangaName(mangaName) {
    return mangaName.replaceAll('%20', '-').replaceAll(' ', '-').toLowerCase();
}

app.get('/manga/:mangaName', async (req, res) => {
  const mangaName = req.params.mangaName;
  console.log('got request for ' + mangaName + ' from ' + req.get('host'));

  const url = `https://anime-sama.fr/catalogue/${sanitizeMangaName(mangaName)}/scan/vf/episodes.js?filever=615193`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.log('error:' + error);
    res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
  }
});

app.listen(port, () => {
  console.log(`Le serveur tourne sur http://localhost:${port}`);
});
