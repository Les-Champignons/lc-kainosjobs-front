import { Request, Response } from "express";
import { deleteJobRole, getAllJobRoles } from "../services/JobRoleService";
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
		return res.render("jobRole/job-role-information.njk", { jobRoleDetails: formattedJobRoleDetails });
	} catch (e) {
		res.locals.errormessage = e.message;
		res.render("jobRole/job-role-information.njk");
	}
};

export const getJobRoleDeleteForm = async (req: Request, res: Response): Promise<void> => {
	return res.render('jobRole/delete.njk', { jobRole: await getDetailedJobRole(req.params.id, req.session.token) });
}

export const postJobRoleDeleteForm = async (req: Request, res: Response): Promise<void> => {
	try {
		await deleteJobRole(req.params.id, req.session.token);
		return res.render('jobRole/deleteSuccess.njk');
	} catch (e) {
		return res.render('jobRole/delete.njk', { jobRole: await getDetailedJobRole(req.params.id, req.session.token), error: e });
	}
};