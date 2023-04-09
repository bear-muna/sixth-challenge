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

var apiKey;

var cityAttList = document.querySelector('#city-attributes-list');
var previousSearchList = document.querySelector('#previous-search-list');
var searchBtn = document.querySelector('#search-btn');
var cityInput = document.querySelector('#city-input');
var searchForm = document.querySelector('#search');
var cityNameEl = document.querySelector('#city-name');
var fiveDaySec = document.querySelector('#five-day');

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

function printData() {

}

function search(event) {
    event.preventDefault();

    cityName = cityInput.value.trim();

    cityInput.value = "";

    console.log(cityName);

    storeLocal();

    retrieveLocal();

    getApi();
}

function storeLocal() {

    var previousCityName = cityName;

    previousSearchArray.push(previousCityName);

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
        cityAttributes.weather = apiData5Day.list[i].weather[0].main;
        cityAttributes.temperature = apiData5Day.list[i].main.temp;
        cityAttributes.wind = apiData5Day.list[i].wind.speed;
        cityAttributes.humidity = apiData5Day.list[i].main.humidity;

        fiveDayArray.push(cityAttributes);
    }

    console.log(fiveDayArray);

    render5Day();

}

function currentDayCard() {
    currentDayArray = [];

    for (let i = 0; i < 1; i++) {
        var cityAttributes = {
            name: undefined,
            weather: undefined,
            temperature: undefined,
            wind: undefined,
            humidity: undefined,
        }
        cityAttributes.name = apiDataCurrentDay.name;
        cityAttributes.weather = apiDataCurrentDay.weather[0].main;
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

    var weatherLi = document.createElement('li');
    var tempLi = document.createElement('li');
    var windLi = document.createElement('li');
    var humidLi = document.createElement('li');

    cityNameEl.textContent = currentDayArray[0].name;
    weatherLi.textContent = currentDayArray[0].weather;
    tempLi.textContent = currentDayArray[0].temperature;
    windLi.textContent = currentDayArray[0].wind;
    humidLi.textContent = currentDayArray[0].humidity;

    cityAttList.append(weatherLi);
    cityAttList.append(tempLi);
    cityAttList.append(windLi);
    cityAttList.append(humidLi);


}

function render5Day() {

    if (fiveDaySec !== null) {
        fiveDaySec.innerHTML = "";
    } else {
        for(let i = 0; i < fiveDayArray.length; i++) {
            var cardSec = document.createElement('section');
    
            cardSec.setAttribute('class', 'card');

            var cardUl = document.createElement('ul');
            
            var nameLi = document.createElement('li');
            var weatherLi = document.createElement('li');
            var tempLi = document.createElement('li');
            var windLi = document.createElement('li');
            var humidLi = document.createElement('li');
        
            nameLi.textContent = fiveDayArray[i].name;
            weatherLi.textContent = fiveDayArray[i].weather;
            tempLi.textContent = fiveDayArray[i].temperature;
            windLi.textContent = fiveDayArray[i].wind;
            humidLi.textContent = fiveDayArray[i].humidity;
        
            cardUl.append(nameLi);
            cardUl.append(weatherLi);
            cardUl.append(tempLi);
            cardUl.append(windLi);
            cardUl.append(humidLi);

            cardSec.append(cardUl);
    
            fiveDaySec.append(cardSec);
    
        }

    }
    

}

searchForm.addEventListener('submit', search);

retrieveLocal();


