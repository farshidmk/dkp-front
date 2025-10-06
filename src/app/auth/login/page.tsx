"use client";

import { CardContent, Typography } from "@mui/material";
import Link from "next/link";
import PasswordLoginForm from "./_components/PasswordLoginForm";

const LoginPage = () => {
  return (
    <div>
      <Typography variant="h6" textAlign={"center"} color="primary">
        ورود به سایت
      </Typography>
      <CardContent>
        <PasswordLoginForm />

        <div className="w-full grid text-blue-600 hover:text-blue-800">
          <Link href={"/auth/sign-up"} className="w-full font-bold text-sm">
            ثبت نام
          </Link>
        </div>
      </CardContent>
    </div>
  );
};

export default LoginPage;
