let now = new Date();

function currentDateWeather() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesay",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
   if (minutes < 10) {
    minutes= `0${minutes}`;
  }

  let currentDate = document.querySelector("#current-date");
  currentDate.innerHTML = `${day}`;

  let currentTime = document.querySelector("#current-time");
  currentTime.innerHTML = `${hours}:${minutes}`;
}

currentDateWeather();

function enterCity(event) {
  event.preventDefault();
  let city = document.querySelector("#current-city");
  let cityInput = document.querySelector("#inputtext2");
  city.innerHTML = cityInput.value;

  citySearch(cityInput.value);
}

let form = document.querySelector(".form-inline");
form.addEventListener("submit", enterCity);

function weather(response) {
  let city = document.querySelector("#current-city");
  city.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let p = document.querySelector("#current-weather");
  p.innerHTML = `${temperature}°C`;
}

function citySearch(city) {
  let apiKey = "ced9531a3c9d8cf110723243ec946574";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(weather);
}

citySearch("Orlando");

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
