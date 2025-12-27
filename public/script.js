document.getElementById('searchBtn').addEventListener('click', async () => {
    const city = document.getElementById('cityInput').value;
    const resultsDiv = document.getElementById('results');
    const errorBox = document.getElementById('errorBox');

    if (!city) return;

    try {
        errorBox.textContent = "";
        const response = await fetch(`/api/search?city=${city}`);
        const data = await response.json();

        if (!response.ok) throw new Error(data.error);

        // Display Weather
        resultsDiv.style.display = "block";
        document.getElementById('weatherTitle').textContent = `Weather in ${city} (${data.weather.country_code})`;
        
        document.getElementById('weatherDetails').innerHTML = `
            <div class="item"><strong>Temp:</strong> ${data.weather.temperature}°C</div>
            <div class="item"><strong>Feels Like:</strong> ${data.weather.feels_like}°C</div>
            <div class="item"><strong>Condition:</strong> ${data.weather.description}</div>
            <div class="item"><strong>Wind:</strong> ${data.weather.wind_speed} m/s</div>
            <div class="item"><strong>Rain (3h):</strong> ${data.weather.rain_volume} mm</div>
            <div class="item"><strong>Coords:</strong> ${data.weather.coordinates}</div>
        `;

        // Display News
        const newsList = document.getElementById('newsList');
        newsList.innerHTML = data.news.map(article => `
            <div class="news-card">
                <h3>${article.title}</h3>
                <p>${article.description || 'No description available.'}</p>
                <a href="${article.link}" target="_blank">Read More</a>
            </div>
        `).join('');

    } catch (err) {
        resultsDiv.style.display = "none";
        errorBox.textContent = err.message;
    }
});