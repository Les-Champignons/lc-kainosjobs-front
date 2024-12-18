import * as JobRoleController from "../../../src/controllers/JobRoleController";
import * as JobRoleService from "../../../src/services/JobRoleService";
import { expect } from "chai";
import { JobRoleResponse } from "../../../src/models/JobRoleResponse";
import sinon from "sinon";
import { dateFormatter } from "../../../src/filters/dateFormatter";


const jobRoleResponse: JobRoleResponse = {
    jobRoleId: 1,
    roleName: "Software Engineer",
    location: "Belfast",
    closingDate: 1734393600000,
    capabilityName: "Digital Services",
    bandName: "Senior",
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
                closingDate: dateFormatter(jobRole.closingDate)
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
});
