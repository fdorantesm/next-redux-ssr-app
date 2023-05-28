import styled from "@emotion/styled";
import { SvgIcon } from "@mui/material";
import Image from "next/image";
import Agave from "./icons/agave.svg";

interface Props {
  url?: string;
  color: string;
  icon?: any;
}

const Fill = styled.div``;

export function Icon({ url, color }: Props) {
  return (
    <SvgIcon component={"object"} htmlColor={color}>
      <Agave></Agave>
    </SvgIcon>
  );
}
