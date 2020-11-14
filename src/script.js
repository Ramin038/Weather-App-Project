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
  currentDate.innerHTML = `${day}`;

  let currentTime = document.querySelector("#current-time");
  currentTime.innerHTML = `${hours}:${minutes}`;
}

currentDate();

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
  p.innerHTML = `${temperature}`;
  let description = document.querySelector("#weather-description");
  description.innerHTML = response.data.weather.description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity; 
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(response.data.main.speed)

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

