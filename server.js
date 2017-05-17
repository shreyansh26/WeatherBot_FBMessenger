'use strict';

// create an API server

const Restify = require('restify');
const server = Restify.createServer({
	name: 'WeatherMessenger'
});

const PORT = process.env.PORT || 3000;

server.use(Restify.jsonp());
server.use(Restify.bodyParser());

// Tokens
const config = require('./config');

// FBeamer
const FBeamer = require('./fbeamer');
const f = new FBeamer(config);

// WeatherBot files
const matcher = require('./matcher');
const weather = require('./weather');
const {currentWeather, forecastWeather, forecastWeatherNoCmp} = require('./parser');


let capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


// Regiser the webhooks
server.get('/', (req, res, next) => {
	f.registerHook(req, res);
	return next();
});

// Receive all incoming messages
server.post('/', (req, res, next) => {
	f.incoming(req, res, msg => {
		// Process messages
		//f.txt(msg.sender, `Hey, you just said ${msg.message.text}`);
		//f.img(msg.sender, "https://cdn171.picsart.com/232745164039202.jpg");
		if (msg.message.text){
			// If a text message is received
			matcher(msg.message.text, data => {
				switch(data.intent) {
					case 'Hello':
						f.txt(msg.sender, `${capitalizeFirstLetter(data.entities.greeting)} to you too!`);
						break;
					case 'Exit':
						f.txt(msg.sender, "Good bye! Have a great day!");
						break;
					case 'CurrentWeather':
						f.txt(msg.sender, `Checking weather for ${capitalizeFirstLetter(data.entities.city)}...`);
						//get weather api
						weather(data.entities.city, 'current')
							.then(response => {
								let parseResult = currentWeather(response);
								f.txt(msg.sender, parseResult);
							})
							.catch(error => {
								f.txt(msg.sender, "Hmm, something's not right with my servers! Do check back in a while... Sorry :(");
							});
						break;
					case 'WeatherForecast':
						f.txt(msg.sender, `Checking weather for ${capitalizeFirstLetter(data.entities.city)}...`);
						//get weather api
						weather(data.entities.city)
							.then(response => {
								let parseResult = forecastWeather(response, data.entities);
								f.txt(msg.sender, parseResult);
							})
							.catch(error => {
								f.txt(msg.sender, "Hmm, something's not right with my servers! Do check back in a while... Sorry :(");
							});
						break;
					case 'WeatherForecastNoCmp':
						f.txt(msg.sender, `Checking weather for ${capitalizeFirstLetter(data.entities.city)}...`);
						//get weather api
						weather(data.entities.city)
							.then(response => {
								let parseResult = forecastWeatherNoCmp(response, data.entities);
								f.txt(msg.sender, parseResult);
							})
							.catch(error => {
								f.txt(msg.sender, "Hmm, something's not right with my servers! Do check back in a while... Sorry :(");
							});
						break;
					default: {
						f.txt(msg.sender, "I don't know what you mean :(");
					}
				}
			});
		}
	});
	return next();
});

// Subscribe
f.subscribe();

server.listen(PORT, () => console.log(`Weather bot running on port ${PORT}`));