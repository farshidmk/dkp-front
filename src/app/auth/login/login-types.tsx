import { User } from "@/types/user";

export type LoginFormItems = {
  mobile: string;
  password: string;
};

export type LoginResponse = User & {
  token: string;
};
