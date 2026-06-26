import { FormSelectInput } from "@/types/renderFormItem";
import React from "react";
import StatusHandler from "../statusHandler/StatusHandler";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const RenderSelectInput = ({
  label,
  name,
  options,
  status = "success",
  refetch,
  error,
  inputProps,
}: FormSelectInput) => {
  return (
    <StatusHandler status={status} refetch={refetch}>
      <FormControl fullWidth>
        <InputLabel id={`render-select-input-${name}`}>{label}</InputLabel>
        <Select
          labelId={`render-select-input-${name}`}
          // value={age}
          label={label}
          size="small"
          {...inputProps}
          onChange={inputProps?.onChange}
          value={inputProps?.value}
        >
          <MenuItem value={undefined}>همه</MenuItem>
          {options.map((option) => (
            <MenuItem value={option.value} key={String(option.value)}>
              {option.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </StatusHandler>
  );
};

export default RenderSelectInput;
