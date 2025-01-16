import express from "express";
import nunjucks from "nunjucks";
import bodyParser from "body-parser";
import session from "express-session";
import { logger } from "./logger";
import { getLoginForm, getLogoutForm, postLoginForm } from "./controllers/AuthController";
import jobRoleMiddleware from "./middleware/JobRoleMiddleware";
import { getAllJobRolesList, getDetailedJobRoleController, getJobRoleDeleteForm, postJobRoleDeleteForm } from "./controllers/JobRoleController";
import { getJobForm, postJobForm } from "./controllers/ApplyFormController";
import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import { v4 as uuid } from "uuid";
import dotenv from "dotenv";
import { allowRoles } from "./middleware/AuthMiddleware";
import { UserRole } from "./models/JwtToken";

dotenv.config();

const app = express();

const bucketName = process.env.BUCKET_NAME || "default-bucket-name";
const sessionSecret = process.env.SESSION_SECRET || "default-session-secret";
const sessionMaxAge = parseInt(process.env.SESSION_MAX_AGE || "28800000");

const s3 = new S3Client({
	region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "default string",
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "default string",
	},
});

const upload = multer({
	storage: multerS3({
		s3,
		bucket: bucketName,
		metadata: function (req, file, callback) {
			callback(null, { fieldName: file.fieldname });
		},
		key: function (req, file, callback) {
			callback(null, uuid());
		},
	}),
});

app.use(
	session({
		secret: sessionSecret,
		cookie: { maxAge: sessionMaxAge },
	})
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const env = nunjucks.configure(["node_modules/govuk-frontend/dist", "views"], {
	autoescape: true,
	express: app,
});

app.listen(process.env.port || 3000, () => {
	logger.info(`Application listening on port ${process.env.port || 3000}`);
});

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

app.get("/job-form", allowRoles([UserRole.User, UserRole.Admin]), getJobForm);
app.post("/job-form", allowRoles([UserRole.User, UserRole.Admin]), upload.single("cv"), postJobForm);

app.get("/login", getLoginForm);
app.post("/login", postLoginForm);
app.get("/signout", allowRoles([UserRole.User, UserRole.Admin]), getLogoutForm);

app.get("/job-roles", allowRoles([UserRole.User, UserRole.Admin]), jobRoleMiddleware, getAllJobRolesList);

app.get("/job-roles/:id", allowRoles([UserRole.User, UserRole.Admin]), jobRoleMiddleware, getDetailedJobRoleController);

app.get('/job-roles/delete/:id', allowRoles([UserRole.Admin]), getJobRoleDeleteForm);
app.post('/job-roles/delete/:id', allowRoles([UserRole.Admin]),postJobRoleDeleteForm);

app.get("*", function (req, res) {
	res.render("errors/404.njk");
});

