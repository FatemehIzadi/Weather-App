const axios = require("axios").default;
let apiKey = "be05ea037563d58b0fbb13748c22aed0";
let city = "New York";
let country = "US";
let weatherDescription = "Clear";
let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

function getDateTime(response) {
  let unixTimeStamp = response.data.dt;
  let date = new Date(unixTimeStamp * 1000);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  let formattedTime = `${hours}:${minutes.substr(-2)}`;
  let weekDay = weekdays[date.getDay()];
  let time = document.querySelector("#time");
  time.innerHTML = formattedTime;
  let day = document.querySelector("#day");
  day.innerHTML = weekDay;
}
function weatherData(response) {
  let cityName = document.querySelector("#city-name");
  if (city.toLowerCase !== "new york") country = response.data.sys.country;
  cityName.innerHTML = `${city.toUpperCase()}, ${country.toUpperCase()}`;
  getDateTime(response);
  weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.weather[0].main;
  let cityTemp = document.querySelector("#city-temp");
  cityTemp.innerHTML = Math.round(response.data.main.temp);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `Wind Speed: ${response.data.wind.speed}km/H`;
}

function sayWeather() {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(url).then(weatherData);
}

sayWeather();
function sayCityWeather(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-inp");
  city = searchInput.value;
  sayWeather();
}
let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", sayCityWeather);

function getLocationTemp(response) {
  city = response.data.name;
  sayWeather();
}
function currentWeather(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(getLocationTemp);
}

function sayCurrentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentWeather);
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", sayCurrentWeather);
