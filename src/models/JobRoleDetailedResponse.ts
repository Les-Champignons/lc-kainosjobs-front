import { JobRoleDetailedParameters } from "./JobRoleDetailedParameters";

export type JobRoleDetailedResponse = {
	jobRoleId: Number;
	roleName: String;
	bandName: String;
	capabilityName: String;
	jobRoleDetailedParameters: JobRoleDetailedParameters;
};
