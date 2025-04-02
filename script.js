document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '00ff90d1d6009aca348e568fc5085e2c';
    const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    const weatherContainer = document.getElementById('weather-container');
    const loadingElement = document.getElementById('loading');
    const errorMessage = document.getElementById('error-message');
    const cityName = document.getElementById('city-name');
    const temperature = document.getElementById('temperature');
    const windSpeed = document.getElementById('wind-speed');
    const humidity = document.getElementById('humidity');
    const description = document.getElementById('description');

    async function getWeather(city) {
        try {
            loadingElement.style.display = 'block';
            weatherContainer.style.display = 'none';
            errorMessage.style.display = 'none';

            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
            );
            const data = await response.json();

            if (data.cod === '404') {
                errorMessage.style.display = 'block';
                return;
            }

            displayWeather(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Error fetching weather data. Please try again.';
        } finally {
            loadingElement.style.display = 'none';
        }
    }

    function displayWeather(data) {
        cityName.textContent = `${data.name}, ${data.sys.country}`;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        windSpeed.textContent = `${data.wind.speed} km/h`;
        humidity.textContent = `${data.main.humidity}%`;
        description.textContent = data.weather[0].description;

        weatherContainer.style.display = 'block';
    }

    searchBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city);
        }
    });

    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const city = cityInput.value.trim();
            if (city) {
                getWeather(city);
            }
        }
    });
});
