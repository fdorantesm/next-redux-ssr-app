import { ScriptProps } from "next/script";

export const If = (props: ScriptProps & { condition: boolean }) => (
  <>{props.condition && props.children}</>
);
