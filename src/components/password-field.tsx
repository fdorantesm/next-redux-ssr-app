import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  OutlinedInputProps,
} from "@mui/material";
import { useState } from "react";

export function PasswordField(props: Props) {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = () => {
    setVisible((value) => !value);
  };

  return (
    <>
      <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
      <OutlinedInput
        margin="dense"
        type={visible ? "text" : "password"}
        placeholder="Contraseña"
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={handleVisibleChange} edge="end">
              {visible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        {...props}
      />
    </>
  );
}

interface Props extends Omit<OutlinedInputProps, "value" | "onChange"> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
