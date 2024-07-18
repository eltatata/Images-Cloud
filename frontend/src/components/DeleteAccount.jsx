"use client";

import { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

export default function DeleteAccount() {
  const router = useRouter();
  const token = Cookies.get("tokenSesionApp");

  const [loading, setLoading] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);

      if (confirm("Are you sure you want to delete your account?")) {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/profile", {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        if (res.ok) {
          Cookies.remove("tokenSesionApp");
          router.push("/auth/register");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="py-16 space-y-6">
      <h3 className="font-bold text-2xl text-red-600">
        Delete account
      </h3>
      <p className="text-sm text-red-300">
        Once you delete your account, all images will also be deleted, there is no going back. Please be certain.
      </p>
      <Button
        color="danger"
        variant="flat"
        onPress={handleDeleteAccount}
        isLoading={loading}
        isDisabled={loading}
      >
        {loading ? "Deleting account..." : "Delete account"}
      </Button>
    </div>
  )
}