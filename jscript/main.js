const dateElement = document.getElementById("date");
const options = {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};
const today = new Date();
dateElement.innerText = today.toLocaleDateString("en-GB", options);
const query = document.querySelector(".query");
const windSpeed = document.querySelector(".wind-speed");
const weatherTemperature = document.querySelector(".temp");
const weatherHumidity = document.querySelector(".humidity");
const weatherDescription = document.querySelector(".description");
const weatherIcon = document.querySelector(".icon");
const card = document.querySelector(".card");
const weatherContents = document.querySelector(".description-right");

let weather = {
  apiKey: "a77e750f82d09749d0e73579874c673d",
  proxy: "https://cors-anywhere.herokuapp.com/",

  fetchWeather: function (query) {
    const api =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      query +
      "&appid=" +
      this.apiKey +
      "&units=metric";

    function handleErrors(response) {
      if (!response.ok) {
        document.getElementById("notification").textContent =
          "Enter valid location";
        // console.log(response.statusText);
      } else {
        document.getElementById("notification").textContent = "";
      }
      return response;
    }
    fetch(api)
      .then(handleErrors)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.displayWeather(data);
      });
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    switch (icon) {
      case "01d":
        weatherIcon.src = "images/clear-skyD.png";
        weatherContents.style.backgroundImage = "url('images/day.gif')";
        break;
      case "01n":
        weatherIcon.src = "images/clear-skyN.png";
        weatherContents.style.backgroundImage =
          "url('images/stars-night-sky.gif')";
        break;
      case "02n":
        weatherIcon.src = "images/few-cloudsN.png";
        weatherContents.style.backgroundImage = "url('images/few-cloudsN.gif')";
        break;
      case "02d":
        weatherIcon.src = "images/clear-skyD.png";
        weatherContents.style.backgroundImage = "url('images/few-clouds.gif')";
        break;
      case "03d":
        weatherIcon.src = "images/scattered-cloudsN_D.png";
        weatherContents.style.backgroundImage =
          "url('images/scattered-cloudsD.gif')";
        break;
      case "03n":
        weatherIcon.src = "images/scattered-cloudsN_D.png";
        weatherContents.style.backgroundImage =
          "url('images/scattered-cloudsD.gif')";
        break;
      case "04d":
        weatherIcon.src = "images/broken-cloudsN_D.png";
        weatherContents.style.backgroundImage = "url('images/broken.gif')";
        break;
      case "04n":
        weatherIcon.src = "images/broken-cloudsN_D.png";
        weatherContents.style.backgroundImage = "url('images/broken.gif')";
        break;
      case "09d":
        weatherIcon.src = "images/shower-rainN_D.png";
        weatherContents.style.backgroundImage = "url('images/rain.gif')";
        break;
      case "09n":
        weatherIcon.src = "images/shower-rainN_D.png";
        weatherContents.style.backgroundImage = "url('images/rain.gif')";
        break;
      case "10d":
        weatherIcon.src = "images/rainD.png";
        weatherContents.style.backgroundImage = "url('images/rain.gif')";
        break;
      case "10n":
        weatherIcon.src = "images/rainN.png";
        weatherContents.style.backgroundImage = "url('images/rain.gif')";
        break;
      case "11d":
        weatherIcon.src = "images/thunderstormN_D.png";
        weatherContents.style.backgroundImage = "url('images/thunder.gif')";
        break;
      case "11n":
        weatherIcon.src = "images/thunderstormN_D.png";
        weatherContents.style.backgroundImage = "url('images/thunder.gif')";
        break;
      case "13d":
        weatherIcon.src = "images/snowN_D.png";
        weatherContents.style.backgroundImage = "url('images/snow.gif')";
        break;
      case "13n":
        weatherIcon.src = "images/snowN_D.png";
        weatherContents.style.backgroundImage = "url('images/snow.gif')";
        break;
      case "50d":
        weatherIcon.src = "images/mistN_D.png";
        weatherContents.style.backgroundImage = "url('images/mist.gif')";
        break;
      case "50n":
        weatherIcon.src = "images/mistN_D.png";
        weatherContents.style.backgroundImage = "url('images/mist.gif')";
        break;
      default:
        weatherIcon.src = "";
        weatherContents.style.backgroundImage = "";
    }

    // console.log(name, icon, description, temp, humidity, speed);
    query.textContent = `Weather in ${name}:`;
    windSpeed.textContent = `Wind Speed: ${speed} km/hr`;
    weatherTemperature.textContent = Math.round(temp) + "°C";
    weatherHumidity.textContent = `Humidity: ${humidity}%`;
    weatherDescription.textContent =
      description.charAt(0).toUpperCase() + description.slice(1);
    document.querySelector(".weather-contents").classList.remove("loading");
  },
  search: function () {
    this.fetchWeather(document.querySelector(".searchbar").value);
  },
};

let getWeather = () => {
  let long;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const apiKey = "a77e750f82d09749d0e73579874c673d";
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
      // console.log(position);

      function handleErrors(response) {
        if (!response.ok) {
          document.getElementById("notification").textContent =
            "Enter valid location";
          // console.log(response.statusText);
        } else {
          document.getElementById("notification").textContent = "";
        }
        return response;
      }
      fetch(api)
        .then(handleErrors)
        .then((response) => response.json())
        .then((data) => {
          const { name } = data;
          const { icon, description } = data.weather[0];
          const { temp, humidity } = data.main;
          const { speed } = data.wind;

          query.textContent = `Weather in ${name}:`;
          windSpeed.textContent = `Wind Speed: ${speed} km/hr`;
          weatherTemperature.textContent = Math.round(temp) + "°C";
          weatherHumidity.textContent = `Humidity: ${humidity}%`;
          weatherDescription.textContent =
            description.charAt(0).toUpperCase() + description.slice(1);
          // console.log(data);
        });
    });
  } else {
    document.getElementById("notification").textContent =
      "Location blocked by user";
  }
};

function clearFields() {
  document.querySelector(".searchbar").value = "";
}
// function activatePlacesSearch() {
//   var input = document.getElementById("search_term");
//   var autocomplete = new google.maps.places.Autocomplete(input);
// }
document.querySelector(".searchbox button").addEventListener("click", () => {
  if (document.querySelector(".searchbar").value.length === 0) {
    alert("Please enter a valid location");
  } else {
    weather.search();
  }
  clearFields();
});
document.querySelector(".searchbar").addEventListener("keyup", () => {
  document.querySelector(".weather-contents").classList.add("loading");
});

document.querySelector(".searchbar").addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    if (document.querySelector(".searchbar").value.length === 0) {
      alert("Please enter a valid location");
    } else {
      weather.search();
    }

    clearFields();
  }
});

window.addEventListener("load", getWeather);
weather.fetchWeather("Lagos");
