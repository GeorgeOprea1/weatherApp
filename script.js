const clearBtn = document.querySelector(".reset-button");
const searchBtn = document.querySelector(".search-button");
const displayWeather = document.querySelector(".display-div");
const displayHumidity = document.querySelector(".humidity");
const displayWind = document.querySelector(".wind");
const displayCity = document.querySelector(".city-name");
const displayTemp = document.querySelector(".temperature");
const container = document.querySelector(".container");
const displayInfo = document.querySelector(".display-div2");
const displayDateTime = document.querySelector(".date-time");
const locationBtn = document.querySelector(".location-button");
const displayWeatherDescription = document.querySelector(
  ".weather-description"
);

clearBtn.addEventListener("click", clearSearch);
searchBtn.addEventListener("click", getInputVal);
locationBtn.addEventListener("click", getLocation);

async function fetchWeather(x) {
  try {
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        x +
        "&appid=3a6c02ef0bd9096b4844377e321485d2&units=metric",

      { mode: "cors" }
    );

    const currentData = await response.json();
    console.log(currentData);
    displayTemp.textContent = Math.round(currentData.main.temp) + " " + "°C";
    displayHumidity.textContent = "Humidity:" + " " + currentData.main.humidity;
    displayWeatherDescription.textContent =
      currentData.weather[0].description.charAt(0).toUpperCase() +
      currentData.weather[0].description.slice(1);
    displayDateTime.textContent =
      new Date().toLocaleDateString("en-US", { day: "2-digit" }) +
      " " +
      new Date().toLocaleDateString("en-US", { month: "short" }) +
      ", " +
      new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });

    displayWind.textContent =
      "Wind:" + " " + currentData.wind.speed + " " + "mph";
    displayCity.textContent = currentData.name;
  } catch (err) {
    console.log(
      "Something went wrong with fetching the current weather data...",
      err
    );
  }
}

function clearSearch() {
  document.getElementById("search-city").value = "";
  displayTemp.textContent = "";
  displayHumidity.textContent = "";
  displayWind.textContent = "";
  displayCity.textContent = "";
  displayDateTime.textContent = "";
  displayWeatherDescription.textContent = "";
}

function getInputVal() {
  const searchCity = document.getElementById("search-city").value;
  fetchWeather(searchCity);
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const long = position.coords.longitude;
      const lat = position.coords.latitude;
      const url = `https://api-bdc.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}`;

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          fetchWeather(data.city);
        });
    });
  }
}

document.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchBtn.click();
  }
});

fetchWeather("Bucharest");
