"use strict";
var __awaiter =
	(this && this.__awaiter) ||
	function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
				? value
				: new P(function (resolve) {
						resolve(value);
					});
		}
		return new (P || (P = Promise))(function (resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator["throw"](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
	};
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const axios_mock_adapter_1 = __importDefault(require("axios-mock-adapter"));
const chai_1 = require("chai");
const JobRoleService_1 = require("../../../src/services/JobRoleService");
const JobRoleService_2 = require("../../../src/services/JobRoleService");
const JobRoleService_3 = require("../../../src/services/JobRoleService");
const jobRoleData = {
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
const jobRoleResponse = Object.assign({}, jobRoleData);
const mock = new axios_mock_adapter_1.default(axios_1.default);
describe("JobRoleService", function () {
	describe("getAllJobRolesList", function () {
		it("should return all job roles from response", () =>
			__awaiter(this, void 0, void 0, function* () {
				const data = [jobRoleResponse];
				mock.onGet(JobRoleService_3.URL).reply(200, data);
				const results = yield (0, JobRoleService_1.getAllJobRoles)();
				(0, chai_1.expect)(results[0]).to.deep.equal(jobRoleResponse);
			}));
		it("should throw exception when 500 error returned from axios", () =>
			__awaiter(this, void 0, void 0, function* () {
				mock.onGet(JobRoleService_3.URL).reply(500);
				yield (0, JobRoleService_1.getAllJobRoles)().catch((error) => {
					(0, chai_1.expect)(error.message).to.equal("Failed to get job roles");
				});
			}));
	});
	describe("getDetailedJobRole", function () {
		it("should return job role information from response", () =>
			__awaiter(this, void 0, void 0, function* () {
				const data = jobRoleDetailedResponse;
				mock.onGet(`${JobRoleService_3.URL}/1`).reply(200, data);
				const result = yield (0, JobRoleService_2.getDetailedJobRole)("1");
				(0, chai_1.expect)(result).to.deep.equal(jobRoleDetailedResponse);
			}));
		it("should throw exception when 500 error returned from axios", () =>
			__awaiter(this, void 0, void 0, function* () {
				mock.onGet(`${JobRoleService_3.URL}/1`).reply(500);
				yield (0, JobRoleService_2.getDetailedJobRole)("1").catch((error) => {
					(0, chai_1.expect)(error.message).to.equal("Failed to get job role detail");
				});
			}));
	});
});
