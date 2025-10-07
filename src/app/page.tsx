"use client";

import { useUserInfo } from "@/hooks/useUserInfo";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const userInfo = useUserInfo();

  if (userInfo.id) {
    router.push(userInfo.role);
  } else {
    router.push("/auth/login");
  }

  return <div></div>;
}
