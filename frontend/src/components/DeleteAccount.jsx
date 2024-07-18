"use client";

import { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { Button, Input } from "@nextui-org/react";
import ModalAlert from './ModalAlert';

export default function DeleteAccount() {
  const router = useRouter();
  const token = Cookies.get("tokenSesionApp");

  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);

      if (text !== 'delete my profile') throw new Error('Text does not match');

      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/profile", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (res.ok) {
        Cookies.remove("tokenSesionApp");
        router.refresh();
        router.push("/auth/register");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
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
          onPress={() => setOpen(true)}
          isLoading={loading}
          isDisabled={loading}
        >
          {loading ? "Deleting account..." : "Delete account"}
        </Button>
      </div>
      <ModalAlert
        isOpen={open}
        isLoading={loading}
        onOpenChange={setOpen}
        onConfirm={handleDeleteAccount}
      >
        <div className='space-y-2'>
          <p>
            enter the following text <i><b className='text-red-500'>delete my profile</b></i> to delete your account permanently
          </p>
          <Input
            type='text'
            variant='bordered'
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </ModalAlert>
    </>
  )
}