import { Request, Response } from "express";
import { ApplicantResponse } from "../models/ApplicantResponse";
import { createApplication, getAllApplicants } from "../services/ApplicantService";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../app";
import { jwtDecode } from "jwt-decode";
import { JwtToken } from "../models/JwtToken";

export const getJobForm = async (req: Request, res: Response): Promise<void> => {
	try {
		const jobRoleId = req.params.jobRoleId;
		res.render("jobRole/job-form.njk", { jobRoleId });
		return;
	} catch (e) {
		res.render("/jobRole/job-form.njk");
	}
};

export const postJobForm = async (req: Request, res: Response): Promise<void> => {
	try {
		const user: JwtToken = jwtDecode(req.session.token);
		const email = user.User.email;
		const jobRole = req.body.jobRoleId;

		await createApplication(email, jobRole, (req.file as any).key);

		return res.redirect(`/job-roles/${jobRole}`);
	} catch (e) {
		throw new Error("Couldn't upload file!");
	}
};

export const getCV = async (req: Request, res: Response): Promise<void> => {
	try {
		const applicationId = req.params.id;
		const applicants: ApplicantResponse[] = await getAllApplicants();
		const application: ApplicantResponse = applicants.find((applicant) => applicant.applicantId == applicationId);

		const command = new GetObjectCommand({
			Bucket: process.env.AWS_BUCKET_NAME,
			Key: application.etag.toString(),
			ResponseContentType: "application/pdf",
			ResponseContentDisposition: "inline",
		});
		const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

		res.redirect(url);
	} catch (e) {}
};
