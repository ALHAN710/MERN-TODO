import express from "express";
import path from "path";
import { taskRouter } from "./taskRoute";
import { userRouter } from "./userRoute";


const router = express.Router();

// router.use(passport.initialize());
router.use(userRouter);
router.use(taskRouter);

router.get("/*", (_, res) => {
    res.sendFile(path.join(__dirname, "../../../client/dist/index.html"));
});

export default router;