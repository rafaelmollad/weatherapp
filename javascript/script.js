// Store longitude and latitude
var lat;
var long;

// Create XMLHtppRequest object
var xhttp = new XMLHttpRequest();
console.log(xhttp.readyState);

// Every time the status of the XMLHttpRequest object changes
// This anonymous function will be called back
xhttp.onreadystatechange = function() {
	console.log(xhttp.readyState);
	// If request is done(4) and the response is OK(200), execute the following code
	if (this.readyState == 4 && this.status == 200) {
		var data = JSON.parse(xhttp.responseText);
		console.log(data);

		// Set location text
		document.getElementById('location').textContent = data.name;
		// Set temperature level text
		document.getElementById('temperature-level').textContent = data.main.temp;
		// Set the temperature description
		document.getElementById('temperature-description').textContent = data.weather[0].description;

		setBackgroundImage(data.weather[0].main);
	}
}

// Try to get user's location
navigator.geolocation.getCurrentPosition(success, error);

// Location could be retrieved
function success(position) {
	// Get user's coordinates
	lat = position.coords.latitude;
	lon = position.coords.longitude;

	// If user allowed to know its location, show the data
	document.querySelector('.celsius-degrees').style.visibility = "visible";
	document.querySelector('.fahrenheit-degrees').style.visibility = "visible";

	// User allowed to give its location, so we open and send the request
	xhttp.open("GET", "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lon, true);
	xhttp.send()
}

// Location couldn't be retrieved
function error(err) {
	alert("You need to allow to know your temperature");
}

function setBackgroundImage(weatherCondition) {
	switch(weatherCondition) {
		case "Clear":
			document.documentElement.style.backgroundImage = 'url(images/clear-sky.jpg)';
			break;
		case "Drizzle":
			document.documentElement.style.backgroundImage = 'url(images/drizzle.jpg)';
			break;
		case "Rain":
			document.documentElement.style.backgroundImage = 'url(images/rain.jpg)';
			break;
		case "Clouds":
			document.documentElement.style.backgroundImage = 'url(images/clouds.jpg)';
			break;
		case "Snow":
			document.documentElement.style.backgroundImage = 'url(images/snow.jpg)';
			break;
		case "Thunderstorm":
			document.documentElement.style.backgroundImage = 'url(images/thunderstorm.jpg)';
			break;
		case "Mist":
			document.documentElement.style.backgroundImage = 'url(images/mist.jpg)';
			break;
		default:
			console.log("There isn't an image for this weather condition");
	}
}