import * as JobRoleController from "../../../src/controllers/JobRoleController";
import * as JobRoleService from "../../../src/services/JobRoleService";
import { expect } from "chai";
import { JobRoleResponse } from "../../../src/models/JobRoleResponse";
import sinon from "sinon";
import { dateFormatter } from "../../../src/filters/dateFormatter";
import { JobRoleDetailedParameters } from "../../../src/models/JobRoleDetailedParameters";
import { JobRoleDetailedResponse } from "../../../src/models/JobRoleDetailedResponse";

const jobRoleResponse: JobRoleResponse = {
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

describe("JobRoleController", function () {
	afterEach(() => {
		sinon.restore();
	});

	describe("getAllJobRolesList", function () {
		it("should render view and return all available job roles", async () => {
			const jobRoleList = [jobRoleResponse];

			sinon.stub(JobRoleService, "getAllJobRoles").resolves(jobRoleList);

			const req = {};
			const res = { render: sinon.spy() };

			await JobRoleController.getAllJobRolesList(req as any, res as any);

			const formattedJobRoles = jobRoleList.map((jobRole) => ({
				...jobRole,
				closingDate: dateFormatter(jobRole.closingDate),
			}));

			expect(res.render.calledOnce).to.be.true;
			expect(res.render.calledWith("jobRole/job-roles.njk", { jobRoles: formattedJobRoles })).to.be.true;
		});

		it("should render view with error message when error thrown", async () => {
			const errorMessage: string = "Error message";
			sinon.stub(JobRoleService, "getAllJobRoles").rejects(new Error(errorMessage));

			const req = {};
			const res = { render: sinon.spy(), locals: { errormessage: "" } };

			await JobRoleController.getAllJobRolesList(req as any, res as any);

			expect(res.render.calledOnce).to.be.true;
			expect(res.render.calledWith("jobRole/job-roles.njk")).to.be.true;
			expect(res.locals.errormessage).to.equal(errorMessage);
		});
	});

	describe("getDetailedJobRoleController", function () {
		it("should render view and return job information", async () => {
			const jobRoleDetails = [jobRoleDetailedResponse];

			sinon.stub(JobRoleService, "getDetailedJobRole").resolves(jobRoleDetails);

			const req = { params: { id: "1" } };
			const res = { render: sinon.spy() };

			await JobRoleController.getDetailedJobRoleController(req as any, res as any);

			expect(res.render.calledOnce).to.be.true;
			expect(res.render.calledWith("jobRole/job-role-information.njk", { jobRoleDetails })).to.be.true;
		});

		it("should render view with error message when error thrown", async () => {
			const errorMessage: string = "Error message";
			sinon.stub(JobRoleService, "getDetailedJobRole").rejects(new Error(errorMessage));

			const req = { params: { id: "1" } };
			const res = { render: sinon.spy(), locals: { errormessage: "" } };

			await JobRoleController.getDetailedJobRoleController(req as any, res as any);

			expect(res.render.calledOnce).to.be.true;
			expect(res.render.calledWith("jobRole/job-role-information.njk")).to.be.true;
			expect(res.locals.errormessage).to.equal(errorMessage);
		});
	});
});
