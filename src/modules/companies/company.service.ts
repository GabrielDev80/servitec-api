import CompanyModel from "./company.model.js";
import { AppError } from "../../utils/errors.js";

interface CompanyAddress {
  street: string;
  number: number;
  location: string;
}
interface CreateCompanyData {
  company_alias: string;
  name: string;
  address: CompanyAddress;
  email: string;
  phone: string;
  logo?: string;
}

interface UpdateCompanyData {
  company_alias?: string;
  name?: string;
  address?: CompanyAddress;
  email?: string;
  phone?: string;
  logo?: string;
}

export const getCompany = async (alias: string) =>
  await CompanyModel.findOne({ company_alias: alias });

export const createCompany = async (data: CreateCompanyData) => {
  const { company_alias, name, address, email, phone, logo } = data;
  const alias: string = company_alias;

  const alreadyExists = await CompanyModel.findOne({
    company_alias: alias,
  });

  if (alreadyExists) {
    throw new AppError("Alias ​​not available", 409);
  }

  const newCompany = await CompanyModel.create(data);

  return newCompany.toObject();
};

export const updateCompany = async (id: string, data: UpdateCompanyData) => {
  const currentCompany = await CompanyModel.findById(id);

  if (!currentCompany) {
    throw new AppError("Company not found", 404);
  }

  // Actualizar data
  Object.assign(currentCompany, data);

  // Guardar
  await currentCompany.save();

  return currentCompany;
};

export const removeCompany = async (id: string) =>
  await CompanyModel.findByIdAndDelete({ _id: id }).lean();
