// Variables
var cityName = "London";
var lat = undefined;
var lon = undefined;
var cityURL = undefined;
var url = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&appid=c17de62560563037ab3c738e326cb15f";

function getApi(requestUrl) {
  fetch(requestUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
        console.log(data);
        lat = data[0].lat;
        lon = data[0].lon;
        cityURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=c17de62560563037ab3c738e326cb15f";
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
        })
};


getApi(url);
