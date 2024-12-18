import { Request, Response, NextFunction } from "express";
import { logger } from "../logger";

const jobRoleMiddleware = (req: Request, res: Response, next: NextFunction) => {
	logger.info(`Request received for ${req.method} ${req.url}`);

	const originalSend = res.send;

	res.send = function (body?: any): Response {
		logger.info(`Response status code: ${res.statusCode} for ${req.method} ${req.url}`);
		return originalSend.apply(this, arguments);
	};

	next();
};

export default jobRoleMiddleware;
