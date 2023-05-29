import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useLayoutEffect, useState } from "react";
import { getUser } from "src/services/api/users/get-user";
import { updateUser } from "src/services/api/users/update-user.service";

import { User } from "src/types/user.type";

const initialState = {
  email: "",
  name: "",
  phone: "",
  password: "",
};

export function UpdateUserModal(props: Props) {
  const snackbar = useSnackbar();
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState(initialState);

  useLayoutEffect(() => {
    getUser(props.userId).then((user) => {
      setFormData({
        email: user.email,
        name: user?.profile?.name!,
        phone: user?.profile?.phone!,
        password: "",
      });
    });
  }, [props.userId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePasswordType = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = async () => {
    const payload: Partial<User> & { password?: string } = {
      email: formData.email,
      profile: {
        name: formData.name,
        phone: formData.phone,
      },
    };

    if (formData.password) {
      payload.password = formData.password;
    }

    const user = await updateUser(props.userId, payload);
    props.onCreate(user!);
    snackbar.enqueueSnackbar({
      variant: "success",
      autoHideDuration: 3000,
      message: "Usuario actualizado correcta¿¿¿ente",
    });

    setFormData(initialState);
    props.onClose();
  };

  return (
    <Dialog
      open={props.isOpen}
      maxWidth={"xs"}
      fullWidth
      key={"update-user-modal"}
    >
      <DialogTitle>
        <Box p={1}>Actualizar usuario</Box>
      </DialogTitle>
      <DialogContent>
        <Stack px={1}>
          <FormControl fullWidth>
            <TextField
              margin="dense"
              name="name"
              label="Nombre"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.name}
              onChange={handleInputChange}
            />
          </FormControl>
        </Stack>
        <Stack direction={"row"} px={1}>
          <FormControl fullWidth>
            <TextField
              margin="dense"
              name="phone"
              label="Teléfono"
              type="phone"
              fullWidth
              variant="outlined"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </FormControl>
        </Stack>
        <Stack direction={"row"} px={1}>
          <FormControl fullWidth>
            <TextField
              margin="dense"
              name="email"
              label="Email"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.email}
              onChange={handleInputChange}
            />
          </FormControl>
        </Stack>
        <Stack direction={"row"} px={1}>
          <FormControl sx={{ mt: 1 }} variant="outlined" fullWidth>
            <InputLabel htmlFor="password">Contraseña</InputLabel>
            <OutlinedInput
              name="password"
              fullWidth
              id="password"
              type={isPasswordVisible ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handlePasswordType}
                    edge="end"
                  >
                    {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Contraseña"
            />
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack
          direction={"row"}
          justifyContent={"end"}
          alignItems={"center"}
          pt={2}
          px={1}
        >
          <Button color="inherit" onClick={props.onCancel} type="button">
            Cancelar
          </Button>
          <Button
            color="success"
            variant="contained"
            sx={{ marginLeft: 1 }}
            type="submit"
            onClick={handleSubmit}
          >
            Guardar
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}

interface Props {
  isOpen: boolean;
  onClose(): any;
  onCancel(): any;
  onCreate(data: User): any;
  userId: string;
}
