import { JobRoleDetailedParameters } from "./JobRoleDetailedParameters";

export type JobRoleDetailedRequest = {
	jobRoleId: Number;
	roleName: String;
	bandName: String;
	capabilityName: String;
	jobRoleDetailedParameters: JobRoleDetailedParameters;
};
