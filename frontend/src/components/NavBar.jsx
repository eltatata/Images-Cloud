"use client"

import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem
} from "@nextui-org/react";
import { usePathname } from 'next/navigation'

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Upload image", path: "/images/upload" },
    { name: "Login", path: "/auth/login" },
    { name: "Profile", path: "/profile" },
    { name: "Register", path: "/auth/register" },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isBordered>
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
        {menuItems.map((item, index) => (
          <NavbarItem key={index}>
            <Link color={pathname == item.path ? "primary" : "foreground"} href={item.path}>
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link color={pathname == item.path ? "primary" : "foreground"} href={item.path}>
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar >
  );
}
