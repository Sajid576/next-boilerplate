import { buttonVariants } from "@components/ui/button";
import { cn } from "@lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@components/ui/collapsible";
import { ChevronDown, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react"; // Add useState and useEffect

export type TNavItem = {
  label?: string;
  link: string;
  icon: JSX.Element;
  subMenus?: TNavItem[];
};

const NavItemComponent = ({ ...data }: TNavItem) => {
  const pathName = usePathname();
  const isActive = pathName === data?.link;
  return (
    <Link
      href={data?.link}
      className={cn(
        isActive ? "bg-muted text-primary" : "text-muted-foreground",
        "flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary"
      )}
    >
      {data?.icon}
      {data?.label}
    </Link>
  );
};

export default function NavItem({ ...data }: TNavItem) {
  const pathName = usePathname();
  const isActive = pathName === data?.link;

  // New state to manage the open state of the collapsible
  const [isOpen, setIsOpen] = useState(false);

  // Check if any subMenu is active
  useEffect(() => {
    if (data?.subMenus) {
      const anyChildActive = data.subMenus.some((subMenu) => pathName === subMenu.link);
      setIsOpen(anyChildActive); // Keep open if any child is active
    }
  }, [data?.subMenus, pathName]); // Add dependencies

  // Toggle function for the collapsible
  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  if (data?.subMenus)
    return (
      <Collapsible open={isOpen}> {/* Set the open state */}
        <CollapsibleTrigger
          onClick={toggleOpen} // Add click handler to toggle
          className={cn(
            "group flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary h-12 w-full justify-start text-muted-foreground"
          )}
        >
          {data?.icon}
          {data?.label}
          <span
            className={cn(
              'ml-auto transition-all duration-200 group-data-[state="open"]:-rotate-180'
            )}
          >
            <ChevronDown />
          </span>
        </CollapsibleTrigger>
        <CollapsibleContent className="collapsibleDropdown" asChild>
          <ul>
            {data?.subMenus?.map((item, index) => (
              <li key={index} className="my-1 ml-8">
                <NavItemComponent {...item} />
              </li>
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    );
  else return <NavItemComponent {...data} />;
}
