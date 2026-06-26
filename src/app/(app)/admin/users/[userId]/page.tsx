import { useUserInfo } from "@/hooks/useUserInfo";
import React from "react";

type Props = {};

const UserPage = (props: Props) => {
  const { role } = useUserInfo();

  return <div></div>;
};

export default UserPage;
