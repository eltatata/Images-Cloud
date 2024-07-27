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
  const [error, setError] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);

      if (!text || text !== 'delete my profile') {
        setError('The text entered is incorrect');
        setOpen(true);
        return;
      }

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
        <div className='space-y-6'>
          <p>
            enter the following text <i><b className='text-red-500'>delete my profile</b></i> to delete your account permanently
          </p>
          <div className='space-y-2'>
            <Input
              type='text'
              variant='bordered'
              placeholder='delete my profile'
              className='text-red-500'
              onChange={(e) => setText(e.target.value)}
            />
            {error && <p className='text-xs text-red-500'>{error}</p>}
          </div>
        </div>
      </ModalAlert>
    </>
  )
}