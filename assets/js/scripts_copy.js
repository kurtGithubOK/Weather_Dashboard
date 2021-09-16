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

// Variables for divs.
const searchButton = document.getElementById('searchButton');
const searchText = document.getElementById('searchText');
const cityListDiv = document.getElementById('cityList');


const cityAndDateDiv = document.getElementById('cityAndDate');
const todaysTempDiv = document.getElementById('todaysTemp');
const todaysWindDiv = document.getElementById('todaysWind');
const todaysHumidityDiv = document.getElementById('todaysHumidity');
const todaysUVIndex = document.getElementById('todaysUVIndex');

const forecastDiv = document.getElementById('forecast');

// Register event handlers.
searchButton.addEventListener('click', searchButtonClicked);

// App starts here.  Called at bottom of file.
const main = () => {
    // Set global variable to whatever may be saved.
    appData = getSavedData();
    currentCity = getDefaultCity();
    // Call function to update display.
    updateDisplay();
}

// Top-level function to get & display weather.
const updateDisplay = () => {
    // const weatherDataForDisplay = getWeatherData(cityName);
    // if(!weatherDataForDisplay) return 'SOME KIND OF ERRO RMESSAGE!';
    getWeatherDataFromAPI('seattle')
}

// Make API call to get fresh weather data.
// First call API to get city's lat & lon, then another to get weather data.
const getWeatherDataFromAPI = citySearchString => {
    const url = makeLatAndLonUrl(citySearchString);
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
                    const transformedWeatherDataTodays = transformWeatherDataTodays(weatherDataFromAPI);
                    appData[cityCoords.cityName].todaysWeather = transformedWeatherDataTodays;
                    appData[cityCoords.cityName].timestamp = transformedWeatherDataTodays.timestamp;
                    currentCity = cityCoords.cityName;
                    // move above into save method?
                    // saveWeatherData(transformedWeatherData);
                    const transformedWeatherDataForecast = transformWeatherDataForecast(weatherDataFromAPI);
                    appData[cityCoords.cityName].forecast = transformedWeatherDataForecast;

                    // console.log('appData', appData)
                    // Call update display here?
                    updateDisplayParts();
                });
        });
};

// Event handlers. ////////////////////////////////////////////////////////////
function searchButtonClicked(event) {
    const citySearchString = searchText.value;
}

function cityClicked(event) {

}



// Functions for updating display /////////////////////////////////////////////////////////////////////////////
// Just combines calls to update various parts of page.
const updateDisplayParts = () => {
    updateListOfCities();
    updateTodaysWeather();
    updateForecast();
};


// Loop over list of cities and make buttons for each.
function updateListOfCities() {
    const previousCities = Object.keys(appData);
    previousCities.forEach((cityName) => {
        const buttonElement = document.createElement('button');
        buttonElement.classList.add('btn', 'btn-secondary', 'w-100', 'my-1');  // Change other code like this.
        buttonElement.textContent = cityName;
        cityListDiv.appendChild(buttonElement);
    });
}

// Update values in today's weather.
const updateTodaysWeather = () => {
    const timestampMoment = moment(appData[currentCity].timestamp);
    cityAndDateDiv.textContent = currentCity + ' (' + timestampMoment.format('M/DD/YYYY') + ')';
    const todaysWeather = appData[currentCity].todaysWeather;
    todaysTempDiv.textContent = todaysWeather.temp;
    todaysWindDiv.textContent = todaysWeather.speed;
    todaysHumidityDiv.textContent = todaysWeather.humidity;
    todaysUVIndex.textContent = todaysWeather.uvIndex;
};

// Loop over forecast data & assemble Card divs from the inside out.
const updateForecast = () => {
    const forecastWeather = appData[currentCity].forecast;
    for (let i = 0; i < forecastWeather.length; i++) {
        const forecastDay = forecastWeather[i];
        const displayDate = moment(forecastDay.dt, 'X').format('M/DD/YYYY');
        const titleElement = makeElement('h5', ['card-title', 'text-white'], displayDate);

        // Do weather icon.
        const iconElement = makeElement('p', ['card-text']);
        const iconImage = new Image();
        iconImage.src = 'http://openweathermap.org/img/wn/' + forecastDay.icon + '@2x.png';
        iconElement.appendChild(iconImage)

        const tempElement = makeElement('p', ['card-text', 'text-white'], 'Temp: ' + forecastDay.temp + '&deg; F');
        const windElement = makeElement('p', ['card-text', 'text-white'], 'Wind: ' + forecastDay.wind + ' MPH');
        const humidityElement = makeElement('p', ['card-text', 'text-white'], 'Humidity: ' + forecastDay.humidity + '%');

        const cardBodyElement = makeElement('div', ['card-body', 'p-2', 'bg-primary']);
        cardBodyElement.appendChild(titleElement);
        cardBodyElement.appendChild(iconElement);
        cardBodyElement.appendChild(tempElement);
        cardBodyElement.appendChild(windElement);
        cardBodyElement.appendChild(humidityElement);

        const cardElement = makeElement('div', ['card']);
        cardElement.appendChild(cardBodyElement);

        const colElement = makeElement('div', ['col']);
        colElement.appendChild(cardElement);
        forecastDiv.appendChild(colElement);
    }
};







// Utility Functions //////////////////////////////////////////////////////////////////////////////////////////
// Function to txfer data from API response to object for appData.
const transformWeatherDataForecast = weatherDataFromAPI => {
    const forecastData = weatherDataFromAPI.daily; // Need subset of data.
    const forecastArray = [];
    for (let i = 0; i < 5; i++) {
        const forecaseWeatherObject = {};
        forecaseWeatherObject.dt = forecastData[i].dt;
        forecaseWeatherObject.icon = forecastData[i].weather[0].icon;
        forecaseWeatherObject.temp = forecastData[i].temp.day;
        forecaseWeatherObject.wind = forecastData[i].wind_speed;
        forecaseWeatherObject.humidity = forecastData[i].humidity;
        forecastArray.push(forecaseWeatherObject);
    }
    return forecastArray;
}

// Function to pull today's weather from API.
const transformWeatherDataTodays = (weatherDataFromAPI) => {
    const current = weatherDataFromAPI.current; // Need subset of data.
    // Create object for today's weather and set on appData.
    const todaysWeatherObject = {};
    todaysWeatherObject.timestamp = current.dt;
    todaysWeatherObject.temp = current.temp;
    todaysWeatherObject.wind = current.wind_speed;
    todaysWeatherObject.humidity = current.temp;
    todaysWeatherObject.uvIndex = current.uvi;
    return todaysWeatherObject;
};

// Function to transform API response to cityName, lat & lon.
const transformWeatherDataCoords = latAndLonFromAPI => {
    const cityName = latAndLonFromAPI.name;
    const cityLat = latAndLonFromAPI.coord.lat;
    const cityLon = latAndLonFromAPI.coord.lon;
    return { cityName, cityLat, cityLon }
};


// Utility to make a generic HTML element.
const makeElement = (elementName, classArray, textContent = '') => {
    const element = document.createElement(elementName);
    element.classList.add(...classArray);
    element.innerHTML = textContent;
    return element;
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
    url += '&units=imperial';
    url += '&appId=' + apiKey;
    return url;
}

// Return any data saved in local storage.
const getSavedData = () => {
    return JSON.parse(localStorage.getItem(appName)) || {};
};

const saveAppData = () => {
    localStorage.setItem(appName, JSON.stringify(appData));
};

// Start app.
main();





