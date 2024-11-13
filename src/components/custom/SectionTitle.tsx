import { cn } from '@lib/utils';
import React from 'react'

type TSectionTitle = {
title:string;
className?:string;
}

export default function SectionTitle({ title = "Title", className }: TSectionTitle) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-3xl font-semibold tracking-tight lg:text-2xl",
        className
      )}
    >
      {title}
    </h1>
  );
}
