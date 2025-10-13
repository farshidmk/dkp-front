import { vazirFont } from "@/ui/font";
import { createTheme } from "@mui/material";

const useAppTheme = () => {
  const theme = createTheme({
    direction: "rtl", // Right-to-left
    typography: {
      fontFamily: vazirFont.style.fontFamily,
    },
    palette: {
      primary: {
        main: "#8994ff",
        // light: "#e8f2ff",
        // contrastText: "#ffffff",
      },
      secondary: {
        main: "#e7d440",
        // contrastText: "#000000",
      },
      text: {
        primary: "#5a6483",
        secondary: "#5a6483",
      },
      background: {
        default: "#F4F6F8", // Light gray
        paper: "#FFFFFF",
      },
      divider: "#d6defa",
    },
  });
  return theme;
};

export default useAppTheme;
