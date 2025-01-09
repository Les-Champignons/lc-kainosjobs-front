import { Request, Response } from "express";
import { getAllJobRoles } from "../services/JobRoleService";
import { getDetailedJobRole } from "../services/JobRoleService";
import { dateFormatter } from "../filters/dateFormatter";

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
};

interface JobRoleDetailedResponse {
	jobRoleId: Number;
	roleName: String;
	bandName: String;
	capabilityName: String;
	jobRoleDetailedParameters: JobRoleDetailedParameters
};


export const getAllJobRolesList = async (req: Request, res: Response): Promise<void> => {
	try {
		const jobRoles: JobRole[] = await getAllJobRoles();
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
		const jobRoleDetails: JobRoleDetailedResponse = await getDetailedJobRole(jobRoleId);
		const formattedJobRoleDetails = {
			...jobRoleDetails,
			jobRoleDetailedParameters: {
				...jobRoleDetails.jobRoleDetailedParameters,
				closingDate: dateFormatter(jobRoleDetails.jobRoleDetailedParameters.closingDate),
			},
		};
		return res.render("jobRole/job-role-information.njk", { jobRoleDetails: formattedJobRoleDetails });
	} catch (e) {
		res.locals.errormessage = e.message;
		res.render("jobRole/job-role-information.njk");
	}
};
