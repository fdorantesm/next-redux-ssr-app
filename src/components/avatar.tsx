import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import PersonIcon from "@mui/icons-material/Person";

export function LetterAvatar() {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar sx={{ bgcolor: "gray" }}>
        <PersonIcon htmlColor="white" />
      </Avatar>
    </Stack>
  );
}
