import { Box, Grid, IconButton, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";

import { LetterAvatar } from "src/components/avatar";
import { RootState } from "src/store/types/root-state.type";

const Title = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;

export function Header(props: Props) {
  const user = useSelector((root: RootState) => root.user);

  return (
    <header style={{ margin: "1rem 0 2rem" }}>
      <Grid container>
        <Grid item md={11} mx={"auto"}>
          <Grid container>
            <Grid item md={6}>
              <Title>
                <DashboardIcon fontSize={"large"} sx={{ mr: 1 }} />
                <Typography variant="h6" color="initial">
                  Dashboard
                </Typography>
              </Title>
            </Grid>
            <Grid item md={6}>
              <Box sx={{ display: "flex", justifyContent: "end" }}>
                <IconButton>
                  {user.profile && (
                    <LetterAvatar value={user.profile.name!}></LetterAvatar>
                  )}
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </header>
  );
}

interface Props {
  onSettingsClick(): any;
}
