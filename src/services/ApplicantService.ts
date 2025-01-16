import axios, { AxiosResponse } from "axios";
import { ApplicantResponse } from "../models/ApplicantResponse";

axios.defaults.baseURL = process.env.API_URL || "http://localhost:8080/";

export const URL: string = "applicants";

export const getAllApplicants = async (): Promise<ApplicantResponse[]> => {
	try {
		const response: AxiosResponse = await axios.get(URL);
		return response.data;
	} catch (e) {
		throw new Error("Failed to get applicants");
	}
};

export const createApplication = async (email: String, jobRole: String, etag: String): Promise<number> => {
	try {
		const response: AxiosResponse = await axios.post(`${URL}/create`, { email, jobRoleName: jobRole, etag });
		return response.data;
	} catch (e) {
		throw new Error("Could not create application");
	}
};
