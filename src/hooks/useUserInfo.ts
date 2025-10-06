import { User } from "@/types/user";
import Cookies from "js-cookie";

export const useUserInfo = () => {
  const value = Cookies.get("userInfo") ?? "{}";
  const userInfo = JSON.parse(value) as User;

  return userInfo;
};
