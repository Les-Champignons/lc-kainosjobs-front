import { Request, Response } from "express";
import { getAllJobRoles } from "../services/JobRoleService";

export const getAllJobRolesList = async (req: Request, res: Response): Promise<void> => {
    return res.render('jobRole/viewRoles.njk', { jobRoles: await getAllJobRoles() });
}