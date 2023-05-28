import { SvgIcon, SvgIconProps } from "@mui/material";

export * from "./agave";
export * from "./investing";

export function Icon(props: SvgIconProps) {
  return <SvgIcon {...props}>{props.children}</SvgIcon>;
}
