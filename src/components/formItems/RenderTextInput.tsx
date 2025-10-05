import React from "react";

import { FormTextFieldInput } from "@/types/renderFormItem";
import { TextField } from "@mui/material";

const RenderTextInput = ({ label, inputProps, error }: FormTextFieldInput) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      size="small"
      {...inputProps}
      error={Boolean(error)}
      helperText={error}
    />
  );
};

export default RenderTextInput;
