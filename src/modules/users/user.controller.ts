import { Request, Response, NextFunction } from "express";
import * as userService from "./user.service.js";
import { AppError } from "../../utils/errors.js";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { companyId } = req.params;

    if (typeof companyId !== "string") {
      throw new AppError("Invalid company ID", 400);
    }

    const users = await userService.getAllUsers(companyId);

    res.status(200).json({
      status: "success",
      message: "Users founded succesfully",
      payload: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId, companyId } = req.params;

    if (typeof userId !== "string" || typeof companyId !== "string") {
      throw new AppError("Invalid parameters", 400);
    }

    const user = await userService.getUserById(userId, companyId);

    res.status(200).json({
      status: "success",
      message: "User founded succesfully",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { companyId } = req.params;

    if (typeof companyId !== "string") {
      throw new AppError("Invalid company ID", 400);
    }

    const user = await userService.createUser({
      ...req.body,
      company_id: companyId,
    });

    res.status(201).json({
      status: "success",
      message: "User created succesfully",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId, companyId } = req.params;
    const data = req.body;

    if (typeof userId !== "string" || typeof companyId !== "string") {
      throw new AppError("Invalid parameters", 400);
    }

    const user = await userService.updateUser(userId, companyId, data);

    res.status(200).json({
      status: "success",
      message: "User updated succesfully",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId, companyId } = req.params;

    if (typeof userId !== "string" || typeof companyId !== "string") {
      throw new AppError("Invalid parameters", 400);
    }

    await userService.deleteUser(userId, companyId);

    res.status(204).json({
      status: "success",
      message: "User deleted succesfully",
    });
  } catch (error) {
    next(error);
  }
};
