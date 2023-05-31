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
import { IconButton } from "@mui/material";

import { NavItem } from "./nav-item";
import { setToken } from "src/store/modules/slices/auth.slice";
import { setUser, unsetUser } from "src/store/modules/slices/user.slice";
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
    dispatch(setToken(''));
    dispatch(unsetUser());
    cookies.set("token", "");
    enqueueSnackbar("Cerrando sesión...", {
      variant: "info",
      autoHideDuration: 500,
    });
    router.push(`/auth/login`);
  };

  const theme = useTheme();

  return (
    <>
      <Drawer variant="permanent">
        <DrawerHeader
          style={{ display: "flex", justifyContent: "center" }}
          theme={theme}
        >
          <Link className="mmm" href="/">
            <a>
              <Image src="/icon.svg" alt="Logo" width={32} height={32} />
            </a>
          </Link>
        </DrawerHeader>
        <Divider />
        <List>
          <NavItem>
            <Link className="mmm" href="/" role="button">
              <HomeIcon htmlColor={config.primaryColor} />
            </Link>
          </NavItem>
          <NavItem>
            <Link className="mmm" href="/plants" role="button">
              <AgaveIcon htmlColor={config.primaryColor} />
            </Link>
          </NavItem>
          <NavItem>
            <Link className="mmm" href="/ranches" role="button">
              <AgricultureIcon htmlColor={config.primaryColor} />
            </Link>
          </NavItem>
          <NavItem>
            <Link className="mmm" href="/investments" role="button">
              <InvestingIcon htmlColor={config.primaryColor} />
            </Link>
          </NavItem>
          <NavItem>
            <Link className="mmm" href="/partners" role="button">
              <HandshakeIcon htmlColor={config.primaryColor} />
            </Link>
          </NavItem>
          <NavItem>
            <Link className="mmm" href="/users" role="button">
              <ManageAccountsIcon htmlColor={config.primaryColor} />
            </Link>
          </NavItem>
        </List>
        <Divider></Divider>
        <List sx={{ display: "flex", direction: "column", marginX: "auto" }}>
          <IconButton onClick={handleLogout}>
            <ExitToAppIcon htmlColor={config.primaryColor} />
          </IconButton>
        </List>
      </Drawer>
    </>
  );
}
