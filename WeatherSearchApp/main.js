let locationSearched = null; // Variable to store the searched location
let url = null; // Variable to store the API URL
let locationSelected = null; // Variable to store the selected location index
const currentTemp = document.getElementById('current-temp'); // Element to display current temperature
const minTemp = document.getElementById('min-temp'); // Element to display minimum temperature
const maxTemp = document.getElementById('max-temp'); // Element to display maximum temperature
const sunrise = document.getElementById('sunrise'); // Element to display sunrise time
const sunset = document.getElementById('sunset'); // Element to display sunset time
const searchBtn = document.getElementById('search-btn'); // Search button element
const locationOption = document.getElementById('locations-available'); // Dropdown for available locations
let data = null; // Variable to store fetched location data

// Event listener for the search button
searchBtn.addEventListener('click', () => {
  locationSearched = document.getElementById('search').value; // Get the value from the search input
  url = `https://geocoding-api.open-meteo.com/v1/search?name=${locationSearched}&count=10&language=en&format=json`; // Construct the API URL
  fetchAvailableLocations(url); // Fetch available locations based on the search
});

// Event listener for changes in the location dropdown
locationOption.addEventListener('change', () => {
    // Get the selected location index
    locationSelected = locationOption.selectedIndex; 
    console.log(locationSelected); // Log the selected index
    getWeather(locationSelected); // Fetch weather data for the selected location
});

// Function to fetch available locations based on the search URL
async function fetchAvailableLocations(url) {
    removeOptions(locationOption); // Clear previous options in the dropdown
    try {
        const response = await fetch(url); // Fetch data from the API
        data = await response.json(); // Parse the JSON response
        console.log(data); // Debugging: Check API response
        if (data.error) {
            throw new Error('Error fetching location data:', data.error); // Handle API errors
        }

        // Populate the dropdown with available locations
        for (let i = 0; i < data.results.length; i++) {
            const location = data.results[i].name; // Get location name
            const country = data.results[i].country; // Get country name
            const province = data.results[i].admin1; // Get province name
            const locations = document.createElement('option'); // Create a new option element
            locations.text = location + ', ' + province + ', ' + country; // Set the display text
            locations.value = location + ', ' + province + ', ' + country; // Set the value
            document.getElementById('locations-available').add(locations); // Add the option to the dropdown
        }
        getWeather(document.getElementById('locations-available').selectedIndex); // Fetch weather for the first available location
    }
    catch (error) {
        console.error("error fetching location data:", error); // Log any errors
    }
};

// Function to fetch weather data for the selected location
async function getWeather(locationSelected) {
    const params = {
        latitude: data.results[locationSelected].latitude, // Get latitude of the selected location
        longitude: data.results[locationSelected].longitude, // Get longitude of the selected location
        daily: ["temperature_2m_max", "temperature_2m_min", "sunrise", "sunset"], // Parameters for daily weather data
        timezone: "auto", // Automatically determine the timezone
        forecast_days: 1 // Number of forecast days
    };

    // Construct the API URL for weather data
    url = "https://api.open-meteo.com/v1/forecast?" + new URLSearchParams({
        latitude: params.latitude,
        longitude: params.longitude,
        daily: params.daily.join(","),
        current_weather: "true",
        timezone: params.timezone,
        forecast_days: params.forecast_days
    }).toString();

    try {
        const response = await fetch(url); // Fetch weather data from the API
        const data = await response.json(); // Parse the JSON response

        console.log(data); // Debugging: Check API response

        if (!data.current_weather) {
            throw new Error("Current weather data is missing from the API response."); // Handle missing data
        }

        // Display temperatures
        currentTemp.innerHTML = `${data.current_weather.temperature}°C`; // Update current temperature
        minTemp.innerHTML = `${data.daily.temperature_2m_min[0]}°C`; // Update minimum temperature
        maxTemp.innerHTML = `${data.daily.temperature_2m_max[0]}°C`; // Update maximum temperature

        // Check if "sunrise" and "sunset" exist
        if (data.daily.sunrise && data.daily.sunset) {
            sunrise.innerHTML = new Date(data.daily.sunrise[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Update sunrise time
            sunset.innerHTML = new Date(data.daily.sunset[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Update sunset time
        }
    } catch (error) {
        console.error("Error fetching weather data:", error); // Log any errors
    }
};

// Function to remove all options from a select element
function removeOptions(selectElement) {
    let i, L = selectElement.options.length - 1; // Get the number of options
    for (i = L; i >= 0; i--) {
        selectElement.remove(i); // Remove each option
    }
};
