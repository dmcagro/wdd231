// ========================================
// IBADAN CHAMBER OF COMMERCE HOMEPAGE
// ========================================

// OPENWEATHER API SETTINGS
const apiKey = "aa00f2db366535fbb220baeefec1d007";
const latitude = 7.3775;
const longitude = 3.9470;
const units = "metric";


// ========================================
// CURRENT WEATHER
// ========================================

async function getCurrentWeather() {
    const weatherContainer = document.querySelector("#current-weather");

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to retrieve current weather.");
        }

        const data = await response.json();

        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;

        weatherContainer.innerHTML = `
            <div class="current-weather-card">
                <h3>${data.name}, Nigeria</h3>
                <img src="https://openweathermap.org/img/wn/${icon}@2x.png"
                     alt="${description}">
                <p class="temperature">${temperature}°C</p>
                <p>${description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
            </div>
        `;

    } catch (error) {
        weatherContainer.textContent =
            "Weather information is currently unavailable.";
        console.error("Current weather error:", error);
    }
}


// ========================================
// THREE-DAY WEATHER FORECAST
// ========================================

async function getWeatherForecast() {
    const forecastContainer = document.querySelector("#weather-forecast");

    try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to retrieve weather forecast.");
        }

        const data = await response.json();

        const dailyForecast = {};

        data.list.forEach(item => {
            const date = new Date(item.dt * 1000)
                .toLocaleDateString("en-CA", {
                    timeZone: "Africa/Lagos"
                });

            if (!dailyForecast[date]) {
                dailyForecast[date] = {
                    temperatures: [],
                    descriptions: [],
                    icons: []
                };
            }

            dailyForecast[date].temperatures.push(item.main.temp);
            dailyForecast[date].descriptions.push(item.weather[0].description);
            dailyForecast[date].icons.push(item.weather[0].icon);
        });

        const today = new Date().toLocaleDateString("en-CA", {
            timeZone: "Africa/Lagos"
        });

        const forecastDates = Object.keys(dailyForecast)
            .filter(date => date > today)
            .sort()
            .slice(0, 3);

        forecastContainer.innerHTML = "<h3>Three-Day Forecast</h3>";

        forecastDates.forEach(date => {
            const forecast = dailyForecast[date];

            const averageTemperature =
                forecast.temperatures.reduce((total, temp) => total + temp, 0)
                / forecast.temperatures.length;

            const displayDate = new Date(`${date}T12:00:00`);

            const dayName = displayDate.toLocaleDateString("en-US", {
                weekday: "long"
            });

            const temperature = Math.round(averageTemperature);
            const description = forecast.descriptions[0];
            const icon = forecast.icons[0];

            const card = document.createElement("div");
            card.classList.add("forecast-card");

            card.innerHTML = `
                <h4>${dayName}</h4>
                <img src="https://openweathermap.org/img/wn/${icon}.png"
                     alt="${description}">
                <p>${temperature}°C</p>
                <p>${description}</p>
            `;

            forecastContainer.appendChild(card);
        });

    } catch (error) {
        forecastContainer.textContent =
            "Weather forecast is currently unavailable.";
        console.error("Forecast error:", error);
    }
}


// ========================================
// BUSINESS SPOTLIGHTS
// ========================================

async function getBusinessSpotlights() {
    const spotlightContainer =
        document.querySelector("#spotlight-container");

    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load business members.");
        }

        const members = await response.json();

        // Select gold and silver members only
        const qualifiedMembers = members.filter(member =>
            Number(member.membershipLevel) === 2 ||
            Number(member.membershipLevel) === 3
        );

        // Randomise the qualified members
        qualifiedMembers.sort(() => Math.random() - 0.5);

        // Display a maximum of three businesses
        const selectedMembers = qualifiedMembers.slice(0, 3);

        spotlightContainer.innerHTML = "";

        selectedMembers.forEach(member => {

            const card = document.createElement("article");
            card.classList.add("spotlight-card");

            const name = document.createElement("h3");
            name.textContent = member.name;

            const logo = document.createElement("img");
            logo.src = member.image;
            logo.alt = `${member.name} logo`;
            logo.loading = "lazy";

            const phone = document.createElement("p");
            phone.textContent = `Phone: ${member.phone}`;

            const address = document.createElement("p");
            address.textContent = `Address: ${member.address}`;

            const membership = document.createElement("p");
            membership.textContent =
                `Membership: ${Number(member.membershipLevel) === 3 ? "Gold" : "Silver"}`;

            const website = document.createElement("a");

            const websiteURL = member.website.startsWith("http")
                ? member.website
                : `https://${member.website}`;

            website.href = websiteURL;
            website.textContent = "Visit Website";
            website.target = "_blank";
            website.rel = "noopener noreferrer";

            card.append(
                name,
                logo,
                phone,
                address,
                membership,
                website
            );

            spotlightContainer.appendChild(card);
        });

        if (selectedMembers.length === 0) {
            spotlightContainer.textContent =
                "No gold or silver member businesses are available.";
        }

    } catch (error) {
        spotlightContainer.textContent =
            "Business spotlights are currently unavailable.";
        console.error("Business spotlight error:", error);
    }
}


// ========================================
// RUN ALL HOMEPAGE FUNCTIONS
// ========================================

getCurrentWeather();
getWeatherForecast();
getBusinessSpotlights();