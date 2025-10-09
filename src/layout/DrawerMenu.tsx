import { useUserInfo } from "@/hooks/useUserInfo";
import { UserRole } from "@/types/user";
import MenuIcon from "@mui/icons-material/Menu";
import {
  alpha,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import { ADMIN_MENU, USER_MENU } from "./MENU";
import Link from "next/link";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DrawerMenu = ({ open, setOpen }: Props) => {
  const { role } = useUserInfo();
  const isAdmin = role === UserRole.ADMIN;
  return (
    <Drawer open={open} onClose={() => setOpen(false)} anchor="left">
      <Box sx={{ width: "100%", maxWidth: "400px" }} role="presentation">
        <Paper
          sx={{
            py: 1,
            background: (t) => alpha(t.palette.primary.main, 0.2),
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Image
            alt="دیجی تعمیر"
            src={"/assets/images/mainlogo.png"}
            width={100}
            height={40}
          />
          <IconButton onClick={() => setOpen(false)} color="secondary">
            <CloseIcon />
          </IconButton>
        </Paper>

        {isAdmin && (
          <>
            <List>
              {ADMIN_MENU.map((menu) => (
                <Link href={menu.path} key={menu.path}>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>{menu.icon}</ListItemIcon>
                      <ListItemText primary={menu.title} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            </List>
            <Divider />
          </>
        )}
        <List>
          {USER_MENU.map((menu) => (
            <Link href={menu.path} key={menu.path}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>{menu.icon}</ListItemIcon>
                  <ListItemText primary={menu.title} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default DrawerMenu;
