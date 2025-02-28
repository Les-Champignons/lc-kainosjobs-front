import { Request, Response } from "express";
import { getAllJobRoles } from "../services/JobRoleService";
import { getDetailedJobRole } from "../services/JobRoleService";
import { getAllApplicants } from "../services/ApplicantService";
import { dateFormatter } from "../filters/dateFormatter";
import { JwtToken } from "../models/JwtToken";
import { jwtDecode } from "jwt-decode";
import { ApplicantResponse } from "../models/ApplicantResponse";

interface JobRole {
	jobRoleId: Number;
	roleName: String;
	location: String;
	closingDate: number;
	capabilityName: String;
	bandName: String;
}

interface JobRoleDetailedParameters {
	description: String;
	responsibilities: String;
	sharepointUrl: String;
	roleName: String;
	location: String;
	closingDate: number;
	numberOfOpenPositions: Number;
}

interface JobRoleDetailedResponse {
	jobRoleId: Number;
	roleName: String;
	bandName: String;
	capabilityName: String;
	jobRoleDetailedParameters: JobRoleDetailedParameters;
}

export const getAllJobRolesList = async (req: Request, res: Response): Promise<void> => {
	try {
		const jobRoles: JobRole[] = await getAllJobRoles(req.session.token);
		const formattedJobRoles = jobRoles.map((jobRole) => ({
			...jobRole,
			closingDate: dateFormatter(jobRole.closingDate),
		}));
		return res.render("jobRole/job-roles.njk", { jobRoles: formattedJobRoles });
	} catch (e) {
		res.locals.errormessage = e.message;
		res.render("jobRole/job-roles.njk");
	}
};

export const getDetailedJobRoleController = async (req: Request, res: Response): Promise<void> => {
	try {
		const jobRoleId = req.params.id;
		const jobRoleDetails: JobRoleDetailedResponse = await getDetailedJobRole(jobRoleId, req.session.token);
		const formattedJobRoleDetails = {
			...jobRoleDetails,
			jobRoleDetailedParameters: {
				...jobRoleDetails.jobRoleDetailedParameters,
				closingDate: dateFormatter(jobRoleDetails.jobRoleDetailedParameters.closingDate),
			},
		};

		const decodedToken: JwtToken = jwtDecode(req.session.token);
		const applicants: ApplicantResponse[] = await getAllApplicants();
		return res.render("jobRole/job-role-information.njk", { jobRoleDetails: formattedJobRoleDetails, decodedToken, applicants, hiredApplicants: applicants.filter((a) => a.status == "Hired") });
	} catch (e) {
		res.locals.errormessage = e.message;
		res.render("jobRole/job-role-information.njk");
	}
};
