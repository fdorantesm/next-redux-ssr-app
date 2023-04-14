import { ScriptProps } from "next/script";
import { Box, CssBaseline } from "@mui/material";

import { Footer } from "./footer";
import { Header } from "./header";

export const Layout = (props: ScriptProps) => (
  <>
    <CssBaseline />
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
      className="root"
    >
      <Header />
      <Box
        component="main"
        sx={{
          flex: "1 1 auto",
        }}
      >
        {props.children}
      </Box>
      <Footer />
    </Box>
  </>
);
