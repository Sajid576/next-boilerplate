"use client";


import { TChildrenProp } from "@types";
import { ThemeProvider } from "next-themes";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@components/ui/sonner";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function Providers({ children }: TChildrenProp) {
  return (
    <QueryClientProvider client={queryClient}>
         <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SessionProvider>
          {children}
          <Toaster richColors />
        </SessionProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
