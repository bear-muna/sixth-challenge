// Variables
var cityName = undefined;
var lat = undefined;
var lon = undefined;
var fiveDayURL = undefined;
var currentDayURL = undefined;
var fiveDayArray = [];
var currentDayArray = [];
var previousSearchArray = [];
var apiData5Day = undefined;
var apiDataCurrentDay = undefined;

var apiKey = "c17de62560563037ab3c738e326cb15f";

var cityAttList = document.querySelector('#city-attributes-list');
var previousSearchList = document.querySelector('#previous-search-list');
var searchBtn = document.querySelector('#search-btn');
var cityInput = document.querySelector('#city-input');
var searchForm = document.querySelector('#search');
var cityNameEl = document.querySelector('#city-name');
var fiveDaySec = document.querySelector('#five-day');
var cityDayOfSec = document.querySelector('#city-day-of');
var forecastTitleh3 = document.querySelector('#forecast-title');

function getApi() {

  
    fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&appid=" + apiKey)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
        console.log(data);
        lat = data[0].lat;
        lon = data[0].lon;

        currentDayURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";
        getApiCityCurrentDay(currentDayURL);

        fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";
        getApiCity5Day(fiveDayURL);


    })};


function getApiCityCurrentDay(url) {
    
    fetch(url)
        .then(function(response) {
            console.log(response);
            return response.json();
        })
        .then(function(data) {
            console.log(data);

            apiDataCurrentDay = data;

            currentDayCard();
        })
};


function getApiCity5Day(url) {
    
    fetch(url)
        .then(function(response) {
            console.log(response);
            return response.json();
        })
        .then(function(data) {
            console.log(data);

            apiData5Day = data;

            create5DayCards();
        })
};


function search(event) {
    event.preventDefault();

    if (cityInput.value.trim() !== "") {

        cityName = cityInput.value.trim();
    
        cityInput.value = "";
    
        console.log(cityName);
    
        storeLocal();
    
        retrieveLocal();
    
        getApi();
    }

}

function storeLocal() {

    var previousCityName = cityName;

    if (previousSearchArray.length > 5) {
        previousSearchArray.pop();
    }

    previousSearchArray.unshift(previousCityName);

    localStorage.setItem('previous-search', JSON.stringify(previousSearchArray));


}

function retrieveLocal() {
    var parsedArray = JSON.parse(localStorage.getItem('previous-search'));

    if (parsedArray !== null) {
        previousSearchArray = parsedArray;
    }

    renderArray();
}

function renderArray() {
    previousSearchList.textContent = "";
    
    for(let i = 0; i < previousSearchArray.length; i++) {
        var li = document.createElement('li');

        li.setAttribute('class', 'previous-search-city');

        li.textContent = previousSearchArray[i];
        previousSearchList.append(li);

    }



}

function create5DayCards() {

    fiveDayArray = [];

    console.log(apiData5Day);

    
    for (let i = 0; i < 40; i = i + 8) {
        var cityAttributes = {
            name: undefined,
            date: undefined,
            weather: undefined,
            temperature: undefined,
            wind: undefined,
            humidity: undefined,
        }
        cityAttributes.name = apiData5Day.city.name;
        cityAttributes.date = apiData5Day.list[i].dt_txt;
        cityAttributes.weather = apiData5Day.list[i].weather[0].icon;
        cityAttributes.temperature = apiData5Day.list[i].main.temp;
        cityAttributes.wind = apiData5Day.list[i].wind.speed;
        cityAttributes.humidity = apiData5Day.list[i].main.humidity;

        fiveDayArray.push(cityAttributes);
    }

    console.log(fiveDayArray);

    renderFiveDay();

}

function currentDayCard() {
    currentDayArray = [];

    for (let i = 0; i < 1; i++) {
        var cityAttributes = {
            name: undefined,
            date: dayjs().format("D MMM YYYY"),
            weather: undefined,
            temperature: undefined,
            wind: undefined,
            humidity: undefined,
        }
        cityAttributes.name = apiDataCurrentDay.name;
        cityAttributes.weather = apiDataCurrentDay.weather[0].icon;
        cityAttributes.temperature = apiDataCurrentDay.main.temp;
        cityAttributes.wind = apiDataCurrentDay.wind.speed;
        cityAttributes.humidity = apiDataCurrentDay.main.humidity;

        currentDayArray.push(cityAttributes);
    }
    
    console.log(currentDayArray);

    renderCurrentDay();


}

function renderCurrentDay() {

    cityAttList.innerHTML = "";

    var weatherImg = document.createElement('img');
    var tempLi = document.createElement('li');
    var windLi = document.createElement('li');
    var humidLi = document.createElement('li');

    cityNameEl.textContent = currentDayArray[0].name + " (" + currentDayArray[0].date + ")";
    weatherImg.setAttribute('src', 'https://openweathermap.org/img/w/' + currentDayArray[0].weather + '.png');
    tempLi.textContent = "Temp: " + currentDayArray[0].temperature + ' \u2109';
    windLi.textContent = "Wind Speed: " + currentDayArray[0].wind + ' mph';
    humidLi.textContent = "Humidity: " + currentDayArray[0].humidity + ' %';

    cityDayOfSec.setAttribute('style', 'height: 25%; background: var(--font-sec); border-radius: 10px; padding: 5px;');

    forecastTitleh3.textContent = "5-Day Forecast:";

    cityAttList.append(weatherImg);
    cityAttList.append(tempLi);
    cityAttList.append(windLi);
    cityAttList.append(humidLi);


}

function renderFiveDay() {

    if (fiveDaySec !== null) {

        fiveDaySec.innerHTML = "";
    }

    for(let i = 0; i < fiveDayArray.length; i++) {
        
        var cardSec = document.createElement('section');

        cardSec.setAttribute('class', 'cards');

        var cardUl = document.createElement('ul');

        cardUl.setAttribute('class', 'five-day-list');
        
        var dateLi = document.createElement('h3');
        var weatherImg = document.createElement('img');
        var tempLi = document.createElement('li');
        var windLi = document.createElement('li');
        var humidLi = document.createElement('li');
    
        dateLi.textContent = dayjs(fiveDayArray[i].date).format("D MMM YYYY");
        weatherImg.setAttribute('src', 'https://openweathermap.org/img/w/' + fiveDayArray[i].weather + '.png');
        tempLi.textContent = "Temp: " + fiveDayArray[i].temperature + " \u2109";
        windLi.textContent = "Wind Speed: " + fiveDayArray[i].wind + ' mph';
        humidLi.textContent = "Humidity: " + fiveDayArray[i].humidity + ' %';
    
        cardUl.append(dateLi);
        cardUl.append(weatherImg);
        cardUl.append(tempLi);
        cardUl.append(windLi);
        cardUl.append(humidLi);

        cardSec.appendChild(cardUl);

        fiveDaySec.appendChild(cardSec);
 
    }


    

}

function searchHistoryCity(e) {
    e.preventDefault();
    var ev = e.target;

    if (ev.matches(".previous-search-city")) {
        cityName = ev.textContent;
        console.log(ev.textContent);
        console.log(cityName);
        getApi();
    }
}

searchForm.addEventListener('submit', search);

previousSearchList.addEventListener('click', searchHistoryCity)

retrieveLocal();


