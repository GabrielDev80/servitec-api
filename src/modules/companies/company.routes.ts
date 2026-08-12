import { Router } from "express";
import userRouter from "../users/user.routes.js";

const companyRouter = Router();

companyRouter.use("/:companyId/users", userRouter);

export default companyRouter;
