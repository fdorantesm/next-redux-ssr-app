import { ListItem, ListItemButton, ListItemIcon } from "@mui/material";

export const NavItem = ({ children }: any) => (
  <ListItem disablePadding sx={{ display: "block" }}>
    <ListItemButton
      sx={{
        minHeight: 48,
        justifyContent: "center",
        px: 2.5,
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: "auto",
          justifyContent: "center",
        }}
      >
        {children}
      </ListItemIcon>
    </ListItemButton>
  </ListItem>
);
