import { expect } from "chai";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import MockAdapter from "axios-mock-adapter";
import { getToken } from "../../../src/services/AuthService";
import { LoginRequest } from "../../../src/models/LoginRequest";

describe("AuthService", () => {
	let mockAxios;

	beforeEach(() => {
		process.env.API_URL = "http://localhost:8080/api";
		mockAxios = new MockAdapter(axios);
	});

	afterEach(() => {
		mockAxios.restore();
	});

	it("should return a token when API call succeeds", async () => {
		const loginRequest: LoginRequest = { email: "test@example.com", password: "password" };
		const mockToken = "mockToken123";

		mockAxios.onPost(`${process.env.API_URL}/auth/login`).reply(200, mockToken);

		const result = await getToken(loginRequest);
		expect(result).to.equal(mockToken);
	});

	it("should throw an error when invalid credentials", async () => {
		const loginRequest = { email: "test@example.com", password: "password" };
		const mockError = "Invalid credentials";
		const config = { url: `${process.env.API_URL}/auth/login` } as InternalAxiosRequestConfig;
		const errorResponse = new AxiosError("Invalid credentials", "lol", config, loginRequest);
		mockAxios.onPost(`${process.env.API_URL}/auth/login`).reply(400, errorResponse);

		try {
			await getToken(loginRequest);
		} catch (e) {
			expect(e.message).to.equal(mockError);
		}
	});
});
