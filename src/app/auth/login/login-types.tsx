import { User } from "@/types/user";

export type LoginFormItems = {
  phoneNumber: string;
  password: string;
};

export type LoginResponse = User & {
  token: string;
};
