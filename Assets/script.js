

var searchBtn = document.querySelector('#searchBtn');
var currentWeatherEl = document.querySelector('.weather');
var apiKey = "97722a6914a725b8c8ab3b9ce2052626";
var currentForecastEl = document.querySelector('.columns');
var sideMenu = document.getElementById('history');

searchBtn.addEventListener('click', getInput);

function getInput() {

    var userInpt = document.querySelector('.search-bar').value;

    getCurrentWeather(userInpt);

    //call function to save in localstorage  and add to list 


};


function getCurrentWeather(searchVal) {

    //make api call to get the  current weather info
    fetch(
        "http://api.openweathermap.org/data/2.5/weather?q=" + searchVal + "&appid=" + apiKey + "&units=imperial"

    )
        .then((response) => response.json())
        .then((data) => {

            console.log(data)
            fetch(
                "http://api.openweathermap.org/data/2.5/onecall?" + "lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=" + apiKey + "&units=imperial"

            )
                .then((response) => response.json())
                .then((data) => {

                    currentWeatherEl.innerHTML = "";
                    currentForecastEl.innerHTML = " <h4>5 Day Forecast:</h4>";

                    var cityName = document.createElement('h3');
                    cityName.textContent = searchVal;
                    currentWeatherEl.appendChild(cityName);
                    console.log(data);

                    var myMoment = moment.unix(data.current.dt);
                    var myDate = myMoment.format("M/D/YYYY");


                    var date = document.createElement('h3');
                    date.textContent = myDate;
                    currentWeatherEl.appendChild(date);



                    var currentTemp = document.createElement('p');
                    currentTemp.textContent = "Current Temperature: " + data.current.temp + " F";
                    currentWeatherEl.appendChild(currentTemp);

                    var currentUV = document.createElement('p');
                    currentUV.textContent = "UV Index: " + data.current.uvi;
                    currentWeatherEl.appendChild(currentUV);


                    if (data.current.uvi < 4) {
                        currentUV.style.backgroundColor = 'green';
                    }
                    else if (data.current.uvi < 8) {
                        currentUV.style.backgroundColor = 'yellow';
                    } else {
                        currentUV.style.backgroundColor = 'red';
                    }

                    var currentwind = document.createElement('p');
                    currentwind.textContent = "Wind: " + data.current.wind_speed + " MPH";
                    currentWeatherEl.appendChild(currentwind);

                    var currenthumidity = document.createElement('p');
                    currenthumidity.textContent = "Humidity: " + data.current.humidity + "%";
                    currentWeatherEl.appendChild(currenthumidity);


                    var dailyList = data.daily
                    for (var i = 0; i < 5; i++) {
                        var dailyweather = dailyList[i];
                        var forecastDay = document.createElement('div');
                        forecastDay.className = 'column';
                        currentForecastEl.appendChild(forecastDay);
                       
                        var myMoment = moment.unix(dailyweather.dt);
                        var myDate = myMoment.format("M/D/YYYY");
                        var date = document.createElement('p');
                        date.textContent = myDate;
                        forecastDay.appendChild(date);

                        var currentTemp = document.createElement('p');
                        currentTemp.textContent = "Current Temperature: " + dailyweather.temp.day + " F";
                        forecastDay.appendChild(currentTemp);

                        var currentwind = document.createElement('p');
                        currentwind.textContent = "Wind: " + dailyweather.wind_speed + " MPH";
                        forecastDay.appendChild(currentwind);

                        var currenthumidity = document.createElement('p');
                        currenthumidity.textContent = "Humidity: " + dailyweather.humidity + "%";
                        forecastDay.appendChild(currenthumidity);

                        var iconStr = dailyweather.weather[0].icon
                        var url = "http://openweathermap.org/img/wn/" + iconStr + "@2x.png"
                        var iconEl = document.createElement('img');
                        iconEl.src = url;
                        forecastDay.appendChild(iconEl);

                    }



                    var history = document.createElement('div');
                    var historyText = document.createElement('p');
                    historyText.textContent = searchVal + '   ' + data.current.temp + " F";
                    sideMenu.prepend(history)
                    history.appendChild(historyText)
                    var iconStr = data.current.weather[0].icon
                    var url = "http://openweathermap.org/img/wn/" + iconStr + "@2x.png"
                    var iconEl = document.createElement('img');
                    iconEl.src = url;
                    history.appendChild(iconEl);




                });
        });

};






/*function getforecastWeather(forecastWth) {
    fetch(
        "http://api.openweathermap.org/data/2.5/forecast?q=" + "lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=" + apiKey + "&units=imperial"
    )

        .then((response) => response.json())
        .then((data) => {

            var cityName = document.createElement('h3');
            cityName.textContent = forecastWth;
            forecastWththWeatherEl.appendChild(cityName);

            var forecastTemp = document.createElement('p');
            forecastWthTemp.textContent = "Current Temperature: " + data.forecast.temp + " F";
            forecastWththWeatherEl.appendChild(forecastTemp);


        });
};*/

