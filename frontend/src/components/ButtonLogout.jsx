"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { Button } from "@nextui-org/react";
import ModalAlert from "./ModalAlert";

export default function ButtonLogout() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);

    Cookies.remove("tokenSesionApp");

    router.refresh();
    router.push("/auth/login");

    setLoading(false);
  }

  return (
    <>
      <Button
        variant="ghost"
        color="secondary"
        className="text-medium font-bold"
        onPress={() => setOpen(true)}
      >
        Logout
      </Button>
      <ModalAlert
        isOpen={open}
        isLoading={loading}
        onOpenChange={setOpen}
        onConfirm={handleLogout}
      >
        <p>Are you sure you want to log out?</p>
      </ModalAlert>
    </>
  )
}