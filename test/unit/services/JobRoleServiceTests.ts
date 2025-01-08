import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from "chai";
import { JobRoleResponse } from "../../../src/models/JobRoleResponse";
import { JobRoleRequest } from "../../../src/models/JobRoleRequest";
import { getAllJobRoles } from "../../../src/services/JobRoleService";
import { URL } from "../../../src/services/JobRoleService";

const jobRoleData = {
	jobRoleId: 1,
	roleName: "Software Engineer",
	location: "Belfast",
	closingDate: 1734393600000,
	capabilityName: "Digital Services",
	bandName: "Senior",
};

const jobRoleRequest: JobRoleRequest = { ...jobRoleData };
const jobRoleResponse: JobRoleResponse = { ...jobRoleData };

const mock = new MockAdapter(axios);

describe("JobRoleService", function () {
	describe("getAllJobRolesList", function () {
		it("should return all job roles from response", async () => {
			const data = [jobRoleRequest];

			mock.onGet(URL).reply(200, data);

			const results = await getAllJobRoles();

			expect(results[0]).to.deep.equal(jobRoleResponse);
		});

		it("should throw exception when 500 error returned from axios", async () => {
			mock.onGet(URL).reply(500);

			await getAllJobRoles().catch((error) => {
				expect(error.message).to.equal("Failed to get job roles");
			});
		});
	});
});
