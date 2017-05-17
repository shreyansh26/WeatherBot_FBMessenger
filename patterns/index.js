/*const patternDict = [{
	pattern: '\\b(?<greeting>hi|hey|hello)\\b',
	intent: 'Hello'
}, {
	pattern: '\\b(bye|exit)\\b',
	intent: 'Exit'
}, {
	pattern: '\\b(?<weather>hot|cold|sunny|snow|rain|rainy|thunderstorms|windy|drizzle)\\b\\sin\\s\\b(?<city>[a-zA-Z]+[ a-zA-Z+]?)\\b\\s(?<time>day\\safter\\stomorrow|today|tomorrow)(?:\\?*)$',
	intent: 'WeatherForecast'
}, {
	pattern: '\\b(?<weather>hot|cold|sunny|snow|rain|rainy|thunderstorms|windy|drizzle)\\b\\s\\b(?<time>day\\safter\\stomorrow|today|tomorrow)\\sin\\s\\b(?<city>[a-zA-Z]+[ a-zA-Z+]?)$',
	intent: 'WeatherForecast'
}, {
	pattern: 'in\\s\\b(?<city>.+)',
	intent: 'CurrentWeather'
}];

module.exports = patternDict;
*/
const patternDict = [{
	pattern: '\\b(?<greeting>Hi|Hello|Hey)\\b',
	intent: 'Hello'
}, {
	pattern: '\\b(bye|exit)\\b',
	intent: 'Exit'
}, {
	pattern: 'be\\sin\\s\\b(?<city>[a-z]+[ a-z]+?)\\b(?<time>day\\safter\\stomorrow|tomorrow|today)$',
	intent: 'WeatherForecastNoCmp'
}, {
	pattern: 'like\\sin\\s\\b(?<city>[a-z]+[ a-z]+?)',
	intent: 'CurrentWeather'
}, {
	pattern: '\\b(?<weather>hot|cold|rain|rainy|sunny|snow|thunderstorms|windy|drizzle)\\b\\sin\\s\\b(?<city>[a-z]+[ a-z]+?)\\b(?<time>day\\safter\\stomorrow|tomorrow|today)$',
	intent: 'WeatherForecast'
}, {
	pattern: '\\b(?<weather>hot|cold|rain|rainy|sunny|snow|thunderstorms|windy|drizzle)\\b\\s\\b(?<time>day\\safter\\stomorrow|tomorrow|today)\\sin\\s\\b(?<city>[a-z]+[ a-z]+?)$',
	intent: 'WeatherForecast'
}];

module.exports = patternDict;