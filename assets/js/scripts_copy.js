// Global variables.
const apiKey = 'f1904d406184f3cd6d2b1fa662fe0acf';
const openWeatherMapUrl = 'https://api.openweathermap.org/data/2.5/';
const appName = 'WeatherDashboard';  // Key for local storage.
let currentCity = '';
let appData = {};  // Variable for storing/caching data.
/*  
    Sample appData = {
        'seattle': {
            lat: 222,
            lon: 333,
            timestamp: 22,
            todaysWeather: {
                temp: 44,
                wind: 60,
                humidity: 50,
                uvIndex: .47
            },
            forecast: [
                {
                    timestamp: '',
                    icon: '',
                    temp: 2,
                    wind: 4.4,
                    humidity: 3
                }
            ]
        },
        'city2': { ... }
    };
*/

// App starts here.  Called at bottom of file.
const main = () => {
    // Set global variable to whatever may be saved.
    appData = getSavedData();
    currentCity = getDefaultCity();
    // Call function to update display.
    updateDisplay();
}

const updateDisplay = () => {
    // const weatherDataForDisplay = getWeatherData(cityName);
    // if(!weatherDataForDisplay) return 'SOME KIND OF ERRO RMESSAGE!';
    // updateDisplayParts();

}
const getWeatherData = cityName => {

};

// Just combines calls to update various parts of page.
const updateDisplayParts = () => {
    updateListOfCities();
    updateTodaysWeather();
    updateForecast();
};

// Make API call to get fresh weather data.
// First call API to get city's lat & lon, then another to get weather data.
const getWeatherDataFromAPI = cityName => {
    const url = makeLatAndLonUrl(cityName);
    doFetch(url)
        .then((cityCoordsFromAPI) => {
            // Get the city's lat & lon out of response.
            const cityCoords = transformWeatherDataCoords(cityCoordsFromAPI);
            saveCityCoords(cityCoords);
            // console.log('cityCoords', cityCoords)

            // Proceed with getting weather data for the city.
            const weatherDataUrl = makeWeatherDataUrl(cityCoords);
            // console.log('weatherDataUrl', weatherDataUrl)

            doFetch(weatherDataUrl)
                .then((weatherDataFromAPI) => {
                    // Get weather data out of response.
                    const transformedWeatherData = transformWeatherData(cityName, weatherDataFromAPI);
                    // saveWeatherData(transformedWeatherData);
                    // Call update display here?
                });
        });
};




// Utility Functions //////////////////////////////////////////////////////////////////////////////////////////
// Function to transform API response to appData.
const transformWeatherData = (cityName, weatherDataFromAPI) => {
    const current = weatherDataFromAPI.current;
    // Create object for today's weather and set on appData.
    const todaysWeather = {};
    todaysWeather.temp = current.temp;
    todaysWeather.wind = current.wind_speed;
    todaysWeather.humidity = current.temp;
    todaysWeather.uvIndex = current.uvi;

    console.log('todaysWeather', todaysWeather)
    // do timestamp   





};

// Function to transform API response to cityName, lat & lon.
const transformWeatherDataCoords = latAndLonFromAPI => {
    const cityName = latAndLonFromAPI.name;
    const cityLat = latAndLonFromAPI.coord.lat;
    const cityLon = latAndLonFromAPI.coord.lon;
    return { cityName, cityLat, cityLon }
};

// Function to add entry into appData for this city.
const saveCityCoords = cityLatAndLon => {
    const cityInAppData = {};
    cityInAppData.lat = cityLatAndLon.cityLat;
    cityInAppData.lon = cityLatAndLon.cityLon;
    appData[cityLatAndLon.cityName] = cityInAppData;
    saveAppData();
}

// You need a city to start with so get the most recent from appData. 
const getDefaultCity = () => {
    const numExistingCities = Object.keys(appData).length;
    if (!numExistingCities) {
        currentCity = 'seattle';
    } else {
        // Do this later.
    }
};

const doFetch = (url) => {
    return fetch(url)
        .then(response => {
            return response.json();
        })
        .catch(function (err) {
            console.log("Something went wrong calling this url:", url, err);
        });
};

const makeLatAndLonUrl = cityName => {
    // 'https://api.openweathermap.org/data/2.5/weather?q=seattle&appid=f1904d406184f3cd6d2b1fa662fe0acf';
    let url = openWeatherMapUrl;
    url += 'weather';
    url += '?q=' + cityName;
    url += '&appId=' + apiKey;
    return url;
}

const makeWeatherDataUrl = cityCoords => {
    // 'https://api.openweathermap.org/data/2.5/onecall?lat=47.6062&lon=-122.3321&exclude={part}&appid=f1904d406184f3cd6d2b1fa662fe0acf';
    let url = openWeatherMapUrl;
    url += 'onecall';
    url += '?lat=' + cityCoords.cityLat;
    url += '&lon=' + cityCoords.cityLon;
    url += '&exclude=minutely,hourly,alerts';
    url += '&appId=' + apiKey;
    return url;
}

// Return any data saved in local storage.
const getSavedData = () => {
    return JSON.parse(localStorage.getItem(appName)) || {};
};

const saveAppData = () => {
    localStorage.setItem(appName, JSON.stringify(appData))
};

// Start app.
main();
getWeatherDataFromAPI('seattle')





