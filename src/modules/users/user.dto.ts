export type UserRole = "supervisor" | "technician" | "receptionist";

export interface createUserDTO {
  company_id: string;
  username: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  email: string;
  password: string;
}

export interface UserResponseDTO {
  id: string;
  company_id: string;
  username: string;
  first_name: string;
  last_name: string;
  role: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateUserDTO {
  username?: string;
  first_name?: string;
  last_name?: string;
  role?: UserRole;
  email?: string;
  password?: string;
}
