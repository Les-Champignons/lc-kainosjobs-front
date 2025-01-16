import axios, { AxiosResponse } from "axios";
import { Request, Response } from "express";
import { logger } from "../logger";

axios.defaults.baseURL = process.env.API_URL || "http://localhost:8080/";

export const URL: string = "applicants";

export const updateStatus = async (req: Request, res: Response): Promise<void> => {
	const applicationId = req.params.id;
	const status = req.body.status;
	try {
		const response: AxiosResponse = await axios.put(`${URL}/${applicationId}`, { status });
		logger.info(`Successfully updated applicant ${response.data} status to ${status}`);
		return res.redirect(`/job-roles/${req.body.jobRoleId}`);
	} catch (e) {
		throw new Error("Couldn't update applicant status!");
	}
};
