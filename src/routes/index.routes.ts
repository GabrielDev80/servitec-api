import { Router } from "express";
import companyRouter from "../modules/companies/company.routes.js";

const indexRouter = Router();

indexRouter.use("/v1/api/companies", companyRouter);

export default indexRouter;
