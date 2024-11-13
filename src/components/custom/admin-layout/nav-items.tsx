"use client";

import { MODULES } from "@app/(users)/roles/config";
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
      {
        label: MODULES.products.sidebarLabel,
        identifier: MODULES.products.id,
        link: "",
        icon: <PackageSearch size={18} />,
        subMenus: [
          {
            label: MODULES.products.sidebarLabel,
            identifier: MODULES.products.id,
            link: "/products",
            icon: <ShoppingCartIcon size={18} />,
          },
          {
            label: MODULES.featuredProducts.sidebarLabel,
            identifier: MODULES.featuredProducts.id,
            link: "/products/featured",
            icon: <ShoppingCartIcon size={18} />,
          },
          {
            label: MODULES.featuredCategories.sidebarLabel,
            identifier: MODULES.featuredCategories.id,
            link: "/products/categories/featured",
            icon: <ShoppingCartIcon size={18} />,
          },
          {
            label: MODULES.categories.sidebarLabel,
            identifier: MODULES.categories.id,
            link: "/products/categories",
            icon: <Boxes size={18} />,
          },
          {
            label: MODULES.size.sidebarLabel,
            identifier: MODULES.size.id,
            link: "/products/sizes",
            icon: <Ruler size={18} />,
          },
          {
            label: MODULES.color.sidebarLabel,
            identifier: MODULES.color.id,
            link: "/products/colors",
            icon: <Palette size={18} />,
          },
          {
            label: MODULES.unit.sidebarLabel,
            identifier: MODULES.unit.id,
            link: "/products/units",
            icon: <Puzzle size={18} />,
          },
        ],
      },
      {
        label: MODULES.wareHouseProducts.sidebarLabel,
        identifier: MODULES.wareHouseProducts.id,
        link: "/products/warehouse",
        icon: <ShoppingCartIcon size={18} />,
      },
      {
        label: MODULES.warehouse.sidebarLabel,
        identifier: MODULES.warehouse.id,
        link: "/warehouses",
        icon: <Warehouse size={18} />,
      },
      {
        label: MODULES.supplier.sidebarLabel,
        identifier: MODULES.supplier.id,
        link: "/suppliers",
        icon: <Warehouse size={18} />,
      },
      {
        label: MODULES.requisition.sidebarLabel,
        identifier: MODULES.requisition.id,
        link: "/requisitions",
        icon: <DollarSign size={18} />,
        subMenus: [
          {
            label: MODULES.requisition.sidebarLabel,
            identifier: MODULES.requisition.id,
            link: "/requisitions",
            icon: <ShoppingCartIcon size={18} />,
          },
          {
            label: MODULES.requisitionDeliveries.sidebarLabel,
            identifier: MODULES.requisitionDeliveries.id,
            link: "/requisitions/deliveries",
            icon: <ShoppingCartIcon size={18} />,
          },
          {
            label: MODULES.requisitionReceivables.sidebarLabel,
            identifier: MODULES.requisitionReceivables.id,
            link: "/requisitions/receivables",
            icon: <ShoppingCartIcon size={18} />,
          },
        ],
      },
      {
        label: MODULES.purchaseOrder.sidebarLabel,
        identifier: MODULES.purchaseOrder.id,
        link: "/purchase-orders",
        icon: <DollarSign size={18} />,
        subMenus: [
          {
            label: MODULES.purchaseOrder.sidebarLabel,
            identifier: MODULES.purchaseOrder.id,
            link: "/purchase-orders",
            icon: <ShoppingCartIcon size={18} />,
          },
          {
            label: MODULES.purchaseOrderDeliveries.sidebarLabel,
            identifier: MODULES.purchaseOrderDeliveries.id,
            link: "/purchase-orders/deliveries",
            icon: <ShoppingCartIcon size={18} />,
          },
          {
            label: MODULES.purchaseOrderReceivables.sidebarLabel,
            identifier: MODULES.purchaseOrderReceivables.id,
            link: "/purchase-orders/receivables",
            icon: <ShoppingCartIcon size={18} />,
          },
        ],
      },
      {
        label: MODULES.return.sidebarLabel,
        identifier: MODULES.return.id,
        link: "/return",
        icon: <DollarSign size={18} />,
        subMenus: [
          {
            label: MODULES.return.sidebarLabel,
            identifier: MODULES.purchaseOrderDeliveries.id,
            link: "/returns",
            icon: <ShoppingCartIcon size={18} />,
          },
          {
            label: MODULES.returnDeliverables.sidebarLabel,
            identifier: MODULES.returnDeliverables.id,
            link: "/returns/deliveries",
            icon: <ShoppingCartIcon size={18} />,
          },
          {
            label: MODULES.returnReceivables.sidebarLabel,
            identifier: MODULES.returnReceivables.id,
            link: "/returns/receivables",
            icon: <ShoppingCartIcon size={18} />,
          },
        ],
      },
      // {
      //   label: MODULES.order.sidebarLabel,
      //   identifier: MODULES.order.id,
      //   link: "/orders",
      //   icon: <ShoppingBasket size={18} />,
      // },
      // {
      //   label: "Shipments",
      //   identifier: "shipments",
      //   link: "/shipments",
      //   icon: <Truck size={18} />,
      // },
      // {
      //   label: "Customers",
      //   identifier: "customers",
      //   link: "/customers",
      //   icon: <UsersRound size={18} />,
      // },
      // {
      //   label: "Income",
      //   identifier: "income",
      //   link: "/incomes",
      //   icon: <HandCoins size={18} />,
      // },
      {
        label: MODULES.users.sidebarLabel,
        identifier: MODULES.users.id,
        link: "",
        icon: <Users size={18} />,
        subMenus: [
          {
            label: MODULES.roles.sidebarLabel,
            identifier: MODULES.roles.id,
            link: "/roles",
            icon: <Fingerprint size={18} />,
          },
          {
            label: MODULES.distributorUsers.sidebarLabel,
            identifier: MODULES.distributorUsers.id,
            link: "/users/distributor",
            icon: <UsersRound size={18} />,
          },
          {
            label: MODULES.agentUsers.sidebarLabel,
            identifier: MODULES.agentUsers.id,
            link: "/users/agent",
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
          const hasPermission = role?.permissions?.some(
            (permission) => permission.moduleIdentifier === menu.identifier
          );

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
