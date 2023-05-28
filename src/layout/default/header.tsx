import { Box, Grid, IconButton, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import styled from "@emotion/styled";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";
import { LetterAvatar } from "src/components/avatar";

const Title = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;

export function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <header style={{ margin: "1rem 0 2rem" }}>
      <Grid container>
        <Grid item md={11} mx={"auto"}>
          <Grid container>
            <Grid item md={6}>
              <Title>
                <DashboardIcon fontSize={"large"} sx={{ mr: 1 }} />
                <Typography variant="h6" color="initial">
                  Panel de Administración
                </Typography>
              </Title>
            </Grid>
            <Grid item md={6}>
              <Box sx={{ display: "flex", justifyContent: "end" }}>
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ mr: 1 }}
                  disableRipple
                >
                  <SettingsIcon />
                </IconButton>
                <IconButton>
                  <LetterAvatar></LetterAvatar>
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </header>
  );
}
