import { UserInfo } from "@/types/user";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton, Tooltip } from "@mui/material";
import Link from "next/link";

type Props = {
  userId: UserInfo["id"];
};

const ViewUserProfileButton = ({ userId }: Props) => {
  return (
    <Tooltip title="نمایش مشخصات کاربر">
      <Link href={`/admin/users/${userId}`}>
        <IconButton color="primary">
          <VisibilityIcon />
        </IconButton>
      </Link>
    </Tooltip>
  );
};

export default ViewUserProfileButton;