"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRouter = void 0;
const express_1 = __importDefault(require("express"));
const joi_1 = __importDefault(require("joi"));
const taskController_1 = require("../controllers/taskController");
const require_auth_1 = require("../middlewares/require-auth");
const validate_request_1 = require("../middlewares/validate-request");
const validation_schema_1 = require("../services/validation-schema");
const router = express_1.default.Router();
exports.taskRouter = router;
router.post("/api/tasks", require_auth_1.requireAuth, (0, validate_request_1.body)(validation_schema_1.taskSchema), taskController_1.createTask);
router.get("/api/tasks", require_auth_1.requireAuth, taskController_1.getTasks);
router.get("/api/tasks/:taskId", (0, validate_request_1.params)({ taskId: joi_1.default.string().required() }), require_auth_1.requireAuth, taskController_1.getTask);
router.put("/api/tasks/:taskId", (0, validate_request_1.params)({ taskId: joi_1.default.string().required() }), require_auth_1.requireAuth, taskController_1.updateTask);
router.delete("/api/tasks/:taskId", (0, validate_request_1.params)({ taskId: joi_1.default.string().required() }), require_auth_1.requireAuth, taskController_1.deleteTask);
//# sourceMappingURL=taskRoute.js.map