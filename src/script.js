function displayWeatherCondition(response) {
  document.querySelector("#header-city").innerHTML = response.data.name;
  document.querySelector("#header-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} mph`;

  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "5ec00814f3c8665ba79cad93cf79765f";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(url).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search-bar").value;
  searchCity(city);
}
function searchLocation(position) {
  let apiKey = "5ec00814f3c8665ba79cad93cf79765f";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(url).then(displayWeatherCondition);
}

function formatDate(date) {
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];

  return `${currentDay} ${currentHour}:${currentMinutes}`;
}
let currentTime = document.querySelector("#current-time");
let currentDate = new Date();
currentTime.innerHTML = formatDate(currentDate);

searchCity("New York");

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let citySearchBar = document.querySelector("#search-form");
citySearchBar.addEventListener("submit", handleSubmit);

let gpsButton = document.querySelector("#gps-button");
gpsButton.addEventListener("click", getCurrentLocation);
