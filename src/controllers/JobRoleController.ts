import { Request, Response } from "express";
import { getAllJobRoles, getDetailedJobRole } from "../services/JobRoleService";
import { dateFormatter } from "../filters/dateFormatter";
import { JobRoleDetailedResponse } from "../models/JobRoleDetailedResponse";

interface JobRole {
	jobRoleId: Number;
	roleName: String;
	location: String;
	closingDate: number;
	capabilityName: String;
	bandName: String;
}

interface JobRoleDetail {
	description: string;
	responsibilities: string;
	sharepointUrl: string;
	roleName: string;
	location: string;
	closingDate: Date;
	numberOfOpenPositions: number;
}

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
		const jobRoleDetails: JobRoleDetailedResponse[] = await getDetailedJobRole();
		return res.render("jobRole/job-role-information.njk", { jobRoleDetails });
	} catch (e) {
		res.locals.errormessage = e.message;
		res.render("jobRole/job-role-information.njk");
	}
};
