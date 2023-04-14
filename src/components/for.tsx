import React from "react";
import { ReactNode } from "react";

type ForProps = {
  items: any[];
  children: (item: any, index: number) => ReactNode;
};

export const For = ({ items, children }: ForProps) => (
  <>{items.map((item, index) => children(item, index))}</>
);
