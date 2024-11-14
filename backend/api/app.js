async function routes (fastify, options) {
    fastify.get('/', async (request, reply) => {
        return { hello: 'world' }
    });

    fastify.get('/manga/:mangaName', async (req, res) => {
        console.log('new request from ', (req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress));
        const mangaName = req.params.mangaName;
        const url = `https://anime-sama.fr/catalogue/${sanitizeMangaName(mangaName)}/scan/vf/episodes.js`;

        try {
            const response = await axios.get(url);
            res.json(response.data);
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
        }
    });
}

export default routes;
