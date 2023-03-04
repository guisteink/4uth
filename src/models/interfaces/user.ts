export type UserStatus = "ACTIVE" | "INACTIVE"

export type UserRole = "ADMINISTRATOR" | "MANAGER" | "USER" | "GUEST";

export interface IUser {
  name: string;
  password: string;
  email?: string;
  zipcode?: string;
  phone?: number;
  role?: UserRole;
  status?: UserStatus;
  dob?: {
    type: object,
    date: Date,
    age: Number
  },
}
