import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import styles from "./hero.module.scss";

export default function RaffleHero(props: any) {
  const raffle = props.raffle;
  return (
    <>
      <div className={styles.hero}>
        <Container>
          <Grid container md={9} margin={"auto"}>
            <Grid item md={6}>
              <Box mb={5}>
                <Typography variant="h1" fontSize={42} fontWeight={600}>
                  {raffle.name}
                </Typography>
                <Typography variant="caption" fontSize={24}>
                  {raffle.prize.description}
                </Typography>
              </Box>
              <Button variant="contained">¡Quiero participar!</Button>
            </Grid>
            <Grid item md={6}></Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}
