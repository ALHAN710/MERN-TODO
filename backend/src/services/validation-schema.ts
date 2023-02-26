import Joi, { AnySchema } from "joi";

export const registerSchema: AnySchema = Joi.object({
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().max(50).required(),
    password: Joi.string().min(8).required(),
    isActive: Joi.bool().default(false),
    // roles: Joi.array().items(Joi.string().valid(...["ADMIN", "INVOICER", "USER", "DEMO"]).required()).unique().required(),
});

export const accountSchema: AnySchema = Joi.object({
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().max(50).required(),
    // isActive: Joi.bool().allow(...["", null]).optional(),
    // roles: Joi.array().items(Joi.string().valid(...["ADMIN", "INVOICER", "USER", "DEMO"]).required()).unique(),
}); 

export const profileSchema: AnySchema = Joi.object({
    avatar: Joi.string().email().max(50).required(),
    password: Joi.string().min(8).required(),
}); 

export const loginSchema = Joi.object({
    email: Joi.string().email().max(50).required(),
    password: Joi.string().min(8).required(),
});

export const taskSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(500).allow(...["", null]).optional(),
    isDone: Joi.bool().default(false),
    isImportant: Joi.bool().default(false),
    isTrashed: Joi.bool().default(false),
    priority: Joi.string().allow(...["HIGH", "LOW", "MIDDLE"]).default("HIGH"),
    // userId: Joi.string().required(),
    // userId: Joi.objectId() beloved friend, bosom friend
});

export const taskUpdateSchema = Joi.object({
    title: Joi.string().min(3).max(100),
    description: Joi.string().max(500).allow(...["", null]).optional(),
    isDone: Joi.bool().required(),
    isImportant: Joi.bool().required(),
    isTrashed: Joi.bool().required(),
    priority: Joi.string().allow(...["HIGH", "LOW", "MIDDLE"]).default("HIGH").required(),
    userId: Joi.string().required(),
    // userId: Joi.objectId()
});