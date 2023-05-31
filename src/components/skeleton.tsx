import { ReactNode } from "react";
import ReactSkeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function Skeleton(props: Props) {
  return props.loading ? <ReactSkeleton /> : <>{props.children || ""}</>;
}

interface Props {
  loading: boolean;
  children?: ReactNode;
}
