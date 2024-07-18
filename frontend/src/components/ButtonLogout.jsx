"use client";

import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { Button } from "@nextui-org/react";

export default function ButtonLogout() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("tokenSesionApp");

    router.refresh();
    router.push("/auth/login");
  }

  return (
    <Button
      variant="ghost"
      color="secondary"
      className="text-medium font-bold"
      onPress={handleLogout}
    >
      Logout
    </Button>
  )
}