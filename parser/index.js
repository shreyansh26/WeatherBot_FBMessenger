'use strict';

const colors = require('colors');
const dictionary = require('./dictionary');
const moment = require('moment');

let getFeel = temp => {
	if(temp<5){
		return "shivering cold";
	} else if(temp<15){
		return "pretty cold";
	}else if(temp<25){
		return "moderately cold";
	}else if(temp<32){
		return "quite warm";
	}else if(temp<40){
		return "very hot";
	}else{
		return "super hot";
	}
}

let getPrefix = (conditionCode, tense = 'present') => {
	let findPrefix = dictionary[tense].find(item => {
		if(item.codes.indexOf(Number(conditionCode)) > -1) {
			return true;
		}
	});

	return findPrefix.prefix || "";
}

let getDate = day => {
	let dayStr = day.toLowerCase().trim();
	switch(dayStr) {
		case 'tomorrow':
			return moment().add(1, 'd').format("DD MMM YYYY");
			break;
		case 'day after tomorrow':
			return moment().add(2, 'd').format("DD MMM YYYY");
			break;
		default:
			return moment().format("DD MMM YYYY");
	}
}

let getAverage = forecast => {
	let low = Number(forecast.low);
	let high = Number(forecast.high);
	let av = Math.floor((low+high)/2);
	return av.toString();
}

let capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

let currentWeather = response => {
	if(response.query.results) {
		let resp = response.query.results.channel;
		let location = `${resp.location.city}, ${resp.location.country}`;
		//Access conditions
		let {text, temp, code} = resp.item.condition; // text = resp.item.condition.text
		//console.log(`${getPrefix(code)}`);
		return `Right now, ${getPrefix(code)} ${text.toLowerCase().red.bold} in ${location.bold}. It is ${getFeel(Number(temp)).red.bold} at ${temp.red.bold} degrees Celsius.`;
	} else {
		return "I don't seem to know about this place... Sorry :(";
	}
}

let forecastWeather = (response, data) => {
	// data is user's query word from xRegExp
	if(response.query.results){
		// convert 'tomorrow', 'today',etc. to date formats
		let parseDate = getDate(data.time);
		let resp = response.query.results.channel;
		let getForecast = resp.item.forecast.filter(item => {
			return item.date === parseDate;
		})[0];
		let location = `${resp.location.city}, ${resp.location.country}`;
		let regEx = new RegExp(data.weather, "i");
		let testConditions = regEx.test(getForecast.text); //true or false
		return `${testConditions ? 'Yes' : 'No'}, ${getPrefix(getForecast.code, 'future')} ${getForecast.text.bold.red} ${data.time} in ${location}`;
	} else {
		return "I don't seem to know about this place... Sorry :(";
	}
}

let forecastWeatherNoCmp = (response, data) => {
	// data is user's query word from xRegExp
	if(response.query.results){
		// convert 'tomorrow', 'today',etc. to date formats
		let parseDate = getDate(data.time);
		let resp = response.query.results.channel;
		let getForecast = resp.item.forecast.filter(item => {
			return item.date === parseDate;
		})[0];
		let location = `${resp.location.city}, ${resp.location.country}`;
		return `${capitalizeFirstLetter(data.time)}, ${getPrefix(getForecast.code, 'future')} ${getForecast.text.bold.red} in ${location}. It will be ${getFeel(Number(getAverage(getForecast))).red.bold} at ${getAverage(getForecast).red.bold} degrees Celsius.`;
	} else {
		return "I don't seem to know about this place... Sorry :(";
	}
}

module.exports = {
	currentWeather,
	forecastWeather,
	forecastWeatherNoCmp
}