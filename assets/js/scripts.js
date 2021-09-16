
// Global variables.
const apiKey = 'f1904d406184f3cd6d2b1fa662fe0acf';
const openWeatherMapUrl = 'https://api.openweathermap.org/data/2.5/';
let previousCities = ['seattle', 'anchorage', 'denver']; // Trim down to one later.
let previousCityIndex = 0;


// Variables for divs.
const searchButton = document.getElementById('searchButton');
const searchText = document.getElementById('searchText');
const cityListDiv = document.getElementById('cityList');

const todaysTempDiv = document.getElementById('todaysTemp');
const todaysWindDiv = document.getElementById('todaysWind');
const todaysHumidityDiv = document.getElementById('todaysHumidity');
const todaysUVIndex = document.getElementById('todaysUVIndex');

const forecastDiv = document.getElementById('forecast');

// Register event handlers.
searchButton.addEventListener('click', searchButtonClicked);
//////////////////////////////////////////////////////////////////////////////////////////
const appData = {
    'seattle': {
        lat: 3,
        lon: 4,
        timestamp: 22,
        todaysWeather: {},
        forecast: [
            {
                timestamp: '',
                icon: '',
                temp: 2,
                wind: 4.4,
                humidity: 3
            }
        ]
    }
};


// API Callers ///////////////////////////////////////////////////////////////////////////////
// Get weather data using one-call API.
const getWeatherData = (cityCoords) => {
    const weatherDataUrl = makeForecastDataUrl(cityCoords);
    // console.log('left off here:', weatherDataUrl)
    doFetch(weatherDataUrl)
        .then((data) => {
            // const extractedForecastData = extractForecastData(data);
            // // Generate Cards for each forecast day.
            // makeForecastCards(extractedForecastData);
        });
};

// Get lat & long for city name via API call.
const getLatAndLonByCityName = (cityName) => {
    // Make url.
    const latAndLongUrl = makeLatAndLonUrl(cityName);
    // Make API call.
    doFetch(latAndLongUrl)
        .then((data) => {
            // Get lat and lon from response.
            const cityCoords = txformLatAndLonData(data);

            // Add code here to handle if data is bad...........................................

            // Do this here?????????
            // updateAppData(cityCoords);

            // Now get weather data.
            getWeatherData(cityCoords);
        });
}

// Data Transformation Functions ///////////////////////////////////////////////////////////////
const txformLatAndLonData = data => {
    const cityName = data.name;
    const cityLat = data.coord.lat;
    const cityLon = data.coord.lon;
    // console.log('xxxxx', cityName, cityLat, cityLon)
    return { cityName, cityLat, cityLon }
};

// Utility Functions ////////////////////////////////////////////////////////////////////////
const updateAppData = data => {
    appData[data.cityName] = {
        lat: data.cityLon,
        lon: data.cityLon
    };
    // Save to local storage, too.
    // localStorage.setItem('WeatherDashboard', JSON.stringify(appData));
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

const makeForecastDataUrl = cityCoords => {
    // 'https://api.openweathermap.org/data/2.5/onecall?lat=47.6062&lon=-122.3321&exclude={part}&appid=f1904d406184f3cd6d2b1fa662fe0acf';
    let url = openWeatherMapUrl;
    url += 'onecall';
    url += '?lat=' + cityCoords.cityLat;
    url += '&lon=' + cityCoords.cityLon;
    url += '&exclude=minutely,hourly,alerts';
    url += '&appId=' + apiKey;
    return url;
}

getLatAndLonByCityName('anchorage'); // Runner

// Display results.




// Functions to update values displayed on page.
// updateDisplay() just ties function calls together for updating parts of the display.
function updateDisplay() {
    updateListOfCities();
    updateTodaysWeather();
    updateForecast();
}

// Loop over list of cities and make buttons for each.
function updateListOfCities() {
    previousCities.forEach((city) => {
        const buttonElement = document.createElement('button');
        buttonElement.classList.add('btn', 'btn-secondary', 'w-100', 'my-1');  // Change other code like this.
        buttonElement.textContent = city;
        cityListDiv.appendChild(buttonElement);
    });
}

// Make API call and display response in today's weather.
function updateTodaysWeather() {
    const todaysWeatherUrl = makeTodaysWeatherUrl(previousCities[0]);
    // Make API call.
    doFetch(todaysWeatherUrl)
        .then((data) => {
            populateTodaysWeather(data);
        });
}

// Make API call and display response in forecast.
function updateForecast() {
    const forecastUrl = makeForecastWeatherUrl(previousCities[0]);
    // Make API call.
    doFetch(forecastUrl)
        .then(data => {
            // Transform incoming data into data objects.
            const extractedForecastData = extractForecastData(data);
            // Generate Cards for each forecast day.
            makeForecastCards(extractedForecastData);
        });
}


// Event handlers. ////////////////////////////////////////////////////////////
function searchButtonClicked(event) {
    console.log('now in searchButtonClicked():', searchText);
    // Store city name in variable.

    // Searching for new city is similar to clicking on imaginary existing city button.
    cityClicked();
}
function cityClicked(event) {
    // Call update display with new value of city name.
    updateDisplay();

}


// Utility functions ////////////////////////////////////////////////////////////
// Update values in today's weather.
const populateTodaysWeather = data => {
    todaysTempDiv.textContent = data.main.temp;
    todaysWindDiv.textContent = data.wind.speed;
    todaysHumidityDiv.textContent = data.main.humidity;
    // HOW TO GET UV INDEX???????????????????
};

// Loop over forecast data & assemble Card divs from the inside out.
const makeForecastCards = (forecastData) => {
    for (let i = 0; i < forecastData.length; i++) {
        const forecastDay = forecastData[i];
        const titleElement = makeElement('h5', ['card-title'], forecastDay.forecastDate);
        const iconElement = makeElement('p', ['card-text'], 'icon here??');
        const tempElement = makeElement('p', ['card-text'], 'Temp: ' + forecastDay.temperature);
        const windElement = makeElement('p', ['card-text'], 'Wind: ' + forecastDay.windSpeed);
        const humidityElement = makeElement('p', ['card-text'], 'Humidity: ' + forecastDay.humidity);

        const cardBodyElement = makeElement('div', ['card-body', 'p-2']);
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

// Returns an array of objects containing data for each forecast day.
const extractForecastData = data => {
    const forecastDataList = data.list;
    // Put data into array of objects for later use.
    const forecastDataArray = [];
    for (let i = 0; i < 5; i++) {
        // Get element in array.
        const forecastDataListItem = forecastDataList[i];
        // console.log('forecastDataListItem', forecastDataListItem)
        // Create an object to store forecast data.
        const forecastObject = {};
        const forecastTimestamp = moment(forecastDataListItem.dt, 'X');
        forecastObject.forecastDate = forecastTimestamp.format('M-DD-YYYY');
        forecastObject.temperature = forecastDataListItem.main.temp;
        forecastObject.windSpeed = forecastDataListItem.wind.speed;
        forecastObject.humidity = forecastDataListItem.main.humidity;
        forecastDataArray.push(forecastObject);
    }
    return forecastDataArray;
};

// Utility to make a generic HTML element.
const makeElement = (elementName, classArray, textContent) => {
    const element = document.createElement(elementName);
    for (classArrayElement of classArray) {                // s/b shorter version???????????????
        element.classList.add(classArrayElement);
    }
    element.textContent = textContent;
    return element;
};

const makeForecastWeatherUrl = (cityName) => {
    // https://api.openweathermap.org/data/2.5/forecast?q=seattle&appid=f1904d406184f3cd6d2b1fa662fe0acf&units=imperial
    let url = openWeatherMapUrl;
    url += 'forecast';
    url += '?q=' + cityName;
    url += '&appId=' + apiKey;
    url += '&units=imperial';
    return url;
}

function makeTodaysWeatherUrl(cityName) {
    // https://api.openweathermap.org/data/2.5/weather?q=seattle&appid=f1904d406184f3cd6d2b1fa662fe0acf&units=imperial
    let url = openWeatherMapUrl;
    url += 'weather';
    url += '?q=' + cityName;
    url += '&appId=' + apiKey;
    url += '&units=imperial';
    return url;
}

// Initialize & start app.
function init() {
    // Pre-pop local storage.

    // Update Display.
    updateDisplay();
}
// change to es6
// Start app.
init();




