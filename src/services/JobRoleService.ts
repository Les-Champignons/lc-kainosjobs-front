import axios, { AxiosResponse } from "axios";
import { JobRoleResponse } from "../models/JobRoleResponse";
import { JobRoleDetailedResponse } from "../models/JobRoleDetailedResponse";

axios.defaults.baseURL = process.env.API_URL || "http://localhost:8080/";

export const URL: string = "job-roles";

export const getAllJobRoles = async (): Promise<JobRoleResponse[]> => {
	try {
		const response: AxiosResponse = await axios.get(URL);

		return response.data;
	} catch (e) {
		throw new Error("Failed to get job roles");
	}
};

export const URL_2: string = "job-roles-detail";

export const getDetailedJobRole = async (): Promise<JobRoleDetailedResponse[]> => {
	try {
		const response: AxiosResponse = await axios.get(URL_2);
		return response.data;
	} catch (e) {
		throw new Error("Failed to get job role detail");
	}
};