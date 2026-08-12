import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "./user.controller.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);

userRouter.get("/:userId", getUserById);

userRouter.post("/", createUser);

userRouter.patch("/:userId", updateUser);

userRouter.delete("/:userId", deleteUser);

export default userRouter;
