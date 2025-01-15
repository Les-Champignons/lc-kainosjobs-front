import axios, { AxiosResponse } from "axios";
import { ApplicantResponse } from "../models/ApplicantResponse";

axios.defaults.baseURL = process.env.API_URL || "http://localhost:8080/";

export const URL: string = "applicants";

export const getAllApplicants = async(): Promise<ApplicantResponse[]> => {
    try {
		const response: AxiosResponse = await axios.get(URL);
		return response.data;
	} catch (e) {
		throw new Error("Failed to get applicants");
	}
};