import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from "chai";
import { JobRoleResponse } from "../../../src/models/JobRoleResponse";
import { getAllJobRoles } from "../../../src/services/JobRoleService";
import { getDetailedJobRole } from "../../../src/services/JobRoleService";
import { JobRoleDetailedResponse } from "../../../src/models/JobRoleDetailedResponse";
import { JobRoleDetailedParameters } from "../../../src/models/JobRoleDetailedParameters";

import { URL } from "../../../src/services/JobRoleService";

const jobRoleData = {
	jobRoleId: 1,
	roleName: "Software Engineer",
	location: "Belfast",
	closingDate: 1734393600000,
	capabilityName: "Digital Services",
	bandName: "Senior",
};

const jobRoleDetailedParameters: JobRoleDetailedParameters = {
	description: "Join our team in Belfast to design and develop high-quality software solutions",
	responsibilities: "Lead software design and development.\nCollaborate with cross-functional teams.\nMentor junior engineers.\nEnsure application performance and quality.",
	sharepointUrl: "kainos.com/apply/se",
	roleName: "Software Engineer",
	location: "Belfast",
	closingDate: 1734393600000,
	numberOfOpenPositions: 3,
};

const jobRoleDetailedResponse: JobRoleDetailedResponse = {
	jobRoleId: 1,
	roleName: "Software Engineer",
	bandName: "Senior",
	capabilityName: "Digital Services",
	jobRoleDetailedParameters: jobRoleDetailedParameters,
};

const jobRoleResponse: JobRoleResponse = { ...jobRoleData };

const mock = new MockAdapter(axios);

describe("JobRoleService", function () {
	describe("getAllJobRolesList", function () {
		it("should return all job roles from response", async () => {
			const data = [jobRoleResponse];

			mock.onGet(URL).reply(200, data);

			const results = await getAllJobRoles("token");

			expect(results[0]).to.deep.equal(jobRoleResponse);
		});

		it("should throw exception when 500 error returned from axios", async () => {
			mock.onGet(URL).reply(500);

			await getAllJobRoles("token").catch((error) => {
				expect(error.message).to.equal("Failed to get job roles");
			});
		});
	});

	describe("getDetailedJobRole", function () {
		it("should return job role information from response", async () => {
			const data = jobRoleDetailedResponse;

			mock.onGet(`${URL}/1`).reply(200, data);

			const result = await getDetailedJobRole("1", "token");

			expect(result).to.deep.equal(jobRoleDetailedResponse);
		});

		it("should throw exception when 500 error returned from axios", async () => {
			mock.onGet(`${URL}/1`).reply(500);

			await getDetailedJobRole("1", "token").catch((error) => {
				expect(error.message).to.equal("Failed to get job role detail");
			});
		});
	});
});
