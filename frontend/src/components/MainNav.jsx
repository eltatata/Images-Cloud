"use client";

import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { usePathname } from 'next/navigation'
import ButtonLogout from "./ButtonLogout";

export default function MainNav({ links, token }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="bg-black bg-opacity-20"
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-secondary",
        ],
      }}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link className="font-bold text-inherit text-xl" href="/">Images Cloud</Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        {links.map((item, index) => (
          <NavbarItem key=
            {index}
            isActive={pathname == item.path}
          >
            <Link
              color={pathname == item.path ? "secondary" : "foreground"}
              className="font-bold text-medium"
              href={item.path}
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
        {token && (
          <NavbarItem>
            <ButtonLogout />
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarMenu>
        {links.map((item, index) => (
          <NavbarMenuItem
            key={index}
            isActive={pathname == item.path}
          >
            <Link
              color={pathname == item.path ? "secondary" : "foreground"}
              className="font-bold text-medium"
              href={item.path}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        {token && (
          <NavbarMenuItem>
            <ButtonLogout />
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </Navbar>
  )
}
