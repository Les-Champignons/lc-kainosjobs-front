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

export const getDetailedJobRole = async (id: string): Promise<JobRoleDetailedResponse[]> => {
	try {
		const response: AxiosResponse = await axios.get(URL + "/" + id);
		return response.data;
	} catch (e) {
		throw new Error("Failed to get job role detail");
	}
};
