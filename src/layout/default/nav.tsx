import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Image from "next/image";
import Link from "next/link";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import cookies from "js-cookie";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HomeIcon from "@mui/icons-material/Home";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import HandshakeIcon from "@mui/icons-material/Handshake";
import { IconButton, ListItem, Stack, Tooltip } from "@mui/material";

import { NavItem } from "./nav-item";
import { removeToken } from "src/store/modules/slices/auth.slice";
import { unsetUser } from "src/store/modules/slices/user.slice";
import { config } from "src/config/config";
import { AgaveIcon } from "src/components/icons/agave/agave";
import { InvestingIcon } from "src/components/icons";
import { useRouter } from "next/router";

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
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const handleLogout = (e: any) => {
    e.preventDefault();
    dispatch(removeToken());
    dispatch(unsetUser());
    cookies.set("token", "");
    enqueueSnackbar("Cerrando sesión...", {
      variant: "info",
      autoHideDuration: 500,
    });
    router.push("/auth/login");
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
            <a>
              <Image src="/icon.svg" alt="Logo" width={32} height={32} />
            </a>
          </Link>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem>
            <Link href="/" role="button">
              <Tooltip title="Inicio" arrow placement="right">
                <IconButton>
                  <HomeIcon htmlColor={config.primaryColor} />
                </IconButton>
              </Tooltip>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/plants">
              <a>
                <Tooltip title="Plantas" arrow placement="right">
                  <IconButton>
                    <AgaveIcon htmlColor={config.primaryColor} />
                  </IconButton>
                </Tooltip>
              </a>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/ranches" role="button">
              <a>
                <Tooltip title="Ranchos" arrow placement="right">
                  <IconButton>
                    <AgricultureIcon htmlColor={config.primaryColor} />
                  </IconButton>
                </Tooltip>
              </a>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/investments" role="button">
              <a>
                <Tooltip title="Inversiones" arrow placement="right">
                  <IconButton>
                    <InvestingIcon htmlColor={config.primaryColor} />
                  </IconButton>
                </Tooltip>
              </a>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/partners" role="button">
              <a>
                <Tooltip title="Socios" arrow placement="right">
                  <IconButton>
                    <HandshakeIcon htmlColor={config.primaryColor} />
                  </IconButton>
                </Tooltip>
              </a>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/users" role="button">
              <a>
                <Tooltip title="Usuarios" arrow placement="right">
                  <IconButton>
                    <ManageAccountsIcon htmlColor={config.primaryColor} />
                  </IconButton>
                </Tooltip>
              </a>
            </Link>
          </ListItem>
        </List>
        <Divider></Divider>
        <List sx={{ display: "flex", direction: "column", marginX: "auto" }}>
          <IconButton onClick={handleLogout}>
            <Tooltip title="Salir" arrow placement="right">
              <IconButton>
                <ExitToAppIcon htmlColor={config.primaryColor} />
              </IconButton>
            </Tooltip>
          </IconButton>
        </List>
      </Drawer>
    </>
  );
}
