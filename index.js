const formsubmit = document.querySelector("form");
const errormessage = document.querySelector(".error");
const city = document.querySelector("#city");

formsubmit.addEventListener("submit", async (event) => {
  event.preventDefault();

  const inputValue = document.querySelector("input").value.trim();
  if (inputValue === "") {
    errormessage.textContent = "Please enter a location";
    return;
  }

  errormessage.textContent = "";

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '916d2df44emsh40dd21cb4cfc667p132195jsn434e8686479d',
      'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
  };

  errormessage.textContent = "Loading...";

  try {
    const response = await fetch(`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${inputValue}`, options);

    if (response.ok) {
        var data = await response.json();
    } else if (response.status === 400) {
        errormessage.textContent = "Please enter a viable location";
        throw new Error("Invalid input value");
    } else {
        errormessage.textContent = "Failed to fetch weather information";
        throw new Error("Failed to fetch weather information");
    }

    console.log(data);

    errormessage.innerHTML = `Weather for <Span id="city">${inputValue}</Span>`;
    document.querySelector("#temp").innerHTML = data.temp + "°C";
    document.querySelector("#min_temp").innerHTML = data.min_temp + "°C";
    document.querySelector("#max_temp").innerHTML = data.max_temp + "°C";
    document.querySelector("#feels_like").innerHTML = data.feels_like + "°C";
    document.querySelector("#humidity").innerHTML = data.humidity + "%";
    document.querySelector("#sunrise").innerHTML = "Sunrise: " + new Date(data.sunrise * 1000).toLocaleTimeString();
    document.querySelector("#sunset").innerHTML = "Sunset: " + new Date(data.sunset * 1000).toLocaleTimeString();
    document.querySelector("#windspeed").innerHTML = data.wind_speed + "m/s";
    document.querySelector("#wind_degrees").innerHTML = data.wind_degrees + "&#176;";
  } catch (err) {
    console.error(err);

    errormessage.innerHTML = `Failed to fetch weather information, <br> Please enter a viable location`;
  }
});