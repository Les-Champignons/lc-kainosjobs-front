import express from "express";
import nunjucks from "nunjucks";
import bodyParser from "body-parser";
import session from "express-session";
import { logger } from "./logger";
import { getLoginForm, getLogoutForm, postLoginForm } from "./controllers/AuthController";
import jobRoleMiddleware from "./middleware/JobRoleMiddleware";
import { getAllJobRolesList, getDetailedJobRoleController } from "./controllers/JobRoleController";
import { getCV, getJobForm, postJobForm } from "./controllers/ApplyFormController";
import { updateStatus } from "./controllers/StatusController";
import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import { v4 as uuid } from "uuid";
require("dotenv").config();

const app = express();

export const s3 = new S3Client({
	region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "default  string",
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "default  string",
	},
});

const upload = multer({
	storage: multerS3({
		s3,
		bucket: process.env.BUCKET_NAME,
		metadata: function (req, file, callback) {
			callback(null, { fieldName: file.fieldname });
		},
		key: function (req, file, callback) {
			callback(null, uuid());
		},
	}),
});

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

const env = nunjucks.configure(["node_modules/govuk-frontend/dist", "views"], {
	autoescape: true,
	express: app,
});

app.listen(process.env.port || 3000, () => {
	logger.info(`Application listening on port ${process.env.port || 3000}`);
});

app.use(session({ secret: process.env.SESSION_SECRET, saveUninitialized: true, cookie: { maxAge: parseInt(process.env.SESSION_MAX_AGE) || 28800000 } }));

declare module "express-session" {
	interface SessionData {
		token: string;
	}
}

app.use(express.static("node_modules/govuk-frontend/dist/govuk/"));
app.use(express.static("node_modules/govuk-frontend/dist/govuk/assets"));
app.use(express.static("static/"));

app.use((req, res, next) => {
	env.addGlobal("request", req);
	next();
});

app.get("/", function (req, res) {
	res.render("index.njk");
});

app.get("/job-form", getJobForm);
app.post("/job-form", upload.single("cv"), postJobForm);

app.get("/login", getLoginForm);
app.post("/login", postLoginForm);
app.get("/signout", getLogoutForm);

app.get("/job-roles", jobRoleMiddleware, getAllJobRolesList);

app.get("/job-roles/:id", jobRoleMiddleware, getDetailedJobRoleController);

app.post("/update-application-status/:id", updateStatus);

app.get("/cv/:id", getCV)

app.get("*", function (req, res) {
	res.render("errors/404.njk");
});
