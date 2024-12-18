import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from "chai";
import { JobRoleResponse } from "../../../src/models/JobRoleResponse";
import { JobRoleRequest } from "../../../src/models/JobRoleRequest";
import { getAllJobRoles } from "../../../src/services/JobRoleService";
import { URL } from "../../../src/services/JobRoleService";

const jobRoleRequest: JobRoleRequest = {
	jobRoleId: 1,
	roleName: "Software Engineer",
	location: "Belfast",
	closingDate: new Date("2024-12-22"),
	capabilityName: "Digital Services",
	bandName: "Senior",
};

const jobRoleResponse: JobRoleResponse = {
	jobRoleId: 1,
	roleName: "Software Engineer",
	location: "Belfast",
	closingDate: new Date("2024-12-22"),
	capabilityName: "Digital Services",
	bandName: "Senior",
};

const mock = new MockAdapter(axios);

describe("JobRoleService", function () {
	describe("getAllJobRolesList", function () {
		it("should return all job roles from response", async () => {
			const data = [jobRoleResponse];

			mock.onGet(URL).reply(200, data);

			const results = await getAllJobRoles();

			expect(results[0]).to.deep.equal(jobRoleResponse);
		});

		it("should throw exception when 500 error returned from axios", async () => {
			mock.onGet(URL).reply(500);

			try {
				await getAllJobRoles();
			} catch (e) {
				expect(e.message).to.equal("Failed to get job roles");
				return;
			}
			throw new Error("Test failed");
		});
	});
});
