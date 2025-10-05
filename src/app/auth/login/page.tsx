"use client";

import { Button, CardContent, Typography } from "@mui/material";
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

        <div className="w-full grid grid-cols-1 md:grid-cols-2 mt-2 gap-2">
          <Link href={"/auth/sign-up"} className="w-full">
            <Button variant="outlined" fullWidth color="success">
              ثبت نام{" "}
            </Button>
          </Link>
        </div>
      </CardContent>
    </div>
  );
};

export default LoginPage;
