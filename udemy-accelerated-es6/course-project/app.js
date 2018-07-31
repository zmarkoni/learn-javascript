import * as ELEMENTS from 'elements.js';
import {Http} from 'http.js';
import {WEATHER_PROXY_HANDLER, WeatherData} from "weather-data.js";

const APP_ID = '9be67c0730dac6be80d27175db79343e';

ELEMENTS.ELEMENT_SEARCH_BUTTON.addEventListener('click', searchWeather);

function searchWeather() {
    const CITY_NAME = ELEMENTS.ELEMENT_SEARCHED_CITY.value.trim();
    if (CITY_NAME.length == 0) {
        alert('Please enter city name');
    }

    ELEMENTS.ELEMENT_LOADING_TEXT.style.display = 'block';
    ELEMENTS.ELEMENT_WEATHER_BOX.style.display = 'none';

    const URL = 'http://api.openweathermap.org/data/2.5/weather?q=' + CITY_NAME + '&units=metric&appid=' + APP_ID;
    // Http.fetchData(URL)
    //     .then(responseData => {
    //         const WEATHER_DATA = new WeatherData(CITY_NAME, responseData.weather[0].description.toUpperCase());
    //         const WEATHER_POXY = new Proxy(WEATHER_DATA, WEATHER_PROXY_HANDLER);
    //         WEATHER_POXY.temperature = responseData.main.temp;
    //
    //         updateWeather(WEATHER_POXY);
    //     })
    //     .catch(error => alert(error));

    // ===== Or we can use FETCH
    fetch(URL)
        .then(Http.status)
        .then(Http.json)
        .then(responseData => {
            const WEATHER_DATA = new WeatherData(CITY_NAME, responseData.weather[0].description.toUpperCase());
            //const WEATHER_POXY = new Proxy(WEATHER_DATA, WEATHER_PROXY_HANDLER);
            // WEATHER_POXY.temperature = responseData.main.temp;
            WEATHER_DATA.temperature = responseData.main.temp;

            updateWeather(WEATHER_DATA);
        })
        .catch(error => alert(error));
}

function updateWeather(weatherData) {
    ELEMENTS.ELEMENT_WEATHER_CITY.textContent = weatherData.cityName;
    ELEMENTS.ELEMENT_WEATHER_DESCRIPTION.textContent = weatherData.description;
    ELEMENTS.ELEMENT_WEATHER_TEMPERATURE.textContent = weatherData.temperature.toFixed(2) + ' C';

    ELEMENTS.ELEMENT_LOADING_TEXT.style.display = 'none';
    ELEMENTS.ELEMENT_WEATHER_BOX.style.display = 'block';
}