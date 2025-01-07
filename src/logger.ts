const winston = require("winston");
const { combine, timestamp, json } = winston.format;

export const logger = winston.createLogger({
	level: "info",
	format: combine(timestamp(), json()),
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({
			filename: "app.log",
		}),
	],
});
