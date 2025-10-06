import React from "react";
import { FormTextFieldInput } from "@/types/renderFormItem";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const RenderTextInput = ({ label, inputProps, error }: FormTextFieldInput) => {
  const isPassword = inputProps?.type === "password";
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <TextField
      label={label}
      variant="outlined"
      size={"small"}
      fullWidth
      {...inputProps}
      type={
        isPassword
          ? showPassword
            ? "text"
            : "password"
          : inputProps?.type ?? "text"
      }
      error={Boolean(error)}
      helperText={error}
      slotProps={{
        input: isPassword
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((p) => !p)}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : {},
      }}
    />
  );
};

export default RenderTextInput;
