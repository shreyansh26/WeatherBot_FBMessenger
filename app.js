'use strict';

const Readline = require('readline');
const rl = Readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});

const matcher = require('./matcher');
const weather = require('./weather');
const {currentWeather, forecastWeather, forecastWeatherNoCmp} = require('./parser');

let capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


rl.setPrompt('> ');
rl.prompt();
rl.on('line', reply => {
	matcher(reply, data => {
		switch(data.intent){
			case 'Hello':
				console.log(`${capitalizeFirstLetter(data.entities.greeting)} to you too!`);
				rl.prompt();
				break;
			case 'Exit':
				console.log("Good bye! Have a great day!");
				process.exit(0);
			case 'CurrentWeather':
				console.log(`Checking weather for ${capitalizeFirstLetter(data.entities.city)}...`);
				//get weather api
				weather(data.entities.city, 'current')
					.then(response => {
						let parseResult = currentWeather(response);
						console.log(parseResult);
						rl.prompt();
					})
					.catch(error => {
						console.log("There seems to be a problem connecting to the Weather service!");
						rl.prompt();
					});
				break;
			case 'WeatherForecast':
				console.log(`Checking weather for ${capitalizeFirstLetter(data.entities.city)}...`);
				//get weather api
				weather(data.entities.city)
					.then(response => {
						let parseResult = forecastWeather(response, data.entities);
						console.log(parseResult);
						rl.prompt();
					})
					.catch(error => {
						console.log("There seems to be a problem connecting to the Weather service!");
						rl.prompt();
					});
				break;
			case 'WeatherForecastNoCmp':
				console.log(`Checking weather for ${capitalizeFirstLetter(data.entities.city)}...`);
				//get weather api
				weather(data.entities.city)
					.then(response => {
						let parseResult = forecastWeatherNoCmp(response, data.entities);
						console.log(parseResult);
						rl.prompt();
					})
					.catch(error => {
						console.log("There seems to be a problem connecting to the Weather service!");
						rl.prompt();
					});
				break;
			default: {
				console.log("I don't know what you mean :(");
				rl.prompt();
			}

		}
	});
});