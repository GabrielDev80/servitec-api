import mongoose from "mongoose";
import * as userDAO from "./user.dao.js";
import { AppError } from "../../utils/errors.js";
import { createHash } from "../../utils/bcrypt.js";
import { createUserDTO, UpdateUserDTO, UserResponseDTO } from "./user.dto.js";

const userResponse = (user: any): UserResponseDTO => ({
  id: user._id.toString(),
  company_id: user.company_id.toString(),
  username: user.username,
  first_name: user.first_name,
  last_name: user.last_name,
  role: user.role,
  email: user.email,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

export const getAllUsers = async (companyId: string) => {
  if (!mongoose.isValidObjectId(companyId)) {
    throw new AppError("Invalid company ID", 400);
  }

  const companyObjectId = new mongoose.Types.ObjectId(companyId);

  const users = await userDAO.findAllByCompany(companyObjectId);

  return users.map(userResponse);
};

export const getUserById = async (id: string, companyId: string) => {
  if (!mongoose.isValidObjectId(companyId)) {
    throw new AppError("Invalid company ID", 400);
  }

  const companyObjectId = new mongoose.Types.ObjectId(companyId);

  const user = await userDAO.findById(id, companyObjectId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return userResponse(user);
};

export const createUser = async (
  data: createUserDTO,
): Promise<UserResponseDTO> => {
  if (!mongoose.isValidObjectId(data.company_id)) {
    throw new AppError("Invalid company ID", 400);
  }
  const { username, email } = data;

  const companyId = new mongoose.Types.ObjectId(data.company_id);

  const usernameExists = await userDAO.findByUsername(companyId, username);

  if (usernameExists) {
    throw new AppError("Username is in use", 409);
  }

  const emailExists = await userDAO.findByEmail(email);
  if (emailExists) {
    throw new AppError("Email is in use", 409);
  }

  const user = await userDAO.create({
    ...data,
    company_id: companyId,
    password: createHash(data.password),
  });

  return userResponse(user);
};

export const updateUser = async (
  id: string,
  companyId: string,
  data: UpdateUserDTO,
): Promise<UserResponseDTO> => {
  if (!mongoose.isValidObjectId(id)) {
    throw new AppError("Invalid user ID", 400);
  }
  if (!mongoose.isValidObjectId(companyId)) {
    throw new AppError("Invalid company ID", 400);
  }

  const companyObjectId = new mongoose.Types.ObjectId(companyId);

  const user = await userDAO.findById(id, companyObjectId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (data.username) {
    const usernameExists = await userDAO.findByUsername(
      companyObjectId,
      data.username,
    );

    if (usernameExists && usernameExists._id.toString() !== id) {
      throw new AppError("Username is in use", 409);
    }
  }

  if (data.email) {
    const emailExists = await userDAO.findByEmail(data.email);

    if (emailExists && emailExists._id.toString() !== id) {
      throw new AppError("Email is in use", 409);
    }
  }

  const updateData = {
    ...data,
    ...(data.password && {
      password: createHash(data.password),
    }),
  };

  const updatedUser = await userDAO.update(id, companyObjectId, updateData);

  if (!updatedUser) {
    throw new AppError("User not found", 404);
  }

  return userResponse(updatedUser);
};

export const deleteUser = async (id: string, companyId: string) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new AppError("Invalid user ID", 400);
  }
  if (!mongoose.isValidObjectId(companyId)) {
    throw new AppError("Invalid company ID", 400);
  }

  const companyObjectId = new mongoose.Types.ObjectId(companyId);

  const deletedUser = await userDAO.remove(id, companyObjectId);

  if (!deletedUser) {
    throw new AppError("User not found", 404);
  }
};
