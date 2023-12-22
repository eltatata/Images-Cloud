"use client";

import { Avatar, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

function CardProfile({ user }) {
  const router = useRouter();

  const logout = async () => {
    try {
      Cookies.remove("tokenSesionApp")

      router.refresh();
      router.push("/auth/login");
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex items-center justify-center gap-5">
      <Avatar name={user.username} className="w-24 h-24 text-large" />
      <div>
        <p className="font-bold text-xl">{`@${user.username}`}</p>
        <p className="text-gray-600"><strong>{user.email}</strong></p>
      </div>
      <Button color="primary" onPress={logout}>
        Logout
      </Button>
    </div>
  )
}

export default CardProfile;