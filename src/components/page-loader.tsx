import { LinearProgress } from "@mui/material";

export function PageLoader() {
  return (
    <LinearProgress
      sx={{ height: "0.25rem" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 10000,
      }}
    />
  );
}
