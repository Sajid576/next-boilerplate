"use client";

import { store } from "@redux/store";
import { TChildrenProp } from "@types";
import { ThemeProvider } from "next-themes";
import React from "react";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@components/ui/sonner";

export default function Providers({ children }: TChildrenProp) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SessionProvider>
          {children}
          <Toaster richColors />
        </SessionProvider>
      </ThemeProvider>
    </Provider>
  );
}
