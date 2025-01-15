"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JobRoleController = __importStar(require("../../../src/controllers/JobRoleController"));
const JobRoleService = __importStar(require("../../../src/services/JobRoleService"));
const chai_1 = require("chai");
const sinon_1 = __importDefault(require("sinon"));
const dateFormatter_1 = require("../../../src/filters/dateFormatter");
const jobRoleResponse = {
    jobRoleId: 1,
    roleName: "Software Engineer",
    location: "Belfast",
    closingDate: 1734393600000,
    capabilityName: "Digital Services",
    bandName: "Senior",
};
const jobRoleDetailedParameters = {
    description: "Join our team in Belfast to design and develop high-quality software solutions",
    responsibilities: "Lead software design and development.\nCollaborate with cross-functional teams.\nMentor junior engineers.\nEnsure application performance and quality.",
    sharepointUrl: "kainos.com/apply/se",
    roleName: "Software Engineer",
    location: "Belfast",
    closingDate: 1734393600000,
    numberOfOpenPositions: 3,
};
const jobRoleDetailedResponse = {
    jobRoleId: 1,
    roleName: "Software Engineer",
    bandName: "Senior",
    capabilityName: "Digital Services",
    jobRoleDetailedParameters: jobRoleDetailedParameters,
};
describe("JobRoleController", function () {
    afterEach(() => {
        sinon_1.default.restore();
    });
    describe("getAllJobRolesList", function () {
        it("should render view and return all available job roles", () => __awaiter(this, void 0, void 0, function* () {
            const jobRoleList = [jobRoleResponse];
            sinon_1.default.stub(JobRoleService, "getAllJobRoles").resolves(jobRoleList);
            const req = {};
            const res = { render: sinon_1.default.spy() };
            yield JobRoleController.getAllJobRolesList(req, res);
            const formattedJobRoles = jobRoleList.map((jobRole) => (Object.assign(Object.assign({}, jobRole), { closingDate: (0, dateFormatter_1.dateFormatter)(jobRole.closingDate) })));
            (0, chai_1.expect)(res.render.calledOnce).to.be.true;
            (0, chai_1.expect)(res.render.calledWith("jobRole/job-roles.njk", { jobRoles: formattedJobRoles })).to.be.true;
        }));
        it("should render view with error message when error thrown", () => __awaiter(this, void 0, void 0, function* () {
            const errorMessage = "Error message";
            sinon_1.default.stub(JobRoleService, "getAllJobRoles").rejects(new Error(errorMessage));
            const req = {};
            const res = { render: sinon_1.default.spy(), locals: { errormessage: "" } };
            yield JobRoleController.getAllJobRolesList(req, res);
            (0, chai_1.expect)(res.render.calledOnce).to.be.true;
            (0, chai_1.expect)(res.render.calledWith("jobRole/job-roles.njk")).to.be.true;
            (0, chai_1.expect)(res.locals.errormessage).to.equal(errorMessage);
        }));
    });
    describe("getDetailedJobRoleController", function () {
        it("should render view and return job information", () => __awaiter(this, void 0, void 0, function* () {
            const jobRoleDetails = jobRoleDetailedResponse;
            sinon_1.default.stub(JobRoleService, "getDetailedJobRole").resolves(jobRoleDetails);
            const req = { params: { id: "1" } };
            const res = { render: sinon_1.default.spy() };
            yield JobRoleController.getDetailedJobRoleController(req, res);
            const formattedJobRoleDetails = Object.assign(Object.assign({}, jobRoleDetails), { jobRoleDetailedParameters: Object.assign(Object.assign({}, jobRoleDetails.jobRoleDetailedParameters), { closingDate: (0, dateFormatter_1.dateFormatter)(jobRoleDetails.jobRoleDetailedParameters.closingDate) }) });
            (0, chai_1.expect)(res.render.calledOnce).to.be.true;
            (0, chai_1.expect)(res.render.calledWith("jobRole/job-role-information.njk", { jobRoleDetails: formattedJobRoleDetails })).to.be.true;
        }));
        it("should render view with error message when error thrown", () => __awaiter(this, void 0, void 0, function* () {
            const errorMessage = "Error message";
            sinon_1.default.stub(JobRoleService, "getDetailedJobRole").rejects(new Error(errorMessage));
            const req = { params: { id: "1" } };
            const res = { render: sinon_1.default.spy(), locals: { errormessage: "" } };
            yield JobRoleController.getDetailedJobRoleController(req, res);
            (0, chai_1.expect)(res.render.calledOnce).to.be.true;
            (0, chai_1.expect)(res.render.calledWith("jobRole/job-role-information.njk")).to.be.true;
            (0, chai_1.expect)(res.locals.errormessage).to.equal(errorMessage);
        }));
    });
});
