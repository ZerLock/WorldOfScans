const axios = require('axios');

const bootstrap = async () => {
	const response = await axios.get('https://anime-sama.fr/s2/scans/Adabana/1/1.jpg');
	console.log(response.status);
};

bootstrap();
