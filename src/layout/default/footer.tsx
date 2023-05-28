import { Grid, Stack } from "@mui/material";
import styled from "@emotion/styled";

const FooterLegendStyles = styled.div`
  opacity: 0.5;
`;

const HeartStyles = styled.div`
  transition: all 0.5s ease;
  &:hover: {
    color: red;
    transition: all 0.5s ease;
  }
`;

export function Footer() {
  return (
    <Grid container>
      <Grid item md={11} mx={"auto"}>
        <FooterLegendStyles>
          <Stack
            justifyContent={"end"}
            alignItems={"end"}
            m={2}
            direction={"row"}
          >
            <span>v0.0.1</span>
          </Stack>
        </FooterLegendStyles>
      </Grid>
    </Grid>
  );
}
