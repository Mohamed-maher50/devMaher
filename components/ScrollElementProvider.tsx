"use client";
import React, { ReactNode } from "react";
import { Element } from "react-scroll";

const ScrollElementProvider = ({
  children,
  name,
}: {
  children: ReactNode;
  name: string;
}) => {
  return <Element name={name}>{children}</Element>;
};

export default ScrollElementProvider;
