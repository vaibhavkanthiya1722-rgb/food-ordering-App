let apiKey = "d8c214d83ec51c434559dda4c5308a80";
let chart;

function hidePlaceholder() {
    document.getElementById("placeholder").style.display = "none";
}


async function getWeather() {

    let city = document.getElementById("city").value;
    if (!city) return alert("Enter city");

    let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    let data = await res.json();

    if (data.cod != 200) return alert(data.message);

    updateUI(data);
    getForecast(city);
}

function getLocationWeather() {

    navigator.geolocation.getCurrentPosition(async (pos) => {

        let lat = pos.coords.latitude;
        let lon = pos.coords.longitude;

        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        let data = await res.json();

        updateUI(data);
        getForecast(data.name);

    });
}


function updateUI(data) {

    hidePlaceholder();

    document.getElementById("temp").innerText = data.main.temp + "°C";
    document.getElementById("desc").innerText = data.weather[0].description;

    document.getElementById("icon").src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    setWeatherImage(data.weather[0].main);
    setCardTheme(data.weather[0].main);
    setWeatherAnimation(data.weather[0].main);
}


async function getForecast(city) {

    let res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
    let data = await res.json();

    let forecastDiv = document.getElementById("forecast");
    forecastDiv.innerHTML = "";

    let labels = [], temps = [];

    for (let i = 0; i < data.list.length; i += 8) {

        let item = data.list[i];
        let date = new Date(item.dt_txt).toLocaleDateString();

        labels.push(date);
        temps.push(item.main.temp);

        forecastDiv.innerHTML += `
      <div class="day">
        <p>${date}</p>
        <p>${item.main.temp}°C</p>
      </div>`;
    }

    createChart(labels, temps);
}


function createChart(labels, temps) {

    let ctx = document.getElementById("weatherChart").getContext("2d");

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels,
            datasets: [{
                label: "Temp °C",
                data: temps,
                borderWidth: 2,
                fill: true
            }]
        }
    });
}

function setWeatherImage(weather) {
    let img = document.getElementById("weatherImg");

    if (weather === "Clear")
        img.src = "https://cdn-icons-png.flaticon.com/512/869/869869.png";
    else if (weather === "Clouds")
        img.src = "https://cdn-icons-png.flaticon.com/512/414/414825.png";
    else if (weather === "Rain")
        img.src = "https://cdn-icons-png.flaticon.com/512/1163/1163624.png";
}


function setCardTheme(weather) {
    let card = document.querySelector(".card");

    if (weather === "Clear")
        card.style.background = "linear-gradient(135deg,#fceabb,#f8b500)";
    else if (weather === "Clouds")
        card.style.background = "linear-gradient(135deg,#dfe6e9,#b2bec3)";
    else if (weather === "Rain")
        card.style.background = "linear-gradient(135deg,#4facfe,#00f2fe)";
}


function setWeatherAnimation(weather) {
    let rain = document.querySelector(".rain");
    let clouds = document.querySelectorAll(".cloud");

    rain.style.opacity = "0";
    clouds.forEach(c => c.style.display = "none");

    if (weather === "Clouds")
        clouds.forEach(c => c.style.display = "block");

    if (weather === "Rain") {
        rain.style.opacity = "1";
        clouds.forEach(c => c.style.display = "block");
    }
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
}