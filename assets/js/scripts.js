

const searchButton = document.getElementById('searchButton');
const searchText = document.getElementById('searchText');

function searchButtonClicked(event) {
    console.log('clcikcffffffeddde', searchText);
    
}

searchButton.addEventListener('click', searchButtonClicked);

const cityName = 'seattle';
const apiKey = 'f1904d406184f3cd6d2b1fa662fe0acf';

function generateURL(cityName, apiKey) {
    let url = 'https://api.openweathermap.org/data/2.5/weather';
    url += '?q=';
    url += cityName;
    url += '&appId=';
    url += apiKey;
    return url;    
}

const url = generateURL(cityName, apiKey);
console.log('weather url', url)


fetch(url)
.then(function (response) {
    console.log('weather response: ', response.json());
})
.then( (data) => {
    console.log('weather data: ', data);

})
.catch(function (err) {
    console.log("Something went wrong!", err);
});

console.log('')

/////////////////////////////////////
const seattleLongitude = -122.3321;
const seattleLatitude = 47.6062;
const apiQuery = 'forecast?';
let forecastURL = 'https://api.openweathermap.org/data/2.5/';
forecastURL += apiQuery;
forecastURL += 'q=' + cityName;
forecastURL += '&appid=' + apiKey;

console.log('forecastURL', forecastURL)


// fetch('https://api.openweathermap.org/data/2.5/onecall?lat=38.7267&lon=-9.1403&exclude=current,hourly,minutely,alerts&appid=' + apiKey)
fetch(forecastURL)
.then(function (response) {
    console.log('Forecast: ', response);
})
.catch(function (err) {
    console.log("Something went wrong!", err);
});


// "coord": {
//     "lon": ,
//     "lat": 
//   },

// ?lat={lat}
// &lon={lon}
// &exclude={part}
// &appid={API key}

/*
https://openweathermap.org/api/one-call-api#data
https://openweathermap.org/api/one-call-api#parameter

*/
