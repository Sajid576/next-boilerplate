'use client'

import { Bell, CircleUser, Menu, Search } from "lucide-react";
import Link from "next/link";

import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Input } from "@components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@components/ui/sheet";
import Logo from "../logo";
import ThemeSwitcher from "../theme-switcher";
import NavItems from "./nav-items";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    const response = await signOut({ callbackUrl:'/' }); 
  };

  return (
    <div className="grid min-h-screen max-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r  md:block">
        <div className="flex flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Logo />
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <NavItems />
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b  px-4 lg:h-[60px] lg:px-6 ">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Logo />
                </Link>
                <NavItems />
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
          <ThemeSwitcher />
          <DropdownMenu>
            {session?.user ? (
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full"
                  >
                    <CircleUser className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                  <p className="font-semibold">{session?.user?.name}</p>
                </div>
              </DropdownMenuTrigger>
            ) : (
              <Button
                onClick={() => {
                  router.push("/");
                }}
              >
                Login
              </Button>
            )}
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{session?.user?.name}</DropdownMenuLabel>
              <span className="px-2 pb-2 text-sm">{session?.user?.userType}</span>
              <DropdownMenuSeparator />
              <DropdownMenuItem>My Profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/40 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
