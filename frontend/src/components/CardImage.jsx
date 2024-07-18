"use client";

import { useState } from "react";
import {
  Card,
  CardFooter,
  Image,
  Button
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import ModalAlert from "./ModalAlert";

function CardImage({ image }) {
  const router = useRouter();
  const token = Cookies.get("tokenSesionApp");

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/images/${image._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setOpen(false);
      setLoading(false);
    }
  }

  return (
    <>
      <Card
        isFooterBlurred
        className="rounded-md bg-transparent"
      >
        <Image
          removeWrapper
          alt="Relaxing app background"
          className="z-0 w-full h-full object-cover rounded-md"
          src={image.url}
        />
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 rounded-b-md">
          <div className="flex flex-grow gap-2 items-center">
            <div className="flex flex-col">
              <p className="font-semibold text-white text-xl">{image.name}</p>
              <p className="text-sm text-white/60 truncate max-w-xs">{image.description}</p>
            </div>
          </div>
          <Button
            radius="md"
            size="sm"
            variant="flat"
            color="danger"
            onPress={() => setOpen(true)}
          >
            Delete
          </Button>
        </CardFooter>
      </Card>
      <ModalAlert
        isOpen={open}
        isLoading={loading}
        onOpenChange={setOpen}
        onConfirm={handleDelete}
      >
        <p>Are you sure you want to delete the image?</p>
      </ModalAlert>
    </>
  )
}

export default CardImage;