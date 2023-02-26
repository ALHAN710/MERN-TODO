"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskUpdateSchema = exports.taskSchema = exports.loginSchema = exports.profileSchema = exports.accountSchema = exports.registerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerSchema = joi_1.default.object({
    firstName: joi_1.default.string().min(3).max(50).required(),
    lastName: joi_1.default.string().min(3).max(50).required(),
    email: joi_1.default.string().email().max(50).required(),
    password: joi_1.default.string().min(8).required(),
    isActive: joi_1.default.bool().default(false),
    // roles: Joi.array().items(Joi.string().valid(...["ADMIN", "INVOICER", "USER", "DEMO"]).required()).unique().required(),
});
exports.accountSchema = joi_1.default.object({
    firstName: joi_1.default.string().min(3).max(50).required(),
    lastName: joi_1.default.string().min(3).max(50).required(),
    email: joi_1.default.string().email().max(50).required(),
    // isActive: Joi.bool().allow(...["", null]).optional(),
    // roles: Joi.array().items(Joi.string().valid(...["ADMIN", "INVOICER", "USER", "DEMO"]).required()).unique(),
});
exports.profileSchema = joi_1.default.object({
    avatar: joi_1.default.string().email().max(50).required(),
    password: joi_1.default.string().min(8).required(),
});
exports.loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().max(50).required(),
    password: joi_1.default.string().min(8).required(),
});
exports.taskSchema = joi_1.default.object({
    title: joi_1.default.string().min(3).max(100).required(),
    description: joi_1.default.string().max(500).allow(...["", null]).optional(),
    isDone: joi_1.default.bool().default(false),
    isImportant: joi_1.default.bool().default(false),
    isTrashed: joi_1.default.bool().default(false),
    priority: joi_1.default.string().allow(...["HIGH", "LOW", "MIDDLE"]).default("HIGH"),
    // userId: Joi.string().required(),
    // userId: Joi.objectId() beloved friend, bosom friend
});
exports.taskUpdateSchema = joi_1.default.object({
    title: joi_1.default.string().min(3).max(100),
    description: joi_1.default.string().max(500).allow(...["", null]).optional(),
    isDone: joi_1.default.bool().required(),
    isImportant: joi_1.default.bool().required(),
    isTrashed: joi_1.default.bool().required(),
    priority: joi_1.default.string().allow(...["HIGH", "LOW", "MIDDLE"]).default("HIGH").required(),
    userId: joi_1.default.string().required(),
    // userId: Joi.objectId()
});
//# sourceMappingURL=validation-schema.js.map