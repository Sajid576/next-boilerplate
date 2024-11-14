"use client";

import {
    Boxes,
    DollarSign,
    Fingerprint,
    LayoutDashboard,
    PackageSearch,
    Palette,
    Puzzle,
    Ruler,
    ShoppingCartIcon,
    Users,
    UsersRound,
    Warehouse
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import NavItem from "./nav-item";
import { Loader2 } from "lucide-react"; // Add this import
import { Skeleton } from "@/components/ui/skeleton"; // Add this import

// Define types for the menu items
interface MenuItem {
  label: string;
  identifier: string;
  link: string;
  icon: JSX.Element;
  subMenus?: SubMenuItem[];
}

interface SubMenuItem {
  label: string;
  identifier: string;
  link: string;
  icon: JSX.Element;
}

// Define the structure of the session data
interface SessionData {
  role?: {
    permissions: Array<{
      moduleIdentifier: string;
      modulePermissions: string[];
    }>;
  };
}

export default function NavItems() {
  const { data: session, status } = useSession() as { data: SessionData | null, status: "loading" | "authenticated" | "unauthenticated" };

  // console.log("permissions", getUniqueIdentifiers(PERMISSIONS));
  const allMenus = useMemo<MenuItem[]>(
    () => [
      {
        label: "Dashboard",
        identifier: "dashboard",
        link: "/dashboard",
        icon: <LayoutDashboard size={18} />,
      },
     
      // {
      //   label: MODULES.users.sidebarLabel,
      //   identifier: MODULES.users.id,
      //   link: "",
      //   icon: <Users size={18} />,
      //   subMenus: [
      //     {
      //       label: MODULES.roles.sidebarLabel,
      //       identifier: MODULES.roles.id,
      //       link: "/roles",
      //       icon: <Fingerprint size={18} />,
      //     },
          
      //     {
      //       label: MODULES.users.sidebarLabel,
      //       identifier: MODULES.users.id,
      //       link: "/users/agent",
      //       icon: <UsersRound size={18} />,
      //     },
      //   ],
      // },
      {
        label: "Issues",
        identifier: "issues",
        link: "/issues",
        icon: <Users size={18} />,
        subMenus: [
          {
            label: "Create Issue",
            identifier: 'create-issue',
            link: "/create-issue",
            icon: <Fingerprint size={18} />,
          },
          
          {
            label: "Issue List",
            identifier: "issue list",
            link: "/issue-list",
            icon: <UsersRound size={18} />,
          },
        ],
      },
    ],
    []
  );

  // Memoize the sidebar generation
  const sidebar = useMemo(() => {
    if (status === "loading") {
      return []; // Return an empty array while loading
    }

    const userType = session?.user?.userType;

    const generateSidebar = (
      menus: MenuItem[],
      role?: SessionData["role"]
    ): MenuItem[] => {
      
      return menus.reduce((filteredMenus: MenuItem[], menu: MenuItem) => {
        if (menu.subMenus) {
          const subMenus = generateSidebar(menu.subMenus, role);
          if (subMenus.length > 0) {
            filteredMenus.push({ ...menu, subMenus });
          }
        } else {
          // const hasPermission = role?.permissions?.some(
          //   (permission) => permission.moduleIdentifier === menu.identifier
          // );
          const hasPermission =true

          if (hasPermission) {
            filteredMenus.push(menu);
          }
        }
        return filteredMenus;
      }, []);
    };

    if (userType === "super") {
      return allMenus
    } else {
      return generateSidebar(allMenus, session?.role);
    }
    
  }, [session, status, allMenus]); // Add status to the dependency array

  if (status === "loading") {
    return (
      <>
        {[...Array(5)].map((_, index) => (
          <Skeleton key={index} className="h-10 w-full mb-2" />
        ))}
      </>
    );
  }

  return (
    <>
      {sidebar.map((item, index) => (
        <NavItem key={index} {...item} />
      ))}
    </>
  );
}
