import { Request, Response } from "express";
import { getAllJobRoles } from "../services/JobRoleService";
import { dateFormatter } from "../filters/dateFormatter";

export const getAllJobRolesList = async (req: Request, res: Response): Promise<void> => {
    try {
        const jobRoles = await getAllJobRoles();
        const formattedJobRoles = jobRoles.map((jobRole) => ({
            ...jobRole,
            closingDate: dateFormatter(jobRole.closingDate)
        }));
        return res.render("jobRole/job-roles.njk", { jobRoles: formattedJobRoles });
    } catch (e) {
        res.locals.errormessage = e.message;
        res.render("jobRole/job-roles.njk");
    }
};