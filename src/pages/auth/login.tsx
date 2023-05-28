import * as React from "react";
import Container from "@mui/material/Container";
import { useRouter } from "next/router";
import { useState, SyntheticEvent } from "react";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import Head from "next/head";
import {
  CssBaseline,
  Box,
  Button,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Image from "next/image";
import cookie from "js-cookie";

import { setToken } from "src/store/modules/slices/auth.slice";
import { setUser } from "src/store/modules/slices/user/user.slice";
import { login } from "src/services/api/auth/login";
import { me } from "src/services/api/auth/me";
import { FullCentered } from "src/components/full-centered.styled";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setCredentials({ ...credentials, [target.name]: target.value });
  };

  const handlePasswordType = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    try {
      e.preventDefault();
      const nextUrl = String(router.query.next || "/");
      const response = await login(credentials.email, credentials.password);
      const token = response.data.accessToken;

      const { data: user } = await me({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!user.scopes.includes("root")) {
        enqueueSnackbar("Las credenciales no son válidas", {
          variant: "error",
        });
        throw Error;
      }

      dispatch(setToken(response.data.accessToken));
      dispatch(setUser(user));

      enqueueSnackbar("Inicio de sesión exitoso.", {
        variant: "success",
        autoHideDuration: 1000,
      });

      cookie.set("token", response.data.accessToken, {
        expires: response.data.expiresAt,
      });

      router.push(nextUrl);
    } catch (error) {
      enqueueSnackbar("Las credenciales no son válidas", {
        variant: "error",
      });
    }
  };

  return (
    <>
      <FullCentered>
        <Head>
          <title>Iniciar sesión | Admin</title>
        </Head>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 25,
            }}
          >
            <Image src={"/vercel.svg"} width={150} height={150}></Image>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <FormControl sx={{ mt: 1 }} variant="outlined" fullWidth>
                <InputLabel htmlFor="email">Correo electrónico</InputLabel>
                <OutlinedInput
                  required
                  fullWidth
                  id="email"
                  label="Correo electrónico"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={credentials.email}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl sx={{ mt: 1 }} variant="outlined" fullWidth>
                <InputLabel htmlFor="password">Contraseña</InputLabel>
                <OutlinedInput
                  name="password"
                  fullWidth
                  id="password"
                  type={isPasswordVisible ? "text" : "password"}
                  value={credentials.password}
                  onChange={handleChange}
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
              <FormControl fullWidth>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  fullWidth
                  size="large"
                >
                  Iniciar sesión
                </Button>
              </FormControl>
            </Box>
          </Box>
        </Container>
      </FullCentered>
    </>
  );
}
