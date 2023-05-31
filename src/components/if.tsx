import { ReactNode } from "react";

export const If = (props: Props) => {
  if (props.condition) {
    return <>{props.children}</>;
  }

  return null;
};

interface Props {
  condition: boolean;
  children: ReactNode;
}
