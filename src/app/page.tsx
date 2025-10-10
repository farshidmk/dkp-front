"use client";

import { useUserInfo } from "@/hooks/useUserInfo";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const userInfo = useUserInfo();

  useEffect(() => {
    if (userInfo?.id) {
      router.push(userInfo.role);
    } else {
      router.push("/auth/login");
    }
  }, [router, userInfo]);

  return <div></div>;
}
