// Variables
var cityName = undefined;
var lat = undefined;
var lon = undefined;
var cityURL = undefined;
var attArray = [];
var previousSearchArray = [];


var cityAttList = document.querySelector('#city-attributes-list');
var previousSearchList = document.querySelector('#previous-search-list');
var searchBtn = document.querySelector('#search-btn');
var cityInput = document.querySelector('#city-input');
var searchForm = document.querySelector('#search');

function getApi() {

  
    fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&{apikey}")
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
        console.log(data);
        lat = data[0].lat;
        lon = data[0].lon;
        cityURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid={api-key}";
        console.log(lat);
        console.log(lon);
        console.log(cityURL);
        getApiCity(cityURL);
    })};





function getApiCity(cityURL) {
    
    fetch(cityURL)
        .then(function(response) {
            console.log(response);
            return response.json();
        })
        .then(function(data) {
            console.log(data);

            for(let i = 0; i < 3; i++) {
                console.log("Date: " + data.list[i].dt_txt);
                console.log("Temperature: " + data.list[i].main.temp);
                console.log("Wind: " + data.list[i].wind.speed);
                console.log("Humidity: " + data.list[i].main.humidity);
            }

            





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


searchForm.addEventListener('submit', search);

retrieveLocal();


