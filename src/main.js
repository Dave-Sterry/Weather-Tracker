
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import {} from './weather.js';

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    $('#location').val("");

    let request = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;

    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };
    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
      $('.showTemp').text(`The temperature is ${parseInt((response.main.temp) - 273.15) * 9/5 + 32} °F.`);
      $('.showFeels').text(`The temperature feels like ${parseInt((response.main.feels_like) - 273.15) * 9/5 + 32} °F`);
      $('.showPrecipitation').text(`There is currently ${response.weather[0].description} outside`)
    }
  });
});