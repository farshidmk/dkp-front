import { SignUpFormItems } from "@/app/auth/sign-up/signUp-types";

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

export type UserInfo = {
  id: number;
  mobile: string;
  approved: boolean;
  created_at: string;
  profile: UserProfile;
};

type UserProfile = SignUpFormItems & {
  user_id: number;
};
