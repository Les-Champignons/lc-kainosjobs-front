import { expect } from "chai";
import sinon from "sinon";
import * as authController from "../../../src/controllers/AuthController";

describe("AuthController", () => {
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

	describe("getLoginForm", () => {
		it("should render the login form", async () => {
			await authController.getLoginForm(req, res);
			expect(res.render.calledWith("auth/login.njk")).to.be.true;
		});
	});

	describe("postLoginForm", () => {
		it("should render the login form with an error message on failure", async () => {
			const errorMessage = "Login error:";

			req.body = { email: "test@example.com", password: "password" };

			await authController.postLoginForm(req, res);

			expect(res.locals.errormessage).to.contain(errorMessage);
			expect(res.render.calledWith("auth/login.njk", req.body)).to.be.true;
		});
	});

	describe("getLogoutForm", () => {
		it("should destroy the session and redirect to the homepage", async () => {
			req.session.destroy = sinon.stub().callsFake((callback) => callback());

			await authController.getLogoutForm(req, res);

			expect(req.session.destroy.calledOnce).to.be.true;
			expect(res.redirect.calledWith("/")).to.be.true;
		});
	});
});
