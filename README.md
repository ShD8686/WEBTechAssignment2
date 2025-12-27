# Assignment 2: City Insight Dashboard (Weather & News)
## 📌 Project Overview
The City Insight Dashboard is a web-based application that provides users with real-time weather data and the latest local news for any city globally. The core objective of this project is to demonstrate backend API integration, where all third-party communication is handled on the server side to ensure security and a clean data flow.
## 🚀 Features
- Server-Side Weather Fetching: Retrieves temperature, description, coordinates, feels-like temperature, wind speed, country code, and rain volume using the OpenWeather API.
- Local News Integration: Uses the NewsData.io API to fetch the latest headlines related to the searched city.
- RESTful API Architecture: The backend acts as a JSON provider, processing raw data before sending it to the client.
- Responsive Design: A fully mobile-friendly interface built with CSS Grid and Flexbox.
## 🛠️ Tech Stack
Frontend: HTML5, CSS3, Vanilla JavaScript (Fetch API)
Backend: Node.js, Express.js
Utilities: dotenv (Environment Variables), Native https module
APIs:
- OpenWeatherMap API
- NewsData.io API
## 📡 API Usage Details
1. Weather API (OpenWeather)
The server sends a request to the /weather endpoint. The raw response is filtered on the server to return a clean JSON object containing:
- temperature (Celsius)
- description (e.g., "clear sky")
- coordinates (Latitude and Longitude)
- feels_like
- wind_speed
- rain_volume (checking for 3h volume specifically)
2. News API (NewsData.io)
The server queries the "/latest" endpoint using the "q" (query) parameter with the city name. The backend maps the "results" array to ensure only the title, description, and source link are sent to the frontend.
