import axios, { AxiosResponse } from "axios";
import { JobRoleResponse } from "../models/JobRoleResponse";
import { JobRoleDetailedResponse } from "../models/JobRoleDetailedResponse";
import { getHeader } from "./AuthUtil";

axios.defaults.baseURL = process.env.API_URL || "http://localhost:8080/";

export const URL: string = "job-roles";

export const getAllJobRoles = async (token: String): Promise<JobRoleResponse[]> => {
	try {
		console.log(getHeader(token));
		const response: AxiosResponse = await axios.get(URL, getHeader(token));
		return response.data;
	} catch (e) {
		throw new Error("Failed to get job roles");
	}
};

export const getDetailedJobRole = async (id: string, token: String): Promise<JobRoleDetailedResponse> => {
	try {
		const response: AxiosResponse = await axios.get(`${URL}/${id}`, getHeader(token));
		return response.data;
	} catch (e) {
		throw new Error("Failed to get job role detail");
	}
};
