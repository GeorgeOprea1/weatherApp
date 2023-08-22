const clearBtn = document.querySelector(".reset-button");
const searchBtn = document.querySelector(".search-button");
const displayWeather = document.querySelector(".display-div");
const displayHumidity = document.querySelector(".humidity");
const displayWind = document.querySelector(".wind");

clearBtn.addEventListener("click", clearSearch);
searchBtn.addEventListener("click", fetchWeather);

async function fetchWeather() {
  try {
    const searchCity = document.getElementById("search-city").value;

    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        searchCity +
        "&appid=3a6c02ef0bd9096b4844377e321485d2&units=metric",

      { mode: "cors" }
    );

    const currentData = await response.json();
    console.log(currentData);
    displayWeather.textContent = currentData.main.temp + " " + "°C";
    displayHumidity.textContent = "Humidity:" + " " + currentData.main.humidity;
    displayWind.textContent =
      "Wind:" + " " + currentData.wind.speed + " " + "mph";
  } catch (err) {
    console.log(
      "Something went wrong with fetching the current weather data...",
      err
    );
  }
}

function clearSearch() {
  document.getElementById("search-city").value = "";
  displayWeather.textContent = "";
  displayHumidity.textContent = "";
  displayWind.textContent = "";
}
