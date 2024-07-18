"use client";

import {
  Card,
  CardFooter,
  Image,
  Button
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

function CardImage({ image }) {
  const router = useRouter();
  const token = Cookies.get("tokenSesionApp");

  const handleDelete = async (id) => {
    try {
      if (confirm("Are you sure you want to delete the image?")) {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/images/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        const data = await res.json();

        if (res.ok) {
          router.refresh();
        }

        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
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
          onPress={() => handleDelete(image._id)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}

export default CardImage;