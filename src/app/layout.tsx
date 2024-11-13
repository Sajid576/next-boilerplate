

import Providers from "@components/custom/providers";
import { cn } from "@lib/utils";
import { TChildrenProp } from "@types";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import "../styles/index.css";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Assist Pro",
  description: "",
};

export default function RootLayout({ children }: TChildrenProp) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "h-full")}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
