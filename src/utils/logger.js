const winston = require('winston');
const fs = require('fs');

const filename = process.env.LOG_FILE;

if (fs.existsSync(filename || '')) {
	fs.writeFileSync(filename || '', ''); // clear log file
}

const transports = [
	new winston.transports.File({ filename: filename })
];

const logger = winston.createLogger({
	level: 'info',
	format: winston.format.simple(),
	transports: transports
});

module.exports = logger;