const apiKey = "07a9fff622aabb8c5ea86eeea4b177a8";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const weatherIcon = document.querySelector(".weather-icon");
const body = document.body;

function setDefaultBackground() {
  const hour = new Date().getHours();

  if (hour >= 6 && hour < 18) {
    body.style.backgroundImage = "url('images/background/defaultbg.png')";
  } else {
    body.style.backgroundImage = "url('images/background/nightbg.jpg')";
  }
}

setDefaultBackground();

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "Km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
      body.style.backgroundImage = "url('images/background/cloudybg.jpg')";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
      body.style.backgroundImage = "url('images/background/sunnybg.jpg')";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
      body.style.backgroundImage = "url('images/background/rainybg.jpg')";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
      body.style.backgroundImage = "url('images/background/rainybg.jpg')";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
      body.style.backgroundImage = "url('images/background/snowbg.jpg')";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
