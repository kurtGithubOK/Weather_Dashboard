const apiKey = 'f1904d406184f3cd6d2b1fa662fe0acf';
const openWeatherMapUrl = 'https://api.openweathermap.org/data/2.5/';
let previousCities = ['seattle', 'anchorage', 'denver']; // Trim down to one later.
let previousCityIndex = 0;

// Variables for divs.
const forecastDiv = document.getElementById('forecast');
const searchButton = document.getElementById('searchButton');
const searchText = document.getElementById('searchText');
const cityListDiv = document.getElementById('cityList');

const todaysTempDiv = document.getElementById('todaysTemp');
const todaysWindDiv = document.getElementById('todaysWind');
const todaysHumidityDiv = document.getElementById('todaysHumidity');
const todaysUVIndex = document.getElementById('todaysUVIndex');

// Register event handlers.
searchButton.addEventListener('click', searchButtonClicked);

function updateDisplay() {
    // Update list of cities.
    updateListOfCities();

    // Update today's weather.
    updateTodaysWeather();

    // Update forecast.
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

function updateTodaysWeather() {
    const todaysWeatherUrl = makeTodaysWeatherUrl(previousCities[0]);
    // Make API call.
    doFetch(todaysWeatherUrl)
        .then((data) => {
            populateTodaysWeather(data);
        });
}

function updateForecast() {
    const forecastUrl = makeForecastWeatherUrl(previousCities[0]);
    // Make API call.
    doFetch(forecastUrl)
        .then(data => {
            populateForecast(data);
        });
}

// Event handlers. 
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
const populateTodaysWeather = data => {
    todaysTempDiv.textContent = data.main.temp;
    todaysWindDiv.textContent = data.wind.speed;
    todaysHumidityDiv.textContent = data.main.humidity;
    // HOW TO GET UV INDEX???????????????????
};

const populateForecast = data => {


    //         const forecastList = data.list;
    //         const forecastArray = [];
    //         for (let i = 0; i < 5; i++) {
    //             const forecastListItem = forecastList[i];
    //             const forecastArrayItem = [];
    //             console.log('forecastListItem', forecastListItem);

    //             // const date = forecastListItem.dt;
    //             // console.log('date', date);
    //             // const moment = moment(date, 'X');
    //             // console.log('xxxxxx: ', moment.toString());

    //             const temperature = forecastListItem.main.temp;
    //             const windSpeed = forecastListItem.wind.speed;
    //             const humidity = forecastListItem.main.humidity;
    //             forecastListItem.temperature = temperature;
    //             forecastListItem.windSpeed = windSpeed;
    //             forecastListItem.humidity = humidity;
    //             forecastArray.push(forecastListItem);
    //             console.log('humidity', humidity)
    //         }
    //         return forecastArray;

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

const makeElement = (elementName, classArray, textContent) => {
    const element = document.createElement(elementName);
    for (classArrayElement of classArray) {
        console.log(classArrayElement)
        element.classList.add(classArrayElement);
    }
    element.textContent = textContent;
    return element;
};

// Create Card from the inside out.
const makeForecastCards = (forecastData) => {
    // for (let i = 0; i < forecastData.length; i++) { /////////////// change this at end
    for (let i = 0; i < 5; i++) {
        const forecastDay = forecastData[i];
        const titleElement = makeElement('h5', ['card-title'], '6-6-66');
        const iconElement = makeElement('p', ['card-text'], 'icon here??');
        const tempElement = makeElement('p', ['card-text'], 'Temp: ' + 666);
        const windElement = makeElement('p', ['card-text'], 'Wind: ' + 66);
        const humidityElement = makeElement('p', ['card-text'], 'Humidity: ' + 99);

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
// makeForecastCards([]);

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




