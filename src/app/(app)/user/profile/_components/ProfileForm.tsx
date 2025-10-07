import { useQuery } from "@tanstack/react-query";
import React from "react";

const ProfileForm = () => {
  const { data } = useQuery({
    queryKey: ["users", "profile"],
  });
  return <div>ProfileForm</div>;
};

export default ProfileForm;
