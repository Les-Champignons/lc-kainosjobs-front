import express from "express";
import axios from "axios";

export const getJobForm = async (req: express.Request, res: express.Response): Promise<void> => {
	res.render("jobRole/job-form.njk", { number_of_positions: 50, status: "open" });
};

export const postJobForm = async (req: express.Request, res: express.Response): Promise<void> => {};
