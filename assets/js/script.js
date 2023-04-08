var cityName = "London";


var url = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&appid=c17de62560563037ab3c738e326cb15f";

function getApi(requestUrl) {
  fetch(requestUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
  })
  .then(function (data) {
    console.log(data);

    var msg = "Your lattitude is: " + data[0].lat + 
                "\nYour longitude is: " + data[0].lon;

    console.log(msg);
})};

getApi(url);