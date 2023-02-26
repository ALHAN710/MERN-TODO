"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const taskRoute_1 = require("./taskRoute");
const userRoute_1 = require("./userRoute");
const router = express_1.default.Router();
// router.use(passport.initialize());
router.use(userRoute_1.userRouter);
router.use(taskRoute_1.taskRouter);
router.get("/*", (_, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../../client/dist/index.html"));
});
exports.default = router;
//# sourceMappingURL=index.js.map