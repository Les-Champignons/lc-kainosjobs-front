import { expect } from "chai";
import sinon from "sinon";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getToken } from "../../../src/services/AuthService";
import { LoginRequest } from "../../../src/models/LoginRequest";

const mockAxios = new MockAdapter(axios);

describe("AuthService", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it("should return a token when API call succeeds", async () => {
    const loginRequest: LoginRequest = { email: "test@example.com", password: "password" };
    const mockToken = "mockToken123";

    mockAxios.onPost(`${process.env.API_URL}/auth/login`).reply(200, mockToken);

    const result = await getToken(loginRequest);
    expect(result).to.equal(mockToken);
  });

  it("should throw an error when API call fails", async () => {
    const loginRequest = { email: "test@example.com", password: "password" };
    const mockError = "Invalid credentials";

    mockAxios.onPost(`${process.env.API_URL}/auth/login`).reply(400, mockError);

    try {
      await getToken(loginRequest);
    } catch (e) {
      expect(e.message).to.equal(mockError);
    }
  });
});
