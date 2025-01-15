import { Request, Response } from "express";
import { ApplicantResponse } from "../models/ApplicantResponse";
import { getAllApplicants } from "../services/ApplicantService";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../app";

export const getJobForm = async (req: Request, res: Response): Promise<void> => {
	res.render("jobRole/job-form.njk");
};

export const postJobForm = async (req: Request, res: Response): Promise<void> => {
	console.log(req.file)
};

export const getCV = async (req: Request, res: Response): Promise<void> => {
	try {
		const applicationId = req.params.id
		const applicants: ApplicantResponse[] = await getAllApplicants();
		const application: ApplicantResponse = applicants.find(ap => (ap as any).applicantId == applicationId);
		
		const command = new GetObjectCommand({
			Bucket: process.env.BUCKET_NAME,
			Key: application.etag.toString(),
			ResponseContentType: "application/pdf",
			ResponseContentDisposition: "inline"
		});
		const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

		res.redirect(url);
	} catch (e) {

	}
}