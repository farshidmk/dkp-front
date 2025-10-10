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

type UserProfile = {
  user_id: number;
  first_name: string;
  last_name: string;
  national_code: string;
  digikala_panel_name: string;
  digikala_merchant_number: string;
  province: string;
  city: string;
  address: string;
  postal_code: string;
  telephone: string;
};
