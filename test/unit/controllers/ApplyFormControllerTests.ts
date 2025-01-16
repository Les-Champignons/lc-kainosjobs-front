import { expect } from "chai";
import sinon from "sinon";
import * as applyFormController from "../../../src/controllers/ApplyFormController";

describe("ApplyFormController", () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {},
            session: {},
        };
        res = {
            render: sinon.stub(),
            redirect: sinon.stub(),
            locals: {},
        };
    });

    afterEach(() => {
        sinon.restore();
    });

    describe("getCV", () => {
        it("should render the CV form", async () => {
            await applyFormController.getCV(req, res);
            expect(res.render.calledWith("apply/cv.njk")).to.be.true;
        });
    });

    describe("postJobForm", () => {
        it("should render the job form with an error message on failure", async () => {
            const errorMessage = "Job application error:";
            req.body = { email: "test@test.com", jobRoleId: "1" };

            sinon.stub(applyFormController, "postJobForm").throws(new Error(errorMessage));

            await applyFormController.postJobForm(req, res);

            expect(res.render.calledWith("apply/job.njk", { error: errorMessage })).to.be.true;
        });

        it("should redirect to the success page on success", async () => {
            req.body = { email: "test@test.com", jobRoleId: "1" };

            await applyFormController.postJobForm(req, res);

            expect(res.redirect.calledWith("/apply/success")).to.be.true;
        });
    });
});