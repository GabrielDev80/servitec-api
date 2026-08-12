import mongoose from "mongoose";

const companyCollection = "Companies";

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
    trim: true,
  },
  number: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
});

const companySchema = new mongoose.Schema(
  {
    /* Datos de la empresa */
    company_alias: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: addressSchema,
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    logo: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const CompanyModel = mongoose.model(companyCollection, companySchema);

export default CompanyModel;
