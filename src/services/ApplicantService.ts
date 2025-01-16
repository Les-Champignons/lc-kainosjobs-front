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

//  todo return ID here, (etag is otherwise known as key)
export const createApplication = async (email: String, jobRole: String, etag: String): Promise<number> => {
	// const email = req.par
	// const jobRoleName =
	// const etag =
	try {
		const response: AxiosResponse = await axios.post(`${URL}/create`, { email, jobRoleName: jobRole, etag }); // , { email, jobRoleName, etag }
		return response.data;
	} catch (e) {
		throw new Error("Could not create application");
	}
};
