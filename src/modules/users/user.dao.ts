import { UpdateUserDTO } from "./user.dto.js";
import UserModel from "./user.model.js";
import mongoose from "mongoose";

export const findAllByCompany = async (companyId: mongoose.Types.ObjectId) => {
  return UserModel.find({
    company_id: companyId,
  });
};

export const findById = async (
  id: string,
  companyId: mongoose.Types.ObjectId,
) => {
  return UserModel.findOne({
    _id: id,
    company_id: companyId,
  });
};

export const findByEmail = async (email: string) => {
  return UserModel.findOne({
    email,
  });
};

export const findByUsername = async (
  companyId: mongoose.Types.ObjectId,
  username: string,
) => {
  return UserModel.findOne({
    company_id: companyId,
    username,
  });
};

export const create = async (data: object) => {
  return UserModel.create(data);
};

export const update = async (
  id: string,
  companyId: mongoose.Types.ObjectId,
  data: UpdateUserDTO,
) => {
  return UserModel.findOneAndUpdate(
    {
      _id: id,
      company_id: companyId,
    },
    data,
    {
      new: true,
      runValidators: true,
    },
  );
};

export const remove = async (
  id: string,
  companyId: mongoose.Types.ObjectId,
) => {
  return UserModel.findOneAndDelete({ _id: id, company_id: companyId });
};
