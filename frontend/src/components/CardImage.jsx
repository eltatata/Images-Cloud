"use client";

import { Image, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

function CardImage({ image }) {
  const router = useRouter();
  const token = Cookies.get("tokenSesionApp");

  const handleDelete = async (id) => {
    try {
      if (confirm("Are you sure you want to delete the image?")) {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/images/delete/${id}`, {
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
    <div key={image._id} className="flex flex-col items-center">
      <Image
        isBlurred
        width={500}
        src={image.imageUrl}
        alt={image._id}
        className="mb-3"
      />
      <Button className="bg-red-700 flexe" onPress={() => handleDelete(image._id)}>
        Delete
      </Button>
    </div>
  )
}

export default CardImage;