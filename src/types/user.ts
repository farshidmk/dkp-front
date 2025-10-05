export type User = {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: UserRole;
};

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}
