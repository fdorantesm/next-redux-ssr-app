import React from "react";
import { SvgIconProps } from "@mui/material";

import { AgaveSvg } from "./agave.svg";
import { Icon } from "..";

export function AgaveIcon(props: SvgIconProps) {
  return (
    <Icon {...props}>
      <AgaveSvg />
    </Icon>
  );
}
