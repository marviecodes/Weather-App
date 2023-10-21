let currCity = "London";
let unit = "metric";

// selectors
const city = document.querySelector(".weather__city");
const dateTime = document.querySelector(".weather__datetime");
const weatherForecast = document.querySelector(".weather__forecast");
const weatherTemperature = document.querySelector(".weather__temperature");
const weatherIcon = document.querySelector(".weather__icon");
const weatherMinMax = document.querySelector(".weather__minmax");
const weatherRealFeel = document.querySelector(".weather__realfeel");
const weatherHumidity = document.querySelector(".weather__humidity");
const weatherWind = document.querySelector(".weather__wind");
const weatherPressure = document.querySelector(".weather__pressure");

//search
document.querySelector(".weather__search").addEventListener("submit", (e) => {
  let search = document.querySelector(".weather__searchform");
  //prevent default reload
  e.preventDefault();
  //change current city
  currCity = search.value;
  //getWeather
  getWeather();
});

const convertTimeStamp = function (timestamp, timezone) {
  const convertTimeZone = timezone / 3600; //convert seconds to hours.
  const date = new Date(timestamp * 1000);

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: `Etc/GMT${convertTimeZone >= 0 ? "-" : "+"}${Math.abs(
      convertTimeZone
    )}`,
    hour12: true,
  };
  return date.toLocaleString("en-US", options);
};

// Convert country code to name
const codeToName = function (country) {
  let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  return regionNames.of(country);
};

const getWeather = async function () {
  const API_KEY = "d159ba0618e47d5763923c04c5c35221";
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${unit}`
  );
  const data = await res.json();
  console.log(data);
  city.textContent = `${data.name}, ${codeToName(data.sys.country)}`;
  dateTime.innerHTML = convertTimeStamp(data.dt, data.timezone);
  weatherForecast.innerHTML = `<p>${data.weather[0].main}</p>`;
  weatherTemperature.innerHTML = `${data.main.temp.toFixed()}&#176`;
  weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" />`;
  weatherMinMax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176</p><p>Max: ${data.main.temp_max.toFixed()}&#176</p>`;
  weatherRealFeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`;
  weatherHumidity.innerHTML = `${data.main.humidity.toFixed()}%`;
  weatherWind.innerHTML = `${data.wind.speed} m/s`;
  weatherPressure.innerHTML = `${data.main.pressure} hPa`;
};

document.body.addEventListener("load", getWeather());
