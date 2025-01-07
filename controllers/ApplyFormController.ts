import express from "express";
import * as fs from "fs";
import * as AWS from "aws-sdk";

export const getJobForm = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('jobRole/job-form.njk', { number_of_positions: 0, status: "open", fs: fs, aws: AWS});
}