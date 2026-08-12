/* import { Request, Response, NextFunction } from "express";
import * as companyService from "./company.service.js";
import getLogger from "../../utils/logger.utils.js";

const log = getLogger();

export const currentCompany = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user.id;
    const currentCompany = await companyService.getCurrentCompany(userId);

    res.status(200).json({
      status: "success",
      message: "Current commpany data founded succesfylly",
      payload: currentCompany,
    });
  } catch (error) {
    next(error);
  }
};
 */
