import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Image from "next/image";
import Link from "next/link";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import cookies from "js-cookie";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HomeIcon from "@mui/icons-material/Home";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import HandshakeIcon from "@mui/icons-material/Handshake";

import { NavItem } from "./nav-item";
import { setToken } from "src/store/modules/slices/auth.slice";
import { setUser } from "src/store/modules/slices/user/user.slice";
import { config } from "src/config/config";
import { AgaveIcon } from "src/components/icons/agave/agave";
import { InvestingIcon } from "src/components/icons";

const drawerWidth = 65;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer)(() => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
}));

export function Nav({ children }: any) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = (e: any) => {
    e.preventDefault();
    router.push(`/auth/login`);
    dispatch(setToken(""));
    dispatch(setUser(""));
    cookies.set("token", "");
    enqueueSnackbar("Cerrando sesión...", {
      variant: "info",
      autoHideDuration: 500,
    });
  };

  const theme = useTheme();

  return (
    <>
      <Drawer variant="permanent">
        <DrawerHeader
          style={{ display: "flex", justifyContent: "center" }}
          theme={theme}
        >
          <Link href="/">
            <a style={{ display: "block" }}>
              <Image src="/favicon.ico" alt="Logo" width={32} height={32} />
            </a>
          </Link>
        </DrawerHeader>
        <Divider />
        <List>
          <NavItem>
            <Link href="/" role="button">
              <a style={{ display: "block" }}>
                <HomeIcon htmlColor={config.primaryColor} />
              </a>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/plants" role="button">
              <a style={{ display: "block" }}>
                <AgaveIcon htmlColor={config.primaryColor} />
              </a>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/ranches" role="button">
              <a style={{ display: "block" }}>
                <AgricultureIcon htmlColor={config.primaryColor} />
              </a>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/investments" role="button">
              <a style={{ display: "block" }}>
                <InvestingIcon htmlColor={config.primaryColor} />
              </a>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/partners" role="button">
              <a style={{ display: "block" }}>
                <HandshakeIcon htmlColor={config.primaryColor} />
              </a>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/users" role="button">
              <a style={{ display: "block" }}>
                <ManageAccountsIcon htmlColor={config.primaryColor} />
              </a>
            </Link>
          </NavItem>
        </List>
        <Divider></Divider>
        <List>
          <NavItem>
            <a href="#" onClick={handleLogout}>
              <ExitToAppIcon htmlColor={config.primaryColor} />
            </a>
          </NavItem>
        </List>
      </Drawer>
    </>
  );
}
