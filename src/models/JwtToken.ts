import { User } from "./User";

export enum UserRole {
	User = 0,
	Admin = 1,
}

export type JwtToken = {
	Role: UserRole;
	User: User;
};
