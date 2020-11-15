let now = new Date();

function currentDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
   if (minutes < 10) {
    minutes= `0${minutes}`;
  }

  let currentDate = document.querySelector("#current-date");
  let currentTime = document.querySelector("#current-time");
  currentDate.innerHTML = `${day}`;
  currentTime.innerHTML = `${hours}:${minutes}`;
}

currentDate();

function enterCity(event) {
  event.preventDefault();
  let city = document.querySelector("#current-city");
  let cityInput = document.querySelector("#cityinput");
  city.innerHTML = cityInput.value;

  citySearch(cityInput.value);
}

function weather(response) {
let city = document.querySelector("#current-city");
let temperature = Math.round(celsiusTemperature);
let p = document.querySelector("#current-weather");
let description = document.querySelector("#weather-description");
let humidity = document.querySelector("#humidity");  
let windSpeed = document.querySelector("#wind-speed");
let weatherIcon = document.querySelector("#icon");

celsiusTemperature = response.data.main.temp;

city.innerHTML = response.data.name;
p.innerHTML = `${temperature}`;
description.innerHTML = response.data.weather[0].description;
humidity.innerHTML = response.data.main.humidity; 
windSpeed.innerHTML = Math.round(response.data.wind.speed);
weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

function citySearch(city) {
  let apiKey = "ced9531a3c9d8cf110723243ec946574";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(weather);
}



function currentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "ced9531a3c9d8cf110723243ec946574";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrl}`).then(weather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", getCurrentPosition);

function displayFahrenheitTemp(event) {
event.preventDefault();
let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
let p = document.querySelector("#current-weather");
p.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemp(event) {
event.preventDefault(); 
let p = document.querySelector("#current-weather");
p.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector(".form-inline");
form.addEventListener("submit", enterCity);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

citySearch("Orlando");