import * as React from "react";
import Container from "@mui/material/Container";
import { useRouter } from "next/router";
import { useState, SyntheticEvent } from "react";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import Head from "next/head";
import {
  Box,
  Button,
  OutlinedInput,
  FormControl,
  InputLabel,
  Stack,
} from "@mui/material";
import Image from "next/image";
import cookie from "js-cookie";

import { setToken } from "src/store/modules/slices/auth.slice";
import { setUser } from "src/store/modules/slices/user.slice";
import { login } from "src/services/api/auth/login";
import { me } from "src/services/api/auth/me";
import { FullCentered } from "src/components/full-centered.styled";
import { PasswordField } from "src/components/password-field";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setCredentials({ ...credentials, [target.name]: target.value });
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    try {
      e.preventDefault();
      const nextUrl = String(router.query.next || "/");
      const token = await login(credentials.email, credentials.password);
      const accessToken = token.accessToken;

      const user = await me({
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!user.scopes.includes("root")) {
        enqueueSnackbar("Las credenciales no son válidas", {
          variant: "error",
        });
        throw Error;
      }

      dispatch(setToken(accessToken));
      dispatch(setUser(user));

      enqueueSnackbar("Inicio de sesión exitoso.", {
        variant: "success",
        autoHideDuration: 1000,
      });

      cookie.set("token", accessToken, {
        expires: token.expiresAt,
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
          <Stack
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box marginBottom={3}>
              <Image src={"/logo.svg"} width={250} height={250}></Image>
            </Box>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <FormControl variant="outlined" fullWidth>
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
                <PasswordField
                  name="password"
                  fullWidth
                  value={credentials.password}
                  onChange={handleChange}
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
                  color={"info"}
                >
                  Iniciar sesión
                </Button>
              </FormControl>
            </Box>
          </Stack>
        </Container>
      </FullCentered>
    </>
  );
}
