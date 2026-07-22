import { useUserInfo } from "@/hooks/useUserInfo";
import { UserRole } from "@/types/user";
import {
  alpha,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemButtonBaseProps,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import { ADMIN_MENU, USER_MENU } from "./MENU";
import Link from "next/link";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import { usePathname } from "next/navigation";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DrawerMenu = ({ open, setOpen }: Props) => {
  const { role } = useUserInfo();
  const isAdmin = role === UserRole.ADMIN;

  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  const menuItemSx: ListItemButtonBaseProps["sx"] = {
    borderRadius: 2,
    mx: 1,
    "&.Mui-selected": {
      bgcolor: (theme) => alpha(theme.palette.info.light, 0.25),
    },
    "&.Mui-selected:hover": {
      bgcolor: (theme) => alpha(theme.palette.info.light, 0.35),
    },
  };

  return (
    <Drawer open={open} onClose={() => setOpen(false)} anchor="left">
      <Box sx={{ width: 320 }} role="presentation">
        <Paper
          sx={{
            py: 1,
            px: 2,
            background: (t) => alpha(t.palette.primary.main, 0.2),
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Image
            alt="دیجی تعمیر"
            src="/assets/images/mainlogo.png"
            width={100}
            height={40}
          />

          <IconButton onClick={() => setOpen(false)} color="warning">
            <CloseIcon />
          </IconButton>
        </Paper>

        {isAdmin && (
          <>
            <List>
              {ADMIN_MENU.map((menu) => (
                <ListItem key={menu.path} disablePadding>
                  <ListItemButton
                    component={Link}
                    href={menu.path}
                    selected={isActive(menu.path)}
                    onClick={() => setOpen(false)}
                    sx={menuItemSx}
                  >
                    <ListItemIcon>{menu.icon}</ListItemIcon>
                    <ListItemText primary={menu.title} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>

            <Divider />
          </>
        )}

        <List>
          {USER_MENU.map((menu) => (
            <ListItem key={menu.path} disablePadding>
              <ListItemButton
                component={Link}
                href={menu.path}
                selected={isActive(menu.path)}
                onClick={() => setOpen(false)}
                sx={menuItemSx}
              >
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default DrawerMenu;
