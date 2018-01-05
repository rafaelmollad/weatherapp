// Store longitude and latitude
var lat;
var long;

// Create XMLHtppRequest object
var xhttp = new XMLHttpRequest();
console.log(xhttp.readyState);

/** Every time the status of the XMLHttpRequest object changes
 *  This anonymous function will be called back
 */
xhttp.onreadystatechange = function() {
	console.log(xhttp.readyState);
	// If request is done(4) and the response is OK(200), execute the following code
	if (this.readyState == 4 && this.status == 200) {
		var data = JSON.parse(xhttp.responseText);
		console.log(data);

		// Set location text
		document.getElementById('location').textContent = data.name + ", " + data.sys.country;
		// Set temperature level text
		document.getElementById('temperature-level').textContent = data.main.temp;
		// Set the temperature description
		document.getElementById('temperature-description').textContent = data.weather[0].description;

		setBackgroundImage(data.weather[0].main);
	}
}

// Try to get user's location
navigator.geolocation.getCurrentPosition(success, error);

// Called if location could be retrieved
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

// Called if location couldn't be retrieved
function error(err) {
	alert("You need to allow to know your temperature");
}

/* Change the background
 * image according to the weather condition
 */
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

var celsiusDegreesSelected = true; // Celsius button is selected by default
var fahrenheitDegreesSelected = false;

/**
* Listen when user clicks on the Celsius button
* When this happens, we remove the styles from the Fahrenheit button
* And we add those styles to the celsius button
*/
document.getElementById("celsius-degrees").onclick =  function() {
	// Fahrenheit is no longer selected
	fahrenheitDegreesSelected = false;

	// Do this only when Fahrenheit button is currently selected
	if (celsiusDegreesSelected == false)
	{
		document.getElementById("fahrenheit-degrees").classList.remove("fahrenheit-degrees-on-click");
		// Remove degree symbol before Fahrenheit paragraph
		document.querySelector(".fahrenheit-degrees p").classList.remove("degrees-symbol");
		// Make fahrenheit paragraph black(meaning not selected)
		document.querySelector(".fahrenheit-paragraph").style.color = "#000000"; 

		this.className += " celsius-degrees-on-click";
		// Add degree symbol before Celsius paragraph
		document.querySelector(".celsius-degrees p").classList.add("degrees-symbol");
		// Make celsius paragraph white(meaning selected)
		document.querySelector(".celsius-paragraph").style.color = "#FFFFFF"; 
	}
}

/**
* Listen when user clicks on the Fahrenheit button
* When this happens, we remove the styles from the Celsius button
* And we add those styles to the Fahrenheit button
*/
document.getElementById("fahrenheit-degrees").onclick =  function() {
	// Celsius is no longer selected
	celsiusDegreesSelected = false;
	
	// Do this only when Celsius button is currently selected
	if (fahrenheitDegreesSelected == false) {
			// Remove degree symbol before Celsius paragraph
			document.getElementById("celsius-degrees").classList.remove("celsius-degrees-on-click");
			// Add class to style Celsius button
			document.querySelector(".celsius-degrees p").classList.remove("degrees-symbol");
			// Make Celsius paragraph black(meaning not selected)
			document.querySelector(".celsius-paragraph").style.color = "#000000"; 

			// Add class to style Fahrenheit button
			this.className += " fahrenheit-degrees-on-click";
			//  Add degree symbol before Fahrenheit paragraph
			document.querySelector(".fahrenheit-degrees p").classList.add("degrees-symbol");
			// Make Fahrenheit paragraph white(meaning selected)
			document.querySelector(".fahrenheit-paragraph").style.color = "#FFFFFF"; 
	}

	// Fahreneheit button is now selected
	fahrenheitDegreesSelected = true;
}

