
"use client";

import { Button } from '@components/ui/button';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import React from 'react'

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      onClick={() => {
        theme === "light" ? setTheme("dark") : setTheme("light");
      }}
      variant="ghost"
      className="w-9 px-0"
    >
      {theme == "dark" ? (
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      ) : (
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
