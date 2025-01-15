import { jwtDecode } from "jwt-decode";
import express from "express";
import "core-js/stable/atob";
import { JwtToken, UserRole } from "../models/JwtToken";

export const allowRoles = (allowedRoles: UserRole[]) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (!req.session.token) {
            return res.status(401).render('errors/401.njk');
        }

        const decodedToken: JwtToken = jwtDecode(req.session.token);
        if (!allowedRoles.includes(decodedToken.Role)) {
            return res.status(403).render('errors/403.njk');
        }

        next();
    }
}
