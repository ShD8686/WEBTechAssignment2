require('dotenv').config();
const express = require('express');
const https = require('https');
const path = require('path');

const app = express();

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Helper function using native HTTPS
function getApiData(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    resolve(parsed);
                } catch (e) { reject("JSON Parse Error"); }
            });
        }).on('error', (err) => reject(err.message));
    });
}

// API Endpoint for the frontend to call
app.get('/api/search', async (req, res) => {
    const city = req.query.city;
    const WEATHER_KEY = process.env.WEATHER_API_KEY;
    const NEWS_KEY = process.env.NEWS_API_KEY;

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_KEY}`;
    const newsUrl = `https://newsdata.io/api/1/latest?apikey=${NEWS_KEY}&q=${city}`;

    try {
        const weatherRaw = await getApiData(weatherUrl);
        if (weatherRaw.cod !== 200) return res.status(404).json({ error: "City not found" });

        const newsRaw = await getApiData(newsUrl);

        // Process data as per assignment requirements
        const processedData = {
            weather: {
                temperature: weatherRaw.main.temp,
                description: weatherRaw.weather[0].description,
                coordinates: `${weatherRaw.coord.lat}, ${weatherRaw.coord.lon}`,
                feels_like: weatherRaw.main.feels_like,
                wind_speed: weatherRaw.wind.speed,
                country_code: weatherRaw.sys.country,
                rain_volume: (weatherRaw.rain && weatherRaw.rain['3h']) ? weatherRaw.rain['3h'] : 0
            },
            news: newsRaw.results || []
        };

        res.json(processedData); // Send clean JSON to frontend
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
});

app.listen(3000, () => console.log(`Server: http://localhost:3000`));