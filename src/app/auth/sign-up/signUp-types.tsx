import { User } from "@/types/user";

export type SignUpFormItems = {
  mobile: string; // Persian mobile number
  password: string; // Minimum length: 6
  first_name: string;
  last_name: string;
  national_code: string;
  digikala_panel_name: string;
  digikala_merchant_number: string;
  province: string;
  city: string;
  address: string;
  postal_code: string; // Iranian postal code (10 digits)
  telephone: string;
  email: string;
};

export type SignUpResponse = {
  userId: User["id"];
  role: User["role"];
};
