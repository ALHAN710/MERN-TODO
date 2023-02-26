import { NextFunction, Request, Response } from "express";
export declare const createTask: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export declare const getTasks: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
export declare const getTask: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
export declare const updateTask: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
export declare const deleteTask: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
