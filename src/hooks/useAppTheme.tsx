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
        main: "#636ed8",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#49125a",
        contrastText: "#000000",
      },
      background: {
        default: "#F4F6F8", // Light gray
        paper: "#FFFFFF",
      },
    },
  });
  return theme;
};

export default useAppTheme;
