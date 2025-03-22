const currentTemp = document.getElementById("current-temp");
const minTemp = document.getElementById("min-temp");
const maxTemp = document.getElementById("max-temp");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const weatherIcon = document.getElementById("weather-icon");
let url = null;

window.addEventListener("DOMContentLoaded", () => {
    const params = {
        latitude: -26.7167,
        longitude: 27.1000,
        daily: ["temperature_2m_max", "temperature_2m_min", "sunrise", "sunset"],
        timezone: "auto",
        forecast_days: 1
    };

    url = "https://api.open-meteo.com/v1/forecast?" + new URLSearchParams({

        latitude: params.latitude,
        longitude: params.longitude,
        daily: params.daily.join(","),
        current_weather: "true",
        timezone: params.timezone,
        forecast_days: params.forecast_days
    }).toString();

    getWeather(); // Call function to fetch weather data
});


async function getWeather() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log(data); // Debugging: Check API response

        if (!data.current_weather) {
            throw new Error("Current weather data is missing from the API response.");
        }

        // Display temperatures
        currentTemp.innerHTML = `${data.current_weather.temperature}°C`;
        minTemp.innerHTML = `${data.daily.temperature_2m_min[0]}°C`;
        maxTemp.innerHTML = `${data.daily.temperature_2m_max[0]}°C`;

        // ✅ Check if "sunrise" and "sunset" exist
        if (data.daily.sunrise && data.daily.sunset) {
            sunrise.innerHTML = new Date(data.daily.sunrise[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            sunset.innerHTML = new Date(data.daily.sunset[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
};
