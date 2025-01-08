import axios, { AxiosResponse } from "axios";
import { LoginRequest } from "../models/LoginRequest";

export const getToken = async (loginRequest: LoginRequest): Promise<string> => {
	try {
		const response: AxiosResponse = await axios.post(`${process.env.API_URL}/auth/login`, loginRequest);

		return response.data;
	} catch (e) {
		throw new Error(e.response.data);
	}
};
