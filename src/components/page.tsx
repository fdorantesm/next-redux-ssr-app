import styled from "@emotion/styled";
import { Box, Divider, Grid, Typography } from "@mui/material";

interface PageProps {
  title: string;
  children: React.ReactNode;
}

const PageStyles = styled.div`
  background: transparent;
  display: flex;
  width: 100%;
`;

export function Page({ children, title }: PageProps) {
  return (
    <PageStyles className="page">
      <Grid container>
        <Grid
          item
          md={11}
          marginLeft={"auto"}
          marginRight={"auto"}
          bgcolor={"#FFF"}
        >
          <Box px={3} py={2}>
            <Typography variant={"h6"} gutterBottom={false} mb={1}>
              {title}
            </Typography>
            <Divider sx={{ marginBottom: 3 }} />
            {children}
          </Box>
        </Grid>
      </Grid>
    </PageStyles>
  );
}
