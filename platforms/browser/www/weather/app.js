
function weather() {

  var location = document.getElementById("location");
  var apiKey = '3953081799bdc6a20fba88f4ca218205'; 
  var url = 'https://api.forecast.io/forecast/';

  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    location.innerHTML = 'Latitude is ' + latitude + '° <br> Longitude is ' + longitude + '°';

    $.getJSON(url + apiKey + "/" + latitude + "," + longitude + "?callback=?", function (data) {
      $('#temp').html(data.currently.temperature + '° F');
      var uid = firebase.database().ref().child('weather').push().key;
      console.log(uid);
      var data = {
        id: uid,
        temperature: data.currently.temperature + '° F'
      }
      
      var updates = {};
      updates['/weather/' + uid] = data;
      firebase.database().ref().update(updates);

    });
  }

  function error() {
    location.innerHTML = "Unable to retrieve your location";
  }

  location.innerHTML = "Locating...";
}

weather();