"use client";

import React from "react";
import clsx from "clsx";

interface CardTemplateProps {
  children: React.ReactNode;
  className?: string; // allows extra styling overrides
}

export default function CardTemplate({ children, className }: CardTemplateProps) {
  return (
    <div
      className={clsx(
        "flex flex-col items-center rounded-2xl p-6 border card",
        className
      )}
    >
      {children}
    </div>
  );
}