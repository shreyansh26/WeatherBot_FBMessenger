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

// Regiser the webhooks
server.get('/', (req, res, next) => {
	f.registerHook(req, res);
	return next();
});

// Receive all incoming messages
server.post('/', (req, res, next) => {
	f.incoming(req, res, msg => {
		// Process messages
		f.txt(msg.sender, `Hey, you just said ${msg.message.text}`);
		f.img(msg.sender, "https://cdn171.picsart.com/232745164039202.jpg");
	});
	return next();
});

// Subscribe
f.subscribe();

server.listen(PORT, () => console.log(`Weather bot running on port ${PORT}`));