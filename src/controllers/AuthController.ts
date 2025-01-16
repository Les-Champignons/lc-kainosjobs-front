import express from "express";
import { getToken } from "../services/AuthService";
import { JwtToken } from "../models/JwtToken";
import { jwtDecode } from "jwt-decode";
import { logger } from "../logger";

export const getLoginForm = async (req: express.Request, res: express.Response): Promise<void> => {
	res.render("auth/login.njk");
};

export const postLoginForm = async (req: express.Request, res: express.Response): Promise<void> => {
	try {
		req.session.token = await getToken(req.body);

		const decodedToken: JwtToken = jwtDecode(req.session.token);

		logger.info(`User ${decodedToken.User.email} logged in`);
		return res.redirect("/job-roles");
	} catch (e) {
		res.locals.errormessage = `Login error: ${e.message}`;
		logger.error(`${res.locals.errormessage}`);
		res.render("auth/login.njk", req.body);
	}
};

export const getLogoutForm = async (req: express.Request, res: express.Response): Promise<void> => {
	req.session.destroy(() => {
		return res.redirect("/");
	});
};
