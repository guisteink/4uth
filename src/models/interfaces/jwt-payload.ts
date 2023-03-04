export interface IJWTPayload {
  userId: string;
  username: string;
  role: string;
  email?: string;
  zipcode?: string;
  phone?: string;
}
