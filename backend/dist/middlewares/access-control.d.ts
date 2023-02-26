import { NextFunction, Request, RequestHandler, Response } from "express";
export declare const security: (...securityHandlers: RequestHandler[]) => (req: Request, res: Response, next: NextFunction) => void;
export declare const userSecurity: (req: Request, res: Response, next: NextFunction) => void;
export declare const taskSecurity: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare enum role_hierarchy {
    ROLE_USER = "0",
    ROLE_INVOICER = "ROLE_USER",
    ROLE_ADMIN = "ROLE_INVOICER"
}
export declare enum userRoles {
    DEMO = "DEMO",
    USER = "USER",
    INVOICER = "INVOICER",
    ADMIN = "ADMIN"
}
