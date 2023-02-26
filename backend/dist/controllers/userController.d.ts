import { NextFunction, Request, Response } from "express";
export declare const registerUser: (req: Request, res: Response, next: NextFunction) => void;
export declare const signInUser: (req: Request, res: Response, next: NextFunction) => void;
export declare const getUsers: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getUser: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export declare const updateUser: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
