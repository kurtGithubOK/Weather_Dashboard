const apiKey = 'f1904d406184f3cd6d2b1fa662fe0acf';
const openWeatherMapUrl = 'https://api.openweathermap.org/data/2.5/';
let previousCities = ['seattle', 'anchorage', 'denver']; // Trim down to one later.
let previousCityIndex = 0;

// Variables for divs.
const forecastDiv = document.getElementById('forecast');
const searchButton = document.getElementById('searchButton');
const searchText = document.getElementById('searchText');
const cityListDiv = document.getElementById('cityList');

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

function updateListOfCities() {
    // Loop over list of cities and make buttons for each.
    previousCities.forEach( (city) => {
        // <button type="button" class="btn btn-secondary w-100 my-1">Austin</button>
        const buttonElement = document.createElement('button');
        buttonElement.classList.add('btn', 'btn-secondary', 'w-100', 'my-1');  // Change other code like this.
        buttonElement.textContent = city;
        cityListDiv.appendChild(buttonElement);
    });
}
function updateTodaysWeather() {
    // Make API call.
    
    // Update upper section.
    
}
function updateForecast() {
    // Make API call.
    
    // Update lower section.
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

const cityName = 'seattle';
const todaysWeatherUrl = makeTodaysWeatherUrl(cityName);

// fetch(todaysWeatherUrl)
//     .then(function (response) {
//         return response.json();
//     })
//     .then((data) => {
//         console.log('weather data: ', data);
//         const temerature = data.main.temp;
//         console.log('Temp:', temerature);
//         const windSpeed = data.wind.speed;
//         console.log('windSpeed:', windSpeed)
//         const humidity = data.main.humidity;
//         console.log('Humidity:', humidity)
//         // HOW TO GET UV INDEX???????????????????
//     })
//     .catch(function (err) {
//         console.log("Something went wrong!", err);
//     });

const forecastWeatherUrl = makeForecastWeatherUrl(cityName);

// fetch(forecastWeatherUrl)
//     .then(function (response) {
//         return response.json();
//     })
//     .then((data) => {
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
//     })
//     .catch(function (err) {
//         console.log("Something went wrong!", err);
//     });

// Utility functions.
const makeElement = (elementName, classArray, textContent) => {
    const element = document.createElement(elementName);
    for(classArrayElement of classArray) {
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

// Initialize & start app.
function init() {
    // Pre-pop local storage.

    // Update Display.
    updateDisplay();
}
// change to es6
// Start app.
init();




