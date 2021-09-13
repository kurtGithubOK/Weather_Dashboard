const apiKey = 'f1904d406184f3cd6d2b1fa662fe0acf';
const openWeatherMapUrl = 'https://api.openweathermap.org/data/2.5/';

const searchButton = document.getElementById('searchButton');
const searchText = document.getElementById('searchText');
function searchButtonClicked(event) {
    console.log('now in searchButtonClicked():', searchText);
}
searchButton.addEventListener('click', searchButtonClicked);

const getTodaysWeather = (cityName) => {
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

fetch(forecastWeatherUrl)
    .then(function (response) {
        return response.json();
    })
    .then((data) => {
        const forecastList = data.list;
        for (let i = 0; i < 5; i++) {
            const forecastListItem = forecastList[i];
            console.log('forecastListItem', forecastListItem);

            // const date = forecastListItem.dt;
            // console.log('date', date);
            // const moment = moment(date, 'X');
            // console.log('xxxxxx: ', moment.toString());

            const temperature = forecastListItem.main.temp;
            const windSpeed = forecastListItem.wind.speed;
            const humidity = forecastListItem.main.humidity;
            console.log('humidity', humidity)

        }

    })
    .catch(function (err) {
        console.log("Something went wrong!", err);
    });






