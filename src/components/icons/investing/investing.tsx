import React from "react";
import { SvgIconProps } from "@mui/material";
import { InvestingSvg } from "./investing.svg";

import { Icon } from "..";

export function InvestingIcon(props: SvgIconProps) {
  return (
    <Icon {...props}>
      <InvestingSvg />
    </Icon>
  );
}
