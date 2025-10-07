"use client";

import { Container } from "@mui/material";
import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CustomTabPanel from "@/components/customTabPanel/CustomTabPanel";
import ProfileForm from "./_components/ProfileForm";
import ChangePasswordForm from "./_components/ChangePasswordForm";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import KeyIcon from "@mui/icons-material/Key";

enum ProfileTabs {
  ChangePassword = "change-password",
  Profile = "profile",
}

const UserProfilePage = () => {
  const [activeTab, setActiveTab] = useState<ProfileTabs>(ProfileTabs.Profile);

  return (
    <Container
      maxWidth="xl"
      className="border p-2 h-full"
      sx={{ borderColor: (t) => t.palette.divider, borderRadius: 2 }}
    >
      <Tabs
        value={activeTab}
        onChange={(e, value) => {
          console.log({ e, value });
          setActiveTab(value);
        }}
      >
        <Tab
          label="اطلاعات کاربری"
          value={ProfileTabs.Profile}
          icon={<AssignmentIndIcon />}
          iconPosition="end"
        />
        <Tab
          label="تغییر رمز عبور"
          value={ProfileTabs.ChangePassword}
          icon={<KeyIcon />}
          iconPosition="end"
        />
      </Tabs>

      <CustomTabPanel activeTab={activeTab} value={ProfileTabs.Profile}>
        <ProfileForm />
      </CustomTabPanel>
      <CustomTabPanel activeTab={activeTab} value={ProfileTabs.ChangePassword}>
        <ChangePasswordForm />
      </CustomTabPanel>
    </Container>
  );
};

export default UserProfilePage;
