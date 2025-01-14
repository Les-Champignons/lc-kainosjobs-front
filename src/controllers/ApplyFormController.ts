import express from "express";

export const getJobForm = async (req: express.Request, res: express.Response): Promise<void> => {
	res.render("jobRole/job-form.njk");
};

export const postJobForm = async (req: express.Request, res: express.Response): Promise<void> => {
	console.log(req.file)
};
